export type Map = {
  destRangeStart: number;
  srcRangeStart: number;
  rangeLength: number;
};

export type Almanac = {
  seeds: number[];
  seedToSoil: Map[];
  soilToFertilizer: Map[];
  fertilizerToWater: Map[];
  waterToLight: Map[];
  lightToTemperature: Map[];
  temperatureToHumidity: Map[];
  humidityToLocation: Map[];
};

export const Puzzle = {
  parse: (input: string): Almanac => {
    const [
      seeds,
      seedToSoil,
      soilToFertilizer,
      fertilizerToWater,
      waterToLight,
      lightToTemperature,
      temperatureToHumidity,
      humidityToLocation,
    ] = input.split('\n\n');

    return {
      seeds: parseSeeds(seeds),
      seedToSoil: parseMap(seedToSoil),
      soilToFertilizer: parseMap(soilToFertilizer),
      fertilizerToWater: parseMap(fertilizerToWater),
      waterToLight: parseMap(waterToLight),
      lightToTemperature: parseMap(lightToTemperature),
      temperatureToHumidity: parseMap(temperatureToHumidity),
      humidityToLocation: parseMap(humidityToLocation),
    };
  },
  seedToLocation: (seed: number, almanac: Almanac): number => {
    const soil = getDestination(seed, almanac.seedToSoil);
    const fertilizer = getDestination(soil, almanac.soilToFertilizer);
    const water = getDestination(fertilizer, almanac.fertilizerToWater);
    const light = getDestination(water, almanac.waterToLight);
    const temperature = getDestination(light, almanac.lightToTemperature);
    const humidity = getDestination(temperature, almanac.temperatureToHumidity);
    const location = getDestination(humidity, almanac.humidityToLocation);
    // const a = '->';
    // console.log(seed, a, soil, a, fertilizer, a, water, a, light, a, temperature, a, humidity, a, location);
    return location;
  },
};

const parseSeeds = (input: string): number[] => input.split(': ')[1].split(' ').map(Number);
const parseMap = (input: string): Map[] => {
  return input
    .split('\n')
    .slice(1)
    .map((line) => {
      const [destRangeStart, srcRangeStart, rangeLength] = line.split(' ').map(Number);
      return {
        destRangeStart,
        srcRangeStart,
        rangeLength,
      };
    });
};

const getDestination = (src: number, maps: Map[]): number => {
  const contains = maps.find((map) => src >= map.srcRangeStart && src < map.srcRangeStart + map.rangeLength);
  if (contains) {
    return Math.abs(contains.srcRangeStart - src) + contains.destRangeStart;
  } else {
    return src;
  }
};
