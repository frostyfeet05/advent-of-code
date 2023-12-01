export const input = `abccccccccccccccccccaaaaaaaaacccccccccccccccccccccccccccccccccccccaaaa
abcccccccccccccccaaaaaaaaaaacccccccccccccccccccccccccccccccccccccaaaaa
abcaaccaacccccccccaaaaaaaaaacccccccccccccccccccccaaacccccccccccccaaaaa
abcaaaaaaccccccccaaaaaaaaaaaaacccccccccccccccccccaacccccccccccccaaaaaa
abcaaaaaacccaaacccccaaaaaaaaaaaccccccccccccccccccaaaccccccccccccccccaa
abaaaaaaacccaaaaccccaaaaaacaaaacccccccccccaaaacjjjacccccccccccccccccca
abaaaaaaaaccaaaaccccaaaaaaccccccaccccccccccaajjjjjkkcccccccccccccccccc
abaaaaaaaaccaaacccccccaaaccccccaaccccccccccajjjjjjkkkaaacccaaaccaccccc
abccaaacccccccccccccccaaccccaaaaaaaacccccccjjjjoookkkkaacccaaaaaaccccc
abcccaacccccccccccccccccccccaaaaaaaaccccccjjjjoooookkkkcccccaaaaaccccc
abcccccccaacccccccccccccccccccaaaacccccccijjjoooooookkkkccaaaaaaaccccc
abccaaccaaaccccccccccccccccccaaaaacccccciijjooouuuoppkkkkkaaaaaaaacccc
abccaaaaaaaccccccccccaaaaacccaacaaaccciiiiiooouuuuupppkkklllaaaaaacccc
abccaaaaaacccccccccccaaaaacccacccaaciiiiiiqooouuuuuupppkllllllacaccccc
abcccaaaaaaaacccccccaaaaaaccccaacaiiiiiqqqqoouuuxuuupppppplllllccccccc
abccaaaaaaaaaccaaaccaaaaaaccccaaaaiiiiqqqqqqttuxxxuuuppppppplllccccccc
abccaaaaaaaacccaaaaaaaaaaacccaaaahiiiqqqttttttuxxxxuuuvvpppplllccccccc
abcaaaaaaacccaaaaaaaaaaacccccaaaahhhqqqqtttttttxxxxuuvvvvvqqlllccccccc
abcccccaaaccaaaaaaaaaccccccccacaahhhqqqttttxxxxxxxyyyyyvvvqqlllccccccc
abcccccaaaccaaaaaaaacccccccccccaahhhqqqtttxxxxxxxyyyyyyvvqqqlllccccccc
SbcccccccccccaaaaaaaaaccccccccccchhhqqqtttxxxxEzzzyyyyvvvqqqmmlccccccc
abcccccccccccaaaaaaaacccaacccccccchhhppptttxxxxyyyyyvvvvqqqmmmcccccccc
abccccccccccaaaaaaaaaaccaacccccccchhhpppptttsxxyyyyyvvvqqqmmmccccccccc
abcaacccccccaaaaaaacaaaaaaccccccccchhhppppsswwyyyyyyyvvqqmmmmccccccccc
abaaaacccccccaccaaaccaaaaaaacccccccchhhpppsswwyywwyyyvvqqmmmddcccccccc
abaaaaccccccccccaaaccaaaaaaacccccccchhhpppsswwwwwwwwwvvqqqmmdddccccccc
abaaaacccccccccaaaccaaaaaaccccccccccgggpppsswwwwrrwwwwvrqqmmdddccccccc
abccccccaaaaaccaaaacaaaaaaccccccaacccggpppssswwsrrrwwwvrrqmmdddacccccc
abccccccaaaaaccaaaacccccaaccccaaaaaacggpppssssssrrrrrrrrrnmmdddaaccccc
abcccccaaaaaaccaaaccccccccccccaaaaaacggppossssssoorrrrrrrnnmdddacccccc
abcccccaaaaaaccccccccaaaaccccccaaaaacgggoooossoooonnnrrnnnnmddaaaacccc
abccccccaaaaaccccccccaaaacccccaaaaaccgggoooooooooonnnnnnnnndddaaaacccc
abccccccaaaccccccccccaaaacccccaaaaacccgggoooooooffennnnnnnedddaaaacccc
abcccccccccccccccccccaaacccccccaacccccggggffffffffeeeeeeeeeedaaacccccc
abccccccccccccccccccaaacccccaccaaccccccggfffffffffeeeeeeeeeecaaacccccc
abccccccccccccccccccaaaacccaaaaaaaaaccccfffffffaaaaaeeeeeecccccccccccc
abccccccccaacaaccccaaaaaacaaaaaaaaaaccccccccccaaaccaaaaccccccccccccccc
abccccccccaaaaacccaaaaaaaaaaacaaaaccccccccccccaaaccccaaccccccccccaaaca
abcccccccaaaaaccccaaaaaaaaaaacaaaaacccccccccccaaaccccccccccccccccaaaaa
abcccccccaaaaaacccaaaaaaaaaacaaaaaacccccccccccaaccccccccccccccccccaaaa
abcccccccccaaaaccaaaaaaaaaaaaaaccaaccccccccccccccccccccccccccccccaaaaa`;
export const sample = `Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`;

