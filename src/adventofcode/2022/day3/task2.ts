/**
 * npm run aoc 2022 3 2
 */
import { execWithTime, readFileByPath } from "../../common.ts";
import { getCharVolume } from "./common.ts";

const thisFile = new URL("", import.meta.url).pathname;
const input = await readFileByPath(thisFile);

const detectChar = (rows: string[]): string => {
  const [a, b, c] = rows.sort((a, b) => (a.length > b.length ? 1 : -1));
  for (let i = 0; i < a.length; i++) {
    const char = a[i];
    if (b.includes(char) && c.includes(char)) {
      return char;
    }
  }

  throw new Error("Wrong input");
};
const task = (rows: string[]) => {
  const chars = rows.reduce<{ current: string[]; res: string[] }>(
    (acc, row) => {
      acc.current.push(row);
      if (acc.current.length === 3) {
        return {
          current: [],
          res: [...acc.res, detectChar(acc.current)],
        };
      }

      return acc;
    },
    {
      current: [],
      res: [],
    }
  );
  return chars.res.reduce((sum, char) => sum + getCharVolume(char), 0);
};

execWithTime(() => task(input), thisFile);
