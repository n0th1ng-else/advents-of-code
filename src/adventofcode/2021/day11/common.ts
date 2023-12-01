export const parseInput = (lines: string[]): number[][] =>
  lines.filter((line) => line).map((line) => line.split("").map(Number));

const charge = (octopuses: number[][]): void =>
  octopuses.forEach((line, i) =>
    line.forEach((_, j) => {
      octopuses[i][j] += 1;
    }),
  );

const countAndNormalizeFlashes = (octopuses: number[][]): number =>
  octopuses.reduce(
    (sum, line, i) =>
      sum +
      line.reduce((s, item, j) => {
        if (item === -1) {
          octopuses[i][j] = 0;
          return s + 1;
        }
        return s;
      }, 0),
    0,
  );

const triggerOctopus = (octopuses: number[][], ind: number, jnd: number) => {
  [-1, 0, 1].forEach((io) =>
    [-1, 0, 1].forEach((jo) => {
      if (typeof octopuses[ind + io]?.[jnd + jo] !== "number") {
        return;
      }
      if (octopuses[ind + io][jnd + jo] === -1) {
        return;
      }
      octopuses[ind + io][jnd + jo] += 1;
    }),
  );
  octopuses[ind][jnd] = -1;
};

type Octopus = [number, number];

const triggerOctopuses = (octopuses: number[][]): boolean => {
  const triggered = octopuses.reduce<Octopus[]>((changed, line, i) => {
    const js = line.reduce<number[]>((pos, item, j) => {
      if (item > 9) {
        return [...pos, j];
      }
      return pos;
    }, []);
    const pairs = js.map<Octopus>((j) => [i, j]);
    return [...changed, ...pairs];
  }, []);

  triggered.forEach((oct) => triggerOctopus(octopuses, ...oct));
  return Boolean(triggered.length);
};

export const renderFlashes = (octopuses: number[][]): void =>
  console.log(octopuses.map((line) => line.join(" ")).join("\n"), "\n\n\n");

export const experienceFlash = (octopuses: number[][]): number => {
  charge(octopuses);
  do {} while (triggerOctopuses(octopuses));

  const count = countAndNormalizeFlashes(octopuses);
  // renderFlashes(octopuses);
  return count;
};
