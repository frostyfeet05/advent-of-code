const input = ``;

const SCORES = [
    {chunkPart: ')', score: 3},
    {chunkPart: ']', score: 57},
    {chunkPart: '}', score: 1197},
    {chunkPart: '>', score: 25137},
];

type ChunkPart = '{' | '}' | '[' | ']' | '(' | ')' | '<' | '>';

const processInput = (input: string): ChunkPart[][] => {
    return input.split('\n').map(x => x.split('') as ChunkPart[]);
}

const checkForCorruptedChunk = (line: ChunkPart[]): number => {
    const expectedChunkParts: ChunkPart[] = [];

    for(let x = 0; x < line.length; x++) {
        switch(line[x]) {
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
                const score = SCORES.find(s => s.chunkPart === line[x]);
                console.log(line.join(''), `- Expected ${expectedChunkPart}, but found ${line[x]} instead.`);
                if (!score) {
                    throw new Error('Could not find score, something wrong');
                }
                return score.score;
            }
        }
    }

    return 0;
}

const solve = (input: string): number => {
    const lines = processInput(input);
    return lines.map(checkForCorruptedChunk).reduce((a, b) => a + b);
}

const result = solve(input);
console.log(`Result is ${result}`);

export {};
