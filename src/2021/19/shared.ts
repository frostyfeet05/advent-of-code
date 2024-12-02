export const input = ``;

export const sample = `--- scanner 0 ---
404,-588,-901
528,-643,409
-838,591,734
390,-675,-793
-537,-823,-458
-485,-357,347
-345,-311,381
-661,-816,-575
-876,649,763
-618,-824,-621
553,345,-567
474,580,667
-447,-329,318
-584,868,-557
544,-627,-890
564,392,-477
455,729,728
-892,524,684
-689,845,-530
423,-701,434
7,-33,-71
630,319,-379
443,580,662
-789,900,-551
459,-707,401

--- scanner 1 ---
686,422,578
605,423,415
515,917,-361
-336,658,858
95,138,22
-476,619,847
-340,-569,-846
567,-361,727
-460,603,-452
669,-402,600
729,430,532
-500,-761,534
-322,571,750
-466,-666,-811
-429,-592,574
-355,545,-477
703,-491,-529
-328,-685,520
413,935,-424
-391,539,-444
586,-435,557
-364,-763,-893
807,-499,-711
755,-354,-619
553,889,-390

--- scanner 2 ---
649,640,665
682,-795,504
-784,533,-524
-644,584,-595
-588,-843,648
-30,6,44
-674,560,763
500,723,-460
609,671,-379
-555,-800,653
-675,-892,-343
697,-426,-610
578,704,681
493,664,-388
-671,-858,530
-667,343,800
571,-461,-707
-138,-166,112
-889,563,-600
646,-828,498
640,759,510
-630,509,768
-681,-892,-333
673,-379,-804
-742,-814,-386
577,-820,562

--- scanner 3 ---
-589,542,597
605,-692,669
-500,565,-823
-660,373,557
-458,-679,-417
-488,449,543
-626,468,-788
338,-750,-386
528,-832,-391
562,-778,733
-938,-730,414
543,643,-506
-524,371,-870
407,773,750
-104,29,83
378,-903,-323
-778,-728,485
426,699,580
-438,-605,-362
-469,-447,-387
509,732,623
647,635,-688
-868,-804,481
614,-800,639
595,780,-596

--- scanner 4 ---
727,592,562
-293,-554,779
441,611,-461
-714,465,-776
-743,427,-804
-660,-479,-426
832,-632,460
927,-485,-438
408,393,-506
466,436,-512
110,16,151
-258,-428,682
-393,719,612
-211,-452,876
808,-476,-593
-575,615,604
-485,667,467
-680,325,-822
-627,-443,-432
872,-547,-609
833,512,582
807,604,487
839,-516,451
891,-625,532
-652,-548,-490
30,-46,-14`;

export type Position = { x: number, y: number, z: number };
export type Beacon = { relativePosition: Position, absolutePosition?: Position };
export type Distance = { beacon1: Beacon, beacon2: Beacon, distance: number };
export type Scanner = { scanner: number, beacons: Beacon[], distances: Distance[], position?: Position };
export type Overlap = { beacons: Beacon[], scanners: Scanner[] };

export const Position = {
    add: (position1: Position, position2: Position): Position => ({
        x: position1.x + position2.x,
        y: position1.y + position2.y,
        z: position1.z + position2.z,
    }),
    substract: (position1: Position, position2: Position = {x: 0, y: 0, z: 0}): Position => ({
       x: position1.x - position2.x,
       y: position1.y - position2.y,
       z: position1.z - position2.z,
    }),
    manhattan: (position1: Position, position2: Position): number => (
        position1.x - position2.x + position1.y - position2.y + position1.z - position2.z
    ),
};

export const Beacon = {
    new: (position: Position): Beacon => ({relativePosition: position}),
    assignAbsolutePosition: (beacon: Beacon, position: Position): Beacon => ({
        ...beacon,
        absolutePosition: Position.add(beacon.relativePosition, position)
    }),
};

export const Scanner = {
    parse: (input: string): Scanner[] => {
        return input.split('\n\n').map(block => {
            const [scannerHeader, ...beaconInputs] = block.split('\n');

            const scanner: number = (scannerHeader.match(/\d/) || [0]).map(Number)[0];
            const beacons: Beacon[] = beaconInputs.map(beacon => {
                const [x, y, z] = beacon.split(',').map(Number);
                return Beacon.new({x, y, z});
            });

            const distances: Distance[] = [];

            for (let x = 0; x < beacons.length; x++) {
                for (let y = x + 1; y < beacons.length; y++) {
                    distances.push({
                        beacon1: beacons[x],
                        beacon2: beacons[y],
                        distance: Math.abs(Position.manhattan(beacons[x].relativePosition, beacons[y].relativePosition))
                    });
                }
            }

            return {scanner, beacons, distances};
        });
    },
    countCommonDistances: (scanners: Scanner[]): { scanner1: number, scanner2: number, commonDistances: number }[] => {
        const counter: { scanner1: number, scanner2: number, commonDistances: number }[] = [];
        for (let x = 0; x < scanners.length; x++) {
            for (let y = x + 1; y < scanners.length; y++) {
                const scanner1 = scanners[x];
                const scanner2 = scanners[y];
                const common = scanner1.distances
                    .map(distance => distance.distance)
                    .filter(distance => scanner2.distances
                        .map(distance => distance.distance)
                        .includes(distance))
                    .length;
                counter.push({scanner1: scanner1.scanner, scanner2: scanner2.scanner, commonDistances: common});
            }
        }
        return counter;
    }
};

export const Overlap = {
    init: (): Overlap => ({beacons: [], scanners: []}),
    addScanner: (scanner: Scanner, overlap: Overlap): Overlap => {
        const newOverlap = {...overlap};

        const common: {distance1: Distance, distance2: Distance}[] = scanner.distances
            .filter(distance => overlap.scanners.some(scanner2 => scanner2.distances.includes(distance)))
            .flatMap(distance => overlap.scanners.flatMap(scanner2 => scanner2.distances
                .filter(distance2 => distance === distance2))
                .map(distance2 => ({distance1: distance, distance2})));

        const notCommon: Set<Beacon> = new Set(scanner.distances.filter(distance => !overlap.scanners.some(scanner2 => scanner2.distances.includes(distance)))
            .flatMap(distance => [distance.beacon1, distance.beacon2]));

        // find position of scanner
        const scannerPosition: Position = {x: 0, y: 0, z: 0};

        // check if all common beacons overlap with this offset

        // add all notCommon beacons to overlap with correct absolute position
        newOverlap.beacons = [
            ...newOverlap.beacons,
            ...[...notCommon].map(beacon => Beacon.assignAbsolutePosition(beacon, scannerPosition)),
        ];

        // add scanner to list of overlap
        const newScanner = {...scanner};
        newScanner.position = scannerPosition;
        newOverlap.scanners.push(newScanner);

        return newOverlap;
    },
    calculateOffsetPosition: (beacon1: Beacon, beacon2: Beacon): Position => Position.substract(beacon1.relativePosition, beacon2.absolutePosition),
};
