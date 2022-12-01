import {input, PasswordWithPolicy, Policy} from './shared';

const isValid = (input: PasswordWithPolicy): boolean => {
    const first = input.password[input.min - 1];
    const second = input.password[input.max - 1];

    return (first === input.letter && second !== input.letter) || (first !== input.letter && second === input.letter);
};

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
