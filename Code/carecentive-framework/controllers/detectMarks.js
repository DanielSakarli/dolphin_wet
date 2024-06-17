const Jimp = require('jimp');

async function detectMarks(imagePath) {
    try {
        const image = await Jimp.read(imagePath);
        const { width, height } = image.bitmap;
        const visited = new Array(width * height).fill(false);

        const isBlack = (red, green, blue) => red < 50 && green < 50 && blue < 50;
        const isRed = (red, green, blue) => red > 200 && green < 100 && blue < 100;
        const isWhiteOrRed = (red, green, blue) => (red > 200 && green < 100 && blue < 100) || (red > 200 && green > 200 && blue > 200);

        const floodFill = (x, y) => {
            const stack = [[x, y]];
            let redPixelCount = 0;
            let silhouettePixelCount = 0;

            while (stack.length > 0) {
                const [currX, currY] = stack.pop();
                const idx = (currY * width + currX) * 4;
                if (visited[currY * width + currX]) continue;

                visited[currY * width + currX] = true;
                const red = image.bitmap.data[idx];
                const green = image.bitmap.data[idx + 1];
                const blue = image.bitmap.data[idx + 2];

                if (isBlack(red, green, blue)) continue;

                if (isWhiteOrRed(red, green, blue)) {
                    if (isRed(red, green, blue)) redPixelCount++;
                    silhouettePixelCount++;
                }

                if (currX > 0 && !visited[currY * width + (currX - 1)]) stack.push([currX - 1, currY]);
                if (currX < width - 1 && !visited[currY * width + (currX + 1)]) stack.push([currX + 1, currY]);
                if (currY > 0 && !visited[(currY - 1) * width + currX]) stack.push([currX, currY - 1]);
                if (currY < height - 1 && !visited[(currY + 1) * width + currX]) stack.push([currX, currY + 1]);
            }

            const redPercentage = silhouettePixelCount === 0 ? 0 : (redPixelCount / silhouettePixelCount) * 100;
            return { redPercentage, redPixelCount, silhouettePixelCount };
        };

        const silhouettes = [];
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const idx = (y * width + x) * 4;
                const red = image.bitmap.data[idx];
                const green = image.bitmap.data[idx + 1];
                const blue = image.bitmap.data[idx + 2];

                if (isBlack(red, green, blue) && !visited[y * width + x]) {
                    // Flood fill should start from a white or red pixel within the silhouette
                    if (x > 0 && y > 0) {
                        const startIdx = (y * width + (x - 1)) * 4;
                        const startRed = image.bitmap.data[startIdx];
                        const startGreen = image.bitmap.data[startIdx + 1];
                        const startBlue = image.bitmap.data[startIdx + 2];

                        if (isWhiteOrRed(startRed, startGreen, startBlue) && !visited[y * width + (x - 1)]) {
                            silhouettes.push(floodFill(x - 1, y));
                        }
                    } else if (y > 0) {
                        const startIdx = ((y - 1) * width + x) * 4;
                        const startRed = image.bitmap.data[startIdx];
                        const startGreen = image.bitmap.data[startIdx + 1];
                        const startBlue = image.bitmap.data[startIdx + 2];

                        if (isWhiteOrRed(startRed, startGreen, startBlue) && !visited[(y - 1) * width + x]) {
                            silhouettes.push(floodFill(x, y - 1));
                        }
                    }
                }
            }
        }

        console.log("Marks percentage in the dolphin silhouettes:", silhouettes);
        return silhouettes;
    } catch (error) {
        console.error('Error processing image:', error);
        throw error;
    }
}

module.exports = { detectMarks };


/*const Jimp = require('jimp');

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
    console.log("Calculated the percentage of red marks within the dolphin silhouette: ", redPercentage);
    return redPercentage;
}

module.exports = { detectMarks };*/