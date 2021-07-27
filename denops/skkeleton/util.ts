import type { Denops } from "./deps.ts";

export async function mode(denops: Denops) {
  return await denops.call("mode") as string;
}
