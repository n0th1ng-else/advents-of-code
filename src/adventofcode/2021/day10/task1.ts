/**
 * deno run -A --allow-hrtime ./src/adventofcode/2021/day10/task1.ts
 */
import { readFileByPath, execWithTime } from "../../common.ts";
import { getClosingCharScore, getOpeningChar } from "./common.ts";

const thisFile = new URL("", import.meta.url).pathname;
const rows = await readFileByPath(thisFile);

class RowError extends Error {
  constructor(
    message: string,
    public readonly char: string,
    public readonly index: number,
  ) {
    super(message);
  }
}

const getCorruptedChar = (row: string): [string, number] | null => {
  try {
    row.split("").reduce<string[]>((stack, char, ind) => {
      const opening = getOpeningChar(char);
      if (opening) {
        const last = stack.pop();
        if (last === opening) {
          return stack;
        }
        throw new RowError("incorrect", char, ind);
      }

      return [...stack, char];
    }, []);
    return null;
  } catch (err) {
    if (err instanceof RowError) {
      return [err.char, err.index];
    }
    throw err;
  }
};

const task = () => {
  return rows
    .map((row) => getCorruptedChar(row))
    .filter((pair) => pair)
    .reduce((sum, pair) => {
      if (!pair) {
        throw new Error("No pair found");
      }
      const [char] = pair;
      return sum + getClosingCharScore(char);
    }, 0);
};

execWithTime(task, thisFile);
