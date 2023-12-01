import {Graph, sample, input} from './shared';

const solve = (input: string): number => {
    const graph = Graph.parse(input);
    return Graph.findPath(graph);
}

const result = solve(input);
console.log(`Result is ${result}`);

export {};
