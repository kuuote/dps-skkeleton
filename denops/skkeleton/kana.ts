import { batch, Denops } from "./deps.ts";

// tables from eskk.vim

async function map(denops: Denops, from: string, to: string, feed: string) {
  if (from[0] === "x") {
    from = "X" + from.slice(1);
  }
  const args = `["${to}", "${feed}", skkeleton#get_henkan_str()]`;
  await denops.cmd(
    `lnoremap <expr> ${from} denops#request("${denops.name}", "handleKana", ${args})`,
  );
}

export async function mapping(denops: Denops) {
  await batch(denops, (helper) => {
    map(helper, "a", "あ", "");
    map(helper, "bb", "っ", "b");
    map(helper, "ba", "ば", "");
    map(helper, "be", "べ", "");
    map(helper, "bi", "び", "");
    map(helper, "bo", "ぼ", "");
    map(helper, "bu", "ぶ", "");
    map(helper, "bya", "びゃ", "");
    map(helper, "bye", "びぇ", "");
    map(helper, "byi", "びぃ", "");
    map(helper, "byo", "びょ", "");
    map(helper, "byu", "びゅ", "");
    map(helper, "cc", "っ", "c");
    map(helper, "cha", "ちゃ", "");
    map(helper, "che", "ちぇ", "");
    map(helper, "chi", "ち", "");
    map(helper, "cho", "ちょ", "");
    map(helper, "chu", "ちゅ", "");
    map(helper, "cya", "ちゃ", "");
    map(helper, "cye", "ちぇ", "");
    map(helper, "cyi", "ちぃ", "");
    map(helper, "cyo", "ちょ", "");
    map(helper, "cyu", "ちゅ", "");
    map(helper, "dd", "っ", "d");
    map(helper, "da", "だ", "");
    map(helper, "de", "で", "");
    map(helper, "dha", "でゃ", "");
    map(helper, "dhe", "でぇ", "");
    map(helper, "dhi", "でぃ", "");
    map(helper, "dho", "でょ", "");
    map(helper, "dhu", "でゅ", "");
    map(helper, "di", "ぢ", "");
    map(helper, "do", "ど", "");
    map(helper, "du", "づ", "");
    map(helper, "dya", "ぢゃ", "");
    map(helper, "dye", "ぢぇ", "");
    map(helper, "dyi", "ぢぃ", "");
    map(helper, "dyo", "ぢょ", "");
    map(helper, "dyu", "ぢゅ", "");
    map(helper, "e", "え", "");
    map(helper, "ff", "っ", "f");
    map(helper, "fa", "ふぁ", "");
    map(helper, "fe", "ふぇ", "");
    map(helper, "fi", "ふぃ", "");
    map(helper, "fo", "ふぉ", "");
    map(helper, "fu", "ふ", "");
    map(helper, "fya", "ふゃ", "");
    map(helper, "fye", "ふぇ", "");
    map(helper, "fyi", "ふぃ", "");
    map(helper, "fyo", "ふょ", "");
    map(helper, "fyu", "ふゅ", "");
    map(helper, "gg", "っ", "g");
    map(helper, "ga", "が", "");
    map(helper, "ge", "げ", "");
    map(helper, "gi", "ぎ", "");
    map(helper, "go", "ご", "");
    map(helper, "gu", "ぐ", "");
    map(helper, "gya", "ぎゃ", "");
    map(helper, "gye", "ぎぇ", "");
    map(helper, "gyi", "ぎぃ", "");
    map(helper, "gyo", "ぎょ", "");
    map(helper, "gyu", "ぎゅ", "");
    map(helper, "hh", "っ", "h");
    map(helper, "ha", "は", "");
    map(helper, "he", "へ", "");
    map(helper, "hi", "ひ", "");
    map(helper, "ho", "ほ", "");
    map(helper, "hu", "ふ", "");
    map(helper, "hya", "ひゃ", "");
    map(helper, "hye", "ひぇ", "");
    map(helper, "hyi", "ひぃ", "");
    map(helper, "hyo", "ひょ", "");
    map(helper, "hyu", "ひゅ", "");
    map(helper, "i", "い", "");
    map(helper, "jj", "っ", "j");
    map(helper, "ja", "じゃ", "");
    map(helper, "je", "じぇ", "");
    map(helper, "ji", "じ", "");
    map(helper, "jo", "じょ", "");
    map(helper, "ju", "じゅ", "");
    map(helper, "jya", "じゃ", "");
    map(helper, "jye", "じぇ", "");
    map(helper, "jyi", "じぃ", "");
    map(helper, "jyo", "じょ", "");
    map(helper, "jyu", "じゅ", "");
    map(helper, "kk", "っ", "k");
    map(helper, "ka", "か", "");
    map(helper, "ke", "け", "");
    map(helper, "ki", "き", "");
    map(helper, "ko", "こ", "");
    map(helper, "ku", "く", "");
    map(helper, "kya", "きゃ", "");
    map(helper, "kye", "きぇ", "");
    map(helper, "kyi", "きぃ", "");
    map(helper, "kyo", "きょ", "");
    map(helper, "kyu", "きゅ", "");
    map(helper, "mm", "っ", "m");
    map(helper, "ma", "ま", "");
    map(helper, "me", "め", "");
    map(helper, "mi", "み", "");
    map(helper, "mo", "も", "");
    map(helper, "mu", "む", "");
    map(helper, "mya", "みゃ", "");
    map(helper, "mye", "みぇ", "");
    map(helper, "myi", "みぃ", "");
    map(helper, "myo", "みょ", "");
    map(helper, "myu", "みゅ", "");
    map(helper, "n", "ん", "");
    map(helper, "n'", "ん", "");
    map(helper, "na", "な", "");
    map(helper, "ne", "ね", "");
    map(helper, "ni", "に", "");
    map(helper, "nn", "ん", "");
    map(helper, "no", "の", "");
    map(helper, "nu", "ぬ", "");
    map(helper, "nya", "にゃ", "");
    map(helper, "nye", "にぇ", "");
    map(helper, "nyi", "にぃ", "");
    map(helper, "nyo", "にょ", "");
    map(helper, "nyu", "にゅ", "");
    map(helper, "o", "お", "");
    map(helper, "pp", "っ", "p");
    map(helper, "pa", "ぱ", "");
    map(helper, "pe", "ぺ", "");
    map(helper, "pi", "ぴ", "");
    map(helper, "po", "ぽ", "");
    map(helper, "pu", "ぷ", "");
    map(helper, "pya", "ぴゃ", "");
    map(helper, "pye", "ぴぇ", "");
    map(helper, "pyi", "ぴぃ", "");
    map(helper, "pyo", "ぴょ", "");
    map(helper, "pyu", "ぴゅ", "");
    map(helper, "rr", "っ", "r");
    map(helper, "ra", "ら", "");
    map(helper, "re", "れ", "");
    map(helper, "ri", "り", "");
    map(helper, "ro", "ろ", "");
    map(helper, "ru", "る", "");
    map(helper, "rya", "りゃ", "");
    map(helper, "rye", "りぇ", "");
    map(helper, "ryi", "りぃ", "");
    map(helper, "ryo", "りょ", "");
    map(helper, "ryu", "りゅ", "");
    map(helper, "ss", "っ", "s");
    map(helper, "sa", "さ", "");
    map(helper, "se", "せ", "");
    map(helper, "sha", "しゃ", "");
    map(helper, "she", "しぇ", "");
    map(helper, "shi", "し", "");
    map(helper, "sho", "しょ", "");
    map(helper, "shu", "しゅ", "");
    map(helper, "si", "し", "");
    map(helper, "so", "そ", "");
    map(helper, "su", "す", "");
    map(helper, "sya", "しゃ", "");
    map(helper, "sye", "しぇ", "");
    map(helper, "syi", "しぃ", "");
    map(helper, "syo", "しょ", "");
    map(helper, "syu", "しゅ", "");
    map(helper, "tt", "っ", "t");
    map(helper, "ta", "た", "");
    map(helper, "te", "て", "");
    map(helper, "tha", "てぁ", "");
    map(helper, "the", "てぇ", "");
    map(helper, "thi", "てぃ", "");
    map(helper, "tho", "てょ", "");
    map(helper, "thu", "てゅ", "");
    map(helper, "ti", "ち", "");
    map(helper, "to", "と", "");
    map(helper, "tsu", "つ", "");
    map(helper, "tu", "つ", "");
    map(helper, "tya", "ちゃ", "");
    map(helper, "tye", "ちぇ", "");
    map(helper, "tyi", "ちぃ", "");
    map(helper, "tyo", "ちょ", "");
    map(helper, "tyu", "ちゅ", "");
    map(helper, "u", "う", "");
    map(helper, "vv", "っ", "v");
    map(helper, "va", "ヴぁ", "");
    map(helper, "ve", "ヴぇ", "");
    map(helper, "vi", "ヴぃ", "");
    map(helper, "vo", "ヴぉ", "");
    map(helper, "vu", "ヴ", "");
    map(helper, "ww", "っ", "w");
    map(helper, "wa", "わ", "");
    map(helper, "we", "うぇ", "");
    map(helper, "wi", "うぃ", "");
    map(helper, "wo", "を", "");
    map(helper, "wu", "う", "");
    map(helper, "xx", "っ", "x");
    map(helper, "xa", "ぁ", "");
    map(helper, "xe", "ぇ", "");
    map(helper, "xi", "ぃ", "");
    map(helper, "xka", "か", "");
    map(helper, "xke", "け", "");
    map(helper, "xo", "ぉ", "");
    map(helper, "xtsu", "っ", "");
    map(helper, "xtu", "っ", "");
    map(helper, "xu", "ぅ", "");
    map(helper, "xwa", "ゎ", "");
    map(helper, "xwe", "ゑ", "");
    map(helper, "xwi", "ゐ", "");
    map(helper, "xya", "ゃ", "");
    map(helper, "xyo", "ょ", "");
    map(helper, "xyu", "ゅ", "");
    map(helper, "yy", "っ", "y");
    map(helper, "ya", "や", "");
    map(helper, "ye", "いぇ", "");
    map(helper, "yo", "よ", "");
    map(helper, "yu", "ゆ", "");
    map(helper, "zz", "っ", "z");
    map(helper, "z,", "‥", "");
    map(helper, "z-", "～", "");
    map(helper, "z.", "…", "");
    map(helper, "z/", "・", "");
    map(helper, "z[", "『", "");
    map(helper, "z]", "』", "");
    map(helper, "za", "ざ", "");
    map(helper, "ze", "ぜ", "");
    map(helper, "zh", "←", "");
    map(helper, "zi", "じ", "");
    map(helper, "zj", "↓", "");
    map(helper, "zk", "↑", "");
    map(helper, "zl", "→", "");
    map(helper, "zo", "ぞ", "");
    map(helper, "zu", "ず", "");
    map(helper, "zya", "じゃ", "");
    map(helper, "zye", "じぇ", "");
    map(helper, "zyi", "じぃ", "");
    map(helper, "zyo", "じょ", "");
    map(helper, "zyu", "じゅ", "");
    map(helper, "-", "ー", "");
    map(helper, ":", "：", "");
    map(helper, ";", "；", "");
    map(helper, "!", "！", "");
    map(helper, "?", "？", "");
    map(helper, "[", "「", "");
    map(helper, "]", "」", "");
    map(helper, ".", "。", "");
    map(helper, ",", "、", "");

    for (const c of "ABCDEFGHIJKLMNOPQRSTUVWXYZ") {
      helper.cmd(
        `lmap ${c} <Cmd>call feedkeys(";\\<lt>Ignore>${c.toLowerCase()}", 't')<CR>`,
      );
    }

    helper.cmd(
      `lnoremap <expr> <Space> denops#request("${denops.name}", "handleHenkan", [skkeleton#get_henkan_str()])`,
    );
    helper.cmd(
      `lnoremap <expr> ; denops#request("${denops.name}", "handleHenkanPoint", [skkeleton#get_henkan_str()])`,
    );
    helper.cmd(
      `lnoremap <expr> <C-g> denops#request("${denops.name}", "handleHenkanCancel", [skkeleton#get_henkan_str()])`,
    );
    helper.cmd(
      `lnoremap <expr> q denops#request("${denops.name}", "handleKatakana", [skkeleton#get_henkan_str()])`,
    );
    helper.cmd(
      `lnoremap <expr> x denops#request("${denops.name}", "handleHenkanPrev", [skkeleton#get_henkan_str()])`,
    );
    helper.cmd(
      `inoremap <expr> <C-j> denops#request("${denops.name}", "enable", [])`,
    );
    helper.cmd(
      `lnoremap <expr> l denops#request("${denops.name}", "disable", [])`,
    );
  });
}

