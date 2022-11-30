import {Image, input, parse} from './shared';

const solve = (input: string): number => {
    const enhancements = 50;
    const {algorithm, image} = parse(input);

    let enhancedImage = Image.pad(image, enhancements * 10);

    console.log('Original');
    enhancedImage.forEach(row => console.log(row.join('')));
    console.log();

    for (let i = 0; i < enhancements; i += 2) {
        enhancedImage = Image.enhance(enhancedImage, algorithm, '.');
        enhancedImage = Image.enhance(enhancedImage, algorithm, '#');
    }

    return Image.countLight(enhancedImage);
};

const result = solve(input);
console.log(`Result is ${result}`);

export {};
