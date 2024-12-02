import {DataStream, input} from './shared';

const solve = (input: string): number => {
    const data = DataStream.parse(input);
    return DataStream.findLastStartOfPacketMarkerIndex(data);
};

const result = solve(input);
console.log(`Result is ${result}`);

export {};
