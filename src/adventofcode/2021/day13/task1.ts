/**
 * deno run -A --allow-hrtime ./src/adventofcode/2021/day13/task1.ts
 */
import { PartId, readFile, TaskId, withTime } from "../../common.ts";
import { countDots, doFold, Fold, getSize, parseInput } from "./common.ts";

const day: TaskId = 13;
const part: PartId = 1;
const example = false;
const rows = await readFile(day, example);

const task = () => {
  const [net, folds] = parseInput(rows);
  const sizes = getSize(net);
  let fold: Fold | undefined;
  let done = false;
  do {
    fold = folds.shift();
    if (fold) {
      doFold(net, fold, sizes);
    }
  } while (done);
  return countDots(net);
};

withTime(task, day, part);
