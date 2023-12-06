import {Puzzle, input, Game} from './shared';

const solve = (input: string): number => {
    const games = Puzzle.parse(input);

    const gameConfig = {
        red: 12,
        green: 13,
        blue: 14,
    };

    const possibleGames = games.filter((g) =>
        g.rounds.every((r) => r.reveals.every((c) => gameConfig[c.cube] >= c.amount)),
    );
    const sumOfGameIds = possibleGames.reduce((a: number, b: Game) => a + b.id, 0);
    return sumOfGameIds;
};

const result = solve(input);
console.log(`Result is ${result}`);

export {};
