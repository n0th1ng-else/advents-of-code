/**
 * deno run -A --allow-hrtime ./src/adventofcode/2021/day4/task2.ts
 */
import { PartId, readFile, TaskId, withTime } from "../../common.ts";
import {
  Board,
  getBoardScore,
  getWinnerBoardId,
  parseInput,
  updateBoards,
} from "./common.ts";

const day: TaskId = 4;
const part: PartId = 2;
const example = false;
const rows = await readFile(day, example);

const task = () => {
  let { turns, boards } = parseInput(rows);
  let turn = "";
  let boardId = -1;
  let lastBoard: Board = [];
  let lastTurn = "";

  do {
    turn = turns.shift() || "";
    boards = updateBoards(turn, boards);
    do {
      boardId = getWinnerBoardId(boards);
      if (boardId !== -1) {
        lastTurn = turn;
        lastBoard = boards[boardId];
        boards = boards.filter((_, i) => i !== boardId);
      }
    } while (boardId !== -1);
  } while (turns.length);

  return Number(lastTurn) * getBoardScore(lastBoard);
};

withTime(task, day, part);
