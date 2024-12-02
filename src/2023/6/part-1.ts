import { Puzzle, input } from './shared';

const solve = (input: string): number => {
  const races = Puzzle.parse(input);

  const records = races.map((race) => {
    const recordDistances = [];
    for (let x = 1; x < race.distance; x++) {
      const distance = Puzzle.calculateDistance(x, race.time);
      if (distance > race.distance) {
        recordDistances.push(distance);
      }
    }
    return recordDistances.length;
  });

  console.log(races, records);
  return records.reduce((a, b) => a * b);
};

const result = solve(input);
console.log(`Result is ${result}`);

export {};
