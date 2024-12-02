import {input, Motion} from './shared';

const solve = (input: string): number => {
    const movements = Motion.parse(input);
    return Motion.countUniqueTailPositions(movements);
};

const result = solve(input);
console.log(`Result is ${result}`);

export {};
