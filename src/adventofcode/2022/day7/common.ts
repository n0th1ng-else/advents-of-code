const changeDir = (current: string, location = ""): string => {
  const cParts = current === "/" ? [""] : current.split("/");
  const lParts = location.split("/");

  const r = lParts
    .reduce((path, part) => {
      if (part === "..") {
        path.pop();
        return path;
      }
      if (part === "") {
        return [""];
      }
      path.push(part);
      return path;
    }, cParts)
    .join("/");

  return r || "/";
};

const isCmd = (row: string): boolean => row.startsWith("$");

const getPath = (path: string, name: string): string =>
  path === "/" ? `${path}${name}` : `${path}/${name}`;

interface FSObject {
  isFolder: boolean;
  size: number;
  sub: string;
  path: string;
}

const calcSpace = (
  path: string,
  files: Record<string, FSObject>,
  rows: string[]
): string[] => {
  let row: string | undefined;
  do {
    row = rows.shift();
    if (!row || isCmd(row)) {
      break;
    }

    const [typeOrSize, name] = row.split(" ");

    if (typeOrSize === "dir") {
      files[getPath(path, name)] = {
        isFolder: true,
        size: 0,
        path: getPath(path, name),
        sub: path,
      };
    } else {
      files[getPath(path, name)] = {
        isFolder: false,
        size: Number(typeOrSize),
        path: getPath(path, name),
        sub: path,
      };
    }
  } while (row && !isCmd(row));

  return [row || "", ...rows];
};

const calcSize = (item: FSObject, fs: Record<string, FSObject>): number => {
  const items = Object.values(fs).filter((fsi) => fsi.sub === item.path);

  return items.reduce((sum, itm) => {
    if (itm.isFolder) {
      if (itm.size) {
        return sum + itm.size;
      }

      itm.size = calcSize(itm, fs);
      return sum + itm.size;
    }

    return sum + itm.size;
  }, 0);
};

export const getFilesystem = (rows: string[]): Record<string, FSObject> => {
  let currentPath = "/";
  const filesystem: Record<string, FSObject> = {
    "/": {
      isFolder: true,
      size: 0,
      sub: "",
      path: "/",
    },
  };
  do {
    const row = rows.shift();
    if (!row) {
      break;
    }
    if (isCmd(row)) {
      const [, cmd, arg] = row.split(" ");
      if (cmd === "cd") {
        currentPath = changeDir(currentPath, arg);
      }
      if (cmd === "ls") {
        rows = calcSpace(currentPath, filesystem, rows);
      }
    }
  } while (rows.length);

  filesystem["/"].size = calcSize(filesystem["/"], filesystem);

  return filesystem;
};
