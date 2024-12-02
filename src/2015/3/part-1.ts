const input = ``;

type Direction = '^' | 'v' | '>' | '<';

const processInput = (input: string): Direction[] => {
    return input.split('') as Direction[];
};

const solve = (input: string): number => {
    const directions: Direction[] = processInput(input);
    const houses: Set<string> = new Set<string>();
    let x = 0;
    let y = 0;

    houses.add('0,0');
    directions.forEach(d => {
        switch (d) {
        case '^':
            y -= 1;
            break;
        case 'v':
            y += 1;
            break;
        case '>':
            x += 1;
            break;
        case '<':
            x -= 1;
            break;
        }
        houses.add(`${x},${y}`);
    });

    return houses.size;
};

const result = solve(input);
console.log(`Result is ${result}`);

export {};
