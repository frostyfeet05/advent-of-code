import {DeterministicDice, DiracDice, input, Player} from '../shared';

const checkWin = (player: Player): boolean => Player.score(player) >= 1000;

const solve = (input: string): number => {
    let {player1, player2} = DiracDice.parse(input);
    let dice = DeterministicDice.new();

    while (!checkWin(player1) || !checkWin(player2)) {
        // player 1
        dice = DeterministicDice.roll(dice);
        player1 = DiracDice.move(player1, dice, 1);

        if (checkWin(player1)) {
            return Player.score(player2) * ((player1.length + player2.length - 2) * 3);
        }

        // player 2
        dice = DeterministicDice.roll(dice);
        player2 = DiracDice.move(player2, dice, 2);

        if (checkWin(player2)) {
            return Player.score(player1) * ((player1.length + player2.length) * 3);
        }
    }

    return 0;
};

const result = solve(input);
console.log(`Result is ${result}`);

export {};
