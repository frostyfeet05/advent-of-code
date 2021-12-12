const input = `OU-xt
hq-xt
br-HP
WD-xt
end-br
start-OU
hq-br
MH-hq
MH-start
xt-br
end-WD
hq-start
MH-br
qw-OU
hm-WD
br-WD
OU-hq
xt-MH
qw-MH
WD-qw
end-qw
qw-xt`;
const sample1 = `start-A
start-b
A-c
A-b
b-d
A-end
b-end`;
const sample2 = `dc-end
HN-start
start-kj
dc-start
dc-HN
LN-dc
HN-end
kj-sa
kj-HN
kj-dc`;
const sample3 = `fs-end
he-DX
fs-he
start-DX
pj-DX
end-zg
zg-sl
zg-pj
pj-he
RW-he
fs-DX
pj-RW
zg-RW
start-pj
he-WI
zg-he
pj-fs
start-RW`;

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

const isValidCave = (cave: string, path: string[]): boolean => {
    if (isLargeCave(cave)) {
        return true;
    }
    if (cave === 'start') {
        return false;
    }
    const amounts: { [key: string]: number } = {};
    path.filter(c => c !== 'start' && c !== 'end')
        .filter(c => !isLargeCave(c))
        .forEach(c => {
            amounts[c] = (amounts[c] || 0) + 1;
        });
    if (!amounts[cave]) {
        return true;
    }
    return !Object.values(amounts).some(amount => amount === 2);
};

const findPath = (from: string, to: string, path: string[], graph: Graph): string[] => {
    const newPath: string[] = [...path];
    newPath.push(from);

    if (from === to) {
        return newPath;
    }

    const caves: string[] = Array.from(graph[from]).filter(cave => isValidCave(cave, newPath));
    caves.map(cave => findPath(cave, to, newPath, graph)).forEach(caves => newPath.push(...caves));

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
