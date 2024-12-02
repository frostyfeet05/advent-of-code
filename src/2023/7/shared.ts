type Hand = {
  cards: string;
  bid: number;
  type: number;
};

export const Puzzle = {
  parse: (input: string, withJoker = false): Hand[] =>
    input
      .split('\n')
      .map((line) => {
        const [cards, bidStr] = line.split(' ');
        return {
          cards,
          bid: parseInt(bidStr),
          type: calculateType(cards, withJoker),
        };
      })
      .sort((a, b) => compareHandType(a, b, withJoker)),
  calculateRank: (hand: Hand, position: number): number => hand.bid * position,
};

const compareHandType = (first: Hand, second: Hand, withJoker: boolean): number => {
  const firstType = first.type;
  const secondType = second.type;

  const diff = secondType - firstType;

  if (diff === 0) {
    return compareHandCards(first.cards, second.cards, withJoker);
  }

  return diff;
};

const compareHandCards = (first: string, second: string, withJoker: boolean, index: number = 0): number => {
  if (index >= first.length) {
    throw Error('Index out of bounds');
  }
  const cardValue: { [key: string]: number } = {
    A: 14,
    K: 13,
    Q: 12,
    J: withJoker ? 0 : 11,
    T: 10,
    '9': 9,
    '8': 8,
    '7': 7,
    '6': 6,
    '5': 5,
    '4': 4,
    '3': 3,
    '2': 2,
  };

  const firstCard = cardValue[first[index]];
  const secondCard = cardValue[second[index]];

  const diff = secondCard - firstCard;

  if (diff === 0) {
    return compareHandCards(first, second, withJoker, index + 1);
  }

  return diff;
};

type TypeMap = { [key: string]: number };
const calculateType = (cards: string, withJoker: boolean): number => {
  let typeMap: TypeMap = cards.split('').reduce(
    (a: TypeMap, b: string) => ({
      ...a,
      [b]: (a[b] || 0) + 1,
    }),
    {},
  );

  if (withJoker) {
    typeMap = replaceJokers(typeMap);
  }

  const typeValues = Object.values(typeMap);

  // five of a kind
  if (typeValues.length === 1 && typeValues.includes(5)) {
    return 6;
  }

  if (typeValues.length === 2) {
    // four of a kind
    if (typeValues.includes(4)) {
      return 5;
    }

    // full house
    if (typeValues.includes(3)) {
      return 4;
    }
  }

  if (typeValues.length === 3) {
    // three of a kind
    if (typeValues.includes(3) && typeValues.includes(1)) {
      return 3;
    }

    // two pair
    if (typeValues.includes(2) && typeValues.includes(1)) {
      return 2;
    }
  }

  // one pair
  if (typeValues.length === 4 && typeValues.includes(2)) {
    return 1;
  }

  // high card
  if (typeValues.length === 5) {
    return 0;
  }

  return -1;
};

const replaceJokers = (typeMap: TypeMap): TypeMap => {
  // get jokers
  const jokers = typeMap['J'];

  if (jokers > 0) {
    // special case: all jokers so don't replace anything
    if (jokers === 5) {
      return typeMap;
    }

    const newTypeMap = { ...typeMap };

    // remove jokers from hand
    delete newTypeMap['J'];

    // find highest value and card
    const highestValue = Object.values(newTypeMap).reduce((a, b) => Math.max(a, b));
    const highestCard = Object.keys(newTypeMap).find((key) => newTypeMap[key] === highestValue) as string;

    // add jokers to highest value
    newTypeMap[highestCard] = newTypeMap[highestCard] + jokers;
    return newTypeMap;
  }
  return typeMap;
};
