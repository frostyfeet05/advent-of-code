const input = [];

doPuzzle = (arr) => {
    const gamma = getGamma(arr);
    const epsilon = getEpsilon(gamma);

    const gammaDec = parseInt(gamma.join(''), 2);
    const epsilonDec = parseInt(epsilon.join(''), 2);

    return gammaDec * epsilonDec;
}

getGamma = (arr) => {
    return [...Array(arr[0].length)].map((_, i) => getCipher(arr.map(x => x[i])));
}

getEpsilon = (gamma) => {
    return gamma.map(i => (i+1)%2);
}

getCipher = (arr) => {
    const one = arr.filter(i => i === '1').length;
    const zero = arr.length - one;
    return one > zero ? 1 : 0;
}

const result = doPuzzle(input);
console.log(`Result is ${result}`);