const input = ``;

interface Point {
    x: number;
    y: number;
    aim: number;
}

interface Command {
    direction: 'forward' | 'up' | 'down';
    amount: number;
}

const Command = {
    parse(input: string): Command {
        const [direction, amount] = input.split(' ');
        return {
            direction: direction as 'forward' | 'up' | 'down',
            amount: parseInt(amount)
        }
    }
}

const processInput = (input: string): Command[] => {
    return input.split('\n').map(Command.parse);
}

const solve = (input: string): number => {
    const commands = processInput(input);
    const position: Point = { x: 0, y: 0, aim: 0 };
    commands.forEach(command => handleMovement(command, position));
    return position.x * position.y;
}

const handleMovement = (command: Command, position: Point) => {
    const newPosition = Object.assign(position, {});

    switch (command.direction) {
    case 'forward':
        newPosition.x += command.amount;
        newPosition.y += newPosition.aim * command.amount;
        break;
    case 'up':
        newPosition.aim -= command.amount;
        break;
    case 'down':
        newPosition.aim += command.amount;
        break;
    }
    return newPosition;
}

const result = solve(input);
console.log(`Result is ${result}`);

export {}
