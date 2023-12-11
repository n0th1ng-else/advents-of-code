import type { FlatCoordinate } from "../../common/types.ts";

const GALAXY_SYMBOL = "#";

type ExpandedLines = {
  rows: Set<number>;
  columns: Set<number>;
};

const getExpandedLines = (system: string[]): ExpandedLines => {
  const rows = new Set<number>();
  const columns = new Set<number>();
  // expand vertically
  for (let i = 0; i < system.length; i++) {
    const hasGalaxy = system[i].includes(GALAXY_SYMBOL);
    if (!hasGalaxy) {
      rows.add(i);
    }
  }

  //expand horizontally
  for (let j = 0; j < system[0].length; j++) {
    let hasGalaxy = false;
    for (let i = 0; i < system.length; i++) {
      hasGalaxy = hasGalaxy || system[i][j] === GALAXY_SYMBOL;
    }
    if (!hasGalaxy) {
      columns.add(j);
    }
  }

  return {
    rows,
    columns,
  };
};

const findGalaxies = (system: string[]): FlatCoordinate[] => {
  const coordinates: FlatCoordinate[] = [];
  for (let i = 0; i < system.length; i++) {
    for (let j = 0; j < system[0].length; j++) {
      if (system[i][j] === GALAXY_SYMBOL) {
        coordinates.push({ i, j });
      }
    }
  }
  return coordinates;
};

const findGalaxiesDistances = (galaxies: FlatCoordinate[]): number[] => {
  const distances: number[] = [];
  for (let i = 0; i < galaxies.length; i++) {
    for (let j = i + 1; j < galaxies.length; j++) {
      const distance =
        Math.abs(galaxies[i].i - galaxies[j].i) +
        Math.abs(galaxies[i].j - galaxies[j].j);
      distances.push(distance);
    }
  }
  return distances;
};

const adjustGalaxies = (
  galaxies: FlatCoordinate[],
  lines: ExpandedLines,
  multiplier: number,
): FlatCoordinate[] => {
  const rows = Array.from(lines.rows);
  const columns = Array.from(lines.columns);

  return galaxies.map((galaxy) => {
    const diffRows = rows.filter((row) => row < galaxy.i).length;
    const diffColumns = columns.filter((column) => column < galaxy.j).length;
    return {
      i: galaxy.i + diffRows * (multiplier - 1),
      j: galaxy.j + diffColumns * (multiplier - 1),
    };
  });
};

export const runGalaxiesDistancesExploration = (
  rows: string[],
  multiplier: number,
): number => {
  const expandedLines = getExpandedLines(rows);
  const galaxies = findGalaxies(rows);
  const fixedGalaxies = adjustGalaxies(galaxies, expandedLines, multiplier);
  const distances = findGalaxiesDistances(fixedGalaxies);
  const result = distances.reduce((acc, distance) => acc + distance, 0);
  return result;
};
