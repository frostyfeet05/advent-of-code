import {input, Passport} from './shared';

const solve = (input: string): number => {
    const passports = Passport.parse(input);

    return passports
        .map(Passport.isValid)
        .filter(Boolean)
        .length;
};

const result = solve(input);
console.log(`Result is ${result}`);

export {};
