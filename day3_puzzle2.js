const input = [];

doPuzzle = (arr) => {
    const array = arr.map(x => x.split(''));
    const size = arr[0].length;
    const oxygen = calculateValue(array, size, getMostCommon);
    const co2 = calculateValue(array, size, getLeastCommon);

    const oxygenDec = parseInt(oxygen.join(''), 2);
    const co2Dec = parseInt(co2.join(''), 2);
    
    return oxygenDec * co2Dec;
}

calculateValue = (arr, size, func, index = 0) => {
    if (arr.length === 1) {
        return arr[0];
    }
    if (index === size) {
        throw new Error('Something wrong here');
    }
    const valueCheck = func(arr, index);
    const result = arr.filter(value => value[index] === valueCheck); 
    return calculateValue(result, size, func, index + 1);
}

getMostCommon = (arr, index) => {
    const bits = countBits(arr, index);
    return bits.one >= bits.zero ? '1' : '0';
}

getLeastCommon = (arr, index) => {
    const bits = countBits(arr, index);
    return bits.one >= bits.zero ? '0' : '1';
}

countBits = (arr, index) => {
    const one = arr.filter(x => x[index] === '1').length;
    const zero = arr.length - one;
    return {zero, one};
}

const result = doPuzzle(input);
console.log(`Result is ${result}`);