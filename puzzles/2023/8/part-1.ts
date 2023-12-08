import { Puzzle, input } from './shared';

const solve = (input: string): number => {
  const map = Puzzle.parse(input);

  let steps = 0;
  let currentNode = 'AAA';
  let currentInstruction, nextMove;
  while (currentNode !== 'ZZZ') {
    currentInstruction = map.instructions[steps % map.instructions.length];
    nextMove = map.map[currentNode][currentInstruction];

    steps++;
    console.log(`Step ${steps}: node ${currentNode} going ${currentInstruction}: ${nextMove}`);

    currentNode = nextMove;
  }

  return steps;
};

const result = solve(input);
console.log(`Result is ${result}`);

export {};
