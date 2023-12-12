import { Puzzle, input } from './shared';

const solve = (input: string): number => {
  const almanac = Puzzle.parse(input);
  const locations = almanac.seeds.map((seed) => Puzzle.seedToLocation(seed, almanac));
  return locations.reduce((a, b) => Math.min(a, b));
};

const result = solve(input);
console.log(`Result is ${result}`);

export {};