type KeyVal<T> = { [node: string]: T };

type Graph = {
    edges: KeyVal<KeyVal<number>>;
    distances: KeyVal<number>;
    parents: KeyVal<string>;
    start: string;
    end: string;
}

export const Graph = {
    parse: (input: string): Graph => {
        const edges: KeyVal<KeyVal<number>> = {};
        const map: string[][] = input.split('\n').map(y => y.split(''));

        let keyStart = '';
        let keyEnd = '';

        for (let y = 0; y < map.length; y++) {
            for (let x = 0; x < map[y].length; x++) {
                const key = getKey(x, y);

                const height = getHeight(map[y][x]);

                if (map[y][x] === 'S') {
                    keyStart = key;
                } else if (map[y][x] === 'E') {
                    keyEnd = key;
                }

                edges[key] = (edges[key] || {});

                if (y > 0 && isAtLeastOneHigher(height, getHeight(map[y - 1][x]))) {
                    edges[key][getKey(x, y - 1)] = getHeight(map[y - 1][x]) - height;
                }
                if (y < map.length - 1 && isAtLeastOneHigher(height, getHeight(map[y + 1][x]))) {
                    edges[key][getKey(x, y + 1)] = getHeight(map[y + 1][x]) - height;
                }
                if (x > 0 && isAtLeastOneHigher(height, getHeight(map[y][x - 1]))) {
                    edges[key][getKey(x - 1, y)] = getHeight(map[y][x - 1]) - height;
                }
                if (x < map[y].length - 1 && isAtLeastOneHigher(height, getHeight(map[y][x + 1]))) {
                    edges[key][getKey(x + 1, y)] = getHeight(map[y][x + 1]) - height;
                }

            }
        }

        const distances: KeyVal<number> = {};
        const parents: KeyVal<string> = {};

        Object.keys(edges).forEach(node => {
            distances[node] = Infinity;
            parents[node] = '';
        });

        distances[keyStart] = 0;

        return {edges, distances, parents, start: keyStart, end: keyEnd};
    },
    findPath: (graph: Graph): number => {
        const {distances, edges, parents, start, end} = graph;
        const visited: string[] = [];

        let current = findShortestDistance(distances, visited);
        while (current !== end) {
            let distance = distances[current];
            let adjacents = edges[current];

            for (let adjacent in adjacents) {
                let newDistance = distance + adjacents[adjacent];
                if (distances[adjacent] > newDistance) {
                    distances[adjacent] = newDistance;
                    parents[adjacent] = current;
                }
            }
            visited.push(current);
            current = findShortestDistance(distances, visited);
        }

        const path = [];
        let parent = end;
        while (parent !== start) {
            path.push(parent);
            parent = parents[parent];
        }
        return path.length;
    }
};

const getKey = (x: number, y: number): string => {
    return `${x},${y}`;
};

const findShortestDistance = (distances: KeyVal<number>, visited: string[]): string => {
    let shortest = Infinity;
    let shortestKey = '';

    for (let key in distances) {
        let distance = distances[key];
        if (distance < shortest && !visited.includes(key)) {
            shortestKey = key;
            shortest = distance;
        }
    }

    return shortestKey;
};

const getHeight = (value: string): number => {
    if (value === 'S') {
        return 0;
    } else if (value === 'E') {
        return 27;
    } else {
        return value.charCodeAt(0) - 96;
    }
};

const isAtLeastOneHigher = (first: number, second: number): boolean => {
    return second - first <= 1;
}
