export const input = ``;

type Position = { x: number; y: number };
type Part = {
  partNumber: number;
  from: Position;
  to: Position;
};
type Symbol = {
  symbol: string;
  position: Position;
};
type Schematic = { parts: Part[]; symbols: Symbol[] };

export const Puzzle = {
  parse: (input: string): Schematic => parseSchematic(input),
};

const parseSchematic = (input: string): Schematic => {
  const lines = input.split('\n');
  return {
    parts: parseParts(lines),
    symbols: parseSymbols(lines),
  };
};

const parseParts = (input: string[]): Part[] =>
  input.flatMap((line, index) => {
    const matches: RegExpMatchArray[] = [...line.matchAll(/\d+/g)];
    return matches.map((match) => parsePart(match, index));
  });

const parsePart = (input: RegExpMatchArray, lineIndex: number): Part => ({
  partNumber: parseInt(input['0']),
  from: { x: input.index || 0, y: lineIndex },
  to: { x: (input.index || 0) + input['0'].length - 1, y: lineIndex },
});

const parseSymbols = (input: string[]): Symbol[] =>
  input.flatMap((line, index) => {
    const matches: RegExpMatchArray[] = [...line.matchAll(/[^\d.]+/g)];
    return matches.map((match) => parseSymbol(match, index));
  });

const parseSymbol = (input: RegExpMatchArray, lineIndex: number): Symbol => ({
  symbol: input['0'],
  position: { x: input.index || 0, y: lineIndex },
});
