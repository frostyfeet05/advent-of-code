import { Puzzle, input, Spring } from './shared';

const solve = (input: string): number => {
  const springs = Puzzle.parse(input);
  const possibleSprings = springs.flatMap(Spring.generatePossibleSprings);
  return possibleSprings.length;
};

const result = solve(input);
console.log(`Result is ${result}`);

export {};
