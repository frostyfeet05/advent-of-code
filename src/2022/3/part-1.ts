import {input, Rucksack} from './shared';

const solve = (input: string): number => {
    const rucksacks = Rucksack.parse(input);
    return rucksacks.reduce((sum: number, rucksack) => {
        return sum + Rucksack.convertToPriority(Rucksack.findDuplicate(rucksack));
    }, 0);
};

const result = solve(input);
console.log(`Result is ${result}`);

export {};
