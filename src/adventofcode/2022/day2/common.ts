export interface Action {
  type: string;
  img: string;
  score: number;
  beats: string;
}

export const actions: Record<string, Action> = {
  A: {
    type: "A",
    img: "🪨",
    score: 1,
    beats: "C",
  },
  B: {
    type: "B",
    img: "🧻",
    score: 2,
    beats: "A",
  },
  C: {
    type: "C",
    img: "✂️",
    score: 3,
    beats: "B",
  },
};

export const roundOutcome = {
  win: 6,
  draw: 3,
  lose: 0,
};
