const input = ``;

interface Field {
    value: number;
    marked: boolean;
}

type Board = Field[][];

interface Game {
    moves: number[];
    boards: Board[];
}

const Field = {
    parse(input: string): Field {
        return {value: parseInt(input), marked: false};
    }
};

const Game = {
    parse(input: string): Game {
        const [movesStr, ...boardsStr] = input.split('\n\n');
        const moves = movesStr.split(',').map(Number);
        const boards = boardsStr.map(x => x.split('\n')
            .map(x => x.split(/\s/)
                .filter(x => x.length)
                .map(Field.parse)
            ));
        return {moves, boards};
    }
};

const processInput = (input: string): Game => {
    return Game.parse(input);
};

const checkForWin = (board: Board): boolean => {
    let win = checkForWinningLines(board);
    if (!win) {
        win = checkForWinningLines(transpose(board));
    }
    return win;
};

const checkForWinningLines = (board: Board): boolean => {
    return board.some(line => line.every(x => x.marked));
};

const transpose = (board: Board): Board => {
    return board[0].map((_, colIndex) => board.map(row => row[colIndex]));
};

const sumUnmarked = (board: Board): number => {
    return board.flat()
        .filter(x => !x.marked)
        .map(x => x.value)
        .reduce((a, b) => a + b, 0);
};

const mark = (value: number, boards: Board[]): void => {
    boards.forEach(board => {
        board.forEach(line => {
            line.filter(x => x.value === value)
                .forEach(x => x.marked = true);
        });
    });
};

const solve = (input: string): number => {
    const {moves, boards} = processInput(input);

    const result = moves.map(move => {
        mark(move, boards);
        const winningBoard = boards.find(board => checkForWin(board));
        if (winningBoard) {
            const sum = sumUnmarked(winningBoard);
            return sum * move;
        }
    }).find(x => x);

    if (result) {
        return result;
    } else {
        throw new Error('Error while playing game');
    }
};

const result = solve(input);
console.log(`Result is ${result}`);

export {};
