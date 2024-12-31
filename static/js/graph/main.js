import { updateGraphData } from './chart.js';
import { openLinePolygonModal, openCircleEllipseModal, openCurveModal } from './modal.js';
import { generateCircleOrEllipse, generateCurve, generateLineOrPolygon } from './figures.js';

function createGraph() {
    const ctx = document.getElementById('myChart').getContext('2d');

    const undoStack = [];
    const redoStack = [];

    const savedFigures = [];

    const data = {
        datasets: []
    };

    const options = {
        scales: {
            x: {
                type: 'linear',
                position: 'center',
                min: -10,
                max: 10,
                ticks: {
                    color: 'rgba(0, 0, 0, 0.8)',
                },
                grid: {
                    color: 'rgba(0, 0, 0, 0.1)',
                },
            },
            y: {
                position: 'center',
                min: -10,
                max: 10,
                ticks: {
                    color: 'rgba(0, 0, 0, 0.8)',
                },
                grid: {
                    color: 'rgba(0, 0, 0, 0.1)',
                },
            },
        },
        plugins: {
            legend: {
                display: false,
            },
            zoom: {
                zoom: {
                    wheel: {
                        enabled: false,
                    },
                    pinch: {
                        enabled: false,
                    },
                    mode: 'xy',
                },
                pan: {
                    enabled: false,
                    mode: 'xy',
                },
            },
        },
    };

    const chart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: options
    });

    function saveState() {
        undoStack.push(JSON.stringify(chart.data.datasets));
        redoStack.length = 0;
    }

    function restoreState(state) {
        chart.data.datasets = JSON.parse(state);
        chart.update();
    }

    document.getElementById('undo').addEventListener('click', function() {
        if (undoStack.length > 0) {
            const lastState = undoStack.pop();
            redoStack.push(JSON.stringify(chart.data.datasets));
            restoreState(lastState);
        }
    });

    document.getElementById('redo').addEventListener('click', function() {
        if (redoStack.length > 0) {
            const nextState = redoStack.pop();
            undoStack.push(JSON.stringify(chart.data.datasets));
            restoreState(nextState);
        }
    });

    function handleLineOrPolygon(coordinates, isPolygon = false, color) {
        saveState();
        const figure = generateLineOrPolygon(coordinates, isPolygon, color);
        updateGraphData(chart, figure);
    }

    function handleCircleOrEllipse(centerX, centerY, radiusX, radiusY, color) {
        saveState();
        const figure = generateCircleOrEllipse(centerX, centerY, radiusX, radiusY, color);
        updateGraphData(chart, figure);
    }

    function handleCurve(functionString, rangeStart, rangeEnd, stepSize, color) {
        saveState();
        const figure = generateCurve(functionString, rangeStart, rangeEnd, stepSize, color);
        updateGraphData(chart, figure);
    }

    document.getElementById('line').addEventListener('click', function() {
        openLinePolygonModal(false, handleLineOrPolygon);
    });

    document.getElementById('polygon').addEventListener('click', function() {
        openLinePolygonModal(true, handleLineOrPolygon);
    });

    document.getElementById('ellipse').addEventListener('click', function() {
        openCircleEllipseModal(handleCircleOrEllipse);
    });

    function closeModal(modalId, errorMessageId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'none';
        }
    
        if (errorMessageId) {
            const errorMessage = document.getElementById(errorMessageId);
            if (errorMessage) {
                errorMessage.style.display = 'none';
                errorMessage.textContent = '';
            }
        }
    }
    
    document.getElementById('closeModal').addEventListener('click', function() {
        closeModal('linePolygonModal', 'linePolygonError');
    });
    
    document.getElementById('closeCircleEllipseModal').addEventListener('click', function() {
        closeModal('circleEllipseModal', 'circleEllipseError');
    });
    
    document.getElementById('closeCurveModal').addEventListener('click', function() {
        closeModal('curveModal', 'curveError');
    });
    
    document.getElementById('curve').addEventListener('click', function () {
        openCurveModal(handleCurve);
    });

    document.getElementById('zoomIn').addEventListener('click', function() {
        chart.zoom(1.5, { mode: 'xy' });
    });

    document.getElementById('zoomOut').addEventListener('click', function() {
        chart.zoom(0.5, { mode: 'xy' });
    });

    document.getElementById('restart').addEventListener('click', function() {
        chart.data.datasets = [];
        chart.resetZoom();
        chart.update();
    });

    document.getElementById('export').addEventListener('click', function() {
        const imageUrl = chart.toBase64Image();
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = 'graph.png';
        link.click();
    });

    document.getElementById('finishFigure').addEventListener('click', async function () {
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
    
            alert('Valid figure: ' + result.status);
            savedFigures.push(coords);
    
            if (savedFigures.length === 2) {
                alert('Two figures saved.');
            } else {
                alert('Figure saved. Please draw the next one.');
            }
    
            chart.data.datasets = [];
            chart.update();
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    });    
    
}

window.onload = function() {
    createGraph();
};
