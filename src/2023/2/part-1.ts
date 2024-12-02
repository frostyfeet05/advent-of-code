import { type Game, Puzzle } from './shared';

export const solve = (input: string): number => {
  const games = Puzzle.parse(input);

  const gameConfig = {
    red: 12,
    green: 13,
    blue: 14,
  };

  const possibleGames = games.filter((g) =>
    g.rounds.every((r) => r.reveals.every((c) => gameConfig[c.cube] >= c.amount)),
  );
  return possibleGames.reduce((a: number, b: Game) => a + b.id, 0);
};
