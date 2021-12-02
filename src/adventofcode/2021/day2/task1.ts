/**
 * deno run -A ./src/adventofcode/2021/day2/task1.ts
 */
import { readFile } from "../../common.ts";
import { Direction, getCommand } from "./common.ts";

const rows = await readFile(2);

const final = rows.reduce(
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

console.log("res", final.x * final.y);
