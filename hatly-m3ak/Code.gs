/**
 * \u0647\u0627\u062A\u0644\u0649 \u0645\u0639\u0627\u0643 \u2014 \u0637\u0644\u0628\u0627\u062A \u0627\u0644\u0641\u0637\u0627\u0631 \u0648\u0627\u0644\u0633\u0648\u0628\u0631\u0645\u0627\u0631\u0643\u062A \u0644\u0644\u0645\u0648\u0638\u0641\u064A\u0646
 * Google Apps Script web app. \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0628\u062A\u062A\u062E\u0632\u0646 \u0641\u064A Google Sheet \u062A\u062A\u0639\u0645\u0644 \u0623\u0648\u062A\u0648\u0645\u0627\u062A\u064A\u0643.
 *
 * \u0643\u0648\u062F \u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u062A\u0648\u0635\u064A\u0644: Project Settings > Script properties > COURIER_PIN (\u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A 1234)
 */

var TZ_ = 'Africa/Cairo';
var VENDORS_ = ['foul', 'super'];

var SCHEMA_ = {
  Users:  ['id', 'name', 'floor', 'office', 'phone', 'createdAt'],
  Menu:   ['id', 'vendor', 'category', 'name', 'price', 'emoji', 'active', 'desc'],
  Orders: ['id', 'date', 'vendor', 'status', 'fee', 'createdAt', 'round'],
  Lines:  ['id', 'orderId', 'userId', 'userName', 'floor', 'office', 'item', 'qty',
           'estPrice', 'actualPrice', 'note', 'paid', 'createdAt', 'cat', 'bread', 'na'],
  Receipts: ['id', 'orderId', 'createdAt', 'data']
};

// [vendor, category, name, price, emoji]
var SEED_MENU_ = [
  ['foul', '\u0623\u0637\u0628\u0627\u0642', '\u0637\u0628\u0642 \u0641\u0648\u0644', 20, '\uD83E\uDD63'],
  ['foul', '\u0623\u0637\u0628\u0627\u0642', '\u0637\u0628\u0642 \u0637\u0639\u0645\u064A\u0629 (\u0665 \u062D\u0628\u0627\u062A)', 15, '\uD83E\uDDC6'],
  ['foul', '\u0623\u0637\u0628\u0627\u0642', '\u0637\u0628\u0642 \u0628\u064A\u0636 \u0639\u064A\u0648\u0646', 20, '\uD83C\uDF73'],
  ['foul', '\u0623\u0637\u0628\u0627\u0642', '\u0637\u0628\u0642 \u0628\u0627\u0628\u0627 \u063A\u0646\u0648\u062C', 15, '\uD83C\uDF46'],
  ['foul', '\u0623\u0637\u0628\u0627\u0642', '\u0637\u0628\u0642 \u0633\u0644\u0637\u0629', 8, '\uD83E\uDD57'],
  ['foul', '\u0625\u0636\u0627\u0641\u0627\u062A \u0648\u0645\u0634\u0631\u0648\u0628\u0627\u062A', '\u0639\u064A\u0634 \u0628\u0644\u062F\u064A (\u0665)', 5, '\uD83C\uDF5E'],
  ['foul', '\u0625\u0636\u0627\u0641\u0627\u062A \u0648\u0645\u0634\u0631\u0648\u0628\u0627\u062A', '\u0639\u064A\u0634 \u0641\u064A\u0646\u0648', 3, '\uD83E\uDD56'],
  ['foul', '\u0625\u0636\u0627\u0641\u0627\u062A \u0648\u0645\u0634\u0631\u0648\u0628\u0627\u062A', '\u0645\u062E\u0644\u0644', 5, '\uD83E\uDD52'],
  ['foul', '\u0625\u0636\u0627\u0641\u0627\u062A \u0648\u0645\u0634\u0631\u0648\u0628\u0627\u062A', '\u0634\u0627\u064A', 10, '\uD83C\uDF75'],
  ['foul', '\u0625\u0636\u0627\u0641\u0627\u062A \u0648\u0645\u0634\u0631\u0648\u0628\u0627\u062A', '\u0642\u0647\u0648\u0629', 15, '\u2615'],
  ['super', '\u0623\u0644\u0628\u0627\u0646 \u0648\u062C\u0628\u0646', '\u0644\u0628\u0646 \u0639\u0644\u0628\u0629 \u0661 \u0644\u062A\u0631', 40, '\uD83E\uDD5B'],
  ['super', '\u0623\u0644\u0628\u0627\u0646 \u0648\u062C\u0628\u0646', '\u0632\u0628\u0627\u062F\u064A', 10, '\uD83C\uDF66'],
  ['super', '\u0623\u0644\u0628\u0627\u0646 \u0648\u062C\u0628\u0646', '\u062C\u0628\u0646\u0629 \u0645\u062B\u0644\u062B\u0627\u062A', 35, '\uD83E\uDDC0'],
  ['super', '\u0645\u062E\u0628\u0648\u0632\u0627\u062A \u0648\u0633\u0646\u0627\u0643\u0633', '\u062A\u0648\u0633\u062A', 35, '\uD83C\uDF5E'],
  ['super', '\u0645\u062E\u0628\u0648\u0632\u0627\u062A \u0648\u0633\u0646\u0627\u0643\u0633', '\u0628\u0633\u0643\u0648\u062A', 8, '\uD83C\uDF6A'],
  ['super', '\u0645\u062E\u0628\u0648\u0632\u0627\u062A \u0648\u0633\u0646\u0627\u0643\u0633', '\u0643\u064A\u0643', 10, '\uD83C\uDF70'],
  ['super', '\u0645\u062E\u0628\u0648\u0632\u0627\u062A \u0648\u0633\u0646\u0627\u0643\u0633', '\u0634\u064A\u0628\u0633\u064A', 10, '\uD83E\uDD54'],
  ['super', '\u0645\u062E\u0628\u0648\u0632\u0627\u062A \u0648\u0633\u0646\u0627\u0643\u0633', '\u0634\u0648\u0643\u0648\u0644\u0627\u062A\u0629', 15, '\uD83C\uDF6B'],
  ['super', '\u0645\u0634\u0631\u0648\u0628\u0627\u062A', '\u0645\u064A\u0627\u0647', 6, '\uD83D\uDCA7'],
  ['super', '\u0645\u0634\u0631\u0648\u0628\u0627\u062A', '\u0639\u0635\u064A\u0631', 12, '\uD83E\uDDC3'],
  ['super', '\u0645\u0634\u0631\u0648\u0628\u0627\u062A', '\u0645\u0634\u0631\u0648\u0628 \u063A\u0627\u0632\u064A', 20, '\uD83E\uDD64'],
  ['super', '\u0645\u0634\u0631\u0648\u0628\u0627\u062A', '\u0646\u0633\u0643\u0627\u0641\u064A\u0647 \u0633\u0627\u0634\u064A\u0647', 10, '\u2615'],
  ['super', '\u0645\u0634\u0631\u0648\u0628\u0627\u062A', '\u0634\u0627\u064A \u0623\u0643\u064A\u0627\u0633', 45, '\uD83E\uDED6'],
  ['super', '\u062D\u0627\u062C\u0627\u062A \u062A\u0627\u0646\u064A\u0629', '\u0645\u0646\u0627\u062F\u064A\u0644', 15, '\uD83E\uDDFB'],
  ['super', '\u062D\u0627\u062C\u0627\u062A \u062A\u0627\u0646\u064A\u0629', '\u0633\u0643\u0631', 30, '\uD83E\uDDC2']
];


