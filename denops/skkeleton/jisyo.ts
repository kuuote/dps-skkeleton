import { Denops } from "./deps.ts";
import { fn, isArray, isObject, isString } from "./deps.ts";

const okuriAriMarker = ";; okuri-ari entries.";
const okuriNasiMarker = ";; okuri-nasi entries.";

const lineRegexp = /^(\S+) \/(.*)\/$/;

export type Jisyo = {
  okuriari: Record<string, string[]>;
  okurinasi: Record<string, string[]>;
};

export type HenkanType = "okuriari" | "okurinasi";

export function getCandidates(type: HenkanType, word: string): string[] {
  const candidates = userJisyo[type][word] ?? [];
  const globalCandidates = globalJisyo[type][word];
  if (globalCandidates) {
    const merged = candidates.slice();
    for (const c of globalCandidates) {
      if (!merged.includes(c)) {
        merged.push(c);
      }
    }
    return merged;
  }
  return candidates;
}

export async function registerCandidate(
  type: HenkanType,
  word: string,
  candidate: string,
) {
  const candidates = (userJisyo[type][word] ?? []).filter((c) =>
    c !== candidate
  );
  candidates.unshift(candidate);
  userJisyo[type][word] = candidates;
  await save();
}

async function convertJisyo(
  input: string,
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

  return data as Jisyo;
}

async function loadSKKJisyo(
  originalPath: string,
  jisyoEncoding: string,
): Promise<Jisyo> {
  return await convertJisyo(originalPath, jisyoEncoding);
}

function newJisyo(): Jisyo {
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
  userJisyoPath = userPath;
  globalJisyo = await loadSKKJisyo(
    globalPath,
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

async function save() {
  const serialized = JSON.stringify(userJisyo);
  await Deno.writeTextFile(userJisyoPath, serialized);
}

export async function jisyoTouroku(
  denops: Denops,
  type: HenkanType,
  word: string,
): Promise<string> {
  const result = await fn.input(denops, word + " ");
  if (result) {
    await registerCandidate(type, word, result as string);
  }
  return result as string;
}

let globalJisyo = newJisyo();
let userJisyo = newJisyo();
let userJisyoPath = "";
