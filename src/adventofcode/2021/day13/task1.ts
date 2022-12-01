/**
 * deno run -A --allow-hrtime ./src/adventofcode/2021/day13/task1.ts
 */
import { readFileByPath, execWithTime } from "../../common.ts";
import { countDots, doFold, Fold, getSize, parseInput } from "./common.ts";

const thisFile = new URL("", import.meta.url).pathname;
const rows = await readFileByPath(thisFile);

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

execWithTime(task, thisFile);
