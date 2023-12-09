import { Puzzle, input } from './shared';

const solve = (input: string): number => {
  const histories = Puzzle.parse(input);
  const predictions = histories.map(Puzzle.extrapolateBackwards);
  return predictions.reduce((a, b) => a + b, 0);
};

const result = solve(input);
console.log(`Result is ${result}`);

export {};
