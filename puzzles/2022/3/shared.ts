export const input = ``;

type Compartment = string[];
export type Rucksack = { first: Compartment, second: Compartment };

export const Rucksack = {
    parse: (input: string): Rucksack[] => {
        return input.split('\n').map(rucksack => {
            const size = rucksack.length / 2;
            const first = rucksack.slice(0, size).split('');
            const second = rucksack.slice(size).split('');
            return {first, second};
        });
    },
    findDuplicate: (rucksack: Rucksack): string => {
        return rucksack.first.find(item => rucksack.second.includes(item)) || '';
    },
    findBadge: (group: Rucksack[]): string => {
        let occurrences = {};
        group.map(g => [...g.first, ...g.second])
            .forEach(g => occurrences = g.reduce((map: { [key: string]: number }, item, index, arr) => ({
                ...map,
                [item]: (map[item] || 0) + (arr.indexOf(item) === index ? 1 : 0)
            }), occurrences));

        return Object.entries(occurrences)
            .filter((key) => key[1] === 3)
            .map((key) => key[0])[0];
    },
    convertToPriority: (item: string): number => {
        if (item.toLowerCase() === item) {
            return item.charCodeAt(0) - 96;
        } else {
            return item.charCodeAt(0) - 38; //-64 + 26
        }
    }
};
