import {
  createDayContext,
  createDayFolder,
  createDayTasks,
} from "../common.ts";
import { detectSessionId, detectYear } from "../env.ts";
import { CONSOLE_COLORS } from "../const.ts";

const sessionId = await detectSessionId();

const [day] = Deno.args;
const [yearValue, yearSource] = await detectYear();

console.log(
  `%c Fetching the AoC year from the %c${yearSource}%c. The year is set to %c${yearValue}`,
  CONSOLE_COLORS.WHITE,
  CONSOLE_COLORS.VOLT,
  CONSOLE_COLORS.WHITE,
  CONSOLE_COLORS.VOLT,
);

if (!day) {
  console.error(
    new Error(
      "The day is not specified! The correct format is npm run aoc [year] [day]",
    ),
  );
  Deno.exit();
}

await createDayFolder(yearValue, day);
createDayTasks(yearValue, day);
await createDayContext(yearValue, day, sessionId);
