import { Puzzle } from './shared';

export const solve = (input: string): number => {
  const list = Puzzle.parse(input);
  return Puzzle.calculateDistances(list);
};
