export const input = ``;

type Frequency = number;

export const Frequencies = {
    parse: (input: string): Frequency[] => {
        return input.split('\n').map(Number);
    },
    sum: (frequencies: Frequency[]): number => {
        return frequencies.reduce((sum, value) => sum + value, 0);
    },
    duplicate: (frequencies: Frequency[]): number => {
        let freqs: number[] = [];
        let sum = 0;
        while (true) {
            for (let i = 0; i < frequencies.length; i++) {
                sum += frequencies[i];
                if (freqs.some(f => f === sum)) {
                    return sum;
                }
                freqs.push(sum);
            }
        }
    }
};