const katakanaTable: Record<string, string> = {
  "あ": "ア",
  "ば": "バ",
  "べ": "ベ",
  "び": "ビ",
  "ぼ": "ボ",
  "ぶ": "ブ",
  "だ": "ダ",
  "で": "デ",
  "ぢ": "ヂ",
  "ど": "ド",
  "づ": "ヅ",
  "え": "エ",
  "が": "ガ",
  "げ": "ゲ",
  "ぎ": "ギ",
  "ご": "ゴ",
  "ぐ": "グ",
  "は": "ハ",
  "へ": "ヘ",
  "ひ": "ヒ",
  "ほ": "ホ",
  "ふ": "フ",
  "い": "イ",
  "か": "カ",
  "け": "ケ",
  "き": "キ",
  "こ": "コ",
  "く": "ク",
  "ま": "マ",
  "め": "メ",
  "み": "ミ",
  "も": "モ",
  "む": "ム",
  "な": "ナ",
  "ね": "ネ",
  "に": "ニ",
  "ん": "ン",
  "の": "ノ",
  "ぬ": "ヌ",
  "お": "オ",
  "ぱ": "パ",
  "ぺ": "ペ",
  "ぴ": "ピ",
  "ぽ": "ポ",
  "ぷ": "プ",
  "ら": "ラ",
  "れ": "レ",
  "り": "リ",
  "ろ": "ロ",
  "る": "ル",
  "さ": "サ",
  "せ": "セ",
  "し": "シ",
  "そ": "ソ",
  "す": "ス",
  "た": "タ",
  "て": "テ",
  "ち": "チ",
  "と": "ト",
  "つ": "ツ",
  "わ": "ワ",
  "を": "ヲ",
  "う": "ウ",
  "ぁ": "ァ",
  "ぇ": "ェ",
  "ぃ": "ィ",
  "ぉ": "ォ",
  "っ": "ッ",
  "ぅ": "ゥ",
  "ゎ": "ヮ",
  "ゑ": "ヱ",
  "ゐ": "ヰ",
  "ゃ": "ャ",
  "ょ": "ョ",
  "ゅ": "ュ",
  "や": "ヤ",
  "よ": "ヨ",
  "ゆ": "ユ",
  "ざ": "ザ",
  "ぜ": "ゼ",
  "じ": "ジ",
  "ぞ": "ゾ",
  "ず": "ズ",
};

export function hiraToKata(input: string): string {
  return [...input].map((c) => katakanaTable[c] ?? c).join("");
}
