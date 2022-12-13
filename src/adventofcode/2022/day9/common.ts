interface Coordinate {
  x: number;
  y: number;
}

type Rope = Coordinate[];

const MOVE_TYPE = ["R", "U", "L", "D"] as const;

const isMove = (item: string): item is typeof MOVE_TYPE[number] =>
  MOVE_TYPE.some((i) => i === item);

interface Move {
  direction: typeof MOVE_TYPE[number];
  length: number;
}

const moveHead = (direction: typeof MOVE_TYPE[number], rope: Rope): Rope => {
  let head = rope.shift();
  if (!head) {
    return rope;
  }

  switch (direction) {
    case "U": {
      head = {
        ...head,
        y: head.y - 1,
      };
      break;
    }
    case "D": {
      head = {
        ...head,
        y: head.y + 1,
      };
      break;
    }
    case "L": {
      head = {
        ...head,
        x: head.x - 1,
      };
      break;
    }
    case "R": {
      head = {
        ...head,
        x: head.x + 1,
      };
      break;
    }
  }

  return [head, ...rope];
};

const moveTail = (rope: Rope, index: number): Rope => {
  const head = rope.at(index - 1);
  const tail = rope.at(index);
  if (!head || !tail) {
    return rope;
  }
  const dV = head.y - tail.y;
  const dH = head.x - tail.x;
  let minV = Math.floor(Math.abs(dV / 2));
  let minH = Math.floor(Math.abs(dH / 2));
  const mV = !minV && dV && minH ? 1 : minV;
  const mH = !minH && dH && minV ? 1 : minH;
  const fV = dV < 0 ? -1 : 1;
  const fH = dH < 0 ? -1 : 1;

  return rope.map((segment, ind) => {
    if (ind === index) {
      return {
        x: tail.x + mH * fH,
        y: tail.y + mV * fV,
      };
    }

    return segment;
  });
};

const markVisited = (direction: typeof MOVE_TYPE[number], rope: Rope): Rope => {
  let r = moveHead(direction, rope);

  for (let i = 1; i < r.length; i++) {
    r = moveTail(r, i);
  }
  return r;
};

const getId = (c?: Coordinate) => (c ? `${c.x}-${c.y}` : "");

export const approximateRope = (length: number) => (rows: string[]) => {
  const moves = rows.map((row) => {
    const parts = row.split(" ");
    if (!isMove(parts[0])) {
      throw new Error("input what?");
    }
    const item: Move = {
      direction: parts[0],
      length: Number(parts[1]),
    };
    return item;
  });

  let rope: Rope = new Array(length).fill(null).map(() => {
    const segment: Coordinate = {
      x: 0,
      y: 0,
    };
    return segment;
  });

  const visited: Record<string, true> = {
    [getId(rope.at(-1))]: true,
  };

  do {
    const move = moves.shift();
    if (move) {
      for (let i = 0; i < move.length; i++) {
        rope = markVisited(move.direction, rope);

        visited[getId(rope.at(-1))] = true;
      }
    }
  } while (moves.length);

  return Object.keys(visited).length;
};
