import { Puzzle } from './shared';

export const solve = (input: string): number => {
  const hands = Puzzle.parse(input, true);
  return hands.map((hand, index) => Puzzle.calculateRank(hand, hands.length - index)).reduce((a, b) => a + b);
};
