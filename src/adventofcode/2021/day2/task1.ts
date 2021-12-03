/**
 * deno run -A --allow-hrtime ./src/adventofcode/2021/day2/task1.ts
 */
import { PartId, readFile, TaskId, withTime } from "../../common.ts";
import { Direction, getCommand } from "./common.ts";

const day: TaskId = 2;
const part: PartId = 1;
const rows = await readFile(day);

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
    }
  );

  return x * y;
};

withTime(task, day, part);
