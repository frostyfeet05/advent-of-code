const crypto = require('crypto');
const input = ``;

const solve = (input: string): number => {
    let hash = '';
    let i = 0;
    while(!hash.startsWith('00000')) {
        hash = crypto.createHash('md5').update(`${input}${i}`).digest('hex');
        i++
    }
    return i - 1;
}

const result = solve(input);
console.log(`Result is ${result}`);

export {};
