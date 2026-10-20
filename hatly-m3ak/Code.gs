/**
 * هاتلى معاك — طلبات الفطار والسوبرماركت للموظفين
 * Google Apps Script web app. البيانات بتتخزن في Google Sheet تتعمل أوتوماتيك.
 *
 * كود مسئول التوصيل: Project Settings > Script properties > COURIER_PIN (الافتراضي 1234)
 */

var TZ_ = 'Africa/Cairo';
var VENDORS_ = ['foul', 'super'];

var SCHEMA_ = {
  Users:  ['id', 'name', 'floor', 'office', 'phone', 'createdAt'],
  Menu:   ['id', 'vendor', 'category', 'name', 'price', 'emoji', 'active', 'desc'],
  Orders: ['id', 'date', 'vendor', 'status', 'fee', 'createdAt', 'round'],
  Lines:  ['id', 'orderId', 'userId', 'userName', 'floor', 'office', 'item', 'qty',
           'estPrice', 'actualPrice', 'note', 'paid', 'createdAt', 'cat', 'bread'],
  Receipts: ['id', 'orderId', 'createdAt', 'data']
};

// [vendor, category, name, price, emoji]
var SEED_MENU_ = [
  ['foul', 'أطباق', 'طبق فول', 20, '🥣'],
  ['foul', 'أطباق', 'طبق طعمية (٥ حبات)', 15, '🧆'],
  ['foul', 'أطباق', 'طبق بيض عيون', 20, '🍳'],
  ['foul', 'أطباق', 'طبق بابا غنوج', 15, '🍆'],
  ['foul', 'أطباق', 'طبق سلطة', 8, '🥗'],
  ['foul', 'إضافات ومشروبات', 'عيش بلدي (٥)', 5, '🍞'],
  ['foul', 'إضافات ومشروبات', 'عيش فينو', 3, '🥖'],
  ['foul', 'إضافات ومشروبات', 'مخلل', 5, '🥒'],
  ['foul', 'إضافات ومشروبات', 'شاي', 10, '🍵'],
  ['foul', 'إضافات ومشروبات', 'قهوة', 15, '☕'],
  ['super', 'ألبان وجبن', 'لبن علبة ١ لتر', 40, '🥛'],
  ['super', 'ألبان وجبن', 'زبادي', 10, '🍦'],
  ['super', 'ألبان وجبن', 'جبنة مثلثات', 35, '🧀'],
  ['super', 'مخبوزات وسناكس', 'توست', 35, '🍞'],
  ['super', 'مخبوزات وسناكس', 'بسكوت', 8, '🍪'],
  ['super', 'مخبوزات وسناكس', 'كيك', 10, '🍰'],
  ['super', 'مخبوزات وسناكس', 'شيبسي', 10, '🥔'],
  ['super', 'مخبوزات وسناكس', 'شوكولاتة', 15, '🍫'],
  ['super', 'مشروبات', 'مياه', 6, '💧'],
  ['super', 'مشروبات', 'عصير', 12, '🧃'],
  ['super', 'مشروبات', 'مشروب غازي', 20, '🥤'],
  ['super', 'مشروبات', 'نسكافيه ساشيه', 10, '☕'],
  ['super', 'مشروبات', 'شاي أكياس', 45, '🫖'],
  ['super', 'حاجات تانية', 'مناديل', 15, '🧻'],
  ['super', 'حاجات تانية', 'سكر', 30, '🧂']
];


// سجاير (الأسعار تقريبية وتتعدل من إدارة المنيو)
var CIG_SEED_ = [
  ['كليوباترا', 55], ['كليوباترا كينج', 60], ['كليوباترا ميني', 50],
  ['ميريت', 75], ['ميريت أزرق', 75],
  ['مارلبورو أحمر', 105], ['مارلبورو جولد', 105], ['مارلبورو أخضر (مينت)', 105],
  ['وينستون أحمر', 95], ['وينستون أزرق', 95],
  ['إل آند إم أحمر', 85], ['إل آند إم أزرق', 85],
  ['روثمانز أزرق', 95], ['روثمانز أحمر', 95],
  ['كنت', 105], ['دانهيل', 105], ['بلمونت', 55], ['ديلتا', 50],
  ['فاين', 45], ['سوبر سنتر', 40]
];


