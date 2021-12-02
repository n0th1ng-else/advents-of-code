export enum Direction {
  Forward,
  Up,
  Down,
}

export const getCommand = (cmd: string): [Direction, number] => {
  const [direction, val] = cmd.split(" ");
  switch (direction) {
    case "forward":
      return [Direction.Forward, Number(val)];
    case "up":
      return [Direction.Up, Number(val)];
    case "down":
      return [Direction.Down, Number(val)];
    default:
      throw new Error("Unknown command");
  }
};
