/**
 * npm run aoc 2022 1 1
 */
import { execWithTime, readFileByPath } from "../../common.ts";

const thisFile = new URL("", import.meta.url).pathname;
const rows = await readFileByPath(thisFile);

const task = () => {
  const stats = rows.reduce(
    (acc, row) => {
      const val = Number(row);
      if (!val) {
        return {
          current: 0,
          max: acc.current > acc.max ? acc.current : acc.max,
        };
      }

      return {
        current: acc.current + val,
        max: acc.max,
      };
    },
    {
      current: 0,
      max: 0,
    },
  );

  return stats.max;
};

execWithTime(task, thisFile);
