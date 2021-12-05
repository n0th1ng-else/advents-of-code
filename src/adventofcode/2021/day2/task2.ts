/**
 * deno run -A --allow-hrtime ./src/adventofcode/2021/day2/task2.ts
 */
import { PartId, readFile, TaskId, withTime } from "../../common.ts";
import { Direction, getCommand } from "./common.ts";

const day: TaskId = 2;
const part: PartId = 2;
const example = false;
const rows = await readFile(day, example);

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

withTime(task, day, part);
