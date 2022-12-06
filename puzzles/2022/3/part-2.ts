import {input, Rucksack} from './shared';

const solve = (input: string): number => {
    const rucksacks = Rucksack.parse(input);
    return rucksacks
        .reduce((groups: Rucksack[][], rucksack, index) => {
            const group = Math.floor(index / 3);
            groups[group] = [...(groups[group] || []), rucksack];
            return groups;
        }, [])
        .reduce((sum: number, rucksack) => {
            return sum + Rucksack.convertToPriority(Rucksack.findBadge(rucksack));
        }, 0);
};

const result = solve(input);
console.log(`Result is ${result}`);

export {};
