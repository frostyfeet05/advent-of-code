type Card = {
  cardNumber: number;
  winningNumbers: number[];
  numbers: number[];
};

export const Puzzle = {
  parse: (input: string): Card[] => input.split('\n').map(parseCard),
};

const parseCard = (input: string): Card => {
  const [card, numbersLineStr] = input.split(': ');
  const [winningNumbersStr, numbersStr] = numbersLineStr.split(' | ');

  const cardNumber = parseInt(card.split(' ')[1]);
  const numbers = numbersStr
    .split(' ')
    .filter((str) => str.length > 0)
    .map(Number);
  const winningNumbers = winningNumbersStr
    .split(' ')
    .filter((str) => str.length > 0)
    .map(Number);

  return { cardNumber, winningNumbers, numbers };
};
