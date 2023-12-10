import { Puzzle, input } from './shared';

const solve = (input: string): number => {
  const pipes = Puzzle.parse(input);

  return Math.floor((pipes.length + 1) / 2);
};

const result = solve(input);
console.log(`Result is ${result}`);

export {};
