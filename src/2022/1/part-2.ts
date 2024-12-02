import {Elf, input} from './shared';

const solve = (input: string): number => {
    const elves = Elf.parse(input);
    const totalCalories = elves.map(elf => Elf.countCalories(elf)).sort((a, b) => b - a);
    return totalCalories[0] + totalCalories[1] + totalCalories[2];
};

const result = solve(input);
console.log(`Result is ${result}`);

export {};
