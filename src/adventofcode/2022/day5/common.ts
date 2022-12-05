const parseState = (rows: string[]): Record<number, string> => {
  const state: Record<number, string> = {};
  for (let i = 0; i < rows.at(-1).length; i++) {
    const craneId = rows.at(-1)?.[i];
    if (craneId === " ") {
      continue;
    }
    for (let j = 0; j < rows.length - 1; j++) {
      const block = rows[j]?.[i];
      if (!block || block === " ") {
        continue;
      }
      const line = state[craneId] || "";
      state[craneId] = `${block}${line}`;
    }
  }
  return state;
};

interface CraneCmd {
  count: number;
  from: number;
  to: number;
}

const parseCommands = (rows: string[]): CraneCmd[] => {
  return rows.map((row) => {
    // move 3 from 8 to 2
    const [count, from, to] = row
      .split(" ")
      .map((item) => Number(item))
      .filter((item) => !isNaN(item));
    return {
      count,
      from,
      to,
    };
  });
};
const parseRows = (rows: string[]) => {
  const separator = rows.findIndex((row) => !row);
  const state = parseState(rows.slice(0, separator));
  const commands = parseCommands(rows.slice(separator + 1));
  return { state, commands };
};
export const buildTask =
  (type = 9000 | 9001) =>
  (rows: string[]): number => {
    const { state, commands } = parseRows(rows);
    const final = commands.reduce<Record<number, string>, CraneCmd>(
      (st, cmd) => {
        const from = st[cmd.from];
        const to = st[cmd.to];
        const diff =
          type === 9000
            ? from
                .slice(from.length - cmd.count)
                .split("")
                .reverse()
                .join("")
            : from.slice(from.length - cmd.count);
        st[cmd.from] = from.slice(0, from.length - cmd.count);
        st[cmd.to] = `${to}${diff}`;
        return st;
      },
      state
    );

    return new Array(10).fill(null).reduce((acc, item, index) => {
      const chars = final[index];
      const char = chars?.at(-1);
      return char ? `${acc}${char}` : acc;
    }, "");
  };
