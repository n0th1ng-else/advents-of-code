type CamelGameHand = {
  hand: string;
  bid: number;
  bars: number[];
};

export const getCamelHands = (
  rows: string[],
  barsHandler: (hand: string) => number[],
): CamelGameHand[] => {
  return rows.map((row) => {
    const [hand, bid] = row.split(" ");
    return {
      hand,
      bid: Number(bid),
      bars: barsHandler(hand),
    };
  });
};

export const getCamelBarsPriority = (a: number[], b: number[]): number => {
  if (a[0] !== b[0]) {
    return b[0] - a[0];
  }

  if (a[1] !== b[1]) {
    return b[1] - a[1];
  }

  return 0;
};

export const sortCamelHands = (
  hands: CamelGameHand[],
  gameCards: string[],
): CamelGameHand[] => {
  return hands.sort((a, b) => {
    const bar = getCamelBarsPriority(a.bars, b.bars);

    if (bar) {
      return bar;
    }

    for (let i = 0; i < b.hand.length; i++) {
      const aCard = a.hand[i];
      const bCard = b.hand[i];
      if (aCard === bCard) {
        continue;
      }
      const aIndex = gameCards.findIndex((gc) => gc === aCard);
      const bIndex = gameCards.findIndex((gc) => gc === bCard);
      return bIndex - aIndex;
    }

    return bar;
  });
};

export const getCamelResult = (hands: CamelGameHand[]): number => {
  return hands.reduce((acc, hand, rank) => {
    const offset = hands.length - rank;
    return acc + offset * hand.bid;
  }, 0);
};

export const getCamelBars = (hand: string, gameCards: string[]): number[] => {
  return gameCards
    .map((card) => hand.length - hand.replace(new RegExp(card, "g"), "").length)
    .filter(Boolean)
    .sort((a, b) => b - a);
};
