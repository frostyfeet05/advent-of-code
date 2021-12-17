const input = ``;

enum PointInArea {
    BEFORE = 0,
    INSIDE = 1,
    AFTER = 2
}

interface Area {
    x1: number;
    x2: number;
    y1: number;
    y2: number;
}

interface Point {
    x: number;
    y: number;
}

interface LoggedPoint extends Point {
    where: PointInArea;
}

const processInput = (input: string): Area => {
    const data = input.split(': ')[1].split(', ').map(i => i.split('=')[1]);
    const [x1, x2, y1, y2] = data.flatMap(i => i.split('..')).map(Number);
    return {x1, x2, y1, y2};
};

const move = (position: Point, velocity: Point): { position: Point, velocity: Point } => {
    const newPosX = position.x + velocity.x;
    const newPosY = position.y + velocity.y;
    const newVelX = velocity.x === 0 ? 0 : velocity.x + (velocity.x < 0 ? 1 : -1);
    const newVelY = velocity.y - 1;

    const newPosition = {x: newPosX, y: newPosY};
    const newVelocity = {x: newVelX, y: newVelY};
    return {position: newPosition, velocity: newVelocity};
};

const isPointInArea = (position: Point, area: Area): PointInArea => {
    if ((position.x < area.x1 && position.y >= area.y1) || (position.x <= area.x2 && position.y > area.y2)) {
        return PointInArea.BEFORE;
    } else if (position.x > area.x2 || position.y < area.y1) {
        return PointInArea.AFTER;
    } else {
        return PointInArea.INSIDE;
    }
};

const velocityHitsMark = (startVelocity: Point, area: Area): boolean => {
    let inArea: PointInArea = PointInArea.BEFORE;

    let currentPosition: Point = {x: 0, y: 0};
    let currentVelocity = Object.assign({}, startVelocity);

    while (inArea !== PointInArea.AFTER) {
        let {position, velocity} = move(currentPosition, currentVelocity);
        currentPosition = Object.assign(currentPosition, position);
        currentVelocity = Object.assign(currentVelocity, velocity);

        inArea = isPointInArea(currentPosition, area);
        if (inArea === PointInArea.INSIDE) {
            return true;
        }
    }

    return false;
};

const solve = (input: string): number => {
    const area = processInput(input);
    const velocities: Set<string> = new Set<string>();

    const maxY = Math.max(Math.abs(area.y1), Math.abs(area.y2));
    const listY = Array.from({length: maxY * 2}, (k,i) => i - maxY);
    const listX = Array.from({length: area.x2 + 1}, (k,i) => i);
    listY.forEach(y => listX.forEach(x => {
        if (velocityHitsMark({x, y}, area)) {
            velocities.add(`${x},${y}`);
        }
    }));

    return velocities.size;
};

const result = solve(input);
console.log(`Result is ${result}`);

export {};
