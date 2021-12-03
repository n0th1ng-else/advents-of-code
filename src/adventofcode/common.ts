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

export type PartId = 1 | 2;

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
