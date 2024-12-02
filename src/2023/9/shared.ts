type History = number[];

export const Puzzle = {
  parse: (input: string): History[] => input.split('\n').map((line) => line.split(' ').map(Number)),
  extrapolate: (history: History): number => {
    if (history.every((x) => x === 0)) {
      return 0;
    }

    const diffs = calculateDiffs(history);
    const extrapolated = Puzzle.extrapolate(diffs);
    return extrapolated + history[history.length - 1];
  },
  extrapolateBackwards: (history: History): number => {
    if (history.every((x) => x === 0)) {
      return 0;
    }

    const diffs = calculateDiffs(history);
    const extrapolated = Puzzle.extrapolateBackwards(diffs);
    return history[0] - extrapolated;
  },
};

const calculateDiffs = (history: History): History => {
  return history.reduce((diffs: number[], value: number, index: number, array: number[]) => {
    if (index === 0) {
      return diffs;
    }
    return [...diffs, value - array[index - 1]];
  }, []);
};
