import segno, io, sys
URL = sys.argv[1]
COLS, ROWS = 5, 7           # 35 QR على الصفحة
CW, CH = 38, 40             # mm — مقاس كل كارت
q = segno.make(URL, error=segno.consts.ERROR_LEVELS['M'] if hasattr(segno.consts,'ERROR_LEVELS') else 'm', boost_error=False)
buf = io.BytesIO(); q.save(buf, kind='svg', xmldecl=False, svgns=True, nl=False, border=1, scale=1, dark='#2A1F4D')
import re
svg = buf.getvalue().decode()
w = q.symbol_size(border=1)[0]
svg = re.sub(r'\s(width|height)="[^"]*"', '', svg, count=2)
svg = svg.replace('<svg', f'<svg viewBox="0 0 {w} {w}" shape-rendering="crispEdges"', 1)
cards = ''.join(f'<div class="c"><div class="q">{svg}</div><div class="t">🛵 هاتلى معاك</div><div class="s">امسح واطلب فطارك</div></div>' for _ in range(COLS*ROWS))
html = f'''<!doctype html><html lang="ar" dir="rtl"><meta charset="utf-8"><style>
@page{{size:A4;margin:0}}
*{{box-sizing:border-box}}
body{{margin:0;font-family:'Cairo','Noto Naskh Arabic','Noto Sans Arabic','DejaVu Sans',sans-serif;-webkit-print-color-adjust:exact;print-color-adjust:exact}}
.page{{width:210mm;height:297mm;padding:{(297-ROWS*CH)/2}mm {(210-COLS*CW)/2}mm;display:grid;grid-template-columns:repeat({COLS},{CW}mm);grid-auto-rows:{CH}mm}}
.c{{border:.25mm dashed #aaa;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:1.5mm;text-align:center}}
.q{{width:30mm;height:30mm}} .q svg{{width:100%;height:100%;display:block}}
.t{{font-weight:800;font-size:9pt;margin-top:1mm;color:#2A1F4D;line-height:1.1}}
.s{{font-size:6.5pt;color:#555;line-height:1.1}}
</style><div class="page">{cards}</div></html>'''
open('hatly-qr-a4.html','w').write(html)
print('modules:', q.symbol_size(border=0))
