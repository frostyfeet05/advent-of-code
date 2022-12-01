export const input = ``;

type Captcha = number[];

export const Captcha = {
    parse: (input: string): Captcha => {
        return input.split('').map(Number);
    },
    sumNext: (captcha: Captcha): number => {
        return captcha.reduce((sum, value, index, array) => {
            const indexToCheck = index === array.length - 1 ? 0 : index + 1;
            return sum + (value === array[indexToCheck] ? value : 0);
        }, 0)
    },
    sumHalfway: (captcha: Captcha): number => {
        const length = captcha.length;
        const offset = length / 2;
        return captcha.reduce((sum, value, index, array) => {
            const indexToCheck = (index + offset) % length;
            return sum + (value === array[indexToCheck] ? value : 0);
        }, 0)
    }
}
