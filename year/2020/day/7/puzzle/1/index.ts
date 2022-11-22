import {input, Rule} from '../shared';

const solve = (input: string): number => {
    const rules = Rule.parse(input);
    return rules.filter(rule => Rule.canContain('shiny gold', rule, rules)).length;
};

const result = solve(input);
console.log(`Result is ${result}`);

export {};
