/**
 * deno run -A --allow-hrtime ./src/adventofcode/2021/day2/task2.ts
 */
import { readFileByPath, execWithTime } from "../../common.ts";
import { Direction, getCommand } from "./common.ts";

const thisFile = new URL("", import.meta.url).pathname;
const rows = await readFileByPath(thisFile);

const task = () => {
  const { x, y } = rows.reduce(
    (acc, row) => {
      const [direction, val] = getCommand(row);
      switch (direction) {
        case Direction.Forward:
          return {
            ...acc,
            x: acc.x + val,
            y: acc.y + acc.z * val,
          };
        case Direction.Up:
          return {
            ...acc,
            z: acc.z - val,
          };
        case Direction.Down:
          return {
            ...acc,
            z: acc.z + val,
          };
        default:
          throw new Error("Unknown command");
      }
    },
    {
      x: 0,
      y: 0,
      z: 0,
    }
  );

  return x * y;
};

execWithTime(task, thisFile);
