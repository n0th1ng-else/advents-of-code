export type TerminalCmdData = {
  rules: {
    left: string;
    right: string;
  }[];
  sequences: string[][];
};
export const readTerminalCommands = (rows: string[]): TerminalCmdData => {
  return rows.reduce<TerminalCmdData>(
    (acc, row) => {
      if (!row) {
        return acc;
      }
      if (row.includes("|")) {
        const [left, right] = row.split("|");
        acc.rules.push({
          left,
          right,
        });
        return acc;
      }

      const seq = row.split(",");
      acc.sequences.push(seq);
      return acc;
    },
    {
      rules: [],
      sequences: [],
    },
  );
};

export const isTerminalSequenceCorrect = (
  sequence: string[],
  rules: TerminalCmdData["rules"],
): boolean => {
  return sequence.every((num, index) => {
    const sl = sequence.slice(0, index);
    const numRules = rules
      .filter((rule) => rule.right === num)
      .map((rule) => rule.left);
    const group = new Set(numRules);
    return sl.every((n) => group.has(n));
  });
};
