/**
 * npm run aoc 2022 7 1
 */
import { getFilesystem } from "./common.ts";

const MAX_SIZE = 100_000;

export const task = (rows: string[]) => {
  const filesystem = getFilesystem(rows);

  const sum = Object.values(filesystem)
    .filter((itm) => itm.isFolder)
    .filter((itm) => !(itm.size > MAX_SIZE))
    .reduce((sum, itm) => sum + itm.size, 0);
  return sum;
};
