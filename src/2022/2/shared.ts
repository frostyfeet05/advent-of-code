export const input = ``;

const OPPONENT_MASK = 64;
const EASY_MOVE_MASK = 87;
const DRAW_POINTS = 3;
const WIN_POINTS = 6;

type Round = {
    opponent: string;
    move: string;
}

export const RockPaperScissors = {
    parse: (input: string): Round[] => {
        return input.split('\n').map(round => {
            const [opponent, move] = round.split(' ');
            return {opponent, move};
        });
    },
    countEasyScore: (game: Round[]): number => {
        return game.reduce((sum: number, round: Round) => {
            const opponent = round.opponent.charCodeAt(0) - OPPONENT_MASK;
            const move = round.move.charCodeAt(0) - EASY_MOVE_MASK;

            // draw
            if (opponent === move) {
                return sum + move + DRAW_POINTS;
            }

            // you win
            if (move === (opponent % 3 + 1)) {
                return sum + move + WIN_POINTS;
            }

            // you lose
            return sum + move;
        }, 0);
    },
    countHardScore: (game: Round[]): number => {
        return game.reduce((sum: number, round: Round) => {
            const opponent = round.opponent.charCodeAt(0) - OPPONENT_MASK;

            // you lose
            if (round.move === 'X') {
                const move = opponent - 1 === 0 ? 3 : opponent - 1;
                return sum + move;
            }

            // draw, same move as opponent
            if (round.move === 'Y') {
                return sum + opponent + DRAW_POINTS;
            }

            // you win
            if (round.move === 'Z') {
                const move = (opponent % 3 + 1);
                return sum + move + WIN_POINTS;
            }

            return sum;
        }, 0);
    },
}
