const input = ``;

type Graph = [from: string, to: string][];
type Path = string[];

const Graph = {
    parse(input: string): Graph {
        return input.split('\n').map(line => {
            const [from, to] = line.split('-');
            return [from, to];
        });
    }
};

type Counter = {[key: string]: number};

const isValidPath = (path: Path): boolean => {
    const smallCaves = path
        .filter(segment => segment !== 'start')
        .filter(segment => segment !== 'end')
        .filter(segment => segment.toLowerCase() === segment)
        .reduce((counter, segment) => ({
            ...counter,
            [segment]: (counter[segment] || 0) + 1
        }), {} as Counter);

    // only one small cave can be visited twice
    const v = Object.values(smallCaves).filter(x => x !== 1);
    return v.length > 0 ? v.length <= 1 && v[0] < 3 : true;
}

const findPathSegment = (searchFrom: string, graph: Graph): string[] => {
    const froms = graph
        .filter(([from, _]) => searchFrom === from)
        .map(([_, to]) => to);

    const tos = graph
        .filter(([_, to]) => searchFrom === to)
        .map(([from, _]) => from);

    return [...froms, ...tos].filter(segment => segment !== 'start');
};

const findPath = (searchFrom: string, searchTo: string, graph: Graph, path: string[]): Path[] => {
    const newPath = [...path, searchFrom];

    // end of recursion #1: end has been reached
    if (searchFrom === searchTo) {
        return [newPath];
    }

    const pathSegments = findPathSegment(searchFrom, graph)
        .filter(segment => isValidPath([...newPath, segment]));

    return pathSegments.flatMap(newFrom => findPath(newFrom, searchTo, graph, [...newPath]));
}

const solve = (input: string): number => {
    const graph: Graph = Graph.parse(input);

    const paths: Path[] = findPath('start', 'end', graph, []);
    console.log(paths);

    return paths.length;
};

const result = solve(input);
console.log(`Result is ${result}`);

export {};
