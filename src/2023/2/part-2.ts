import { Puzzle, type Game, type Reveal } from './shared';

export const solve = (input: string): number => {
  const games = Puzzle.parse(input);

  const powers = games.map(calculatePower);

  return powers.reduce((a, b) => a + b);
};

type Map = { [key: string]: number };

const calculatePower = (game: Game): number => {
  const cubes: Map = game.rounds
    .flatMap((r) => r.reveals)
    .reduce((a: Map, b: Reveal) => {
      return {
        ...a,
        [b.cube]: Math.max(a[b.cube] || 0, b.amount),
      };
    }, {});
  return Object.values(cubes).reduce((a, b) => a * b);
};
