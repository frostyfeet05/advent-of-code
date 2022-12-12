export const input = `Monkey 0:
  Starting items: 52, 60, 85, 69, 75, 75
  Operation: new = old * 17
  Test: divisible by 13
    If true: throw to monkey 6
    If false: throw to monkey 7

Monkey 1:
  Starting items: 96, 82, 61, 99, 82, 84, 85
  Operation: new = old + 8
  Test: divisible by 7
    If true: throw to monkey 0
    If false: throw to monkey 7

Monkey 2:
  Starting items: 95, 79
  Operation: new = old + 6
  Test: divisible by 19
    If true: throw to monkey 5
    If false: throw to monkey 3

Monkey 3:
  Starting items: 88, 50, 82, 65, 77
  Operation: new = old * 19
  Test: divisible by 2
    If true: throw to monkey 4
    If false: throw to monkey 1

Monkey 4:
  Starting items: 66, 90, 59, 90, 87, 63, 53, 88
  Operation: new = old + 7
  Test: divisible by 5
    If true: throw to monkey 1
    If false: throw to monkey 0

Monkey 5:
  Starting items: 92, 75, 62
  Operation: new = old * old
  Test: divisible by 3
    If true: throw to monkey 3
    If false: throw to monkey 4

Monkey 6:
  Starting items: 94, 86, 76, 67
  Operation: new = old + 1
  Test: divisible by 11
    If true: throw to monkey 5
    If false: throw to monkey 2

Monkey 7:
  Starting items: 57
  Operation: new = old + 2
  Test: divisible by 17
    If true: throw to monkey 6
    If false: throw to monkey 2`;
export const sample = `Monkey 0:
  Starting items: 79, 98
  Operation: new = old * 19
  Test: divisible by 23
    If true: throw to monkey 2
    If false: throw to monkey 3

Monkey 1:
  Starting items: 54, 65, 75, 74
  Operation: new = old + 6
  Test: divisible by 19
    If true: throw to monkey 2
    If false: throw to monkey 0

Monkey 2:
  Starting items: 79, 60, 97
  Operation: new = old * old
  Test: divisible by 13
    If true: throw to monkey 1
    If false: throw to monkey 3

Monkey 3:
  Starting items: 74
  Operation: new = old + 3
  Test: divisible by 17
    If true: throw to monkey 0
    If false: throw to monkey 1`;

type Monkey = {
    items: number[];
    operation: string;
    divisibleBy: number;
    monkeyTrue: number;
    monkeyFalse: number;
}

type Occurrences = { [key: string]: number };

export const Monkey = {
    parse: (input: string): Monkey[] => {
        return input.split('\n\n').map(parseMonkey);
    },
    monkeyBusiness: (monkeys: Monkey[], rounds: number = 20, withRelief: boolean = true): number => {
        let occurrences = {};
        for (let x = 0; x < rounds; x++) {
            occurrences = doMonkeyBusiness(monkeys, occurrences, withRelief);
        }
        const itemCount = (Object.values(occurrences) as number[])
            .sort((a, b) => b - a);
        return itemCount[0] * itemCount[1];
    }
};

const parseMonkey = (input: string): Monkey => {
    const [header, itemsStr, operationStr, divisible, ifTrue, ifFalse] = input.split('\n');
    const items = parseItems(itemsStr);
    const divisibleBy = extractNumber(divisible);
    const monkeyTrue = extractNumber(ifTrue);
    const monkeyFalse = extractNumber(ifFalse);
    const operation = parseOperation(operationStr);

    return {
        items,
        operation,
        divisibleBy,
        monkeyTrue,
        monkeyFalse
    };
};

const parseItems = (input: string): number[] => {
    return input.split(':')[1].split(',').map(Number);
};

const parseOperation = (input: string): string => {
    const op = input.match(/old [+-\/\*] [(\d)|(old)]+/);
    if (!op) {
        return `() => 0`;
    }
    return `old => ${op[0]}`;
};

const extractNumber = (input: string): number => {
    const matches = input.match(/\d+/);
    if (!matches) {
        return 0;
    }
    return parseInt(matches[0]);
};

const doMonkeyBusiness = (monkeys: Monkey[], oldOccurrences: Occurrences, withRelief: boolean): Occurrences => {
    let occurrences: Occurrences = {...oldOccurrences};
    const superModulo = monkeys.reduce((a, b) => a * b.divisibleBy, 1);

    monkeys.forEach((monkey, monkeyNo) => {
        const items = [...monkey.items];

        monkey.items = [];
        items
            .map(item => eval(monkey.operation)(item))
            .map(item => withRelief ? Math.floor(item / 3) : item % superModulo)
            .forEach(item => {
                occurrences = addOccurrence(occurrences, monkeyNo);
                if (item % monkey.divisibleBy === 0) {
                    monkeys[monkey.monkeyTrue].items.push(item);
                } else {
                    monkeys[monkey.monkeyFalse].items.push(item);
                }
            });
    });
    return occurrences;
};

const addOccurrence = (occurrences: Occurrences, monkey: number): Occurrences => {
    return {
        ...occurrences,
        [monkey]: (occurrences[monkey] || 0) + 1,
    };
};
