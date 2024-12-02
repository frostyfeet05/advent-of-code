import { Puzzle } from './shared';

// TODO this one is not optimised, but it works
export const solve = (input: string): number => {
  const almanac = Puzzle.parse(input);

  let counter = 0;
  let lowest = Infinity;
  for (let x = 0; x < almanac.seeds.length; x += 2) {
    const from = almanac.seeds[x];
    const to = almanac.seeds[x] + almanac.seeds[x + 1];
    for (let y = from; y < to; y++) {
      counter++;
      const location = Puzzle.seedToLocation(y, almanac);
      if (location < lowest) {
        lowest = location;
      }

      if (counter % 10_000_000 === 0) {
        console.log(`Seed at iteration ${counter} was ${y}, location was ${location}...`);
      }
    }
  }

  return lowest;
};
