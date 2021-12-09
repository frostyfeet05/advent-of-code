const input = ``;

const solve = (input: string): number => {
    const floors = input.split('').map(x => (x === '(' ? 1 : -1) as number);
    let counter = 0;
    let floor = 0;
    while (floor !== -1) {
        floor += floors[counter++];
    }
    return counter;
}

const result = solve(input);
console.log(`Result is ${result}`);

export {};
