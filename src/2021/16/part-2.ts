const input = ``;

enum TypeId {
    SUM = 0,
    PRODUCT = 1,
    MINIMUM = 2,
    MAXIMUM = 3,
    LITERAL = 4,
    GREATHER_THAN = 5,
    LESS_THAN = 6,
    EQUAL_TO = 7
}

enum LengthTypeId {
    LENGTH_IN_BITS = 0,
    AMOUNT_OF_SUB_PACKETS = 1
}

interface Packet {
    version: number;
    typeId: number;
    value: number;
    cursorAfterProcessing: number;
}

interface LiteralPacket extends Packet {
}

interface OperatorPacket extends Packet {
    lengthTypeId: number;
    subPackets: (LiteralPacket | OperatorPacket)[];
}

const Packet = {
    parse(input: string): LiteralPacket | OperatorPacket {
        console.log(`Parsing ${input}`);

        const version = parseInt(input.slice(0, 3), 2);
        const typeId = parseInt(input.slice(3, 6), 2);

        if (typeId === TypeId.LITERAL) {
            return LiteralPacket.parse(version, typeId, input);
        } else {
            return OperatorPacket.parse(version, typeId, input);
        }
    }
};

const LiteralPacket = {
    parse(version: number, typeId: TypeId, input: string): LiteralPacket {
        let cursor = 6; // version + typeId position
        let processing = true;
        const valueArray = [];
        while (processing) {
            processing = parseInt(input.slice(cursor, ++cursor)) === 1;
            valueArray.push(input.slice(cursor, cursor + 4));
            cursor += 4;
        }
        const value = parseInt(valueArray.join(''), 2);

        console.log(`Literal Packet with value ${value}.`);

        return {version, typeId: TypeId.LITERAL, value, cursorAfterProcessing: cursor};
    }
};

const OperatorPacket = {
    parse(version: number, typeId: TypeId, input: string): OperatorPacket {
        let cursor = 6; // version + typeId position
        const lengthTypeId = parseInt(input.slice(cursor, ++cursor));
        const subPackets = [];

        if (lengthTypeId === LengthTypeId.LENGTH_IN_BITS) {
            const lengthInBits: number = parseInt(input.slice(cursor, cursor + 15), 2);
            cursor += 15;

            let remainingBits = lengthInBits;
            while (remainingBits > 0) {
                const remainingInput: string = input.slice(cursor, cursor + remainingBits);
                const subPacket = Packet.parse(remainingInput);
                cursor += subPacket.cursorAfterProcessing;
                remainingBits -= subPacket.cursorAfterProcessing;
                subPackets.push(subPacket);
            }

            console.log(`Operator Packet with payload length of ${lengthInBits} and ${subPackets.length} sub packet(s).`);

        } else if (lengthTypeId === LengthTypeId.AMOUNT_OF_SUB_PACKETS) {
            const amountOfSubPackets = parseInt(input.slice(cursor, cursor + 11), 2);
            cursor += 11;

            for (let i = 0; i < amountOfSubPackets; i++) {
                const remainingInput: string = input.slice(cursor);
                const subPacket = Packet.parse(remainingInput);
                cursor += subPacket.cursorAfterProcessing;
                subPackets.push(subPacket);
            }

            console.log(`Operator Packet with ${amountOfSubPackets} sub packet(s) in payload and ${subPackets.length} sub packet(s).`);
        }

        let value = 0;

        switch (typeId) {
        case TypeId.SUM:
            value = subPackets.map(s => s.value).reduce((a, b) => a + b, 0);
            break;
        case TypeId.PRODUCT:
            value = subPackets.map(s => s.value).reduce((a, b) => a * b, 1);
            break;
        case TypeId.MINIMUM:
            value = subPackets.map(s => s.value).reduce((a, b) => Math.min(a, b));
            break;
        case TypeId.MAXIMUM:
            value = subPackets.map(s => s.value).reduce((a, b) => Math.max(a, b));
            break;
        case TypeId.GREATHER_THAN:
            if (subPackets.length !== 2) {
                throw new Error('Greater than Operator Packet should have 2 sub packets');
            }
            value = subPackets[0].value > subPackets[1].value ? 1 : 0;
            break;
        case TypeId.LESS_THAN:
            if (subPackets.length !== 2) {
                throw new Error('Greater than Operator Packet should have 2 sub packets');
            }
            value = subPackets[0].value < subPackets[1].value ? 1 : 0;
            break;
        case TypeId.EQUAL_TO:
            if (subPackets.length !== 2) {
                throw new Error('Greater than Operator Packet should have 2 sub packets');
            }
            value = subPackets[0].value === subPackets[1].value ? 1 : 0;
            break;
        }

        return {version, typeId, value, lengthTypeId, subPackets, cursorAfterProcessing: cursor};
    }
};

const processInput = (input: string): LiteralPacket | OperatorPacket => {
    const bin = input.split('').map(x => parseInt(x, 16).toString(2).padStart(4, '0')).join('');
    return Packet.parse(bin);
};

const solve = (input: string): number => {
    const packet = processInput(input);
    return packet.value;
};

const result = solve(input);
console.log(`Result is ${result}`);

export {};
