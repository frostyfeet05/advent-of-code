import {input, Monkey} from './shared';

const solve = (input: string): number => {
    const monkeys = Monkey.parse(input);
    return Monkey.monkeyBusiness(monkeys);
};

const result = solve(input);
console.log(`Result is ${result}`);

export {};
