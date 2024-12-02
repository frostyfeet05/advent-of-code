import { Puzzle, input } from './shared';

const solve = (input: string): number => {
  const race = Puzzle.parseSingleRace(input);
  const recordDistances = [];
  let hasRecord = false;
  for (let x = 1; x < race.distance; x++) {
    const distance = Puzzle.calculateDistance(x, race.time);
    if (distance > race.distance) {
      recordDistances.push(distance);
      hasRecord = true;
    } else if (hasRecord) {
      break;
    }
  }
  return recordDistances.length;
};

const result = solve(input);
console.log(`Result is ${result}`);

export {};