// \u0633\u062C\u0627\u064A\u0631 (\u0627\u0644\u0623\u0633\u0639\u0627\u0631 \u062A\u0642\u0631\u064A\u0628\u064A\u0629 \u0648\u062A\u062A\u0639\u062F\u0644 \u0645\u0646 \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0645\u0646\u064A\u0648)
var CIG_SEED_ = [
  ['\u0643\u0644\u064A\u0648\u0628\u0627\u062A\u0631\u0627', 55], ['\u0643\u0644\u064A\u0648\u0628\u0627\u062A\u0631\u0627 \u0643\u064A\u0646\u062C', 60], ['\u0643\u0644\u064A\u0648\u0628\u0627\u062A\u0631\u0627 \u0645\u064A\u0646\u064A', 50],
  ['\u0645\u064A\u0631\u064A\u062A', 75], ['\u0645\u064A\u0631\u064A\u062A \u0623\u0632\u0631\u0642', 75],
  ['\u0645\u0627\u0631\u0644\u0628\u0648\u0631\u0648 \u0623\u062D\u0645\u0631', 105], ['\u0645\u0627\u0631\u0644\u0628\u0648\u0631\u0648 \u062C\u0648\u0644\u062F', 105], ['\u0645\u0627\u0631\u0644\u0628\u0648\u0631\u0648 \u0623\u062E\u0636\u0631 (\u0645\u064A\u0646\u062A)', 105],
  ['\u0648\u064A\u0646\u0633\u062A\u0648\u0646 \u0623\u062D\u0645\u0631', 95], ['\u0648\u064A\u0646\u0633\u062A\u0648\u0646 \u0623\u0632\u0631\u0642', 95],
  ['\u0625\u0644 \u0622\u0646\u062F \u0625\u0645 \u0623\u062D\u0645\u0631', 85], ['\u0625\u0644 \u0622\u0646\u062F \u0625\u0645 \u0623\u0632\u0631\u0642', 85],
  ['\u0631\u0648\u062B\u0645\u0627\u0646\u0632 \u0623\u0632\u0631\u0642', 95], ['\u0631\u0648\u062B\u0645\u0627\u0646\u0632 \u0623\u062D\u0645\u0631', 95],
  ['\u0643\u0646\u062A', 105], ['\u062F\u0627\u0646\u0647\u064A\u0644', 105], ['\u0628\u0644\u0645\u0648\u0646\u062A', 55], ['\u062F\u064A\u0644\u062A\u0627', 50],
  ['\u0641\u0627\u064A\u0646', 45], ['\u0633\u0648\u0628\u0631 \u0633\u0646\u062A\u0631', 40]
];


