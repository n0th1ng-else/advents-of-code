import { getResult, readFile } from "./common.ts";

const rows = await readFile();

const getWindow = (lines: string[], start: number): number | null => {
  const size = lines.length;
  const end = start + 3;
  const isBigger = size < end;
  if (isBigger) {
    return null;
  }
  const items = lines.slice(start, end);
  return items.reduce((res, item) => res + Number(item), 0);
};

console.log("res", getResult(rows, getWindow));
