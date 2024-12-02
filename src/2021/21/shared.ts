export const input = ``;

export type DiceRoll = number[];
export type Player = number[];
export type DiracDice = {player1: Player, player2: Player};

export const Player = {
    new: (position: number): Player => [position],
    score: (player: Player): number => player.reduce((a, b, i) => i === 0 ? 0 : a + b, 0),
};

export const DeterministicDice = {
    new: (): DiceRoll => [-2, -1, 0],
    roll: (deterministicDice: DiceRoll): DiceRoll => deterministicDice.map(x => modulo(x + 3, 100)),
};

export const DiracDice = {
    parse: (input: string): DiracDice => {
        const [player1, player2] = input.split('\n')
            .map(player => player[player.length - 1])
            .map(Number)
            .map(player => Player.new(player));
        return {player1, player2};
    },
    move: (player: Player, die: number[], playerNumber: number): Player => {
        const moves = die.reduce((total, amount) => total + amount);
        const currentPosition = player[player.length - 1];
        const newPosition = modulo(currentPosition + moves, 10);
        const newPlayer = [...player, newPosition];

        console.log(`Player ${playerNumber} rolls ${die.join('+')} and moves to space ${newPosition} for a total score of ${Player.score(newPlayer)}.`);

        return newPlayer;
    },
};

const modulo = (value: number, mod: number): number => {
    const rest = (value % mod);
    return rest === 0 ? mod : rest;
};
