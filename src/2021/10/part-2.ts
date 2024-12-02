const input = ``;

const SCORES = [
    {chunkPart: ')', score: 1},
    {chunkPart: ']', score: 2},
    {chunkPart: '}', score: 3},
    {chunkPart: '>', score: 4},
];

type ChunkPart = '{' | '}' | '[' | ']' | '(' | ')' | '<' | '>';

const processInput = (input: string): ChunkPart[][] => {
    return input.split('\n').map(x => x.split('') as ChunkPart[]);
};

const fixIncompleteLine = (line: ChunkPart[]): number => {
    const expectedChunkParts: ChunkPart[] = [];

    for (let x = 0; x < line.length; x++) {
        switch (line[x]) {
        case '{':
            expectedChunkParts.push('}');
            break;
        case '[':
            expectedChunkParts.push(']');
            break;
        case '(':
            expectedChunkParts.push(')');
            break;
        case '<':
            expectedChunkParts.push('>');
            break;
        case '}':
        case ']':
        case ')':
        case '>':
            const expectedChunkPart = expectedChunkParts.pop();
            if (expectedChunkPart !== line[x]) {
                return 0;
            }
        }
    }

    const result = expectedChunkParts.reverse();
    console.log(line.join(''), `- Complete by adding`, result.join(''));

    return result.map(x => {
        const score = SCORES.find(y => y.chunkPart === x);
        if (!score) {
            throw new Error('Could not find score, something wrong');
        }
        return score.score;
    }).reduce((a, b) => (a * 5) + b);
};

const solve = (input: string): number => {
    const lines = processInput(input);
    const scores = lines.map(fixIncompleteLine).filter(x => x > 0).sort((a, b) => a - b);
    return scores[Math.floor(scores.length / 2)];
};

const result = solve(input);
console.log(`Result is ${result}`);

export {};
