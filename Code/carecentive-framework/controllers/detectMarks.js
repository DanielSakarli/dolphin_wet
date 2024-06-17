const Jimp = require('jimp');

async function detectMarks(imagePath) {
    const image = await Jimp.read(imagePath);
    const { width, height } = image.bitmap;
    let redPixelCount = 0;

    image.scan(0, 0, width, height, (x, y, idx) => {
        const red = image.bitmap.data[idx + 0];
        const green = image.bitmap.data[idx + 1];
        const blue = image.bitmap.data[idx + 2];

        if (red > 200 && green < 100 && blue < 100) {
            redPixelCount++;
        }
    });

    const totalPixels = width * height;
    const redPercentage = (redPixelCount / totalPixels) * 100;

    return redPercentage;
}

module.exports = { detectMarks };