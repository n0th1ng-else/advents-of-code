import { createDayFolder, createDayTasks } from "./common.ts";

const [year, day] = Deno.args;

if (!year) {
  console.error(
    new Error(
      "The yearn is not specified! The correct format is npm run aoc [year] [day]",
    ),
  );
  Deno.exit();
}

if (!day) {
  console.error(
    new Error(
      "The day is not specified! The correct format is npm run aoc [year] [day]",
    ),
  );
  Deno.exit();
}

await createDayFolder(year, day);
createDayTasks(year, day);
