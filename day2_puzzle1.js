const input = [];

doPuzzle = (arr) => {
    const position = { x: 0, y: 0 };
    arr.forEach(element => handleMovement(element, position));
    return position.x * position.y;
}

handleMovement = (command, position) => {
    const cmd = command.split(' ');
    const direction = cmd[0];
    const amount = parseInt(cmd[1]);
    const newPosition = Object.assign(position, {});

    switch (direction) {
        case 'forward':
            newPosition.x += amount;
            break;
        case 'up':
            newPosition.y -= amount;
            break;
        case 'down':
            newPosition.y += amount;
            break;
    }
    return newPosition;
}

const result = doPuzzle(input);
console.log(`Result is ${result}`);