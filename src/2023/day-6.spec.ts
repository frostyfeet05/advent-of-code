import { describe, expect, it } from 'bun:test';
import { solve as solve1 } from './6/part-1.ts';
import { solve as solve2 } from './6/part-2.ts';

const sample = `Time:      7  15   30
Distance:  9  40  200`;

describe('Year 2023 day 6', () => {
  it('part 1 should give the correct sample answer', () => {
    expect(solve1(sample)).toBe(288);
  });
  it('part 2 should give the correct sample answer', () => {
    expect(solve2(sample)).toBe(71503);
  });
});
