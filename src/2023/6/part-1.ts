import { Puzzle } from './shared';

export const solve = (input: string): number => {
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

  return records.reduce((a, b) => a * b);
};