// \u0633\u0646\u062F\u0648\u062A\u0634\u0627\u062A \u0645\u0637\u0639\u0645 \u0627\u0644\u0641\u0648\u0644 \u0648\u0627\u0644\u0637\u0639\u0645\u064A\u0629 \u2014 [\u0642\u0633\u0645, \u0627\u0633\u0645, \u0648\u0635\u0641, \u0633\u0639\u0631, \u0625\u064A\u0645\u0648\u062C\u064A] (\u0627\u0644\u0623\u0633\u0639\u0627\u0631 \u062A\u0642\u0631\u064A\u0628\u064A\u0629 \u0648\u062A\u062A\u0639\u062F\u0644 \u0645\u0646 \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0645\u0646\u064A\u0648)
var FOUL_SANDWICHES_ = [
  ['\u0633\u0646\u062F\u0648\u062A\u0634\u0627\u062A \u0641\u0648\u0644', '\u0641\u0648\u0644 \u0628\u0627\u0644\u0632\u064A\u062A \u0627\u0644\u062D\u0627\u0631', '\u0641\u0648\u0644 \u0645\u062F\u0645\u0633 \u0628\u0632\u064A\u062A \u062D\u0627\u0631 \u0648\u0644\u064A\u0645\u0648\u0646 \u0648\u0643\u0645\u0648\u0646', 12, '\uD83E\uDED8'],
  ['\u0633\u0646\u062F\u0648\u062A\u0634\u0627\u062A \u0641\u0648\u0644', '\u0641\u0648\u0644 \u0628\u0627\u0644\u0633\u0645\u0646\u0629 \u0627\u0644\u0628\u0644\u062F\u064A', '\u0645\u062F\u0645\u0633 \u0628\u0633\u0645\u0646\u0629 \u0628\u0644\u062F\u064A \u0648\u0643\u0645\u0648\u0646', 14, '\uD83E\uDED8'],
  ['\u0633\u0646\u062F\u0648\u062A\u0634\u0627\u062A \u0641\u0648\u0644', '\u0641\u0648\u0644 \u0628\u0627\u0644\u0637\u062D\u064A\u0646\u0629', '\u0641\u0648\u0644 \u0628\u0637\u062D\u064A\u0646\u0629 \u0648\u0644\u064A\u0645\u0648\u0646', 14, '\uD83E\uDD59'],
  ['\u0633\u0646\u062F\u0648\u062A\u0634\u0627\u062A \u0641\u0648\u0644', '\u0641\u0648\u0644 \u0625\u0633\u0643\u0646\u062F\u0631\u0627\u0646\u064A', '\u0628\u0627\u0644\u0637\u0645\u0627\u0637\u0645 \u0648\u0627\u0644\u0641\u0644\u0641\u0644 \u0648\u0627\u0644\u062B\u0648\u0645 \u0648\u0627\u0644\u0643\u0645\u0648\u0646', 14, '\uD83C\uDF36\uFE0F'],
  ['\u0633\u0646\u062F\u0648\u062A\u0634\u0627\u062A \u0641\u0648\u0644', '\u0641\u0648\u0644 \u0628\u0627\u0644\u0632\u0628\u062F\u0629', '\u0641\u0648\u0644 \u0633\u062E\u0646 \u0628\u0632\u0628\u062F\u0629', 16, '\uD83E\uDDC8'],
  ['\u0633\u0646\u062F\u0648\u062A\u0634\u0627\u062A \u0641\u0648\u0644', '\u0641\u0648\u0644 \u0628\u0627\u0644\u0628\u064A\u0636 \u0627\u0644\u0645\u0642\u0644\u064A', '\u0641\u0648\u0644 \u0645\u0639 \u0628\u064A\u0636 \u0645\u0642\u0644\u064A', 18, '\uD83C\uDF73'],
  ['\u0633\u0646\u062F\u0648\u062A\u0634\u0627\u062A \u0641\u0648\u0644', '\u0641\u0648\u0644 \u0628\u0627\u0644\u0633\u0648\u0633\u064A\u0633', '\u0641\u0648\u0644 \u0645\u0639 \u0633\u0648\u0633\u064A\u0633 \u0645\u0642\u0637\u0639', 20, '\uD83C\uDF2D'],
  ['\u0633\u0646\u062F\u0648\u062A\u0634\u0627\u062A \u0641\u0648\u0644', '\u0641\u0648\u0644 \u0628\u0627\u0644\u0633\u062C\u0642', '\u0641\u0648\u0644 \u0645\u0639 \u0633\u062C\u0642 \u0628\u0644\u062F\u064A', 22, '\uD83C\uDF2D'],
  ['\u0633\u0646\u062F\u0648\u062A\u0634\u0627\u062A \u0641\u0648\u0644', '\u0641\u0648\u0644 \u0628\u0627\u0644\u0628\u0633\u0637\u0631\u0645\u0629', '\u0641\u0648\u0644 \u0645\u0639 \u0628\u0633\u0637\u0631\u0645\u0629', 22, '\uD83E\uDD53'],
  ['\u0633\u0646\u062F\u0648\u062A\u0634\u0627\u062A \u0637\u0639\u0645\u064A\u0629', '\u0637\u0639\u0645\u064A\u0629 \u0633\u0627\u062F\u0629', '\u0637\u0639\u0645\u064A\u0629 \u062E\u0636\u0631\u0627\u0621 \u0628\u0627\u0644\u0643\u0632\u0628\u0631\u0629 \u0648\u0627\u0644\u0634\u0628\u062A', 10, '\uD83E\uDDC6'],
  ['\u0633\u0646\u062F\u0648\u062A\u0634\u0627\u062A \u0637\u0639\u0645\u064A\u0629', '\u0637\u0639\u0645\u064A\u0629 \u0628\u0627\u0644\u0628\u0627\u0630\u0646\u062C\u0627\u0646', '\u0637\u0639\u0645\u064A\u0629 \u0645\u0639 \u0628\u0627\u0630\u0646\u062C\u0627\u0646 \u0645\u0642\u0644\u064A', 14, '\uD83C\uDF46'],
  ['\u0633\u0646\u062F\u0648\u062A\u0634\u0627\u062A \u0637\u0639\u0645\u064A\u0629', '\u0637\u0639\u0645\u064A\u0629 \u0628\u0627\u0644\u0637\u062D\u064A\u0646\u0629 \u0648\u0627\u0644\u0633\u0644\u0637\u0629', '\u0645\u0639 \u0637\u062D\u064A\u0646\u0629 \u0648\u0633\u0644\u0637\u0629 \u0648\u0637\u0645\u0627\u0637\u0645', 13, '\uD83E\uDD57'],
  ['\u0633\u0646\u062F\u0648\u062A\u0634\u0627\u062A \u0637\u0639\u0645\u064A\u0629', '\u0637\u0639\u0645\u064A\u0629 \u0645\u062D\u0634\u064A\u0629', '\u0645\u062D\u0634\u064A\u0629 \u0628\u0627\u0644\u062F\u0642\u0629 \u0648\u0627\u0644\u0634\u0637\u0629', 14, '\uD83C\uDF36\uFE0F'],
  ['\u0633\u0646\u062F\u0648\u062A\u0634\u0627\u062A \u0637\u0639\u0645\u064A\u0629', '\u0637\u0639\u0645\u064A\u0629 \u0628\u0627\u0644\u0628\u064A\u0636', '\u0637\u0639\u0645\u064A\u0629 \u0645\u0639 \u0628\u064A\u0636 \u0645\u0642\u0644\u064A', 17, '\uD83C\uDF73'],
  ['\u0633\u0646\u062F\u0648\u062A\u0634\u0627\u062A \u0637\u0639\u0645\u064A\u0629', '\u0637\u0639\u0645\u064A\u0629 \u0628\u0627\u0644\u0628\u0633\u0637\u0631\u0645\u0629', '\u0637\u0639\u0645\u064A\u0629 \u0645\u0639 \u0628\u0633\u0637\u0631\u0645\u0629', 20, '\uD83E\uDD53'],
  ['\u0633\u0646\u062F\u0648\u062A\u0634\u0627\u062A \u0637\u0639\u0645\u064A\u0629', '\u0637\u0639\u0645\u064A\u0629 \u0628\u0627\u0644\u062C\u0628\u0646\u0629 \u0627\u0644\u0631\u0648\u0645\u064A', '\u0637\u0639\u0645\u064A\u0629 \u0645\u0639 \u0634\u0631\u0627\u0626\u062D \u0631\u0648\u0645\u064A', 22, '\uD83E\uDDC0'],
  ['\u0633\u0646\u062F\u0648\u062A\u0634\u0627\u062A \u0645\u064A\u0643\u0633', '\u0645\u064A\u0643\u0633 \u0641\u0648\u0644 \u0648\u0637\u0639\u0645\u064A\u0629', '\u0646\u0635 \u0641\u0648\u0644 \u0648\u0646\u0635 \u0637\u0639\u0645\u064A\u0629', 15, '\uD83E\uDD59'],
  ['\u0633\u0646\u062F\u0648\u062A\u0634\u0627\u062A \u0645\u064A\u0643\u0633', '\u0645\u064A\u0643\u0633 \u0641\u0648\u0644 \u0648\u0637\u0639\u0645\u064A\u0629 \u0648\u0628\u064A\u0636', '\u0641\u0648\u0644 \u0648\u0637\u0639\u0645\u064A\u0629 \u0648\u0628\u064A\u0636 \u0645\u0642\u0644\u064A', 20, '\uD83C\uDF73'],
  ['\u0633\u0646\u062F\u0648\u062A\u0634\u0627\u062A \u0645\u064A\u0643\u0633', '\u0627\u0644\u0643\u0628\u064A\u0631 (\u0641\u0648\u0644 \u0648\u0637\u0639\u0645\u064A\u0629 \u0648\u0628\u064A\u0636 \u0648\u0628\u0637\u0627\u0637\u0633)', '\u0627\u0644\u0633\u0646\u062F\u0648\u062A\u0634 \u0627\u0644\u0644\u064A \u064A\u0634\u0628\u0651\u0639\u0643 \u0644\u0644\u0639\u0635\u0631', 25, '\uD83D\uDCAA'],
  ['\u0628\u064A\u0636 \u0648\u062C\u0628\u0646 \u0648\u0645\u0642\u0644\u064A\u0627\u062A', '\u0628\u064A\u0636 \u0645\u0633\u0644\u0648\u0642', '\u0628\u064A\u0636\u062A\u064A\u0646 \u0645\u0633\u0644\u0648\u0642\u064A\u0646 \u0628\u0645\u0644\u062D \u0648\u0643\u0645\u0648\u0646', 12, '\uD83E\uDD5A'],
  ['\u0628\u064A\u0636 \u0648\u062C\u0628\u0646 \u0648\u0645\u0642\u0644\u064A\u0627\u062A', '\u0628\u064A\u0636 \u0645\u0642\u0644\u064A', '\u0628\u064A\u0636 \u0639\u064A\u0648\u0646 \u0641\u064A \u0633\u0646\u062F\u0648\u062A\u0634', 14, '\uD83C\uDF73'],
  ['\u0628\u064A\u0636 \u0648\u062C\u0628\u0646 \u0648\u0645\u0642\u0644\u064A\u0627\u062A', '\u0623\u0648\u0645\u0644\u064A\u062A \u0628\u0627\u0644\u062C\u0628\u0646\u0629', '\u0623\u0648\u0645\u0644\u064A\u062A \u0628\u062C\u0628\u0646\u0629 \u0631\u0648\u0645\u064A', 20, '\uD83E\uDDC0'],
  ['\u0628\u064A\u0636 \u0648\u062C\u0628\u0646 \u0648\u0645\u0642\u0644\u064A\u0627\u062A', '\u0628\u064A\u0636 \u0628\u0627\u0644\u0628\u0633\u0637\u0631\u0645\u0629', '\u0628\u064A\u0636 \u0645\u0642\u0644\u064A \u0645\u0639 \u0628\u0633\u0637\u0631\u0645\u0629', 28, '\uD83E\uDD53'],
  ['\u0628\u064A\u0636 \u0648\u062C\u0628\u0646 \u0648\u0645\u0642\u0644\u064A\u0627\u062A', '\u0628\u0637\u0627\u0637\u0633 \u0645\u062D\u0645\u0631\u0629', '\u0628\u0637\u0627\u0637\u0633 \u0645\u0642\u0644\u064A\u0629 \u0645\u0642\u0631\u0645\u0634\u0629', 12, '\uD83C\uDF5F'],
  ['\u0628\u064A\u0636 \u0648\u062C\u0628\u0646 \u0648\u0645\u0642\u0644\u064A\u0627\u062A', '\u0628\u0627\u0630\u0646\u062C\u0627\u0646 \u0645\u0642\u0644\u064A', '\u0634\u0631\u0627\u0626\u062D \u0628\u0627\u0630\u0646\u062C\u0627\u0646 \u0645\u0642\u0644\u064A\u0629 \u0628\u0627\u0644\u062E\u0644', 14, '\uD83C\uDF46'],
  ['\u0628\u064A\u0636 \u0648\u062C\u0628\u0646 \u0648\u0645\u0642\u0644\u064A\u0627\u062A', '\u062C\u0628\u0646\u0629 \u0628\u064A\u0636\u0627\u0621 \u0628\u0627\u0644\u0637\u0645\u0627\u0637\u0645', '\u062C\u0628\u0646\u0629 \u0628\u064A\u0636\u0627\u0621 \u0645\u0639 \u0637\u0645\u0627\u0637\u0645 \u0648\u062E\u064A\u0627\u0631', 14, '\uD83C\uDF45'],
  ['\u0628\u064A\u0636 \u0648\u062C\u0628\u0646 \u0648\u0645\u0642\u0644\u064A\u0627\u062A', '\u062C\u0628\u0646\u0629 \u0631\u0648\u0645\u064A', '\u0634\u0631\u0627\u0626\u062D \u0631\u0648\u0645\u064A', 22, '\uD83E\uDDC0'],
  ['\u0628\u064A\u0636 \u0648\u062C\u0628\u0646 \u0648\u0645\u0642\u0644\u064A\u0627\u062A', '\u062D\u0644\u0627\u0648\u0629 \u0637\u062D\u064A\u0646\u064A\u0629', '\u062D\u0644\u0627\u0648\u0629 \u0628\u0627\u0644\u0641\u0633\u062A\u0642', 12, '\uD83C\uDF6F']
];

