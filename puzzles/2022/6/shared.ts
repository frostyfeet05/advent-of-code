export const input = ``;

export const DataStream = {
    parse: (input: string): string[] => {
        return input.split('');
    },
    findLastStartOfPacketMarkerIndex: (data: string[]): number => {
        return findLastIndex(data, 4);
    },
    findLastStartOfMessageMarkerIndex: (data: string[]): number => {
        return findLastIndex(data, 14);
    }
}

const findLastIndex = (input: string[], size: number): number => {
    for (let i = size; i < input.length; i++) {
        let chunk = input.slice(i - size, i);
        if (allUnique(chunk)) {
            return i;
        }
    }
    return 0;
}

const allUnique = (input: string[]): boolean => {
    return input.every((value, index, arr) => arr.indexOf(value) === index);
}
