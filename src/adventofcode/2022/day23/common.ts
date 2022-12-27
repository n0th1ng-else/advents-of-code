type TwoD = [number, number];

type ElfDirection = {
  shift: TwoD;
  cells: TwoD[];
  name: string;
};

export const SIDES_MAP: Record<string, ElfDirection> = {
  N: {
    name: "North",
    shift: [-1, 0],
    cells: [
      [-1, -1],
      [-1, 0],
      [-1, 1],
    ],
  },
  S: {
    name: "South",
    shift: [1, 0],
    cells: [
      [1, -1],
      [1, 0],
      [1, 1],
    ],
  },
  W: {
    name: "West",
    shift: [0, -1],
    cells: [
      [-1, -1],
      [0, -1],
      [1, -1],
    ],
  },
  E: {
    name: "East",
    shift: [0, 1],
    cells: [
      [-1, 1],
      [0, 1],
      [1, 1],
    ],
  },
};

export const getId = (x: number, y: number): string => `${x}:${y}`;

export const parseId = (id: string): TwoD => {
  const parts = id.split(":");
  return [Number(parts[0]), Number(parts[1])];
};

export const detectMoves = (
  map: Map<string, true>,
  sides: ElfDirection[]
): Map<string, string[]> => {
  const res = new Map<string, string[]>();

  for (let keyId of map.keys()) {
    const key = parseId(keyId);

    const hasNeighbour = sides.some((side) =>
      side.cells.some((cell) => {
        const ind: TwoD = [key[0] + cell[0], key[1] + cell[1]];
        return map.get(getId(...ind));
      })
    );

    if (!hasNeighbour) {
      const place = res.get(keyId) || [];
      res.set(keyId, [...place, keyId]);
    } else {
      const changed = sides.find((side) => {
        return side.cells.every((cell) => {
          const ind: TwoD = [key[0] + cell[0], key[1] + cell[1]];
          return !map.get(getId(...ind));
        });
      });

      if (!changed) {
        const place = res.get(keyId) || [];
        res.set(keyId, [...place, keyId]);
      } else {
        const newCoord: TwoD = [
          key[0] + changed.shift[0],
          key[1] + changed.shift[1],
        ];
        const place = res.get(getId(...newCoord)) || [];
        res.set(getId(...newCoord), [...place, keyId]);
      }
    }
  }

  return res;
};

export const applyMoves = (map: Map<string, string[]>): Map<string, true> => {
  const res = new Map<string, true>();
  for (let [key, value] of map) {
    if (value.length === 1) {
      res.set(key, true);
    }
    if (value.length > 1) {
      value.forEach((cell) => {
        res.set(cell, true);
      });
    }
  }
  return res;
};

export const parseInput = (rows: string[]): Map<string, true> => {
  return rows.reduce((m, row, i) => {
    const coords = row.split("");
    coords.forEach((coord, j) => {
      if (coord === "#") {
        m.set(getId(i, j), true);
      }
    });
    return m;
  }, new Map<string, true>());
};

export const getSides = () => [
  SIDES_MAP.N,
  SIDES_MAP.S,
  SIDES_MAP.W,
  SIDES_MAP.E,
];
