/**
 * npm run aoc 2022 1 2
 */
import { execWithTime, readFileByPath } from "../../common.ts";

const thisFile = new URL("", import.meta.url).pathname;
const rows = await readFileByPath(thisFile);

const task = () => {
  const stats = rows.reduce<{ current: number; sums: number[] }>(
    (acc, row) => {
      const val = Number(row);
      if (!val) {
        return {
          current: 0,
          sums: [...acc.sums, acc.current],
        };
      }

      return {
        current: acc.current + val,
        sums: acc.sums,
      };
    },
    {
      current: 0,
      sums: [],
    }
  );

  const withLast = [...stats.sums, stats.current];
  const sorted = withLast.sort((a, b) => (a > b ? -1 : 1));
  const sliced = sorted.slice(0, 3);
  const joined = sliced.reduce((sum, item) => sum + item, 0);
  return joined;
};

execWithTime(task, thisFile);
