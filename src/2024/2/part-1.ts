import { Puzzle } from './shared';

export const solve = (input: string): number => {
  const reports = Puzzle.parse(input);
  return reports.filter(Puzzle.isSafeReport).length;
};
