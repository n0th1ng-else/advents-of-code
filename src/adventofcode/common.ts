type TaskId =
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
