import {DiracDice, Player, input} from './shared';

const checkWin = (player: Player): boolean => Player.score(player) >= 21;

const solve = (input: string): number => {
    let {player1, player2} = DiracDice.parse(input);



    return 0;
};

const result = solve(input);
console.log(`Result is ${result}`);

export {};
