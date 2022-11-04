export const input = ``;

export type Pixel = '.' | '#';
export type Algorithm = Pixel[];
export type Image = Pixel[][];

export const parse = (input: string): { algorithm: Algorithm, image: Image } => {
    const [algorithm, imageStr] = input.split('\n\n');
    const image = imageStr.split('\n').map(row => row.split(''));
    return {algorithm: algorithm as unknown as Algorithm, image: image as unknown as Image};
};

export const Image = {
    getWidth: (image: Image): number => image[0].length,
    getHeight: (image: Image): number => image.length,

    getSurroundingPixels: (x: number, y: number, image: Image, emptyPixel: Pixel): Pixel[] => {
        const width = Image.getWidth(image);
        const height = Image.getHeight(image);

        const pixels: Pixel[] = [];
        for (let j = y - 1; j <= y + 1; j++) {
            for (let i = x - 1; i <= x + 1; i++) {
                if (i < 0 || j < 0 || i >= width || j >= height) {
                    pixels.push(emptyPixel);
                } else {
                    pixels.push(image[j][i]);
                }
            }
        }
        return pixels;
    },
    enhancePixel: (x: number, y: number, image: Image, algorithm: Algorithm, emptyPixel: Pixel): Pixel => {
        const surrounding = Image.getSurroundingPixels(x, y , image, emptyPixel);
        const binary = surrounding.map(pixel => pixel === '.' ? '0' : '1').join('');
        const decimal = parseInt(binary, 2);

        // console.log(x, y, binary, decimal);
        return algorithm[decimal];
    },
    pad: (image: Image, padding: number): Image => {
        const halfPadding = padding / 2;
        const width = Image.getWidth(image);
        const height = Image.getHeight(image);

        const paddedImage: Image = Array<Pixel[]>(height + padding).fill([]).map(() => Array<Pixel>(width + padding).fill('.'));

        image.forEach((row: Pixel[], y: number) => row.forEach((pixel: Pixel, x: number) => paddedImage[y + halfPadding][x + halfPadding] = pixel));
        return paddedImage;
    },
    enhance: (image: Image, algorithm: Algorithm, emptyPixel: Pixel): Image => {
        // let paddedImage = Image.pad(image);

        // console.log('Padded');
        // paddedImage.forEach(row => console.log(row.join('')));
        // console.log();

        let paddedImage = [...image];

        paddedImage = paddedImage.map((row: Pixel[], y: number) => row.map((pixel: Pixel, x: number) => Image.enhancePixel(x, y, paddedImage, algorithm, emptyPixel)));

        console.log('Enhanced');
        paddedImage.forEach(row => console.log(row.join('')));
        console.log();

        return paddedImage;
    },
    countLight: (image: Image): number => {
        return image.reduce((totalAmount: number, row: Pixel[]) => totalAmount + row.reduce((amount: number, value: Pixel) => amount + (value === '#' ? 1 : 0), 0), 0);
    }
};
