import { Matrix } from '@util/matrix';

export const Puzzle = {
  parse: (input: string): number[][] => Matrix.transpose(Matrix.toNumberMatrix(input, '   ')),
  calculateDistances: (lists: number[][]): number => {
    const sorted = lists.map((list) => list.sort());
    return Matrix.transpose(sorted).reduce((a, b) => a + Math.abs(b[0] - b[1]), 0);
  },
  calculateSimilarityScore: (list: number[][]): number => {
    return list[0].reduce((score, currentId) => {
      const occurences = list[1].filter((id) => id === currentId).length;
      return score + currentId * occurences;
    }, 0);
  },
};