var db_ = null;

function doGet() {
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle('\u0647\u0627\u062A\u0644\u0649 \u0645\u0639\u0627\u0643')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1, viewport-fit=cover')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/* ---------------------------- \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A ---------------------------- */

function getDb_() {
  if (db_) return db_;
  var ss = null;
  try { ss = SpreadsheetApp.getActiveSpreadsheet(); } catch (e) {}
  if (!ss) {
    var props = PropertiesService.getScriptProperties();
    var id = props.getProperty('DB_ID');
    if (id) { try { ss = SpreadsheetApp.openById(id); } catch (e) {} }
    if (!ss) {
      ss = SpreadsheetApp.create('\u0647\u0627\u062A\u0644\u0649 \u0645\u0639\u0627\u0643 - \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A');
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
  var has = read_('Menu').some(function (m) { return m.category === '\u0633\u062C\u0627\u064A\u0631'; });
  if (!has) {
    var rows = CIG_SEED_.map(function (c) {
      return [newId_('m_'), 'super', '\u0633\u062C\u0627\u064A\u0631', c[0], c[1], '\uD83D\uDEAC', 1, ''];
    });
    sh.getRange(sh.getLastRow() + 1, 1, rows.length, h.length).setNumberFormat('@').setValues(rows);
  }
  props.setProperty('CIGS_SEEDED', '1');
}

function migrateFoul_() {
  var props = PropertiesService.getScriptProperties();
  if (props.getProperty('FOUL_SEEDED_V2')) return;
  var sh = db_.getSheetByName('Menu'), h = SCHEMA_.Menu;
  read_('Menu').forEach(function (m) { // \u0634\u064A\u0644 \u0627\u0644\u0633\u0646\u062F\u0648\u062A\u0634\u0627\u062A \u0627\u0644\u0642\u062F\u064A\u0645\u0629 (\u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u0642\u062F\u064A\u0645)
    if (m.vendor === 'foul' && m.category === '\u0633\u0627\u0646\u062F\u0648\u062A\u0634\u0627\u062A' && str_(m.active) !== '0') { m.active = 0; save_('Menu', m); }
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
      if (cur.some(function (c) { return c === ''; })) { // \u0639\u0645\u0648\u062F \u062C\u062F\u064A\u062F \u0627\u062A\u0636\u0627\u0641 \u0641\u064A \u062A\u062D\u062F\u064A\u062B
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
    ['Sheet1', 'Sheet 1', '\u0648\u0631\u0642\u06291'].forEach(function (n) {
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

/* ------------------------------- \u0623\u062F\u0648\u0627\u062A ------------------------------- */

function num_(v) { var n = Number(v); return isNaN(n) ? 0 : n; }
function str_(v) { return v == null ? '' : String(v); }
function norm_(s) { return str_(s).trim().replace(/\s+/g, ' '); }
function newId_(p) { return p + Utilities.getUuid().replace(/-/g, '').slice(0, 10); }
function now_() { return Utilities.formatDate(new Date(), TZ_, 'yyyy-MM-dd HH:mm:ss'); }
function todayStr_() { return Utilities.formatDate(new Date(), TZ_, 'yyyy-MM-dd'); }
function dateStr_(v) {
  return v instanceof Date ? Utilities.formatDate(v, TZ_, 'yyyy-MM-dd') : str_(v);
}

// \u0645\u0641\u062A\u0627\u062D \u0639\u0627\u0645 \u0644\u0644\u0645\u0648\u0638\u0641 (\u0645\u0627\u064A\u0643\u0634\u0641\u0634 \u0627\u0644\u0640 id \u0627\u0644\u0633\u0631\u064A \u0628\u062A\u0627\u0639\u0647)
function ukey_(userId) {
  var d = Utilities.computeDigest(Utilities.DigestAlgorithm.MD5, 'hm:' + userId);
  return Utilities.base64EncodeWebSafe(d).slice(0, 10);
}

function checkVendor_(v) {
  if (VENDORS_.indexOf(v) < 0) throw new Error('\u0627\u0644\u0645\u062D\u0644 \u0645\u0634 \u0645\u0639\u0631\u0648\u0641');
}

function isNa_(l) { return num_(l.na) > 0; }

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

// \u0622\u062E\u0631 \u062C\u0648\u0644\u0629 \u0627\u0644\u0646\u0647\u0627\u0631\u062F\u0629 (\u0623\u0648 \u0628\u062A\u062A\u0639\u0645\u0644 \u0627\u0644\u0623\u0648\u0644\u0649). \u0644\u0648 round \u0627\u062A\u062D\u062F\u062F \u0628\u062A\u0631\u062C\u0639 \u0627\u0644\u062C\u0648\u0644\u0629 \u062F\u064A.
function getOrCreateOrder_(vendor, round) {
  var list = todayOrders_(vendor);
  if (round) {
    var r = list.filter(function (o) { return roundOf_(o) === Number(round); })[0];
    if (!r) throw new Error('\u0627\u0644\u062C\u0648\u0644\u0629 \u0645\u0634 \u0645\u0648\u062C\u0648\u062F\u0629');
    return r;
  }
  return list.length ? list[list.length - 1] : createOrder_(vendor, 1);
}

function isPin_(pin) {
  var real = PropertiesService.getScriptProperties().getProperty('COURIER_PIN') || '1234';
  return !!pin && str_(pin) === real;
}

function checkPin_(pin) {
  var real = PropertiesService.getScriptProperties().getProperty('COURIER_PIN') || '1234';
  if (str_(pin) !== real) {
    Utilities.sleep(600);
    throw new Error('\u0627\u0644\u0643\u0648\u062F \u063A\u0644\u0637');
  }
}

/* ------------------------------ \u0644\u0644\u0645\u0648\u0638\u0641\u064A\u0646 ------------------------------ */

function getState(userId, pin) {
  var isC = isPin_(pin);
  var today = todayStr_();
  var menu = read_('Menu').filter(function (m) { return str_(m.active) !== '0'; })
    .map(function (m) {
      return { id: m.id, vendor: m.vendor, category: m.category, name: m.name,
               price: num_(m.price), emoji: m.emoji, desc: str_(m.desc) };
    });
  var orders = read_('Orders').filter(function (o) { return dateStr_(o.date) === today; });
  var lines = read_('Lines');
  var receipts = read_('Receipts');
  var phones = {};
  if (isC) read_('Users').forEach(function (u) { phones[u.id] = str_(u.phone); });
  var myKey = userId ? ukey_(userId) : '';
  var out = {};
  VENDORS_.forEach(function (v) {
    var rounds = orders.filter(function (x) { return x.vendor === v; })
      .sort(function (a, b) { return roundOf_(a) - roundOf_(b); })
      .map(function (o) {
        return {
          round: roundOf_(o), status: o.status, fee: num_(o.fee),
          receipts: isC ? receipts.filter(function (r) { return r.orderId === o.id; }).map(receiptOut_) : [],
          people: Object.keys(lines.filter(function (l) { return l.orderId === o.id && !isNa_(l); }).reduce(function (a, l) { a[l.userId] = 1; return a; }, {})).length,
          lines: lines.filter(function (l) { return l.orderId === o.id && (isC || (userId && l.userId === userId)); }).map(function (l) {
            var uk = ukey_(l.userId);
            return {
              id: l.id, uk: uk, mine: uk === myKey, name: l.userName,
              floor: num_(l.floor), office: str_(l.office), item: l.item, qty: num_(l.qty),
              estPrice: num_(l.estPrice),
              actualPrice: str_(l.actualPrice) === '' ? null : num_(l.actualPrice),
              note: str_(l.note), paid: str_(l.paid) === '1', cat: str_(l.cat), bread: str_(l.bread),
              na: num_(l.na), phone: isC ? (phones[l.userId] || '') : ''
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
  if (!p.id || str_(p.id).length < 8) throw new Error('\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641 \u0646\u0627\u0642\u0635\u0629');
  if (!name || name.length > 40) throw new Error('\u0627\u0643\u062A\u0628 \u0627\u0633\u0645\u0643');
  if (!office || office.length > 20) throw new Error('\u0627\u0643\u062A\u0628 \u0631\u0642\u0645 \u0627\u0644\u0645\u0643\u062A\u0628');
  if (isNaN(floor) || floor < -3 || floor > 60) throw new Error('\u0627\u062E\u062A\u0627\u0631 \u0627\u0644\u062F\u0648\u0631');
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
    if (!items || !items.length || items.length > 30) throw new Error('\u0645\u0641\u064A\u0634 \u0623\u0635\u0646\u0627\u0641 \u062A\u062A\u0636\u0627\u0641');
    upsertUser_(p);
    var order = getOrCreateOrder_(vendor);
    if (order.status !== 'open') throw new Error('\u0627\u0644\u0623\u0648\u0631\u062F\u0631 \u0627\u062A\u0642\u0641\u0644\u060C \u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u062A\u0648\u0635\u064A\u0644 \u0646\u0627\u0632\u0644 \u064A\u0637\u0644\u0628 \uD83D\uDEF5');
    var menuNow = read_('Menu');
    items.forEach(function (it) {
      var item = norm_(it.item).slice(0, 60), qty = parseInt(it.qty, 10);
      if (!item || isNaN(qty) || qty < 1 || qty > 50) throw new Error('\u0635\u0646\u0641 \u0623\u0648 \u0643\u0645\u064A\u0629 \u063A\u0644\u0637');
      var hit = menuNow.filter(function (m) { return m.vendor === vendor && norm_(m.name) === item; })[0];
      append_('Lines', {
        cat: hit ? str_(hit.category) : '\u0625\u0636\u0627\u0641\u0627\u062A \u0627\u0644\u0632\u0645\u0644\u0627\u0621',
        bread: ['\u0628\u0644\u062F\u064A', '\u0634\u0627\u0645\u064A'].indexOf(norm_(it.bread)) >= 0 ? norm_(it.bread) : '',
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

// \u0623\u064A \u0635\u0646\u0641 \u062C\u062F\u064A\u062F \u064A\u0643\u062A\u0628\u0647 \u0645\u0648\u0638\u0641 \u064A\u062A\u0636\u0627\u0641 \u0644\u0644\u0645\u0646\u064A\u0648 \u0623\u0648\u062A\u0648\u0645\u0627\u062A\u064A\u0643 \u0639\u0634\u0627\u0646 \u064A\u062A\u0637\u0644\u0628 \u062A\u0627\u0646\u064A \u0628\u0636\u063A\u0637\u0629
function addToMenuIfNew_(menu, vendor, name, price) {
  var found = menu.filter(function (m) { return m.vendor === vendor && norm_(m.name) === name; })[0];
  if (found) return; // \u0645\u0648\u062C\u0648\u062F (\u0623\u0648 \u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u062A\u0648\u0635\u064A\u0644 \u0645\u0633\u062D\u0647 \u0642\u0628\u0644 \u0643\u062F\u0647 \u0641\u0645\u0646\u0631\u062C\u0639\u0648\u0634)
  var rec = { id: newId_('m_'), vendor: vendor, category: '\u0625\u0636\u0627\u0641\u0627\u062A \u0627\u0644\u0632\u0645\u0644\u0627\u0621', name: name,
              price: price, emoji: '\u2728', active: 1 };
  append_('Menu', rec);
  menu.push(rec);
}

// \u062A\u0627\u0631\u064A\u062E \u0645\u0634\u062A\u0631\u064A\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641 (\u0622\u062E\u0631 \u0669\u0660 \u064A\u0648\u0645)
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
    if (!l || l.userId !== userId) throw new Error('\u0627\u0644\u0635\u0646\u0641 \u0645\u0634 \u0645\u0648\u062C\u0648\u062F');
    var o = read_('Orders').filter(function (x) { return x.id === l.orderId; })[0];
    if (o && o.status !== 'open' && !isNa_(l)) throw new Error('\u0627\u0644\u0623\u0648\u0631\u062F\u0631 \u0627\u062A\u0642\u0641\u0644');
    getDb_().getSheetByName('Lines').deleteRow(l._r);
    return true;
  });
}

/* -------------------------------- \u0644\u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u062A\u0648\u0635\u064A\u0644 -------------------------------- */

function courierLogin(pin) { checkPin_(pin); return true; }

// \u0633\u0639\u0631 \u0645\u0633\u0626\u0648\u0644 \u0627\u0644\u062A\u0648\u0635\u064A\u0644 \u0627\u0644\u0641\u0639\u0644\u064A \u0647\u0648 \u0627\u0644\u0645\u0631\u062C\u0639: \u0628\u064A\u062A\u062D\u062F\u0651\u062B \u0628\u064A\u0647 \u0633\u0639\u0631 \u0627\u0644\u0635\u0646\u0641 \u0641\u064A \u0627\u0644\u0645\u0646\u064A\u0648
function updateMenuPrices_(vendor, prices) {
  read_('Menu').forEach(function (m) {
    if (m.vendor !== vendor || str_(m.active) === '0') return;
    var k = norm_(m.name);
    if (!Object.prototype.hasOwnProperty.call(prices, k)) return;
    var p = num_(prices[k]);
    if (p > 0 && p !== num_(m.price)) { m.price = p; save_('Menu', m); }
  });
}

/* ------------------------------- \u0627\u0644\u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A ------------------------------- */

function courierStats(pin, days) {
  checkPin_(pin);
  days = [7, 30, 90].indexOf(Number(days)) >= 0 ? Number(days) : 30;
  var cutoff = Utilities.formatDate(new Date(Date.now() - (days - 1) * 86400000), TZ_, 'yyyy-MM-dd');
  var orders = {}, byOrder = {};
  read_('Orders').forEach(function (o) { orders[o.id] = o; });
  read_('Lines').forEach(function (l) {
    if (orders[l.orderId]) (byOrder[l.orderId] = byOrder[l.orderId] || []).push(l);
  });
  var daily = {}, items = {}, people = {}, breads = {}, unpaid = {}, ppl = {};
  var vendors = { foul: { spend: 0, qty: 0 }, super: { spend: 0, qty: 0 } };
  var t = { spend: 0, fees: 0, rounds: 0, qty: 0 };
  Object.keys(byOrder).forEach(function (oid) {
    var o = orders[oid], date = dateStr_(o.date), ls = byOrder[oid], fee = num_(o.fee), users = {};
    ls = ls.filter(function (l) { return !isNa_(l); });
    ls.forEach(function (l) {
      var price = str_(l.actualPrice) === '' ? num_(l.estPrice) : num_(l.actualPrice);
      var u = users[l.userId] || (users[l.userId] = { sub: 0, paid: true, l: l });
      u.sub += num_(l.qty) * price;
      if (str_(l.paid) !== '1') u.paid = false;
    });
    var uids = Object.keys(users), share = uids.length ? fee / uids.length : 0;
    if (o.status === 'done') uids.forEach(function (id) { // \u0627\u0644\u0644\u064A \u0644\u0633\u0647 \u0645\u0627\u062F\u0641\u0639\u0634 (\u0643\u0644 \u0627\u0644\u0623\u064A\u0627\u0645)
      var u = users[id]; if (u.paid) return;
      var a = unpaid[id] || (unpaid[id] = { name: u.l.userName, floor: num_(u.l.floor), office: str_(u.l.office), amount: 0, orders: 0 });
      a.amount += u.sub + share; a.orders++;
    });
    if (date < cutoff) return;
    t.rounds++; t.fees += fee;
    var dd = daily[date] || (daily[date] = { spend: 0, people: {} });
    dd.spend += fee;
    var v = vendors[o.vendor]; if (v) v.spend += fee;
    ls.forEach(function (l) {
      var price = str_(l.actualPrice) === '' ? num_(l.estPrice) : num_(l.actualPrice), qty = num_(l.qty), amt = qty * price;
      t.spend += amt; t.qty += qty; dd.spend += amt; dd.people[l.userId] = 1; ppl[l.userId] = 1;
      if (v) { v.spend += amt; v.qty += qty; }
      var k = norm_(l.item), it = items[k] || (items[k] = { item: l.item, cat: str_(l.cat), qty: 0, spend: 0 });
      it.qty += qty; it.spend += amt;
      if (str_(l.bread)) breads[l.bread] = (breads[l.bread] || 0) + qty;
    });
    uids.forEach(function (id) {
      var u = users[id], p = people[id] || (people[id] = { name: u.l.userName, floor: num_(u.l.floor), office: str_(u.l.office), spend: 0, days: {} });
      p.spend += u.sub + share; p.days[date] = 1;
    });
  });
  t.spend += t.fees;
  var series = [];
  for (var i = days - 1; i >= 0; i--) {
    var d = Utilities.formatDate(new Date(Date.now() - i * 86400000), TZ_, 'yyyy-MM-dd');
    series.push({ date: d, spend: daily[d] ? Math.round(daily[d].spend * 100) / 100 : 0, people: daily[d] ? Object.keys(daily[d].people).length : 0 });
  }
  var round2 = function (n) { return Math.round(n * 100) / 100; };
  var unpaidList = Object.keys(unpaid).map(function (k) { var a = unpaid[k]; a.amount = round2(a.amount); return a; })
    .sort(function (a, b) { return b.amount - a.amount; });
  return {
    days: days,
    totals: { spend: round2(t.spend), fees: round2(t.fees), rounds: t.rounds, qty: t.qty,
              people: Object.keys(ppl).length, activeDays: series.filter(function (s) { return s.spend > 0; }).length },
    daily: series,
    vendors: { foul: { spend: round2(vendors.foul.spend), qty: vendors.foul.qty }, super: { spend: round2(vendors.super.spend), qty: vendors.super.qty } },
    topItems: Object.keys(items).map(function (k) { var x = items[k]; x.spend = round2(x.spend); return x; })
      .sort(function (a, b) { return b.qty - a.qty; }).slice(0, 10),
    topPeople: Object.keys(people).map(function (k) { var p = people[k]; return { name: p.name, floor: p.floor, office: p.office, spend: round2(p.spend), days: Object.keys(p.days).length }; })
      .sort(function (a, b) { return b.spend - a.spend; }).slice(0, 10),
    breads: breads,
    unpaid: unpaidList,
    unpaidTotal: round2(unpaidList.reduce(function (a, x) { return a + x.amount; }, 0))
  };
}

/* ------------------------- \u0635\u0646\u0641 \u0645\u0634 \u0645\u0648\u062C\u0648\u062F + \u062A\u0628\u0644\u064A\u063A \u0627\u0644\u0645\u0648\u0638\u0641 ------------------------- */

function courierSetUnavailable(pin, vendor, round, item, flag) {
  checkPin_(pin);
  return withLock_(function () {
    checkVendor_(vendor);
    var o = getOrCreateOrder_(vendor, round), key = norm_(item);
    var sh = getDb_().getSheetByName('Lines'), h = SCHEMA_.Lines, last = sh.getLastRow();
    if (last < 2) return true;
    var rng = sh.getRange(2, 1, last - 1, h.length), vals = rng.getValues();
    var iO = h.indexOf('orderId'), iI = h.indexOf('item'), iN = h.indexOf('na');
    vals.forEach(function (r) { if (r[iO] === o.id && norm_(r[iI]) === key) r[iN] = flag ? 1 : ''; });
    rng.setValues(vals);
    return true;
  });
}

function linesByIds_(ids) {
  var set = {};
  (ids || []).forEach(function (i) { set[i] = true; });
  return read_('Lines').filter(function (l) { return set[l.id]; });
}

function courierNotified(pin, ids) {
  checkPin_(pin);
  return withLock_(function () {
    linesByIds_(ids).forEach(function (l) { if (isNa_(l)) { l.na = 2; save_('Lines', l); } });
    return true;
  });
}

function courierRemoveLines(pin, ids) {
  checkPin_(pin);
  return withLock_(function () {
    var sh = getDb_().getSheetByName('Lines');
    linesByIds_(ids).sort(function (a, b) { return b._r - a._r; }).forEach(function (l) { sh.deleteRow(l._r); });
    return true;
  });
}

// \u062A\u0628\u062F\u064A\u0644 \u0635\u0646\u0641 \u0645\u0634 \u0645\u0648\u062C\u0648\u062F \u0628\u0635\u0646\u0641 \u062A\u0627\u0646\u064A \u0644\u0646\u0641\u0633 \u0627\u0644\u0645\u0648\u0638\u0641
function courierReplaceLines(pin, ids, newItem, price) {
  checkPin_(pin);
  return withLock_(function () {
    var name = norm_(newItem).slice(0, 60);
    if (!name) throw new Error('\u0627\u0643\u062A\u0628 \u0627\u0633\u0645 \u0627\u0644\u0635\u0646\u0641 \u0627\u0644\u0628\u062F\u064A\u0644');
    var ls = linesByIds_(ids);
    if (!ls.length) throw new Error('\u0627\u0644\u0637\u0644\u0628 \u0645\u0634 \u0645\u0648\u062C\u0648\u062F');
    var orders = {};
    read_('Orders').forEach(function (o) { orders[o.id] = o; });
    var menu = read_('Menu');
    ls.forEach(function (l) {
      var vendor = orders[l.orderId] ? orders[l.orderId].vendor : 'foul';
      var hit = menu.filter(function (m) { return m.vendor === vendor && norm_(m.name) === name && str_(m.active) !== '0'; })[0];
      var p = hit ? num_(hit.price) : Math.max(0, num_(price));
      l.item = name; l.estPrice = p; l.actualPrice = ''; l.na = '';
      l.cat = hit ? str_(hit.category) : '\u0625\u0636\u0627\u0641\u0627\u062A \u0627\u0644\u0632\u0645\u0644\u0627\u0621';
      save_('Lines', l);
      addToMenuIfNew_(menu, vendor, name, p);
    });
    return true;
  });
}

function courierSetStatus(pin, vendor, status, round) {
  checkPin_(pin);
  return withLock_(function () {
    checkVendor_(vendor);
    if (['open', 'closed', 'done'].indexOf(status) < 0) throw new Error('\u062D\u0627\u0644\u0629 \u063A\u0644\u0637');
    var o = getOrCreateOrder_(vendor, round);
    if (status === 'open') {
      var list = todayOrders_(vendor);
      if (list[list.length - 1].id !== o.id) throw new Error('\u062A\u0642\u062F\u0631 \u062A\u0641\u062A\u062D \u0622\u062E\u0631 \u062C\u0648\u0644\u0629 \u0628\u0633');
    }
    o.status = status;
    save_('Orders', o);
    return true;
  });
}

// prices: { "\u0627\u0633\u0645 \u0627\u0644\u0635\u0646\u0641": \u0633\u0639\u0631 \u0627\u0644\u0648\u062D\u062F\u0629 \u0627\u0644\u0641\u0639\u0644\u064A }
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
    if (list.length && list[list.length - 1].status === 'open') throw new Error('\u0627\u0644\u062C\u0648\u0644\u0629 \u0627\u0644\u062D\u0627\u0644\u064A\u0629 \u0644\u0633\u0647 \u0645\u0641\u062A\u0648\u062D\u0629');
    createOrder_(vendor, list.length ? roundOf_(list[list.length - 1]) + 1 : 1);
    return true;
  });
}

/* ----------------------- \u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u0631\u064A\u0633\u064A\u062A \u0628\u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064A ----------------------- */

function numAr_(v) {
  return num_(str_(v).replace(/[\u0660-\u0669]/g, function (d) { return '\u0660\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u0669'.indexOf(d); }).replace(/\u066B/g, '.').replace(/[^\d.\-]/g, ''));
}

// \u0628\u064A\u062D\u0648\u0651\u0644 \u0631\u062F \u0627\u0644\u0645\u0648\u062F\u064A\u0644 \u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0646\u0636\u064A\u0641\u0629\u060C \u0648\u0628\u064A\u062A\u0623\u0643\u062F \u0625\u0646 \u0643\u0644 "match" \u0647\u0648 \u0635\u0646\u0641 \u0641\u0639\u0644\u0627\u064B \u0641\u064A \u0627\u0644\u0623\u0648\u0631\u062F\u0631
function normalizeReceipt_(text, itemNames) {
  var a = text.indexOf('{'), b = text.lastIndexOf('}');
  if (a < 0 || b < a) throw new Error('\u0645\u0642\u062F\u0631\u062A\u0634 \u0623\u0642\u0631\u0627 \u0627\u0644\u0631\u064A\u0633\u064A\u062A\u060C \u062C\u0631\u0628 \u0635\u0648\u0631\u0629 \u0623\u0648\u0636\u062D');
  var raw;
  try { raw = JSON.parse(text.slice(a, b + 1)); } catch (e) { throw new Error('\u0645\u0642\u062F\u0631\u062A\u0634 \u0623\u0642\u0631\u0627 \u0627\u0644\u0631\u064A\u0633\u064A\u062A\u060C \u062C\u0631\u0628 \u0635\u0648\u0631\u0629 \u0623\u0648\u0636\u062D'); }
  if (raw.readable === false) throw new Error('\u0627\u0644\u0635\u0648\u0631\u0629 \u062F\u064A \u0645\u0634 \u0648\u0627\u0636\u062D \u0625\u0646\u0647\u0627 \u0631\u064A\u0633\u064A\u062A');
  var valid = {};
  itemNames.forEach(function (n) { valid[norm_(n)] = n; });
  var lines = (raw.lines || []).map(function (l) {
    var qty = numAr_(l.qty) > 0 ? numAr_(l.qty) : 1;
    var m = l.match == null ? '' : valid[norm_(l.match)];
    return { name: norm_(l.name).slice(0, 80), qty: qty, lineTotal: Math.max(0, numAr_(l.lineTotal)), match: m || null };
  }).filter(function (l) { return l.name; });
  if (!lines.length) throw new Error('\u0645\u0641\u064A\u0634 \u0623\u0635\u0646\u0627\u0641 \u0638\u0627\u0647\u0631\u0629 \u0641\u064A \u0627\u0644\u0631\u064A\u0633\u064A\u062A');
  return { lines: lines, fee: Math.max(0, numAr_(raw.deliveryFee)), total: raw.total == null ? null : numAr_(raw.total) };
}

function callClaudeReceipt_(b64, mime, itemNames) {
  var props = PropertiesService.getScriptProperties();
  var key = props.getProperty('ANTHROPIC_API_KEY');
  if (!key) throw new Error('\u0644\u0627\u0632\u0645 \u062A\u0636\u064A\u0641 ANTHROPIC_API_KEY \u0641\u064A Script properties \u0627\u0644\u0623\u0648\u0644');
  var model = props.getProperty('CLAUDE_MODEL') || 'claude-sonnet-5-5';
  var prompt =
    '\u062F\u064A \u0635\u0648\u0631\u0629 \u0631\u064A\u0633\u064A\u062A (\u0641\u0627\u062A\u0648\u0631\u0629) \u0645\u0646 \u0645\u0637\u0639\u0645 \u0623\u0648 \u0633\u0648\u0628\u0631\u0645\u0627\u0631\u0643\u062A \u0641\u064A \u0645\u0635\u0631\u060C \u0645\u0645\u0643\u0646 \u062A\u0643\u0648\u0646 \u0639\u0631\u0628\u064A \u0623\u0648 \u0625\u0646\u062C\u0644\u064A\u0632\u064A.\n' +
    '\u0627\u0642\u0631\u0627 \u0643\u0644 \u0633\u0637\u0631 \u0645\u0634\u062A\u0631\u064A\u0627\u062A. \u0648\u0642\u0627\u0631\u0646\u0647 \u0628\u0642\u0627\u064A\u0645\u0629 \u0627\u0644\u0623\u0635\u0646\u0627\u0641 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629 \u062F\u064A (JSON): ' + JSON.stringify(itemNames) + '\n' +
    '\u0631\u062C\u0651\u0639 JSON \u0628\u0633 \u0645\u0646 \u063A\u064A\u0631 \u0623\u064A \u0643\u0644\u0627\u0645 \u062A\u0627\u0646\u064A \u0628\u0627\u0644\u0634\u0643\u0644 \u062F\u0647:\n' +
    '{"readable":true,"lines":[{"name":"\u0627\u0644\u0627\u0633\u0645 \u0632\u064A \u0645\u0627 \u0641\u064A \u0627\u0644\u0631\u064A\u0633\u064A\u062A","qty":1,"lineTotal":0,"match":"\u0627\u0633\u0645 \u0645\u0646 \u0627\u0644\u0642\u0627\u064A\u0645\u0629 \u0628\u0627\u0644\u0638\u0628\u0637 \u0623\u0648 null"}],"deliveryFee":null,"total":null}\n' +
    '\u0642\u0648\u0627\u0639\u062F: lineTotal \u0647\u0648 \u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0633\u0637\u0631 \u0643\u0644\u0647 (\u0627\u0644\u0643\u0645\u064A\u0629 \u00D7 \u0633\u0639\u0631 \u0627\u0644\u0648\u062D\u062F\u0629) \u0628\u0627\u0644\u062C\u0646\u064A\u0647 \u0627\u0644\u0645\u0635\u0631\u064A. \u062D\u0648\u0651\u0644 \u0627\u0644\u0623\u0631\u0642\u0627\u0645 \u0627\u0644\u0639\u0631\u0628\u064A\u0629 (\u0660-\u0669) \u0644\u0623\u0631\u0642\u0627\u0645 \u0639\u0627\u062F\u064A\u0629. ' +
    '\u0644\u0648 \u0627\u0644\u0643\u0645\u064A\u0629 \u0645\u0634 \u0645\u0643\u062A\u0648\u0628\u0629 \u0627\u0639\u062A\u0628\u0631\u0647\u0627 1. match \u0644\u0627\u0632\u0645 \u064A\u0643\u0648\u0646 \u0648\u0627\u062D\u062F \u0645\u0646 \u0623\u0633\u0645\u0627\u0621 \u0627\u0644\u0642\u0627\u064A\u0645\u0629 \u062D\u0631\u0641\u064A\u0627\u064B \u0644\u0648 \u0627\u0644\u0633\u0637\u0631 \u062F\u0647 \u0646\u0641\u0633 \u0627\u0644\u0635\u0646\u0641 (\u062D\u062A\u0649 \u0644\u0648 \u0627\u0644\u0627\u0633\u0645 \u0645\u062E\u062A\u0644\u0641 \u0634\u0648\u064A\u0629 \u0645\u062B\u0644 "\u0641\u0648\u0644 \u0632\u064A\u062A" = "\u0641\u0648\u0644 \u0628\u0627\u0644\u0632\u064A\u062A \u0627\u0644\u062D\u0627\u0631")\u060C \u0648\u0625\u0644\u0627 null. ' +
    '\u0645\u0627\u062A\u062E\u062A\u0631\u0639\u0634 \u0623\u0635\u0646\u0627\u0641. \u0631\u0633\u0648\u0645 \u0627\u0644\u062A\u0648\u0635\u064A\u0644/\u0627\u0644\u062E\u062F\u0645\u0629 \u0641\u064A deliveryFee \u0648\u0645\u0634 \u0641\u064A lines. total \u0647\u0648 \u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0631\u064A\u0633\u064A\u062A \u0644\u0648 \u0638\u0627\u0647\u0631. \u0644\u0648 \u0627\u0644\u0635\u0648\u0631\u0629 \u0645\u0634 \u0631\u064A\u0633\u064A\u062A \u062E\u0644\u064A readable=false.';
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
    throw new Error('\u062E\u0637\u0623 \u0645\u0646 \u062E\u062F\u0645\u0629 \u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u0631\u064A\u0633\u064A\u062A (' + code + ') ' + msg);
  }
  var out = JSON.parse(body), text = '';
  (out.content || []).forEach(function (c) { if (c.type === 'text') text += c.text; });
  return text;
}

// \u0628\u064A\u062D\u0633\u0628 \u0633\u0639\u0631 \u0627\u0644\u0648\u062D\u062F\u0629 \u0627\u0644\u0641\u0639\u0644\u064A \u0645\u0646 \u0643\u0644 \u0631\u064A\u0633\u064A\u062A\u0627\u062A \u0627\u0644\u062C\u0648\u0644\u0629 \u0648\u064A\u062D\u062F\u0651\u062B \u0627\u0644\u0623\u0648\u0631\u062F\u0631
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
  if (!b64 || b64.length > 7000000) throw new Error('\u0627\u0644\u0635\u0648\u0631\u0629 \u0643\u0628\u064A\u0631\u0629 \u0623\u0648\u064A \u0623\u0648 \u0641\u0627\u0636\u064A\u0629');
  mime = ['image/jpeg', 'image/png', 'image/webp'].indexOf(mime) >= 0 ? mime : 'image/jpeg';
  var order = getOrCreateOrder_(vendor, round);
  var names = {};
  read_('Lines').forEach(function (l) { if (l.orderId === order.id && !isNa_(l)) names[norm_(l.item)] = true; });
  var itemNames = Object.keys(names);
  if (!itemNames.length) throw new Error('\u0645\u0641\u064A\u0634 \u0637\u0644\u0628\u0627\u062A \u0641\u064A \u0627\u0644\u062C\u0648\u0644\u0629 \u062F\u064A');
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
    if (!name) throw new Error('\u0627\u0643\u062A\u0628 \u0627\u0633\u0645 \u0627\u0644\u0635\u0646\u0641');
    var rec = {
      vendor: item.vendor, category: norm_(item.category) || '\u0623\u0635\u0646\u0627\u0641', name: name,
      price: Math.max(0, num_(item.price)), emoji: norm_(item.emoji) || '\uD83C\uDF7D\uFE0F', active: 1,
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
