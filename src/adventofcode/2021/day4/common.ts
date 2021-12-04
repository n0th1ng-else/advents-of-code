export type Board = string[];

interface Tables {
  table: Board;
  tables: Board[];
}

interface Input {
  turns: Board;
  boards: Board[];
}
export const parseInput = (rows: string[]): Input => {
  const turns = (rows.shift() || "").split(",");
  rows.shift();
  const boards = rows.reduce<Tables>(
    (acc, row) => {
      if (!row) {
        return {
          tables: [...acc.tables, acc.table],
          table: [],
        };
      }

      return {
        tables: acc.tables,
        table: [...acc.table, ` ${row} `],
      };
    },
    {
      tables: [],
      table: [],
    }
  );

  return {
    boards: [...boards.tables, boards.table],
    turns,
  };
};

export const updateBoards = (turn: string, boards: Board[]): Board[] => {
  return boards.map((board) =>
    board.map((row) =>
      row.replace(` ${turn} `, ` ${turn.length === 2 ? " " : ""}x `)
    )
  );
};

export const getBoardScore = (board: Board): number => {
  return board.reduce((acc, row) => {
    const parts = row.split(" ");
    return (
      acc +
      parts
        .map((part) => part.trim())
        .filter((part) => part !== "x")
        .map((part) => Number(part))
        .reduce((ac, part) => ac + part, 0)
    );
  }, 0);
};

export const getWinnerBoardId = (boards: Board[]): number => {
  return boards.findIndex((board) => {
    const horizontal = board.some((row) => row.replace(/ /g, "") === "xxxxx");
    if (horizontal) {
      return true;
    }
    const counter = board[0].split("");
    return (
      counter.findIndex((_, ind) => board.every((row) => row[ind] === "x")) !==
      -1
    );
  });
};
