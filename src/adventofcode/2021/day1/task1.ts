/**
 * deno run -A ./src/adventofcode/2021/day1/task1.ts
 */
import { getResult } from "./common.ts";
import { readFile } from "../../common.ts";

const rows = await readFile(1);

const getWindow = (lines: string[], start: number): number =>
  Number(lines[start] ?? 0);

console.log("res", getResult(rows, getWindow));
