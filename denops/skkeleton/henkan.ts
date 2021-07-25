import * as jisyo from "./jisyo.ts";
import type { Denops } from "./deps.ts";
import { getHenkanStr } from "./util.ts";

const re = /^▽([^*▼]*)\*?([^▼]*)▼?(.*)/;

type HenkanState = [str: string, kana: string, okuri?: string, kanji?: string];

export function getHenkanState(str: string): HenkanState | null {
  return str.match(re) as HenkanState | null;
}

// deno-lint-ignore require-await
export async function henkan(
  denops: Denops,
  type: "okuriari" | "okurinasi",
  word: string,
  currentCandidate: string,
): Promise<string> {
  const candidates = jisyo.getCandidates(type, word);
  if (!candidates) {
    return "TODO: jisyo touroku mode";
  }
  const nextCandidate = candidates[candidates.indexOf(currentCandidate) + 1];
  if (!nextCandidate) {
    return "TODO: jisyo touroku mode";
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
  return "\x08".repeat(henkanStr.length) + henkanState[3].split(";")[0] + okuri;
}
