import { COLOR_PALETTE, createGraphDataset } from '../../chart/utils/chartUtils.js'

function generateCircleOrEllipse(centerX, centerY, radiusX, radiusY, color) {
    const points = 100;
    const data = [];
    for (let i = 0; i <= points; i++) { 
        const t = (i / points) * 2 * Math.PI;
        const x = centerX + radiusX * Math.cos(t); // Fórmula paramétrica del círculo.
        const y = centerY + radiusY * Math.sin(t);
        data.push({ x, y });
    }

    data.push(data[0]); // Cerrando el círculo.

    return createGraphDataset(data, color, true);
}

function generateCurve(functionString, rangeStart, rangeEnd, stepSize, color) {
    const data = [];
    const math = window.math;
    const parsedFunction = math.parse(functionString).compile();

    function isFiniteNumber(value) {
        return typeof value === 'number' && isFinite(value);
    }

    try {
        const yStart = parsedFunction.evaluate({ x: rangeStart });
        if (isFiniteNumber(yStart)) {
            data.push({ x: rangeStart, y: yStart });
        }
    } catch (e) {
    }

    for (let x = rangeStart; x <= rangeEnd; x += stepSize) {
        let y;
        try {
            y = parsedFunction.evaluate({ x });
        } catch (e) {
            continue;
        }
        if (isFiniteNumber(y)) {
            data.push({ x, y });
        }
    }

    try {
        const yEnd = parsedFunction.evaluate({ x: rangeEnd });
        if (isFiniteNumber(yEnd)) {
            data.push({ x: rangeEnd, y: yEnd });
        }
    } catch (e) {
    }
    return createGraphDataset(data, color, false);
}


function generateLineOrPolygon(coordinates, isPolygon = false, color) {
    if (coordinates.trim() === "") {
        return null;
    }

    const coordinatePairs = coordinates.split(" ").map(pair => pair.split(","));
    const x = coordinatePairs.map(pair => parseFloat(pair[0]));
    const y = coordinatePairs.map(pair => parseFloat(pair[1]));

    if (isPolygon) {
        x.push(x[0]);
        y.push(y[0]);
    }

    return createGraphDataset(
        x.map((xValue, index) => ({ x: xValue, y: y[index] })),
        color,
        isPolygon
    );
}

function generateMinkowskiSum(coordinates) {
    const closedCoordinates = [...coordinates, coordinates[0]];

    return createGraphDataset(
        closedCoordinates,
        COLOR_PALETTE.minkowski,
        true,
        "Minkowski Sum"
    );
}

export { generateCircleOrEllipse, generateCurve, generateLineOrPolygon, generateMinkowskiSum };
