import { Puzzle } from './shared';

export const solve = (input: string): number => {
  const cards = Puzzle.parse(input);

  const win = cards.map((card) => {
    const wins = card.winningNumbers.filter((winning) => card.numbers.includes(winning)).length;
    return {
      cardNumber: card.cardNumber,
      wins,
      copies: 1,
    };
  });

  win.forEach((card, index) => {
    if (card.copies > 0) {
      for (let x = 0; x < card.wins; x++) {
        if (index + x + 1 < win.length) {
          win[index + x + 1].copies += card.copies;
        }
      }
    }
  });

  return win.reduce((a, b) => a + b.copies, 0);
};
