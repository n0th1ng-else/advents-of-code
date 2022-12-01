/**
 * deno run -A --allow-hrtime ./src/adventofcode/2021/day13/task2.ts
 */
import { readFileByPath, execWithTime } from "../../common.ts";
import {
  countDots,
  doFold,
  Fold,
  getSize,
  parseInput,
  renderNet,
} from "./common.ts";

const thisFile = new URL("", import.meta.url).pathname;
const rows = await readFileByPath(thisFile);

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

execWithTime(task, thisFile);
