const input = ``;

const solve = (input: string): number => {
    return input.split('').map(x => (x === '(' ? 1 : -1) as number).reduce((a, b) => a + b);
}

const result = solve(input);
console.log(`Result is ${result}`);

export {};
