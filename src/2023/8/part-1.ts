import { Puzzle } from './shared';

export const solve = (input: string): number => {
  const map = Puzzle.parse(input);

  let steps = 0;
  let currentNode = 'AAA';
  let currentInstruction, nextMove;
  while (currentNode !== 'ZZZ') {
    currentInstruction = map.instructions[steps % map.instructions.length];
    nextMove = map.map[currentNode][currentInstruction];
    steps++;
    currentNode = nextMove;
  }

  return steps;
};
