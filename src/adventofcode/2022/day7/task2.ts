/**
 * npm run aoc 2022 7 2
 */
import { getFilesystem } from "./common.ts";

const FS_LIMIT = 70_000_000;
const FS_FREE = 30_000_000;
export const task = (rows: string[]) => {
  const filesystem = getFilesystem(rows);
  const currentFreeSpace = FS_LIMIT - filesystem["/"].size;

  const folderToDel = Object.values(filesystem)
    .filter((itm) => itm.isFolder)
    .sort((a, b) => (a.size > b.size ? 1 : -1))
    .find((itm) => itm.size + currentFreeSpace >= FS_FREE);

  return folderToDel?.size;
};