// سندوتشات مطعم الفول والطعمية — [قسم, اسم, وصف, سعر, إيموجي] (الأسعار تقريبية وتتعدل من إدارة المنيو)
var FOUL_SANDWICHES_ = [
  ['سندوتشات فول', 'فول بالزيت الحار', 'فول مدمس بزيت حار وليمون وكمون', 12, '🫘'],
  ['سندوتشات فول', 'فول بالسمنة البلدي', 'مدمس بسمنة بلدي وكمون', 14, '🫘'],
  ['سندوتشات فول', 'فول بالطحينة', 'فول بطحينة وليمون', 14, '🥙'],
  ['سندوتشات فول', 'فول إسكندراني', 'بالطماطم والفلفل والثوم والكمون', 14, '🌶️'],
  ['سندوتشات فول', 'فول بالزبدة', 'فول سخن بزبدة', 16, '🧈'],
  ['سندوتشات فول', 'فول بالبيض المقلي', 'فول مع بيض مقلي', 18, '🍳'],
  ['سندوتشات فول', 'فول بالسوسيس', 'فول مع سوسيس مقطع', 20, '🌭'],
  ['سندوتشات فول', 'فول بالسجق', 'فول مع سجق بلدي', 22, '🌭'],
  ['سندوتشات فول', 'فول بالبسطرمة', 'فول مع بسطرمة', 22, '🥓'],
  ['سندوتشات طعمية', 'طعمية سادة', 'طعمية خضراء بالكزبرة والشبت', 10, '🧆'],
  ['سندوتشات طعمية', 'طعمية بالباذنجان', 'طعمية مع باذنجان مقلي', 14, '🍆'],
  ['سندوتشات طعمية', 'طعمية بالطحينة والسلطة', 'مع طحينة وسلطة وطماطم', 13, '🥗'],
  ['سندوتشات طعمية', 'طعمية محشية', 'محشية بالدقة والشطة', 14, '🌶️'],
  ['سندوتشات طعمية', 'طعمية بالبيض', 'طعمية مع بيض مقلي', 17, '🍳'],
  ['سندوتشات طعمية', 'طعمية بالبسطرمة', 'طعمية مع بسطرمة', 20, '🥓'],
  ['سندوتشات طعمية', 'طعمية بالجبنة الرومي', 'طعمية مع شرائح رومي', 22, '🧀'],
  ['سندوتشات ميكس', 'ميكس فول وطعمية', 'نص فول ونص طعمية', 15, '🥙'],
  ['سندوتشات ميكس', 'ميكس فول وطعمية وبيض', 'فول وطعمية وبيض مقلي', 20, '🍳'],
  ['سندوتشات ميكس', 'الكبير (فول وطعمية وبيض وبطاطس)', 'السندوتش اللي يشبّعك للعصر', 25, '💪'],
  ['بيض وجبن ومقليات', 'بيض مسلوق', 'بيضتين مسلوقين بملح وكمون', 12, '🥚'],
  ['بيض وجبن ومقليات', 'بيض مقلي', 'بيض عيون في سندوتش', 14, '🍳'],
  ['بيض وجبن ومقليات', 'أومليت بالجبنة', 'أومليت بجبنة رومي', 20, '🧀'],
  ['بيض وجبن ومقليات', 'بيض بالبسطرمة', 'بيض مقلي مع بسطرمة', 28, '🥓'],
  ['بيض وجبن ومقليات', 'بطاطس محمرة', 'بطاطس مقلية مقرمشة', 12, '🍟'],
  ['بيض وجبن ومقليات', 'باذنجان مقلي', 'شرائح باذنجان مقلية بالخل', 14, '🍆'],
  ['بيض وجبن ومقليات', 'جبنة بيضاء بالطماطم', 'جبنة بيضاء مع طماطم وخيار', 14, '🍅'],
  ['بيض وجبن ومقليات', 'جبنة رومي', 'شرائح رومي', 22, '🧀'],
  ['بيض وجبن ومقليات', 'حلاوة طحينية', 'حلاوة بالفستق', 12, '🍯']
];

var db_ = null;

