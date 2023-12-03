/**
 * npm run aoc 2023 3 1
 */
import { ARRAY_OFFSETS_AROUND, isNum } from "./common.ts";

const charAttachedToSymbol = (
  rows: string[],
  i: number,
  j: number,
): boolean => {
  return ARRAY_OFFSETS_AROUND.some((offset) => {
    const offsetVal = rows[i + offset.i]?.[j + offset.j] ?? "";
    if (offsetVal === ".") {
      return false;
    }
    const isDigit = isNum(offsetVal);
    return !isDigit;
  });
};

export const task = (rows: string[]) => {
  const serialNumbers: string[] = [];

  for (let i = 0; i < rows.length; i++) {
    const line = rows.at(i)?.split("") ?? [];
    let buffer = "";
    let isSerial = false;

    for (let j = 0; j < line.length; j++) {
      const char = line.at(j) ?? "";
      const isDigit = isNum(char);
      if (isDigit) {
        buffer = `${buffer}${char}`;
        isSerial = isSerial || charAttachedToSymbol(rows, i, j);
      } else {
        if (buffer && isSerial) {
          serialNumbers.push(buffer);
        }
        buffer = "";
        isSerial = false;
      }
    }

    if (buffer && isSerial) {
      serialNumbers.push(buffer);
    }
    buffer = "";
    isSerial = false;
  }

  return serialNumbers.reduce((acc, cur) => acc + Number(cur), 0);
};
