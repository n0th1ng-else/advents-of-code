/**
 * deno run -A --allow-hrtime ./src/adventofcode/2021/day4/task1.ts
 */
import { PartId, readFile, TaskId, withTime } from "../../common.ts";
import {
  getBoardScore,
  getWinnerBoardId,
  parseInput,
  updateBoards,
} from "./common.ts";

const day: TaskId = 4;
const part: PartId = 1;
const rows = await readFile(day);

const task = () => {
  let { turns, boards } = parseInput(rows);
  let turn = "";
  let boardId = -1;
  do {
    turn = turns.shift() || "";
    boards = updateBoards(turn, boards);
    boardId = getWinnerBoardId(boards);
  } while (turns.length && boardId === -1);

  return Number(turn) * getBoardScore(boards[boardId]);
};

withTime(task, day, part);
