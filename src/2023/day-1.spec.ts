import { describe, expect, it } from 'bun:test';
import { solve as solve1 } from './1/part-1.ts';
import { solve as solve2 } from './1/part-2.ts';

const sample1 = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`;

const sample2 = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`;

describe('Year 2023 day 1', () => {
  it('part 1 should give the correct sample answer', () => {
    expect(solve1(sample1)).toBe(142);
  });
  it('part 2 should give the correct sample answer', () => {
    expect(solve2(sample2)).toBe(281);
  });
});
