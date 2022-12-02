/**
 * npm run aoc 2022 2 1
 */
import { execWithTime, readFileByPath } from "../../common.ts";
import { Action, actions, roundOutcome } from "./common.ts";

const thisFile = new URL("", import.meta.url).pathname;
const rows = await readFileByPath(thisFile);

const transformation: Record<string, string> = {
  X: "A",
  Y: "B",
  Z: "C",
};

const evalActions = (me: Action, him: Action): number => {
  if (me.type === him.type) {
    return me.score + roundOutcome.draw;
  }

  if (me.beats === him.type) {
    return me.score + roundOutcome.win;
  }

  if (me.type === him.beats) {
    return me.score + roundOutcome.lose;
  }

  return 0;
};

const task = () => {
  const sum = rows.reduce((acc, round) => {
    if (!round) {
      return acc;
    }
    const [him, me] = round.split(" ");
    const meActual = transformation[me];
    const meAction = actions[meActual];
    const himAction = actions[him];

    const score = acc + evalActions(meAction, himAction);
    return score;
  }, 0);
  return sum;
};

execWithTime(task, thisFile);
