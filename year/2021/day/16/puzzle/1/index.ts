const input = ``;

enum TypeId {
    LITERAL_VALUE = 4
}

enum LengthTypeId {
    LENGTH_IN_BITS = 0,
    AMOUNT_OF_SUB_PACKETS = 1
}

interface Packet {
    version: number;
    typeId: number;
    cursorAfterProcessing: number;
}

interface LiteralPacket extends Packet {
    value: number;
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

        if (typeId === TypeId.LITERAL_VALUE) {
            return LiteralPacket.parse(version, input);
        } else {
            return OperatorPacket.parse(version, typeId, input);
        }
    }
};

const LiteralPacket = {
    parse(version: number, input: string): LiteralPacket {
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

        return {version, typeId: TypeId.LITERAL_VALUE, value, cursorAfterProcessing: cursor};
    }
};

const OperatorPacket = {
    parse(version: number, typeId: number, input: string): OperatorPacket {
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

        return {version, typeId, lengthTypeId, subPackets, cursorAfterProcessing: cursor};
    }
}

const processInput = (input: string): LiteralPacket | OperatorPacket => {
    const bin = input.split('').map(x => parseInt(x, 16).toString(2).padStart(4, '0')).join('');
    return Packet.parse(bin);
};

const getAllVersions = (packet: LiteralPacket | OperatorPacket): number => {
    let versions = packet.version;
    if ((packet as OperatorPacket).subPackets !== undefined) {
        versions += (packet as OperatorPacket).subPackets.map(getAllVersions).reduce((a, b) => a + b);
    }
    return versions;
}

const solve = (input: string): number => {
    const packet = processInput(input);
    return getAllVersions(packet);
};

const result = solve(input);
console.log(`Result is ${result}`);

export {};
