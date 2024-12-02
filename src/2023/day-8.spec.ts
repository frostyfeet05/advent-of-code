import { describe, expect, it } from 'bun:test';
import { solve as solve1 } from './8/part-1.ts';
import { solve as solve2 } from './8/part-2.ts';

const sample1 = `RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)`;

const sample2 = `LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)`;

const sample3 = `LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)`;

describe('Year 2023 day 8', () => {
  it('part 1 should give the correct sample1 answer', () => {
    expect(solve1(sample1)).toBe(2);
  });
  it('part 1 should give the correct sample2 answer', () => {
    expect(solve1(sample2)).toBe(6);
  });
  it('part 2 should give the correct sample answer', () => {
    expect(solve2(sample3)).toBe(6);
  });
});
