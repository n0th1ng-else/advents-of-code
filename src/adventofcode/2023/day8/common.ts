export type MapFork = {
  id: string;
  L: string;
  R: string;
};

export const parseFork = (row: string): MapFork => {
  const parts = row.split(" = ");
  const id = parts.at(0) || "";
  const values = parts.at(1)?.slice(1, -1).split(", ") || "";
  return {
    id,
    L: values.at(0) || "",
    R: values.at(1) || "",
  };
};
