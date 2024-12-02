import {Assignments, input} from './shared';

const solve = (input: string): number => {
    const pairs = Assignments.parse(input);
    return pairs.filter(Assignments.isFullyContained)
        .length;
};

const result = solve(input);
console.log(`Result is ${result}`);

export {};
