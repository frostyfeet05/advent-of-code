import {CPU, input} from './shared';

const solve = (input: string): number => {
    const instructions = CPU.parse(input);
    return CPU.findSignalStrength(instructions);
};

const result = solve(input);
console.log(`Result is ${result}`);

export {};
