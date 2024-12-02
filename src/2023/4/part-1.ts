import { Puzzle } from './shared';

export const solve = (input: string): number => {
  const cards = Puzzle.parse(input);

  const win = cards
    .map((card) => card.winningNumbers.filter((winning) => card.numbers.includes(winning)).length)
    .filter((wins) => wins > 0)
    .map((wins) => Math.pow(2, wins - 1))
    .reduce((a, b) => a + b);

  return win;
};
