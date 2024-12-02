import {Monkey, sample, input} from './shared';

const solve = (input: string): number => {
    const monkeys = Monkey.parse(input);
    return Monkey.monkeyBusiness(monkeys, 10000, false);
}

const result = solve(input);
console.log(`Result is ${result}`);

export {};
