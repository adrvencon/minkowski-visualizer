import { saveState, addSavedFigure, getSavedFigures, setMinkowskiSumComputed, clearUndoRedoStacks, getMinkowskiSumComputed } from '../services/stateService.js';
import { generateLineOrPolygon, generateCircleOrEllipse, generateCurve, generateMinkowskiSum } from '../utils/figureGenerator.js';
import { openLinePolygonModal, openCircleEllipseModal, openCurveModal } from '../../../components/modals/modalManager.js';
import { createBaseFiguresDataset } from '../utils/chartUtils.js';
import { updatePropertiesPanel } from '../../../components/panels/propertiesPanel.js';
import { updateButtonState, updateLegendVisibility} from './navigationHandlers.js'

export function setupFigureHandlers(chart) {
    document.getElementById('line').addEventListener('click', () => {
        openLinePolygonModal(false, (coordinates, isPolygon, color) => {
            handleLineOrPolygon(chart, coordinates, isPolygon, color);
        });
    });

    document.getElementById('polygon').addEventListener('click', () => {
        openLinePolygonModal(true, (coordinates, isPolygon, color) => {
            handleLineOrPolygon(chart, coordinates, isPolygon, color);
        });
    });

    document.getElementById('ellipse').addEventListener('click', () => {
        openCircleEllipseModal((centerX, centerY, radiusX, radiusY, color) => {
            handleCircleOrEllipse(chart, centerX, centerY, radiusX, radiusY, color);
        });
    });

    document.getElementById('curve').addEventListener('click', () => {
        openCurveModal((functionString, rangeStart, rangeEnd, stepSize, color) => {
            handleCurve(chart, functionString, rangeStart, rangeEnd, stepSize, color);
        });
    });

    document.getElementById('finishFigure').addEventListener('click', async () => {
        await handleFinishFigure(chart);
    });

    document.getElementById('minkowskiSum').addEventListener('click', () => {
        handleMinkowskiSum(chart);
    });
}

function handleLineOrPolygon(chart, coordinates, isPolygon = false, color) {
    saveState(chart.data.datasets);
    const figure = generateLineOrPolygon(coordinates, isPolygon, color);
    chart.data.datasets.push(figure);
    chart.update();
}

function handleCircleOrEllipse(chart, centerX, centerY, radiusX, radiusY, color) {
    saveState(chart.data.datasets);
    const figure = generateCircleOrEllipse(centerX, centerY, radiusX, radiusY, color);
    chart.data.datasets.push(figure);
    chart.update();
}

function handleCurve(chart, functionString, rangeStart, rangeEnd, stepSize, color) {
    saveState(chart.data.datasets);
    const figure = generateCurve(functionString, rangeStart, rangeEnd, stepSize, color);
    chart.data.datasets.push(figure);
    chart.update();
}

async function handleFinishFigure(chart) {
    const savedFigures = getSavedFigures();
    if (savedFigures.length === 2) {
        alert('You have already saved two figures.', "error");
        return;
    }

    try {
        const datasets = chart.data.datasets;
        const coords = datasets.flatMap(dataset => dataset.data);

        const response = await fetch('/validate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ coords }),
        });

        const result = await response.json();
        if (!response.ok) {
            throw new Error(result.error || 'Validation error.');
        }

        addSavedFigure(coords);

        if (savedFigures.length === 2) {
            alert('Two figures saved.', "success");
            clearUndoRedoStacks();
            updateButtonState();
        } else {
            alert('Figure saved. Please draw the next one.', "success");
        }

        chart.data.datasets = [];
        chart.update();
    } catch (error) {
        alert(`${error.message}`, "error");
    }
}

async function handleMinkowskiSum(chart) {
    const savedFigures = getSavedFigures();
    if (savedFigures.length === 2) {
        const [figure1, figure2] = savedFigures;
        
        const result = await calculateMinkowskiSum(figure1, figure2);
        
        if (result) {
            saveState(chart.data.datasets);
            const baseFigure1 = createBaseFiguresDataset(figure1, 'Figure 1');
            const baseFigure2 = createBaseFiguresDataset(figure2, 'Figure 2');
            chart.data.datasets.push(baseFigure1, baseFigure2);

            const figure = generateMinkowskiSum(result);
            chart.data.datasets.push(figure);
            chart.update();
            setMinkowskiSumComputed(true);
            updateLegendVisibility(chart);
            updateButtonState();

            updatePropertiesPanel(result);
        }
    } else {
        alert('You must draw two figures before computing the sum.', "warning");
    }
}

async function calculateMinkowskiSum(figure1, figure2) {
    if (getSavedFigures().length < 2) {
        alert('You must draw two figures before computing the sum.');
        return;
    }

    if (getMinkowskiSumComputed()) {
        alert('Minkowski sum already computed.', "error");
        return;
    }

    try {
        const response = await fetch('/minkowski-sum', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ figure1, figure2 }),
        });

        const result = await response.json();
        if (response.ok) {
            return result.sum;
        } else {
            throw new Error(result.error || 'Computation error.');
        }
    } catch (error) {
        console.error(error);
        return null;
    }
}