/**
 * deno run -A --allow-hrtime ./src/adventofcode/2021/day3/task1.ts
 */
import { PartId, readFile, TaskId, withTime } from "../../common.ts";
import { getZeroCountAt, invertBinary, toNumber } from "./common.ts";

const day: TaskId = 3;
const part: PartId = 1;
const example = false;
const rows = await readFile(day, example);

const counter = rows[0].split("");

const getGammaRateAt = (rows: string[], at: number): string => {
  const zeroCount = getZeroCountAt(rows, at);
  return zeroCount > rows.length / 2 ? "1" : "0";
};

const task = () => {
  const gammaRateParts = counter.map((_, ind) => getGammaRateAt(rows, ind));
  const epsilonRateParts = invertBinary(gammaRateParts);
  const gammaRate = toNumber(gammaRateParts);
  const epsilonRate = toNumber(epsilonRateParts);
  return gammaRate * epsilonRate;
};

withTime(task, day, part);
