/**
 * deno run -A ./src/adventofcode/2021/day3/task1.ts
 */
import { readFile } from "../../common.ts";
import { getZeroCountAt, invertBinary, toNumber } from "./common.ts";

const rows = await readFile(3);

const counter = rows[0].split("");

const getGammaRateAt = (rows: string[], at: number): string => {
  const zeroCount = getZeroCountAt(rows, at);
  return zeroCount > rows.length / 2 ? "1" : "0";
};

const gammaRateParts = counter.map((_, ind) => getGammaRateAt(rows, ind));

const epsilonRateParts = invertBinary(gammaRateParts);

const gammaRate = toNumber(gammaRateParts);

const epsilonRate = toNumber(epsilonRateParts);

console.log("res", gammaRate * epsilonRate);
