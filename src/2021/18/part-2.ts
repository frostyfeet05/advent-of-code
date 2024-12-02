import {input, processInput, Snailfish} from './shared';


const solve = (input: string): number => {
    const snailfishes = processInput(input);

    const sums: Snailfish[] = snailfishes.flatMap(left => {
        return snailfishes.map(right => Snailfish.add(left, right))
    });

    const magnitudes: number[] = sums.map(sum => Snailfish.magnitude(sum)).map(magnitude => magnitude[0].value);
    return magnitudes.reduce((a, b) => Math.max(a, b));
};

const result = solve(input);
console.log(`Result is ${result}`);

export {};
