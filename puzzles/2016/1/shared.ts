export const input = ``;

type Direction = 'L' | 'R';
type Instruction = {
    direction: Direction;
    distance: number;
}
type Position = { x: number, y: number };

export const Grid = {
    parse: (input: string): Instruction[] => {
        return input.split(', ').map(instruction => {
            const matches = instruction.match(/([LR])(\d+)/) || [];
            return {
                direction: matches[1] as Direction,
                distance: parseInt(matches[2])
            };
        });
    },
    countDistance: (instructions: Instruction[]): number => {
        let direction: number = 0;
        let position: Position = {x: 0, y: 0};

        instructions.forEach(instruction => {
            direction = getNextDirection(direction, instruction);
            position = getNextPosition(position, direction, instruction.distance);
        });

        return Math.abs(position.x) + Math.abs(position.y);
    },
    visitTwice: (instructions: Instruction[]): number => {
        let direction: number = 0;
        let position: Position = {x: 0, y: 0};
        const positions: Position[] = [position];

        for (let i = 0; i < instructions.length; i++) {
            direction = getNextDirection(direction, instructions[i]);

            for (let x = 0; x < instructions[i].distance; x++) {
                position = getNextPosition(position, direction, 1);
                if (positions.some(pos => pos.x === position.x && pos.y === position.y)) {
                    return Math.abs(position.x) + Math.abs(position.y);
                }
                positions.push(position);
            }
        }

        return 0;
    }
};

const getNextDirection = (direction: number, instruction: Instruction): number => {
    const delta = instruction.direction === 'R' ? 1 : -1;
    const newDirection = direction + delta;
    return newDirection === -1 ? 3 : newDirection % 4;
};

const getNextPosition = (position: Position, direction: number, distance: number): Position => {
    let {x, y} = position;

    switch (direction) {
    case 0:
        return {x, y: y - distance};
    case 1:
        return {x: x + distance, y};
    case 2:
        return {x, y: y + distance};
    case 3:
        return {x: x - distance, y};
    default:
        return {x, y};
    }
};
