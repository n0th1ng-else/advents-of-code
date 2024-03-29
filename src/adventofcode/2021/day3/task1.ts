/**
 * deno run -A --allow-hrtime ./src/adventofcode/2021/day3/task1.ts
 */
import { readFileByPath, execWithTime } from "../../common.ts";
import { getZeroCountAt, invertBinary, toNumber } from "./common.ts";

const thisFile = new URL("", import.meta.url).pathname;
const rows = await readFileByPath(thisFile);

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

execWithTime(task, thisFile);
