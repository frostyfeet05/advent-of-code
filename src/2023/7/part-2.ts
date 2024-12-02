import { Puzzle, input, Hand } from './shared';

const solve = (input: string): number => {
  const hands = Puzzle.parse(input, true);
  return hands.map((hand, index) => calculateRank(hand, hands.length - index)).reduce((a, b) => a + b);
};

const calculateRank = (hand: Hand, position: number): number => hand.bid * position;

const result = solve(input);
console.log(`Result is ${result}`);

export {};
