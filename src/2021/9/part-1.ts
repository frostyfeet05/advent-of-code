const input = ``;

const processInput = (input: string): number[][] => {
    return input.split('\n').map(line => line.split('').map(Number));
};

const solve = (input: string): number => {
    const board: number[][] = processInput(input);
    const result: number[] = [];

    for (let y = 0; y < board.length; y++) {
        for (let x = 0; x < board[y].length; x++) {
            const smallest: boolean[] = [];
            const current = board[y][x];

            if (x !== 0) {
                smallest.push(board[y][x - 1] > current);
            }
            if (x !== board[y].length - 1) {
                smallest.push(board[y][x + 1] > current);
            }
            if (y !== 0) {
                smallest.push(board[y - 1][x] > current);
            }
            if (y !== board.length - 1) {
                smallest.push(board[y + 1][x] > current);
            }

            if (smallest.every(sm => sm)) {
                result.push(current + 1);
            }
        }
    }

    return result.reduce((a, b) => a + b);
};

const result = solve(input);
console.log(`Result is ${result}`);

export {};
