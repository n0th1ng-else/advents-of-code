export type MapFork = {
  id: string;
  L: string;
  R: string;
};

export const parseFork = (row: string): MapFork => {
  const parts = row.split(" = ");
  const id = parts.at(0) || "";
  const values = parts.at(1)?.slice(1, -1).split(", ") || "";
  return {
    id,
    L: values.at(0) || "",
    R: values.at(1) || "",
  };
};

export const findForkCycle = (
  initial: MapFork,
  commandsPool: string[],
  forks: Record<string, MapFork>,
  isFinished: (step: MapFork) => boolean,
): number => {
  let cycle = 0;
  let step = initial;
  do {
    commandsPool.forEach((command) => {
      if (isFinished(step)) {
        return;
      }
      const next = step[command as "L" | "R"];
      step = forks[next];
      cycle += 1;
    });
  } while (!isFinished(step));

  return cycle;
};
