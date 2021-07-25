import * as jisyo from "./jisyo.ts";
import type { HenkanType } from "./jisyo.ts";
import { Denops, ensureString, fn, vars } from "./deps.ts";
import { getHenkanState, henkan, kakutei } from "./henkan.ts";
import { getOkuriStr } from "./okuri.ts";
import { mapping } from "./kana.ts";

async function init(denops: Denops) {
  const globalJisyo = await vars.g.get(
    denops,
    "skkeleton#global_jisyo",
    "/usr/share/skk/SKK-JISYO.L",
  );
  ensureString(globalJisyo);
  const globalJisyoEncoding = await vars.g.get(
    denops,
    "skkeleton#global_jisyo_encoding",
    "euc-jp",
  );
  ensureString(globalJisyoEncoding);
  const userJisyo = await vars.g.get(
    denops,
    "skkeleton#user_jisyo",
    Deno.env.get("HOME") + "/jisyo.json",
  );
  ensureString(userJisyo);
  await jisyo.load(globalJisyo, userJisyo, globalJisyoEncoding);
  await mapping(denops);
}

export async function main(denops: Denops) {
  init(denops);
  denops.dispatcher = {
    async handleKana(to: unknown, feed: unknown, henkanStr: unknown) {
      ensureString(to);
      ensureString(feed);
      ensureString(henkanStr);

      /*
       * 変換されている場合は確定してfeedがあれば送信
       * 変換されていない場合feedが無くて送りありなら変換をかける
       */
      const kakuteiResult = kakutei(henkanStr, false);
      if (feed !== "") {
        await fn.feedkeys(denops, feed, "t");
      } else if (kakuteiResult === "" && henkanStr.indexOf("*") !== -1) {
        // TODO: 真面目にやる
        await fn.feedkeys(denops, " ", "t");
      }
      return kakuteiResult + to;
    },
    async handleHenkan(henkanStr: unknown): Promise<string> {
      ensureString(henkanStr);
      if (henkanStr === "") {
        // 変換時以外はスペースとして振る舞う
        return " ";
      }
      const henkanState = getHenkanState(henkanStr);
      if (henkanState == null) {
        return "ERROR: henkanState == null";
      }
      const arg: [HenkanType, string] = henkanState[2]
        ? ["okuriari", getOkuriStr(henkanState[1], henkanState[2])]
        : ["okurinasi", henkanState[1]];
      return await henkan(denops, arg[0], arg[1], henkanState[3] ?? "");
    },
    handleHenkanCancel(henkanStr: unknown): Promise<string> {
      ensureString(henkanStr);
      const henkanPoint = henkanStr.lastIndexOf("▼");
      if (henkanPoint !== -1) {
        return Promise.resolve("\x08".repeat(henkanStr.length - henkanPoint));
      }
      const okuriPoint = henkanStr.lastIndexOf("*");
      if (okuriPoint !== -1) {
        return Promise.resolve("\x08".repeat(henkanStr.length - okuriPoint));
      }
      return Promise.resolve("\x08".repeat(henkanStr.length));
    },
    handleHenkanPoint(henkanStr: unknown): Promise<string> {
      ensureString(henkanStr);
      let ret = "";
      if (henkanStr.length === 0) {
        ret = "▽";
      } else if (henkanStr.indexOf("▼") !== -1) {
        ret = kakutei(henkanStr, false) + "▽";
      } else if (henkanStr.indexOf("*") === -1) {
        ret = "*";
      }
      return Promise.resolve(ret);
    },
  };
  await denops.cmd(`echomsg "loaded skkeleton"`);
}
