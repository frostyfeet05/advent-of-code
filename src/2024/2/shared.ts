import { Matrix } from '@util/matrix';

export const Puzzle = {
  parse: (input: string): number[][] => Matrix.toNumberMatrix(input, ' '),
  isSafeReport: (report: number[]): boolean => {
    const isIncreasingOrDecreasing = isIncreasing(report) || isDecreasing(report);
    if (!isIncreasingOrDecreasing) return false;
    return isSafeDifference(report);
  },
  isSafeReportWithProblemDampener: (report: number[]): boolean => {
    const isSafe = Puzzle.isSafeReport(report);
    if (isSafe) return true;

    const possibilities = Array.from(Array(report.length).keys()).map((i) => report.toSpliced(i, 1));
    return possibilities.some((possibility) => Puzzle.isSafeReport(possibility));
  },
};

function isIncreasing(report: number[]): boolean {
  return report.every((level: number, index: number) => index === 0 || level > report[index - 1]);
}

function isDecreasing(report: number[]): boolean {
  return report.every((level: number, index: number) => index === 0 || level < report[index - 1]);
}

function isSafeDifference(report: number[]): boolean {
  return report.every((level: number, index: number) => {
    if (index === 0) return true;
    const diff = Math.abs(level - report[index - 1]);
    return diff >= 1 && diff <= 3;
  });
}
