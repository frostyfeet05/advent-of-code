type Node = { [key: string]: string };
type NodeMap = { [key: string]: Node };
type Map = {
  instructions: string[];
  map: NodeMap;
};

export const Puzzle = {
  parse: (input: string): Map => {
    const [instructionStr, nodesStr] = input.split('\n\n');
    return {
      instructions: instructionStr.split(''),
      map: nodesStr.split('\n').reduce((a, b) => {
        const matches = [...b.matchAll(/[0-9A-Z]+/g)];
        return {
          ...a,
          [matches[0]['0']]: {
            L: matches[1]['0'],
            R: matches[2]['0'],
          },
        };
      }, {}),
    };
  },
};
