import { FlatCoordinate } from "../../common/types.ts";
import { getFlatCoordinateId } from "../../common/utils.ts";

const getDirectionChar = (curr: FlatCoordinate): string => {
  if (curr.i) {
    return curr.i > 0 ? "V" : "^";
  } else {
    return curr.j > 0 ? ">" : "<";
  }
};
const canPipeThrough = (curr: FlatCoordinate, char: string): boolean => {
  if (char === "-") {
    return !curr.i;
  }

  if (char === "|") {
    return !curr.j;
  }

  throw new Error(`"${char}" not supported`);
};
const changeDirection = (
  curr: FlatCoordinate,
  char: string,
): FlatCoordinate => {
  if (char === "\\") {
    return {
      i: curr.j,
      j: curr.i,
    };
  }

  if (char === "/") {
    return {
      i: -1 * curr.j,
      j: -1 * curr.i,
    };
  }
  throw new Error("now supported");
};
const detectEnergizedPositions = (
  rows: string[],
  prev: FlatCoordinate,
  direction: FlatCoordinate,
  storage: string[],
  commands: string[],
): string[] => {
  const current: FlatCoordinate = {
    i: prev.i + direction.i,
    j: prev.j + direction.j,
  };
  const storageId = `${getFlatCoordinateId(current)}${getDirectionChar(
    direction,
  )}`;

  if (current.i < 0 || current.i > rows.length - 1) {
    return [...storage, ...commands];
  }
  if (current.j < 0 || current.j > rows[0].length - 1) {
    return [...storage, ...commands];
  }

  const char = rows[current.i][current.j];

  if (char === ".") {
    if (!storage.includes(storageId)) {
      storage.push(storageId);
      return detectEnergizedPositions(
        rows,
        current,
        direction,
        storage,
        commands,
      );
    } else {
      return [...storage, ...commands];
    }
  }

  if (!commands.includes(storageId)) {
    commands.push(storageId);
  }

  if (["\\", "/"].includes(char)) {
    const newDirection = changeDirection(direction, char);
    return detectEnergizedPositions(
      rows,
      current,
      newDirection,
      storage,
      commands,
    );
  }

  if (canPipeThrough(direction, char)) {
    if (!storage.includes(storageId)) {
      storage.push(storageId);
      return detectEnergizedPositions(
        rows,
        current,
        direction,
        storage,
        commands,
      );
    } else {
      return [...storage, ...commands];
    }
  } else {
    if (char === "|") {
      return [
        ...detectEnergizedPositions(
          rows,
          current,
          {
            i: 1,
            j: 0,
          },
          storage,
          commands,
        ),
        ...detectEnergizedPositions(
          rows,
          current,
          {
            i: -1,
            j: 0,
          },
          storage,
          commands,
        ),
      ];
    }

    if (char === "-") {
      return [
        ...detectEnergizedPositions(
          rows,
          current,
          {
            i: 0,
            j: -1,
          },
          storage,
          commands,
        ),
        ...detectEnergizedPositions(
          rows,
          current,
          {
            i: 0,
            j: 1,
          },
          storage,
          commands,
        ),
      ];
    }
  }

  throw new Error("not supported");
};

export const getEnergizedCount = (
  rows: string[],
  start: FlatCoordinate,
  direction: FlatCoordinate,
): number => {
  const energizedPositions = detectEnergizedPositions(
    rows,
    start,
    direction,
    [],
    [],
  );

  const adjusted = energizedPositions.map((pos) => pos.slice(0, -1));
  const uniq = new Set(adjusted);
  return uniq.size;
};
