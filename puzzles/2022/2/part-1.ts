import {input, RockPaperScissors} from './shared';

const solve = (input: string): number => {
    const game = RockPaperScissors.parse(input);
    return RockPaperScissors.countEasyScore(game);
};

const result = solve(input);
console.log(`Result is ${result}`);

export {};
