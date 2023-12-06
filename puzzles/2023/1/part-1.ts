import {Puzzle, input} from './shared';

const solve = (input: string): number => {
    const lines = Puzzle.parse(input);
    const numbersOnly = lines
        .map((line) =>
            line
                .split('')
                .filter((x) => /[^a-z]$/.test(x))
                .join(''),
        )
        .map((line) => {
            const first = line[0];
            const last = line[line.length - 1];
            return parseInt(`${first}${last}`);
        });

    return numbersOnly.reduce((a, b) => a + b);
};

const result = solve(input);
console.log(`Result is ${result}`);

export {};
