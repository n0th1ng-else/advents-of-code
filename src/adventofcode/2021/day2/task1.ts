/**
 * deno run -A --allow-hrtime ./src/adventofcode/2021/day2/task1.ts
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
          };
        case Direction.Up:
          return {
            ...acc,
            y: acc.y - val,
          };
        case Direction.Down:
          return {
            ...acc,
            y: acc.y + val,
          };
        default:
          throw new Error("Unknown command");
      }
    },
    {
      x: 0,
      y: 0,
    },
  );

  return x * y;
};

execWithTime(task, thisFile);
