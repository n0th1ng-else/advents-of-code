/**
 * @deprecated Do not use
 */
export type TaskId =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24
  | 25;

/**
 * @deprecated Do not use
 */
export type PartId = 1 | 2;

/**
 * @deprecated Use readFileByPath() instead
 */
export const readFile = async (
  taskId: TaskId,
  isExample = false
): Promise<string[]> => {
  const file = `./src/adventofcode/2021/day${taskId}/${
    isExample ? "example" : "task"
  }.txt`;
  const text = await Deno.readTextFile(file);
  const lines = text.split("\n");
  lines.pop();
  return lines;
};

/**
 * @deprecated Use execWithTime() instead
 */
export const withTime = (handler: () => number, task: TaskId, part: PartId) => {
  // Use with --allow-hrtime
  const start = performance.now();
  const result = handler();
  const end = performance.now();
  const diff = end - start;
  const white = "color: #fff";
  const volt = "color: #bada55";
  console.log(`%c Day ${task} Part ${part}: %c ${result} `, white, volt);
  console.log(
    `%c Task execution took %c ${diff.toFixed(3)} %c milliseconds.`,
    white,
    volt,
    white
  );
};

export const readFileByPath = async (
  path: string,
  isExample = false
): Promise<string[]> => {
  const parts = path.split("/");
  parts.pop();
  const file = [...parts, isExample ? "sample.txt" : "task.txt"].join("/");
  console.log("Reading the file:", file);
  const text = await Deno.readTextFile(file);
  const lines = text.split("\n");
  lines.pop();
  return lines;
};

export const execWithTime = (handler: () => number, path: string): void => {
  const parts = path.split("/");
  const year = parts.at(-3);
  const day = parts.at(-2);
  const task = parts.at(-1)?.split(".").at(0);
  // Use with --allow-hrtime
  const start = performance.now();
  const result = handler();
  const end = performance.now();
  const diff = end - start;
  const white = "color: #fff";
  const volt = "color: #bada55";
  console.log("%c =====================", white);
  console.log(`%c Year: %c ${year} `, white, volt);
  console.log(`%c Day: %c ${day} `, white, volt);
  console.log(`%c Part: %c ${task} `, white, volt);
  console.log("%c =====================", white);
  console.log(
    `%c Task execution took: %c ${diff.toFixed(
      3
    )} %c milliseconds. The result was %c ${result}`,
    white,
    volt,
    white,
    volt
  );
  console.log("%c =====================", white);
};
