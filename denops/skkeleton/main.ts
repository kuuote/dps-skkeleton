import * as jisyo from "./jisyo.ts";
import * as u from "./util.ts";
import { Denops, ensureString, fn, vars } from "./deps.ts";
import { henkan, kakutei } from "./henkan.ts";
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
    async enable(): Promise<string> {
      if (await denops.eval("&l:iminsert") === 0) {
        // ノーマルモード等ではsetlocal、挿入モード等では<C-^>が必要
        await denops.cmd("setlocal iminsert=1");
        return "\x1e"; // <C-^>
      } else {
        return "";
      }
    },
    async disable(): Promise<string> {
      if (await denops.eval("&l:iminsert") === 1) {
        if ((await u.mode(denops)).match(/i|c/)) {
          const kakuteiStr = await denops.eval("skkeleton#get_henkan_str()");
          ensureString(kakuteiStr);
          return kakutei(kakuteiStr, true) + "\x1e";
        } else {
          await denops.cmd("setlocal iminsert=0");
          return "";
        }
      } else {
        return "";
      }
    },
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
        // modeにtを指定することによりユーザーが入力したかのように振る舞う
        await fn.feedkeys(denops, feed, "t");
      } else if (kakuteiResult === "" && henkanStr.indexOf("*") !== -1) {
        // TODO: 真面目にやる
        await fn.feedkeys(denops, " ", "t");
      }
      return kakuteiResult + to;
    },
    async handleHenkan(henkanStr: unknown): Promise<string> {
      ensureString(henkanStr);
      return await henkan(denops, henkanStr);
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
