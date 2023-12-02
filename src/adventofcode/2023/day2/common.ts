export const COLORS = ["red", "green", "blue"];

export type GamePlay = Record<(typeof COLORS)[number], number>;

type Game = {
  gameId: number;
  plays: GamePlay[];
};

export const parseGame = (input: string): Game => {
  // Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
  const gameDefinition = input.split(":");
  const gameId = Number(gameDefinition.at(0)?.split(" ").at(1)?.trim());
  // 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
  const playsDefinitions =
    gameDefinition
      .at(1)
      ?.split(";")
      .map((d) => d.trim()) ?? [];

  const plays = playsDefinitions.map((playDefinition) => {
    const cubes = playDefinition.split(", ");
    return cubes.reduce<GamePlay>(
      (cubeAcc, cube) => {
        const cubeParts = cube.split(" ");
        const color = cubeParts.at(1)?.trim() ?? "";
        const value = Number(cubeParts.at(0)?.trim() ?? "");
        return {
          ...cubeAcc,
          [color]: value,
        };
      },
      { red: 0, green: 0, blue: 0 },
    );
  });

  return {
    gameId,
    plays,
  };
};
