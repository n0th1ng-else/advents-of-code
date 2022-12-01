/**
 * deno run -A --allow-hrtime ./src/adventofcode/2021/day4/task1.ts
 */
import { readFileByPath, execWithTime } from "../../common.ts";
import {
  getBoardScore,
  getWinnerBoardId,
  parseInput,
  updateBoards,
} from "./common.ts";

const thisFile = new URL("", import.meta.url).pathname;
const rows = await readFileByPath(thisFile);

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

execWithTime(task, thisFile);
