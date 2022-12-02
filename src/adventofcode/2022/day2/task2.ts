/**
 * npm run aoc 2022 2 2
 */
import { execWithTime, readFileByPath } from "../../common.ts";
import { Action, actions, roundOutcome } from "./common.ts";

const thisFile = new URL("", import.meta.url).pathname;
const rows = await readFileByPath(thisFile);

const evalActions = (outcome: string, him: Action): number => {
  // draw
  if (outcome === "Y") {
    return him.score + roundOutcome.draw;
  }

  // win
  if (outcome === "Z") {
    const me = Object.values(actions).find((act) => act.beats === him.type);
    return me ? me.score + roundOutcome.win : roundOutcome.win;
  }

  // lose
  if (outcome === "X") {
    const me = actions[him.beats];
    return me.score + roundOutcome.lose;
  }

  return 0;
};

const task = () => {
  const sum = rows.reduce((acc, round) => {
    if (!round) {
      return acc;
    }
    const [him, outcome] = round.split(" ");
    const himAction = actions[him];

    const score = acc + evalActions(outcome, himAction);
    return score;
  }, 0);
  return sum;
};

execWithTime(task, thisFile);
