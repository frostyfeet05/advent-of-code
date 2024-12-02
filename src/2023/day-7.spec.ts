import { describe, expect, it } from 'bun:test';
import { solve as solve1 } from './7/part-1.ts';
import { solve as solve2 } from './7/part-2.ts';

const sample = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`;

describe('Year 2023 day 7', () => {
  it('part 1 should give the correct sample answer', () => {
    expect(solve1(sample)).toBe(6440);
  });
  it('part 2 should give the correct sample answer', () => {
    expect(solve2(sample)).toBe(5905);
  });
});
