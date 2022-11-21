import {BoardingPass, input} from '../shared';

const solve = (input: string): number => {
    const passes = BoardingPass.parse(input);
    const previousPass = passes
        .map(pass => pass.seatId)
        .sort((a, b) => a - b)
        .find((seat, index, array) => index !== 0 && index !== array.length - 1 && (seat + 2) === array[index + 1]);

    return (previousPass ?? 0) + 1

};

const result = solve(input);
console.log(`Result is ${result}`);

export {};
