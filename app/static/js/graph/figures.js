import { createGraphDataset } from './chart.js';

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

    // Añadimos el punto inicial explícitamente. 
    const yStart = parsedFunction.evaluate({ x: rangeStart });
    data.push({ x: rangeStart, y: yStart });

    for (let x = rangeStart + stepSize; x < rangeEnd; x += stepSize) {
        const y = parsedFunction.evaluate({ x });
        data.push({ x, y });
    }

    // Añadimos el punto final explícitamente. 
    const yEnd = parsedFunction.evaluate({ x: rangeEnd });
    data.push({ x: rangeEnd, y: yEnd });

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
        'rgb',
        true,
        "Minkowski Sum"
    );
}

export { generateCircleOrEllipse, generateCurve, generateLineOrPolygon, generateMinkowskiSum };
