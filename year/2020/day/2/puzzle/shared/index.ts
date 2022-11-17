export const input = ``;

const regex: RegExp = /(\d+)\-(\d+) ([a-z]): ([a-z]+)/;

export type PasswordWithPolicy = {
    min: number;
    max: number;
    letter: string;
    password: string;
}

export const Policy = {
    parse: (input: string): PasswordWithPolicy[] => {
        return input.split('\n').map(line => {
            const matches = line.match(regex) || [];
            return {
                min: parseInt(matches[1]),
                max: parseInt(matches[2]),
                letter: matches[3],
                password: matches[4],
            };
        });
    }
};
