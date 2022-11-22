import {input, Rule} from '../shared';

const solve = (input: string): number => {
    const rules = Rule.parse(input);
    return Rule.amountFitInBag('shiny gold', rules);
};

const result = solve(input);
console.log(`Result is ${result}`);

export {};
