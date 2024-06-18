const Jimp = require('jimp');

async function detectMarks(imagePath) {
    try {
        const image = await Jimp.read(imagePath);
        const { width, height } = image.bitmap;
        const visited = new Array(width * height).fill(false);

        const isBlack = (red, green, blue) => red < 50 && green < 50 && blue < 50;
        const isRed = (red, green, blue) => red > 200 && green < 100 && blue < 100;
        const isWhite = (red, green, blue) => red > 200 && green > 200 && blue > 200;
        const isWhiteOrRed = (red, green, blue) => isRed(red, green, blue) || isWhite(red, green, blue);

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
                    if (isRed(red, green, blue)) {
                        redPixelCount++;
                    }
                    silhouettePixelCount++;
                }

                if (currX > 0) stack.push([currX - 1, currY]);
                if (currX < width - 1) stack.push([currX + 1, currY]);
                if (currY > 0) stack.push([currX, currY - 1]);
                if (currY < height - 1) stack.push([currX, currY + 1]);
            }

            return { redPixelCount, silhouettePixelCount };
        };

        const areas = [];
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const idx = (y * width + x) * 4;
                const red = image.bitmap.data[idx];
                const green = image.bitmap.data[idx + 1];
                const blue = image.bitmap.data[idx + 2];

                if (!isBlack(red, green, blue) && !visited[y * width + x]) {
                    areas.push(floodFill(x, y));
                }
            }
        }

        // Discard the largest area (by silhouettePixelCount)
        areas.sort((a, b) => b.silhouettePixelCount - a.silhouettePixelCount);
        const largestArea = areas.shift();

        // Calculate total red and total pixels for remaining areas
        const totalRedPixels = areas.reduce((sum, area) => sum + area.redPixelCount, 0);
        const totalPixels = areas.reduce((sum, area) => sum + area.silhouettePixelCount, 0);
        const redPercentage = totalPixels === 0 ? 0 : (totalRedPixels / totalPixels) * 100;

        console.log("Red percentage across all silhouettes (excluding largest area):", redPercentage);
        console.log("Red pixel count:", totalRedPixels);
        console.log("Total pixel count:", totalPixels);

        // Return detailed information for each area
        return {
            areas: areas.map(area => ({
                redPercentage: area.silhouettePixelCount === 0 ? 0 : (area.redPixelCount / area.silhouettePixelCount) * 100,
                redPixelCount: area.redPixelCount,
                silhouettePixelCount: area.silhouettePixelCount
            })),
            totalRedPercentage: redPercentage
        };
    } catch (error) {
        console.error('Error processing image:', error);
        throw error;
    }
}

module.exports = { detectMarks };


/*
The following code calculates the percentage of red pixels for each silhouette seperately.
const Jimp = require('jimp');

async function detectMarks(imagePath) {
    try {
        const image = await Jimp.read(imagePath);
        const { width, height } = image.bitmap;
        const visited = new Array(width * height).fill(false);

        const isBlack = (red, green, blue) => red < 50 && green < 50 && blue < 50;
        const isRed = (red, green, blue) => red > 200 && green < 100 && blue < 100;
        const isWhite = (red, green, blue) => red > 200 && green > 200 && blue > 200;

        const floodFill = (x, y) => {
            const stack = [[x, y]];
            let redPixelCount = 0;
            let whitePixelCount = 0;

            while (stack.length > 0) {
                const [currX, currY] = stack.pop();
                const idx = (currY * width + currX) * 4;
                if (visited[currY * width + currX]) continue;

                visited[currY * width + currX] = true;
                const red = image.bitmap.data[idx];
                const green = image.bitmap.data[idx + 1];
                const blue = image.bitmap.data[idx + 2];

                if (isBlack(red, green, blue)) continue;

                if (isRed(red, green, blue)) {
                    redPixelCount++;
                } else if (isWhite(red, green, blue)) {
                    whitePixelCount++;
                }

                if (currX > 0 && !visited[currY * width + (currX - 1)]) stack.push([currX - 1, currY]);
                if (currX < width - 1 && !visited[currY * width + (currX + 1)]) stack.push([currX + 1, currY]);
                if (currY > 0 && !visited[(currY - 1) * width + currX]) stack.push([currX, currY - 1]);
                if (currY < height - 1 && !visited[(currY + 1) * width + currX]) stack.push([currX, currY + 1]);
            }

            return { redPixelCount, whitePixelCount };
        };

        const areas = [];
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const idx = (y * width + x) * 4;
                const red = image.bitmap.data[idx];
                const green = image.bitmap.data[idx + 1];
                const blue = image.bitmap.data[idx + 2];

                if (!isBlack(red, green, blue) && !visited[y * width + x]) {
                    const { redPixelCount, whitePixelCount } = floodFill(x, y);
                    const totalPixels = redPixelCount + whitePixelCount;
                    if (totalPixels > 0) {
                        const redPercentage = totalPixels === 0 ? 0 : (redPixelCount / totalPixels) * 100;
                        areas.push({ redPixelCount, whitePixelCount, totalPixels, redPercentage });
                    }
                }
            }
        }

        console.log("Detected areas:");
        areas.forEach((area, index) => {
            console.log(`Area ${index + 1}: Total Pixels = ${area.totalPixels}, Red Pixels = ${area.redPixelCount}, White Pixels = ${area.whitePixelCount}, Red Percentage = ${area.redPercentage.toFixed(2)}%`);
        });

        return areas;
    } catch (error) {
        console.error('Error processing image:', error);
        throw error;
    }
}

module.exports = { detectMarks };
*/

