import {Elf, input} from './shared';

const solve = (input: string): number => {
    const elves = Elf.parse(input);
    return elves.reduce((max, elf) => Math.max(max, Elf.countCalories(elf)), 0);
};

const result = solve(input);
console.log(`Result is ${result}`);

export {};
