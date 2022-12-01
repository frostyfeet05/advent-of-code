import {Captcha, input} from './shared';

const solve = (input: string): number => {
    const captcha = Captcha.parse(input);
    return Captcha.sumHalfway(captcha);
};

const result = solve(input);
console.log(`Result is ${result}`);

export {};
