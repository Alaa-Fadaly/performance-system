#!/usr/bin/env python3
"""بيحوّل الملفات المقروءة في src/ لنسخ ASCII بس (كل حرف عربي/إيموجي بيتحوّل لـ escape)
عشان ماينفعش أي محرر أو لصق يبوّظ الحروف. الناتج: index.html و Code.gs (دول اللي بتنسخهم في Apps Script)."""
import re, sys, pathlib

def js_esc(text):
    out = []
    for ch in text:
        o = ord(ch)
        if o < 128: out.append(ch)
        elif o <= 0xFFFF: out.append('\\u%04X' % o)
        else:
            o -= 0x10000
            out.append('\\u%04X\\u%04X' % (0xD800 + (o >> 10), 0xDC00 + (o & 0x3FF)))
    return ''.join(out)

def html_esc(text):
    return ''.join(ch if ord(ch) < 128 else '&#%d;' % ord(ch) for ch in text)

here = pathlib.Path(__file__).parent

# Code.gs
src = (here / 'src/Code.src.gs').read_text(encoding='utf-8')
assert not re.search(r'\\[^\x00-\x7f]', src), 'backslash before non-ASCII'
(here / 'Code.gs').write_text(js_esc(src), encoding='ascii')

# index.html
src = (here / 'src/index.src.html').read_text(encoding='utf-8')
assert not re.search(r'\\[^\x00-\x7f]', src), 'backslash before non-ASCII'
parts = re.split(r'(<script>.*?</script>)', src, flags=re.S)
out = []
for p in parts:
    if p.startswith('<script>'): out.append(js_esc(p))
    else:
        for st in re.findall(r'<style>.*?</style>', p, flags=re.S):
            assert all(ord(c) < 128 for c in st), 'non-ASCII inside <style>'
        out.append(html_esc(p))
(here / 'index.html').write_text(''.join(out), encoding='ascii')
print('built: ASCII-only index.html + Code.gs')
