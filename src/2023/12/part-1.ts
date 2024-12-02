import { Puzzle, Spring } from './shared';

export const solve = (input: string): number => {
  const springs = Puzzle.parse(input);
  const possibleSprings = springs.flatMap(Spring.generatePossibleSprings);
  return possibleSprings.length;
};
