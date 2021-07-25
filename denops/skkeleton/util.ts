import { Denops, fn } from "./deps.ts";

// simulate Vim script function charidx()
export function charidx(str: string, idx: number): number {
  const encoder = new TextEncoder();
  let i = 0;
  let len = 0;
  for (i = 0; i < str.length && len <= idx; i++) {
    len += encoder.encode(str[i]).length;
  }
  return i - 1;
}

// RPC遅いので消す、気が向いた時に抹消する
// export async function getHenkanStr(denops: Denops): Promise<string> {
//   const line = await fn.getline(denops, ".");
//   const byteidx = await fn.col(denops, ".") - 2;
//   const idx = charidx(line, byteidx) + 1;
//   const henkanPoint = line.slice(0, idx).lastIndexOf("▽");
//   if (henkanPoint == -1) {
//     return "";
//   }
//   return line.slice(henkanPoint, idx);
// }
