import * as jisyo from "./jisyo.ts";
import type { Denops } from "./deps.ts";
import type { HenkanType } from "./jisyo.ts";
import { getOkuriStr } from "./okuri.ts";
import { jisyoTouroku, registerCandidate } from "./jisyo.ts";

const re = /^▽([^*▼]*)\*?([^▼]*)▼?(.*)/;

type HenkanState = [str: string, kana: string, okuri?: string, kanji?: string];

export function getHenkanState(str: string): HenkanState | null {
  return str.match(re) as HenkanState | null;
}

async function jisyoTourokuHelper(
  denops: Denops,
  type: HenkanType,
  word: string,
  henkanStr: string,
): Promise<string> {
  const result = await jisyoTouroku(denops, type, word);
  if (result) {
    return "\x08".repeat(henkanStr.length) + result;
  } else {
    return "";
  }
}

export async function henkan(
  denops: Denops,
  henkanStr: string,
  direction: -1 | 1,
): Promise<string> {
  if (henkanStr === "") {
    if (direction === 1) {
      // 変換時以外はスペースとして振る舞う
      return " ";
    } else {
      // 逆方向の時はxもどきを送出する
      await denops.cmd('call feedkeys("X", "t")');
      return "";
    }
  }
  const henkanState = getHenkanState(henkanStr);
  if (henkanState == null) {
    return "ERROR: henkanState == null";
  }
  const currentCandidate = henkanState[3] ?? "";
  if (!currentCandidate && direction === -1) {
    // 逆方向で候補が存在しない場合も同様にしないとバックスペースになってしまう
    await denops.cmd('call feedkeys("X", "t")');
    return "";
  }
  const [type, word]: [HenkanType, string] = henkanState[2]
    ? ["okuriari", getOkuriStr(henkanState[1], henkanState[2])]
    : ["okurinasi", henkanState[1]];
  const candidates = jisyo.getCandidates(type, word);
  if (!candidates) {
    return await jisyoTourokuHelper(denops, type, word, henkanStr);
  }
  const nextCandidate =
    candidates[candidates.indexOf(currentCandidate) + direction];
  if (!nextCandidate) {
    if (direction === 1) {
      return await jisyoTourokuHelper(denops, type, word, henkanStr);
    } else {
      return "\x08".repeat(currentCandidate.length + 1);
    }
  }
  const backspace = currentCandidate === ""
    ? ""
    : "\x08".repeat(currentCandidate.length + 1);
  return backspace + "▼" + nextCandidate;
}

export function kakutei(henkanStr: string, force: boolean): string {
  const henkanState = getHenkanState(henkanStr);
  if (henkanState == null) {
    return "";
  }
  if (!henkanState[3]) {
    if (force) {
      return "\x08".repeat(henkanStr.length) + henkanState[1];
    } else {
      return "";
    }
  }
  const okuri = henkanState[2] ?? "";
  const result = henkanState[3];
  const resultStrip = result.split(";")[0];
  const [type, word]: [HenkanType, string] = henkanState[2]
    ? ["okuriari", getOkuriStr(henkanState[1], henkanState[2])]
    : ["okurinasi", henkanState[1]];
  registerCandidate(type, word, result);
  return "\x08".repeat(henkanStr.length) + resultStrip + okuri;
}
