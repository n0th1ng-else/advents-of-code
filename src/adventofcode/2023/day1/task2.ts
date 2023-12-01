/**
 * npm run aoc 2023 1 2
 */
import { findDigitsAndSum } from "./common.ts";

const WORDS_MAP: Record<string, number> = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

const getNumStr = (row: string, position: number): string | undefined => {
  const num = !isNaN(Number(row.at(position)));
  if (num) {
    return row.at(position);
  }

  const words = Object.keys(WORDS_MAP);
  const str = words.find((word) => {
    const cut = row.slice(position, position + word.length);
    return cut === word;
  });

  return str && `${WORDS_MAP[str]}`;
};

export const task = (rows: string[]) => {
  const preprocessed = rows.map((row) => {
    let first = "";
    for (let i = 0; i < row.length; i++) {
      if (first) {
        continue;
      }
      const str = getNumStr(row, i);
      if (str) {
        first = str;
      }
    }

    let last = "";
    for (let i = row.length - 1; i > 0; i--) {
      if (last) {
        continue;
      }
      const str = getNumStr(row, i);
      if (str) {
        last = str;
      }
    }

    return `${first}${last}`;
  });

  return findDigitsAndSum(preprocessed);
};
