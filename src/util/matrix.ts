import type { Vector2 } from './vector';

export type Matrix<T> = T[][];

export const Matrix = {
  fromString: (input: string, colSeparator = '', rowSeparator = '\n'): Matrix<string> =>
    input.split(rowSeparator).map((row) => row.split(colSeparator).map((element) => element)),

  toNumberMatrix: (input: string, colSeparator = '', rowSeparator = '\n'): Matrix<number> =>
    input.split(rowSeparator).map((row) => row.split(colSeparator).map((element) => Number(element))),

  transpose: <T>(matrix: Matrix<T>): Matrix<T> => matrix[0].map((col, i) => matrix.map((row) => row[i])),
};

export const manhattanDistance = (first: Vector2, second: Vector2): number => {
  return Math.abs(first[0] - second[0]) + Math.abs(first[1] - second[1]);
};
