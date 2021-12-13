/**
 * deno run -A --allow-hrtime ./src/adventofcode/2021/day13/task2.ts
 */
import { PartId, readFile, TaskId, withTime } from "../../common.ts";
import {
  countDots,
  doFold,
  Fold,
  getSize,
  parseInput,
  renderNet,
} from "./common.ts";

const day: TaskId = 13;
const part: PartId = 2;
const example = false;
const rows = await readFile(day, example);

const task = () => {
  const [net, folds] = parseInput(rows);
  const sizes = getSize(net);
  let fold: Fold | undefined;
  do {
    fold = folds.shift();
    if (fold) {
      doFold(net, fold, sizes);
    }
  } while (fold);
  renderNet(net, sizes);
  return countDots(net);
};

withTime(task, day, part);
