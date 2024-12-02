import { Puzzle } from './shared';

export const solve = (input: string): number => {
  const { parts, symbols } = Puzzle.parse(input);

  const gears = symbols
    .map((symbol) => {
      const filtered = parts.filter((part) => Math.abs(part.from.y - symbol.position.y) <= 1);
      return filtered.filter((part) => part.from.x <= symbol.position.x + 1 && part.to.x >= symbol.position.x - 1);
    })
    .filter((gear) => gear.length === 2);

  return gears.map((part) => part.reduce((a, b) => a * b.partNumber, 1)).reduce((a, b) => a + b);
};
