import { Matrix } from '@util/matrix.ts';

export const Puzzle = {
  parse: (input: string): Matrix<string> => Matrix.fromString(input),
};
