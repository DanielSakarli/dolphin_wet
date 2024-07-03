const Jimp = require('jimp');

async function detectMarks(imagePath) {
    try {
        const image = await Jimp.read(imagePath);
        const { width, height } = image.bitmap;
        const visited = new Array(width * height).fill(false);

        const isBlack = (red, green, blue) => red < 50 && green < 50 && blue < 50;
        const isRed = (red, green, blue) => red > 200 && green < 100 && blue < 100;
        const isBlue = (red, green, blue) => red < 100 && green < 100 && blue > 200;
        const isWhite = (red, green, blue) => red > 200 && green > 200 && blue > 200;
        const isWhiteOrRedOrBlue = (red, green, blue) => isRed(red, green, blue) || isBlue(red, green, blue) || isWhite(red, green, blue);

        const floodFill = (x, y) => {
            const stack = [[x, y]];
            let redPixelCount = 0;
            let bluePixelCount = 0;
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

                if (isWhiteOrRedOrBlue(red, green, blue)) {
                    if (isRed(red, green, blue)) {
                        redPixelCount++;
                    } else if (isBlue(red, green, blue)) {
                        bluePixelCount++;
                    }
                    silhouettePixelCount++;
                }

                if (currX > 0) stack.push([currX - 1, currY]);
                if (currX < width - 1) stack.push([currX + 1, currY]);
                if (currY > 0) stack.push([currX, currY - 1]);
                if (currY < height - 1) stack.push([currX, currY + 1]);
            }

            return { redPixelCount, bluePixelCount, silhouettePixelCount };
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

        areas.sort((a, b) => b.silhouettePixelCount - a.silhouettePixelCount);
        const largestArea = areas.shift();

        const totalRedPixels = areas.reduce((sum, area) => sum + area.redPixelCount, 0);
        const totalBluePixels = areas.reduce((sum, area) => sum + area.bluePixelCount, 0);
        const totalPixels = areas.reduce((sum, area) => sum + area.silhouettePixelCount, 0);
        const redPercentage = totalPixels === 0 ? 0 : (totalRedPixels / totalPixels) * 100;
        const bluePercentage = totalPixels === 0 ? 0 : (totalBluePixels / totalPixels) * 100;

        console.log("Red percentage across all silhouettes (excluding largest area):", redPercentage);
        console.log("Blue percentage across all silhouettes (excluding largest area):", bluePercentage);
        console.log("Red pixel count:", totalRedPixels);
        console.log("Blue pixel count:", totalBluePixels);
        console.log("Total pixel count:", totalPixels);

        return {
            areas: areas.map(area => ({
                redPercentage: area.silhouettePixelCount === 0 ? 0 : (area.redPixelCount / area.silhouettePixelCount) * 100,
                bluePercentage: area.silhouettePixelCount === 0 ? 0 : (area.bluePixelCount / area.silhouettePixelCount) * 100,
                redPixelCount: area.redPixelCount,
                bluePixelCount: area.bluePixelCount,
                silhouettePixelCount: area.silhouettePixelCount
            })),
            totalRedPercentage: parseFloat(redPercentage.toFixed(2)),
            totalBluePercentage: parseFloat(bluePercentage.toFixed(2))
        };
    } catch (error) {
        console.error('Error processing image:', error);
        throw error;
    }
}

module.exports = { detectMarks };


/*const Jimp = require('jimp');

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
            totalRedPercentage: parseFloat(redPercentage.toFixed(2))
        };
    } catch (error) {
        console.error('Error processing image:', error);
        throw error;
    }
}

module.exports = { detectMarks };
*/