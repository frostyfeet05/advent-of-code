export const input = ``;

type Instruction = 'U' | 'D' | 'L' | 'R';
type DigitInstructions = Instruction[];
type CodeInstructions = DigitInstructions[];

const advancedPad = [
    [-1, -1, 1, -1, -1],
    [-1, 2, 3, 4, -1],
    [5, 6, 7, 8, 9],
    [-1, 10, 11, 12, -1],
    [-1, -1, 13, -1, -1],
];

export const Code = {
    parse: (input: string): CodeInstructions => {
        return input.split('\n').map(digit => digit.split('') as DigitInstructions);
    },
    findDigit: (instructions: DigitInstructions, previousDigit: number): number => {
        return instructions.reduce((digit: number, instruction) => {
            switch(instruction) {
            case 'U':
                return digit - 3 < 1 ? digit : digit - 3;
            case 'D':
                return digit + 3 > 9 ? digit : digit + 3;
            case 'L':
                return (digit - 1) % 3 === 0 ? digit : digit - 1;
            case 'R':
                return (digit + 1) % 3 === 1 ? digit : digit + 1;
            default:
                return digit;
            }
        }, previousDigit);
    },
    findAdvancedDigit: (instructions: DigitInstructions, previousDigit: { x: number, y: number, digit: number}): { x: number, y: number, digit: number} => {
        let x = previousDigit.x;
        let y = previousDigit.y;
        return instructions.reduce((digit: { x: number, y: number, digit: number}, instruction) => {
            switch(instruction) {
            case 'U':
                if (insideAdvancedBounds(x, y - 1) && advancedPad[y - 1][x] !== -1) {
                    y = y - 1;
                    return {x, y, digit: advancedPad[y][x]};
                }
                return digit;
            case 'D':
                if (insideAdvancedBounds(x, y + 1) && advancedPad[y + 1][x] !== -1) {
                    y = y + 1;
                    return {x, y, digit: advancedPad[y][x]};
                }
                return digit;
            case 'L':
                if (insideAdvancedBounds(x - 1, y) && advancedPad[y][x - 1] !== -1) {
                    x = x - 1;
                    return {x, y, digit: advancedPad[y][x]};
                }
                return digit;
            case 'R':

                if (insideAdvancedBounds(x + 1, y) && advancedPad[y][x + 1] !== -1) {
                    x = x + 1;
                    return {x, y, digit: advancedPad[y][x]};
                }
                return digit;
            default:
                return digit;
            }
        }, previousDigit);
    }
}

const insideAdvancedBounds = (x: number, y: number): boolean => {
    return x >= 0 && x <= 4 && y >= 0 && y <= 4;
}
