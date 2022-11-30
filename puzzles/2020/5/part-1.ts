import {BoardingPass, input} from './shared';

const solve = (input: string): number => {
    const passes = BoardingPass.parse(input);
    return passes.reduce((max, value) => Math.max(max, value.seatId), -1);
};

const result = solve(input);
console.log(`Result is ${result}`);

export {};
