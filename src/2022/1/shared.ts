export const input = ``;

export type Elf = number[];

export const Elf = {
    parse: (input: string): Elf[] => {
        return input.split('\n\n').map(elf => elf.split('\n').map(Number));
    },
    countCalories: (elf: Elf): number => {
        return elf.reduce((sum, value) => sum + value);
    }
}
