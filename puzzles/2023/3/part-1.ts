import {Puzzle, input} from './shared';

const solve = (input: string): number => {
    const {parts, symbols} = Puzzle.parse(input);

    const adjacentParts = symbols.flatMap((symbol) => {
        const filtered = parts.filter((part) => Math.abs(part.from.y - symbol.position.y) <= 1);
        return filtered.filter((part) => part.from.x <= symbol.position.x + 1 && part.to.x >= symbol.position.x - 1);
    });

    return adjacentParts.reduce((a, b) => a + b.partNumber, 0);
};

const result = solve(input);
console.log(`Result is ${result}`);

export {};
