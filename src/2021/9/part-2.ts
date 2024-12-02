const input = ``;

interface Point {
    value: number;
    checked: boolean;
}

const Point = {
    parse(value: string): Point {
        return {value: parseInt(value), checked: false};
    }
};

const processInput = (input: string): Point[][] => {
    return input.split('\n').map(line => line.split('').map(Point.parse));
};

const checkBasin = (board: Point[][], x: number, y: number): number => {
    const current: Point = board[y][x];
    let result: number = 0;
    if (current.value === 9 || current.checked) {
        return result;
    }
    current.checked = true;

    if (x !== 0) {
        result += checkBasin(board, x - 1, y);
    }
    if (x !== board[y].length - 1) {
        result += checkBasin(board, x + 1, y);
    }
    if (y !== 0) {
        result += checkBasin(board, x, y - 1);
    }
    if (y !== board.length - 1) {
        result += checkBasin(board, x, y + 1);
    }

    result += 1;
    return result;
};


const solve = (input: string): number => {
    const board: Point[][] = processInput(input);
    const result: number[] = [];

    for (let y = 0; y < board.length; y++) {
        for (let x = 0; x < board[y].length; x++) {
            result.push(checkBasin(board, x, y));
        }
    }

    const largest = result.filter(a => a > 0).sort((a,b) => a - b).reverse();
    return largest[0] * largest[1] * largest[2];
};

const result = solve(input);
console.log(`Result is ${result}`);

export {};
