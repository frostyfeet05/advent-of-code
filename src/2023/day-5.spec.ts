import { describe, expect, it } from 'bun:test';
import { solve as solve1 } from './5/part-1.ts';
import { solve as solve2 } from './5/part-2.ts';

const sample = `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`;

describe('Year 2023 day 5', () => {
  it('part 1 should give the correct sample answer', () => {
    expect(solve1(sample)).toBe(35);
  });
  it('part 2 should give the correct sample answer', () => {
    expect(solve2(sample)).toBe(46);
  });
});
