export interface VetCoordinate {
  x: number;
  y: number;
}

export interface VetLine {
  start: VetCoordinate;
  end: VetCoordinate;
}

const parseCoordinate = (coordinate: string): VetCoordinate => {
  const [x, y] = coordinate.split(",");
  return {
    x: Number(x),
    y: Number(y),
  };
};

const parseLine = (row: string): VetLine => {
  const [start, end] = row.split(" -> ");
  return {
    start: parseCoordinate(start),
    end: parseCoordinate(end),
  };
};

export const parseInput = (rows: string[]): VetLine[] => {
  return rows.filter((row) => row).map((row) => parseLine(row));
};

export const calculateBadPlaces = (map: Record<string, number>) =>
  Object.keys(map).reduce((acc, key) => (map[key] > 1 ? acc + 1 : acc), 0);

export const getId = (x: number, y: number): string => `${x}-${y}`;

export const isLineStraight = ({ start: s, end: e }: VetLine): boolean =>
  s.x === e.x || s.y === e.y;

export const getStraightLines = (items: VetLine[]): VetLine[] =>
  items.filter((line) => isLineStraight(line));

export const updateMapStraightLines = (
  map: Record<string, number>,
  start: VetCoordinate,
  end: VetCoordinate
): Record<string, number> => {
  const vertical = start.x === end.x;
  const dimension = vertical ? start.x : start.y;
  const diff = Math.abs(vertical ? start.y - end.y : start.x - end.x);
  const init = vertical ? Math.min(start.y, end.y) : Math.min(start.x, end.x);
  const range = new Array(diff + 1).fill(0).map((_, i) => i);
  return range.reduce((acc, point) => {
    const id = getId(
      vertical ? dimension : init + point,
      vertical ? init + point : dimension
    );
    acc[id] = acc[id] ? acc[id] + 1 : 1;
    return acc;
  }, map);
};
