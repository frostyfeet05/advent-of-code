import { Puzzle } from './shared';

export const solve = (input: string): number => {
  const pipes = Puzzle.parse(input);

  return Math.floor((pipes.length + 1) / 2);
};
