export type RaceRound = {
  time: number;
  dist: number;
};

export const getRoundOptions = (round: RaceRound): number => {
  const { dist, time } = round;
  let total = 0;

  for (let i = 0; i < time; i++) {
    const accelerated = i;
    const moved = accelerated * (time - i);
    if (moved > dist) {
      total += 1;
    }
  }

  return total;
};
