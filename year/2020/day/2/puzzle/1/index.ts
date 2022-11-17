import {input, PasswordWithPolicy, Policy} from '../shared';

const isValid = (input: PasswordWithPolicy): boolean => {
    const amount = input.password
        .split('')
        .filter(char => input.letter === char)
        .length;

    return amount >= input.min && amount <= input.max;
}

const solve = (input: string): number => {
    const policies = Policy.parse(input);
    return policies
        .filter(isValid)
        .filter(Boolean)
        .length;
};

const result = solve(input);
console.log(`Result is ${result}`);

export {};
