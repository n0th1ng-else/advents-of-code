import {
  createDayContext,
  createDayFolder,
  createDayTasks,
} from "../common.ts";
import { detectSessionId, detectYear } from "../env.ts";
import { CONSOLE_COLORS, getRunCommand } from "../const.ts";

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
      `The day is not specified! The correct format is ${getRunCommand(
        "fetch",
        "[day]",
        "",
        0,
      )}`,
    ),
  );
  Deno.exit();
}

console.log(
  `%c Creating the folder structure for the %cDay ${day}`,
  CONSOLE_COLORS.WHITE,
  CONSOLE_COLORS.VOLT,
);
await createDayFolder(yearValue, day);
createDayTasks(yearValue, day);
await createDayContext(yearValue, day, sessionId);
