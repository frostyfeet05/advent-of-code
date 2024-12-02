import { Puzzle } from './shared';

export const solve = (input: string): number => {
  const map = Puzzle.parse(input);

  const currentNodes = Object.keys(map.map).filter((x) => x.endsWith('A'));
  const steps = currentNodes.map((node) => {
    let steps = 0;
    let currentInstruction: string, nextMove: string;
    let currentNode = node;

    while (!currentNode.endsWith('Z')) {
      currentInstruction = map.instructions[steps % map.instructions.length];
      nextMove = map.map[currentNode][currentInstruction];
      steps++;
      currentNode = nextMove;
    }

    return steps;
  });

  return steps.reduce((a, b) => lcm(a, b), 1);
};

const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
const lcm = (a: number, b: number): number => (a * b) / gcd(a, b);
