import { Puzzle } from './shared';

export const solve = (input: string): number => {
  const histories = Puzzle.parse(input);
  const predictions = histories.map(Puzzle.extrapolate);
  return predictions.reduce((a, b) => a + b, 0);
};
