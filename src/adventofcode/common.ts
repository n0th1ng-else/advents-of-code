export const readFile = async (
  taskNum: number,
  isExample = false
): Promise<string[]> => {
  const file = `./src/adventofcode/2021/day${taskNum}/${
    isExample ? "example" : "task"
  }.txt`;
  const text = await Deno.readTextFile(file);
  const lines = text.split("\n");
  lines.pop();
  return lines;
};
