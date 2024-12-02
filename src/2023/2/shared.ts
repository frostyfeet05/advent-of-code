type Cube = 'red' | 'blue' | 'green';
export type Reveal = { cube: Cube; amount: number };
export type Round = { reveals: Reveal[] };
export type Game = { id: number; rounds: Round[] };

export const Puzzle = {
  parse: (input: string): Game[] => parseGames(input),
};

const parseGames = (input: string): Game[] => input.split('\n').map(parseGame);

const parseGame = (input: string): Game => {
  const [gameMeta, gameRounds] = input.split(': ', 2);
  const gameId = parseInt(gameMeta.split(' ')[1]);

  return {
    id: gameId,
    rounds: gameRounds.split('; ').map(parseRound),
  };
};

const parseRound = (input: string): Round => {
  const reveals = input.split(', ');
  return {
    reveals: reveals.map(parseReveal),
  };
};

const parseReveal = (input: string): Reveal => {
  const [amountStr, cube] = input.split(' ');
  return {
    amount: parseInt(amountStr),
    cube: cube as Cube,
  };
};