function doGet() {
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle('هاتلى معاك')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1, viewport-fit=cover')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/* ---------------------------- قاعدة البيانات ---------------------------- */

function getDb_() {
  if (db_) return db_;
  var ss = null;
  try { ss = SpreadsheetApp.getActiveSpreadsheet(); } catch (e) {}
  if (!ss) {
    var props = PropertiesService.getScriptProperties();
    var id = props.getProperty('DB_ID');
    if (id) { try { ss = SpreadsheetApp.openById(id); } catch (e) {} }
    if (!ss) {
      ss = SpreadsheetApp.create('هاتلى معاك - البيانات');
      props.setProperty('DB_ID', ss.getId());
    }
  }
  ensureSchema_(ss);
  db_ = ss;
  migrateCigs_();
  migrateFoul_();
  return ss;
}

function migrateCigs_() {
  var props = PropertiesService.getScriptProperties();
  if (props.getProperty('CIGS_SEEDED')) return;
  var sh = db_.getSheetByName('Menu'), h = SCHEMA_.Menu;
  var has = read_('Menu').some(function (m) { return m.category === 'سجاير'; });
  if (!has) {
    var rows = CIG_SEED_.map(function (c) {
      return [newId_('m_'), 'super', 'سجاير', c[0], c[1], '🚬', 1, ''];
    });
    sh.getRange(sh.getLastRow() + 1, 1, rows.length, h.length).setNumberFormat('@').setValues(rows);
  }
  props.setProperty('CIGS_SEEDED', '1');
}

function migrateFoul_() {
  var props = PropertiesService.getScriptProperties();
  if (props.getProperty('FOUL_SEEDED_V2')) return;
  var sh = db_.getSheetByName('Menu'), h = SCHEMA_.Menu;
  read_('Menu').forEach(function (m) { // شيل السندوتشات القديمة (القسم القديم)
    if (m.vendor === 'foul' && m.category === 'ساندوتشات' && str_(m.active) !== '0') { m.active = 0; save_('Menu', m); }
  });
  var rows = FOUL_SANDWICHES_.map(function (c) {
    return [newId_('m_'), 'foul', c[0], c[1], c[3], c[4], 1, c[2]];
  });
  sh.getRange(sh.getLastRow() + 1, 1, rows.length, h.length).setNumberFormat('@').setValues(rows);
  props.setProperty('FOUL_SEEDED_V2', '1');
}

function ensureSchema_(ss) {
  var created = false;
  Object.keys(SCHEMA_).forEach(function (name) {
    var sh = ss.getSheetByName(name);
    if (sh) {
      var hh = SCHEMA_[name], cur = sh.getRange(1, 1, 1, hh.length).getValues()[0];
      if (cur.some(function (c) { return c === ''; })) { // عمود جديد اتضاف في تحديث
        sh.getRange(1, 1, sh.getMaxRows(), hh.length).setNumberFormat('@');
        sh.getRange(1, 1, 1, hh.length).setValues([hh]).setFontWeight('bold').setBackground('#FFE08A');
      }
      return;
    }
    sh = ss.insertSheet(name);
    var h = SCHEMA_[name];
    sh.getRange(1, 1, sh.getMaxRows(), h.length).setNumberFormat('@');
    sh.getRange(1, 1, 1, h.length).setValues([h]).setFontWeight('bold').setBackground('#FFE08A');
    sh.setFrozenRows(1);
    sh.setRightToLeft(true);
    if (name === 'Menu') {
      var rows = SEED_MENU_.map(function (m, i) {
        return ['m' + (i + 1), m[0], m[1], m[2], m[3], m[4], 1, ''];
      });
      sh.getRange(2, 1, rows.length, h.length).setValues(rows);
    }
    created = true;
  });
  if (created) {
    ['Sheet1', 'Sheet 1', 'ورقة1'].forEach(function (n) {
      var d = ss.getSheetByName(n);
      if (d && ss.getSheets().length > 1) ss.deleteSheet(d);
    });
  }
}

function read_(name) {
  var sh = getDb_().getSheetByName(name), h = SCHEMA_[name];
  var last = sh.getLastRow();
  if (last < 2) return [];
  var vals = sh.getRange(2, 1, last - 1, h.length).getValues();
  return vals.map(function (r, i) {
    var o = { _r: i + 2 };
    h.forEach(function (k, j) { o[k] = r[j]; });
    return o;
  });
}

function append_(name, obj) {
  var h = SCHEMA_[name];
  getDb_().getSheetByName(name).appendRow(h.map(function (k) { return obj[k] == null ? '' : obj[k]; }));
}

function save_(name, obj) {
  var h = SCHEMA_[name];
  getDb_().getSheetByName(name).getRange(obj._r, 1, 1, h.length)
    .setValues([h.map(function (k) { return obj[k] == null ? '' : obj[k]; })]);
}

function withLock_(fn) {
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try { return fn(); } finally { lock.releaseLock(); }
}

/* ------------------------------- أدوات ------------------------------- */

function num_(v) { var n = Number(v); return isNaN(n) ? 0 : n; }
function str_(v) { return v == null ? '' : String(v); }
function norm_(s) { return str_(s).trim().replace(/\s+/g, ' '); }
function newId_(p) { return p + Utilities.getUuid().replace(/-/g, '').slice(0, 10); }
function now_() { return Utilities.formatDate(new Date(), TZ_, 'yyyy-MM-dd HH:mm:ss'); }
function todayStr_() { return Utilities.formatDate(new Date(), TZ_, 'yyyy-MM-dd'); }
function dateStr_(v) {
  return v instanceof Date ? Utilities.formatDate(v, TZ_, 'yyyy-MM-dd') : str_(v);
}

// مفتاح عام للموظف (مايكشفش الـ id السري بتاعه)
function ukey_(userId) {
  var d = Utilities.computeDigest(Utilities.DigestAlgorithm.MD5, 'hm:' + userId);
  return Utilities.base64EncodeWebSafe(d).slice(0, 10);
}

function checkVendor_(v) {
  if (VENDORS_.indexOf(v) < 0) throw new Error('المحل مش معروف');
}

function roundOf_(o) { return num_(o.round) || 1; }

function todayOrders_(vendor) {
  var today = todayStr_();
  return read_('Orders').filter(function (o) {
    return dateStr_(o.date) === today && o.vendor === vendor;
  }).sort(function (a, b) { return roundOf_(a) - roundOf_(b); });
}

function createOrder_(vendor, round) {
  var o = { id: newId_('o_'), date: todayStr_(), vendor: vendor, status: 'open', fee: 0,
            createdAt: now_(), round: round };
  append_('Orders', o);
  return read_('Orders').filter(function (x) { return x.id === o.id; })[0];
}

// آخر جولة النهاردة (أو بتتعمل الأولى). لو round اتحدد بترجع الجولة دي.
function getOrCreateOrder_(vendor, round) {
  var list = todayOrders_(vendor);
  if (round) {
    var r = list.filter(function (o) { return roundOf_(o) === Number(round); })[0];
    if (!r) throw new Error('الجولة مش موجودة');
    return r;
  }
  return list.length ? list[list.length - 1] : createOrder_(vendor, 1);
}

function checkPin_(pin) {
  var real = PropertiesService.getScriptProperties().getProperty('COURIER_PIN') || '1234';
  if (str_(pin) !== real) {
    Utilities.sleep(600);
    throw new Error('الكود غلط');
  }
}

/* ------------------------------ للموظفين ------------------------------ */

function getState(userId) {
  var today = todayStr_();
  var menu = read_('Menu').filter(function (m) { return str_(m.active) !== '0'; })
    .map(function (m) {
      return { id: m.id, vendor: m.vendor, category: m.category, name: m.name,
               price: num_(m.price), emoji: m.emoji, desc: str_(m.desc) };
    });
  var orders = read_('Orders').filter(function (o) { return dateStr_(o.date) === today; });
  var lines = read_('Lines');
  var receipts = read_('Receipts');
  var myKey = userId ? ukey_(userId) : '';
  var out = {};
  VENDORS_.forEach(function (v) {
    var rounds = orders.filter(function (x) { return x.vendor === v; })
      .sort(function (a, b) { return roundOf_(a) - roundOf_(b); })
      .map(function (o) {
        return {
          round: roundOf_(o), status: o.status, fee: num_(o.fee),
          receipts: receipts.filter(function (r) { return r.orderId === o.id; }).map(receiptOut_),
          lines: lines.filter(function (l) { return l.orderId === o.id; }).map(function (l) {
            var uk = ukey_(l.userId);
            return {
              id: l.id, uk: uk, mine: uk === myKey, name: l.userName,
              floor: num_(l.floor), office: str_(l.office), item: l.item, qty: num_(l.qty),
              estPrice: num_(l.estPrice),
              actualPrice: str_(l.actualPrice) === '' ? null : num_(l.actualPrice),
              note: str_(l.note), paid: str_(l.paid) === '1', cat: str_(l.cat), bread: str_(l.bread)
            };
          })
        };
      });
    out[v] = { rounds: rounds.length ? rounds : [{ round: 1, status: 'open', fee: 0, lines: [] }] };
  });
  return { today: today, menu: menu, orders: out };
}

function receiptOut_(r) {
  var d = {};
  try { d = JSON.parse(str_(r.data)); } catch (e) {}
  return { id: r.id, at: str_(r.createdAt), lines: d.lines || [], fee: num_(d.fee), total: d.total == null ? null : num_(d.total) };
}

function cleanProfile_(p) {
  p = p || {};
  var name = norm_(p.name), office = norm_(p.office), floor = parseInt(p.floor, 10);
  if (!p.id || str_(p.id).length < 8) throw new Error('بيانات الموظف ناقصة');
  if (!name || name.length > 40) throw new Error('اكتب اسمك');
  if (!office || office.length > 20) throw new Error('اكتب رقم المكتب');
  if (isNaN(floor) || floor < -3 || floor > 60) throw new Error('اختار الدور');
  return { id: str_(p.id), name: name, floor: floor, office: office, phone: norm_(p.phone).slice(0, 20) };
}

function upsertUser_(p) {
  var u = read_('Users').filter(function (x) { return x.id === p.id; })[0];
  if (u) {
    u.name = p.name; u.floor = p.floor; u.office = p.office; u.phone = p.phone;
    save_('Users', u);
  } else {
    append_('Users', { id: p.id, name: p.name, floor: p.floor, office: p.office,
                       phone: p.phone, createdAt: now_() });
  }
}

function registerUser(profile) {
  return withLock_(function () {
    var p = cleanProfile_(profile);
    upsertUser_(p);
    return true;
  });
}

function addLines(profile, vendor, items) {
  return withLock_(function () {
    checkVendor_(vendor);
    var p = cleanProfile_(profile);
    if (!items || !items.length || items.length > 30) throw new Error('مفيش أصناف تتضاف');
    upsertUser_(p);
    var order = getOrCreateOrder_(vendor);
    if (order.status !== 'open') throw new Error('الأوردر اتقفل، مسئول التوصيل نازل يطلب 🛵');
    var menuNow = read_('Menu');
    items.forEach(function (it) {
      var item = norm_(it.item).slice(0, 60), qty = parseInt(it.qty, 10);
      if (!item || isNaN(qty) || qty < 1 || qty > 50) throw new Error('صنف أو كمية غلط');
      var hit = menuNow.filter(function (m) { return m.vendor === vendor && norm_(m.name) === item; })[0];
      append_('Lines', {
        cat: hit ? str_(hit.category) : 'إضافات الزملاء',
        bread: ['بلدي', 'شامي'].indexOf(norm_(it.bread)) >= 0 ? norm_(it.bread) : '',
        id: newId_('l_'), orderId: order.id, userId: p.id, userName: p.name,
        floor: p.floor, office: p.office, item: item, qty: qty,
        estPrice: Math.max(0, num_(it.estPrice)), actualPrice: '',
        note: norm_(it.note).slice(0, 100), paid: 0, createdAt: now_()
      });
      addToMenuIfNew_(menuNow, vendor, item, Math.max(0, num_(it.estPrice)));
    });
    return true;
  });
}

// أي صنف جديد يكتبه موظف يتضاف للمنيو أوتوماتيك عشان يتطلب تاني بضغطة
function addToMenuIfNew_(menu, vendor, name, price) {
  var found = menu.filter(function (m) { return m.vendor === vendor && norm_(m.name) === name; })[0];
  if (found) return; // موجود (أو مسئول التوصيل مسحه قبل كده فمنرجعوش)
  var rec = { id: newId_('m_'), vendor: vendor, category: 'إضافات الزملاء', name: name,
              price: price, emoji: '✨', active: 1 };
  append_('Menu', rec);
  menu.push(rec);
}

// تاريخ مشتريات الموظف (آخر ٩٠ يوم)
function getHistory(userId) {
  if (!userId) return [];
  var orders = {};
  read_('Orders').forEach(function (o) { orders[o.id] = o; });
  var cutoff = Utilities.formatDate(new Date(Date.now() - 90 * 86400000), TZ_, 'yyyy-MM-dd');
  var groups = {};
  read_('Lines').forEach(function (l) {
    if (l.userId !== userId) return;
    var o = orders[l.orderId]; if (!o) return;
    var date = dateStr_(o.date); if (date < cutoff) return;
    var key = date + '|' + o.vendor + '|' + roundOf_(o);
    var g = groups[key] || (groups[key] = { date: date, vendor: o.vendor, round: roundOf_(o), items: [], total: 0 });
    var price = str_(l.actualPrice) === '' ? num_(l.estPrice) : num_(l.actualPrice);
    g.items.push({ item: l.item, qty: num_(l.qty), note: str_(l.note), price: price, cat: str_(l.cat), bread: str_(l.bread) });
    g.total += num_(l.qty) * price;
  });
  return Object.keys(groups).map(function (k) { return groups[k]; })
    .sort(function (a, b) { return a.date < b.date ? 1 : a.date > b.date ? -1 : b.round - a.round; });
}

function deleteLine(userId, lineId) {
  return withLock_(function () {
    var l = read_('Lines').filter(function (x) { return x.id === lineId; })[0];
    if (!l || l.userId !== userId) throw new Error('الصنف مش موجود');
    var o = read_('Orders').filter(function (x) { return x.id === l.orderId; })[0];
    if (o && o.status !== 'open') throw new Error('الأوردر اتقفل');
    getDb_().getSheetByName('Lines').deleteRow(l._r);
    return true;
  });
}

/* -------------------------------- لمسئول التوصيل -------------------------------- */

function courierLogin(pin) { checkPin_(pin); return true; }

// سعر مسئول التوصيل الفعلي هو المرجع: بيتحدّث بيه سعر الصنف في المنيو
function updateMenuPrices_(vendor, prices) {
  read_('Menu').forEach(function (m) {
    if (m.vendor !== vendor || str_(m.active) === '0') return;
    var k = norm_(m.name);
    if (!Object.prototype.hasOwnProperty.call(prices, k)) return;
    var p = num_(prices[k]);
    if (p > 0 && p !== num_(m.price)) { m.price = p; save_('Menu', m); }
  });
}

function courierSetStatus(pin, vendor, status, round) {
  checkPin_(pin);
  return withLock_(function () {
    checkVendor_(vendor);
    if (['open', 'closed', 'done'].indexOf(status) < 0) throw new Error('حالة غلط');
    var o = getOrCreateOrder_(vendor, round);
    if (status === 'open') {
      var list = todayOrders_(vendor);
      if (list[list.length - 1].id !== o.id) throw new Error('تقدر تفتح آخر جولة بس');
    }
    o.status = status;
    save_('Orders', o);
    return true;
  });
}

// prices: { "اسم الصنف": سعر الوحدة الفعلي }
function courierSave(pin, vendor, prices, fee, round) {
  checkPin_(pin);
  return withLock_(function () {
    checkVendor_(vendor);
    var o = getOrCreateOrder_(vendor, round);
    o.fee = Math.max(0, num_(fee));
    save_('Orders', o);
    var sh = getDb_().getSheetByName('Lines'), h = SCHEMA_.Lines, last = sh.getLastRow();
    if (last < 2) { updateMenuPrices_(vendor, prices || {}); return true; }
    var rng = sh.getRange(2, 1, last - 1, h.length), vals = rng.getValues();
    var iO = h.indexOf('orderId'), iI = h.indexOf('item'), iA = h.indexOf('actualPrice');
    vals.forEach(function (r) {
      if (r[iO] !== o.id) return;
      var k = norm_(r[iI]);
      if (Object.prototype.hasOwnProperty.call(prices || {}, k)) {
        r[iA] = Math.max(0, num_(prices[k]));
      }
    });
    rng.setValues(vals);
    updateMenuPrices_(vendor, prices || {});
    return true;
  });
}

function courierSetPaid(pin, vendor, uk, paid, round) {
  checkPin_(pin);
  return withLock_(function () {
    checkVendor_(vendor);
    var o = getOrCreateOrder_(vendor, round);
    var sh = getDb_().getSheetByName('Lines'), h = SCHEMA_.Lines, last = sh.getLastRow();
    if (last < 2) return true;
    var rng = sh.getRange(2, 1, last - 1, h.length), vals = rng.getValues();
    var iO = h.indexOf('orderId'), iU = h.indexOf('userId'), iP = h.indexOf('paid');
    vals.forEach(function (r) {
      if (r[iO] === o.id && ukey_(r[iU]) === uk) r[iP] = paid ? 1 : 0;
    });
    rng.setValues(vals);
    return true;
  });
}

function courierNewRound(pin, vendor) {
  checkPin_(pin);
  return withLock_(function () {
    checkVendor_(vendor);
    var list = todayOrders_(vendor);
    if (list.length && list[list.length - 1].status === 'open') throw new Error('الجولة الحالية لسه مفتوحة');
    createOrder_(vendor, list.length ? roundOf_(list[list.length - 1]) + 1 : 1);
    return true;
  });
}

/* ----------------------- قراءة الريسيت بالذكاء الاصطناعي ----------------------- */

function numAr_(v) {
  return num_(str_(v).replace(/[٠-٩]/g, function (d) { return '٠١٢٣٤٥٦٧٨٩'.indexOf(d); }).replace(/٫/g, '.').replace(/[^\d.\-]/g, ''));
}

// بيحوّل رد الموديل لبيانات نضيفة، وبيتأكد إن كل "match" هو صنف فعلاً في الأوردر
function normalizeReceipt_(text, itemNames) {
  var a = text.indexOf('{'), b = text.lastIndexOf('}');
  if (a < 0 || b < a) throw new Error('مقدرتش أقرا الريسيت، جرب صورة أوضح');
  var raw;
  try { raw = JSON.parse(text.slice(a, b + 1)); } catch (e) { throw new Error('مقدرتش أقرا الريسيت، جرب صورة أوضح'); }
  if (raw.readable === false) throw new Error('الصورة دي مش واضح إنها ريسيت');
  var valid = {};
  itemNames.forEach(function (n) { valid[norm_(n)] = n; });
  var lines = (raw.lines || []).map(function (l) {
    var qty = numAr_(l.qty) > 0 ? numAr_(l.qty) : 1;
    var m = l.match == null ? '' : valid[norm_(l.match)];
    return { name: norm_(l.name).slice(0, 80), qty: qty, lineTotal: Math.max(0, numAr_(l.lineTotal)), match: m || null };
  }).filter(function (l) { return l.name; });
  if (!lines.length) throw new Error('مفيش أصناف ظاهرة في الريسيت');
  return { lines: lines, fee: Math.max(0, numAr_(raw.deliveryFee)), total: raw.total == null ? null : numAr_(raw.total) };
}

function callClaudeReceipt_(b64, mime, itemNames) {
  var props = PropertiesService.getScriptProperties();
  var key = props.getProperty('ANTHROPIC_API_KEY');
  if (!key) throw new Error('لازم تضيف ANTHROPIC_API_KEY في Script properties الأول');
  var model = props.getProperty('CLAUDE_MODEL') || 'claude-sonnet-5-5';
  var prompt =
    'دي صورة ريسيت (فاتورة) من مطعم أو سوبرماركت في مصر، ممكن تكون عربي أو إنجليزي.\n' +
    'اقرا كل سطر مشتريات. وقارنه بقايمة الأصناف المطلوبة دي (JSON): ' + JSON.stringify(itemNames) + '\n' +
    'رجّع JSON بس من غير أي كلام تاني بالشكل ده:\n' +
    '{"readable":true,"lines":[{"name":"الاسم زي ما في الريسيت","qty":1,"lineTotal":0,"match":"اسم من القايمة بالظبط أو null"}],"deliveryFee":null,"total":null}\n' +
    'قواعد: lineTotal هو إجمالي السطر كله (الكمية × سعر الوحدة) بالجنيه المصري. حوّل الأرقام العربية (٠-٩) لأرقام عادية. ' +
    'لو الكمية مش مكتوبة اعتبرها 1. match لازم يكون واحد من أسماء القايمة حرفياً لو السطر ده نفس الصنف (حتى لو الاسم مختلف شوية مثل "فول زيت" = "فول بالزيت الحار")، وإلا null. ' +
    'ماتخترعش أصناف. رسوم التوصيل/الخدمة في deliveryFee ومش في lines. total هو إجمالي الريسيت لو ظاهر. لو الصورة مش ريسيت خلي readable=false.';
  var res = UrlFetchApp.fetch('https://api.anthropic.com/v1/messages', {
    method: 'post', contentType: 'application/json', muteHttpExceptions: true,
    headers: { 'x-api-key': key, 'anthropic-version': '2023-06-01' },
    payload: JSON.stringify({
      model: model, max_tokens: 3000,
      messages: [{ role: 'user', content: [
        { type: 'image', source: { type: 'base64', media_type: mime, data: b64 } },
        { type: 'text', text: prompt }
      ] }]
    })
  });
  var code = res.getResponseCode(), body = res.getContentText();
  if (code !== 200) {
    var msg = ''; try { msg = JSON.parse(body).error.message; } catch (e) {}
    throw new Error('خطأ من خدمة قراءة الريسيت (' + code + ') ' + msg);
  }
  var out = JSON.parse(body), text = '';
  (out.content || []).forEach(function (c) { if (c.type === 'text') text += c.text; });
  return text;
}

// بيحسب سعر الوحدة الفعلي من كل ريسيتات الجولة ويحدّث الأوردر
function applyReceiptPrices_(order) {
  var agg = {}, fee = 0;
  read_('Receipts').filter(function (r) { return r.orderId === order.id; }).forEach(function (r) {
    var d; try { d = JSON.parse(str_(r.data)); } catch (e) { return; }
    fee = Math.max(fee, num_(d.fee));
    (d.lines || []).forEach(function (l) {
      if (!l.match) return;
      var k = norm_(l.match), a = agg[k] || (agg[k] = { qty: 0, total: 0 });
      a.qty += num_(l.qty); a.total += num_(l.lineTotal);
    });
  });
  var sh = getDb_().getSheetByName('Lines'), h = SCHEMA_.Lines, last = sh.getLastRow();
  if (last >= 2) {
    var rng = sh.getRange(2, 1, last - 1, h.length), vals = rng.getValues();
    var iO = h.indexOf('orderId'), iI = h.indexOf('item'), iA = h.indexOf('actualPrice');
    vals.forEach(function (r) {
      if (r[iO] !== order.id) return;
      var a = agg[norm_(r[iI])];
      if (a && a.qty > 0) r[iA] = Math.round(a.total / a.qty * 100) / 100;
    });
    rng.setValues(vals);
  }
  var unit = {};
  Object.keys(agg).forEach(function (k) { if (agg[k].qty > 0) unit[k] = Math.round(agg[k].total / agg[k].qty * 100) / 100; });
  updateMenuPrices_(order.vendor, unit);
  if (num_(order.fee) === 0 && fee > 0) { order.fee = fee; save_('Orders', order); }
}

function courierScanReceipt(pin, vendor, round, b64, mime) {
  checkPin_(pin);
  checkVendor_(vendor);
  if (!b64 || b64.length > 7000000) throw new Error('الصورة كبيرة أوي أو فاضية');
  mime = ['image/jpeg', 'image/png', 'image/webp'].indexOf(mime) >= 0 ? mime : 'image/jpeg';
  var order = getOrCreateOrder_(vendor, round);
  var names = {};
  read_('Lines').forEach(function (l) { if (l.orderId === order.id) names[norm_(l.item)] = true; });
  var itemNames = Object.keys(names);
  if (!itemNames.length) throw new Error('مفيش طلبات في الجولة دي');
  var data = normalizeReceipt_(callClaudeReceipt_(b64, mime, itemNames), itemNames);
  return withLock_(function () {
    append_('Receipts', { id: newId_('r_'), orderId: order.id, createdAt: now_(), data: JSON.stringify(data) });
    var fresh = getOrCreateOrder_(vendor, round);
    applyReceiptPrices_(fresh);
    return { lines: data.lines.length, unmatched: data.lines.filter(function (l) { return !l.match; }).length };
  });
}

function courierDeleteReceipt(pin, id) {
  checkPin_(pin);
  return withLock_(function () {
    var r = read_('Receipts').filter(function (x) { return x.id === id; })[0];
    if (r) getDb_().getSheetByName('Receipts').deleteRow(r._r);
    return true;
  });
}

function courierSaveMenuItem(pin, item) {
  checkPin_(pin);
  return withLock_(function () {
    checkVendor_(item.vendor);
    var name = norm_(item.name);
    if (!name) throw new Error('اكتب اسم الصنف');
    var rec = {
      vendor: item.vendor, category: norm_(item.category) || 'أصناف', name: name,
      price: Math.max(0, num_(item.price)), emoji: norm_(item.emoji) || '🍽️', active: 1,
      desc: norm_(item.desc).slice(0, 80)
    };
    var cur = item.id ? read_('Menu').filter(function (m) { return m.id === item.id; })[0] : null;
    if (cur) { for (var k in rec) cur[k] = rec[k]; save_('Menu', cur); }
    else { rec.id = newId_('m_'); append_('Menu', rec); }
    return true;
  });
}

function courierDeleteMenuItem(pin, id) {
  checkPin_(pin);
  return withLock_(function () {
    var m = read_('Menu').filter(function (x) { return x.id === id; })[0];
    if (m) { m.active = 0; save_('Menu', m); }
    return true;
  });
}
