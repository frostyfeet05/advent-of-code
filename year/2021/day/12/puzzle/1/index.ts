const input = ``;

type Graph = { [key: string]: Set<string> };

const Graph = {
    parse(input: string): Graph {
        const graph: Graph = {};
        input.split('\n').forEach(line => {
            const [from, to] = line.split('-');
            graph[from] = (graph[from] || new Set<string>()).add(to);
            graph[to] = (graph[to] || new Set<string>()).add(from);
        });
        return graph;
    }
};

const processInput = (input: string): Graph => {
    return Graph.parse(input);
};

const isLargeCave = (cave: string): boolean => {
    return cave[0].toLowerCase() !== cave[0];
};

const findPath = (from: string, to: string, path: string[], graph: Graph): string[] => {
    const newPath: string[] = [...path];
    newPath.push(from);

    if (from === to) {
        return newPath;
    }

    const caves: string[] = Array.from(graph[from]).filter(cave => isLargeCave(cave) || !newPath.includes(cave));
    caves.map(cave => findPath(cave, to, newPath, graph)).forEach(caves => newPath.push(...caves))

    return newPath;
};

const solve = (input: string): number => {
    const graph: Graph = processInput(input);

    const paths: string[] = findPath('start', 'end', [], graph);
    return paths.filter(cave => cave === 'end').length;
};

const result = solve(input);
console.log(`Result is ${result}`);

export {};
