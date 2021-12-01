import { getResult, readFile } from "./common.ts";

const rows = await readFile();

const getWindow = (lines: string[], start: number): number =>
  Number(lines[start] ?? 0);

console.log("res", getResult(rows, getWindow));
