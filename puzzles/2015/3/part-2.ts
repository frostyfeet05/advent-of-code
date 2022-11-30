const input = ``;

type Direction = '^' | 'v' | '>' | '<';

interface Position {
    x: number;
    y: number;
}

const processInput = (input: string): Direction[] => {
    return input.split('') as Direction[];
};

const move = (position: Position, direction: Direction): Position => {
    let x = position.x;
    let y = position.y;

    switch (direction) {
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

    return {x, y};
};

const solve = (input: string): number => {
    const directions: Direction[] = processInput(input);
    const houses: Set<string> = new Set<string>();
    let santa: Position = {x: 0, y: 0};
    let robo: Position = {x: 0, y: 0};
    let turn = 0;

    houses.add('0,0');
    directions.forEach(d => {
        if (turn++ % 2 === 0) {
            santa = move(santa, d);
            houses.add(`${santa.x},${santa.y}`);
        } else {
            robo = move(robo, d);
            houses.add(`${robo.x},${robo.y}`);
        }
    });

    return houses.size;
};

const result = solve(input);
console.log(`Result is ${result}`);

export {};
