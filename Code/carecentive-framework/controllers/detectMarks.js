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

                // Only proceed if it's not a black pixel (outline) and is a white or red pixel
                if (!isWhiteOrRed(red, green, blue) && !isBlack(red, green, blue)) continue;

                if (isRed(red, green, blue)) {
                    redPixelCount++;
                }

                silhouettePixelCount++;

                // Add neighboring pixels to the stack
                if (currX > 0) stack.push([currX - 1, currY]);
                if (currX < width - 1) stack.push([currX + 1, currY]);
                if (currY > 0) stack.push([currX, currY - 1]);
                if (currY < height - 1) stack.push([currX, currY + 1]);
            }

            const redPercentage = silhouettePixelCount === 0 ? 0 : (redPixelCount / silhouettePixelCount) * 100;
            return { redPercentage, redPixelCount, silhouettePixelCount };
        };

        // Scan the image to find starting points for each silhouette
        const silhouettes = [];
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const idx = (y * width + x) * 4;
                const red = image.bitmap.data[idx];
                const green = image.bitmap.data[idx + 1];
                const blue = image.bitmap.data[idx + 2];

                // If a black pixel is found and it hasn't been visited, it's part of a new silhouette
                if (isBlack(red, green, blue) && !visited[y * width + x]) {
                    // Find an interior point to start the flood fill
                    let startX = x + 1;
                    let startY = y;
                    if (startX >= width) {
                        startX = x;
                        startY = y + 1;
                    }
                    if (startY >= height) {
                        continue;
                    }

                    // Ensure the starting point is inside the silhouette
                    const startIdx = (startY * width + startX) * 4;
                    const startRed = image.bitmap.data[startIdx];
                    const startGreen = image.bitmap.data[startIdx + 1];
                    const startBlue = image.bitmap.data[startIdx + 2];

                    if (isWhiteOrRed(startRed, startGreen, startBlue)) {
                        silhouettes.push(floodFill(startX, startY));
                    }
                }
            }
        }

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