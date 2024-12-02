const input = ``;

const executeCommand = (command: string, board: boolean[][]): void => {
    const cmd = command.split(' ');

    if (cmd[0] === 'toggle') {
        const [x1, y1] = cmd[1].split(',').map(Number);
        const [x2, y2] = cmd[3].split(',').map(Number);

        for (let x = x1; x <= x2; x++) {
            for (let y = y1; y <= y2; y++) {
                board[y][x] = !board[y][x];
            }
        }
    } else if (cmd[0] === 'turn') {
        const shouldTurnOn = cmd[1] === 'on';
        const [x1, y1] = cmd[2].split(',').map(Number);
        const [x2, y2] = cmd[4].split(',').map(Number);

        for (let x = x1; x <= x2; x++) {
            for (let y = y1; y <= y2; y++) {
                board[y][x] = shouldTurnOn;
            }
        }
    }
};


const doPuzzle = (input: string): number => {
    const commands = input.split('\n');
    let board: boolean[][] = Array.from({length: 1000}, () => Array.from({length: 1000}));
    commands.forEach(command => {
        console.log(command);
        executeCommand(command, board);
    });
    return board.flat().filter(b => b === true).length;
};

const result = doPuzzle(input);
console.log(`Result is ${result}`);

export {};


