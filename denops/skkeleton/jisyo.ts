import { isArray, isObject, isString } from "./deps.ts";

const okuriAriMarker = ";; okuri-ari entries.";
const okuriNasiMarker = ";; okuri-nasi entries.";

const lineRegexp = /^(\S+) \/(.*)\/$/;

export type Jisyo = {
  okuriari: Record<string, string[]>;
  okurinasi: Record<string, string[]>;
};

export type HenkanType = "okuriari" | "okurinasi";

export function getCandidates(type: HenkanType, word: string) {
  // TODO: ユーザー辞書をちゃんと処理する
  return globalJisyo[type][word];
}

async function convertJisyo(
  input: string,
  output: string,
  jisyoEncoding: string,
): Promise<Jisyo> {
  const decoder = new TextDecoder(jisyoEncoding);
  const jisyo = decoder.decode(await Deno.readFile(input)).split("\n");

  const okuriAriIndex = jisyo.indexOf(okuriAriMarker);
  const okuriNasiIndex = jisyo.indexOf(okuriNasiMarker);

  const okuriAriEntries = jisyo.slice(okuriAriIndex + 1, okuriNasiIndex).map(
    (s) => s.match(lineRegexp),
  ).filter((m) => m).map((m) => [m![1], m![2].split("/")]);
  const okuriNasiEntries = jisyo.slice(okuriNasiIndex + 1, jisyo.length).map(
    (s) => s.match(lineRegexp),
  ).filter((m) => m).map((m) => [m![1], m![2].split("/")]);

  const data = {
    okuriari: Object.fromEntries(okuriAriEntries),
    okurinasi: Object.fromEntries(okuriNasiEntries),
  };

  await Deno.writeTextFile(output, JSON.stringify(data));
  return data as Jisyo;
}

async function loadSKKJisyo(
  originalPath: string,
  cachePath: string,
  jisyoEncoding: string,
): Promise<Jisyo> {
  try {
    return JSON.parse(await Deno.readTextFile(cachePath)) as Jisyo;
  } catch {
    return await convertJisyo(originalPath, cachePath, jisyoEncoding);
  }
}

export function newJisyo(): Jisyo {
  return {
    okuriari: {},
    okurinasi: {},
  };
}

function ensureJisyo(x: unknown): asserts x is Jisyo {
  const pred = (x: unknown): x is Array<string> => isArray(x, isString);
  if (
    isObject(x) && isObject(x.okuriari, pred) && isObject(x.okurinasi, pred)
  ) {
    return;
  }
  throw new Error("corrupt jisyo detected");
}

export async function load(
  globalPath: string,
  userPath: string,
  jisyoEncoding = "euc-jp",
) {
  globalJisyo = await loadSKKJisyo(
    globalPath,
    "/tmp/skke-jisyo.json",
    jisyoEncoding,
  );
  try {
    const jisyo = JSON.parse(await Deno.readTextFile(userPath));
    ensureJisyo(jisyo);
    userJisyo = jisyo;
  } catch {
    // do nothing
  }
}

export let globalJisyo = newJisyo();
export let userJisyo = newJisyo();
