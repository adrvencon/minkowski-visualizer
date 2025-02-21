import { updateGraphData } from './chart.js';
import { openLinePolygonModal, openCircleEllipseModal, openCurveModal } from './modal.js';
import { generateCircleOrEllipse, generateCurve, generateLineOrPolygon, generateMinkowskiSum } from './figures.js';

function createGraph() {
    const ctx = document.getElementById('myChart').getContext('2d');

    let minkowskiSumComputed = false;

    const undoStack = [];
    const redoStack = [];

    const savedFigures = [];

    const data = {
        datasets: []
    };

    const options = {
        maintainAspectRatio: true,
        responsive: true,   
        scales: {
            x: {
                type: 'linear',
                position: 'center',
                min: -10,
                max: 10,
                ticks: {
                    color: 'black',
                    stepSize: 1,
                },
                grid: {
                    color: '#c0c0c0',
                    lineWidth: 0.5,
                },
                border: {
                    color: '#636363',
                },
            },
            y: {
                position: 'center',
                min: -10,
                max: 10,
                ticks: {
                    color: 'black',
                    stepSize: 1,
                },
                grid: {
                    color: '#c0c0c0',
                    lineWidth: 0.5,
                },
                border: {
                    color: '#636363',
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
                    enabled: true,
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

    function adjustScale() {
        const chartArea = chart.chartArea;
        if (!chartArea) return;

        const width = chartArea.right - chartArea.left;
        const height = chartArea.bottom - chartArea.top;
        const aspectRatio = width / height;

        const xRange = chart.options.scales.x.max - chart.options.scales.x.min;
        const yRange = xRange / aspectRatio;

        const yMid = (chart.options.scales.y.max + chart.options.scales.y.min) / 2;
        chart.options.scales.y.min = yMid - yRange / 2;
        chart.options.scales.y.max = yMid + yRange / 2;

        chart.update();
    }

    adjustScale();

    window.addEventListener('resize', adjustScale);

    function updateButtonState() {
        const finishFigureButton = document.getElementById('finishFigure');
        const minkowskiSumButton = document.getElementById('minkowskiSum');
        const restartFigureButton = document.getElementById('restartFigure');
        const undoButton = document.getElementById('undo');
        const redoButton = document.getElementById('redo');
    
        finishFigureButton.disabled = savedFigures.length === 2 || minkowskiSumComputed;
        minkowskiSumButton.disabled = savedFigures.length !== 2 || minkowskiSumComputed;
        restartFigureButton.disabled = savedFigures.length === 2;
        undoButton.disabled = savedFigures.length === 2;
        redoButton.disabled = savedFigures.length === 2;
    }

    function saveState() {
        undoStack.push(JSON.stringify(chart.data.datasets));
        redoStack.length = 0;
    }

    function restoreState(state) {
        chart.data.datasets = JSON.parse(state);
        chart.update();
    }

    document.getElementById('undo').addEventListener('click', function() {
        if (minkowskiSumComputed) {
            alert('Cannot undo after Minkowski sum has been computed.');
        } else {
            if (undoStack.length > 0) {
                const lastState = undoStack.pop();
                redoStack.push(JSON.stringify(chart.data.datasets));
                restoreState(lastState);
            }
        }
    });

    document.getElementById('redo').addEventListener('click', function() {
        if (minkowskiSumComputed) {
            alert('Cannot redo after Minkowski sum has been computed.');
        } else {
            if (redoStack.length > 0) {
                const nextState = redoStack.pop();
                undoStack.push(JSON.stringify(chart.data.datasets));
                restoreState(nextState);
            }
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
        chart.update();
        undoStack.length = 0;
        redoStack.length = 0;
        savedFigures.length = 0;
        chart.resetZoom();
        minkowskiSumComputed = false;
        updateButtonState();
    });

    document.getElementById('restartFigure').addEventListener('click', function() {
        if (minkowskiSumComputed) {
            alert('Cannot restart the figure after Minkowski sum has been computed.');
        } else {
            chart.data.datasets = [];
            chart.resetZoom();
            chart.update();
            updateButtonState();
        }
    });

    document.getElementById('export').addEventListener('click', function() {
        const imageUrl = chart.toBase64Image();
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = 'graph.png';
        link.click();
    });

    document.getElementById('finishFigure').addEventListener('click', async function () {
        if (savedFigures.length === 2) {
            alert('You have already saved two figures.');
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
    
            savedFigures.push(coords);
    
            if (savedFigures.length === 2) {
                alert('Two figures saved.');
                undoStack.length = 0;
                redoStack.length = 0;
                updateButtonState();
            } else {
                alert('Figure saved. Please draw the next one.');
            }
    
            chart.data.datasets = [];
            chart.update();
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    });

    document.getElementById('minkowskiSum').addEventListener('click', handleMinkowskiSum);

    async function calculateMinkowskiSum(figure1, figure2) {
        if (savedFigures.length < 2) {
            alert('You must draw two figures before computing the sum.');
            return;
        }
    
        if (minkowskiSumComputed) {
            alert('Minkowski sum already computed.');
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
            console.error('Error:', error);
        }
    }
    
    async function handleMinkowskiSum() {
        if (savedFigures.length === 2) {
            const [figure1, figure2] = savedFigures;
            
            const result = await calculateMinkowskiSum(figure1, figure2);
            
            if (result) {
                saveState();
                const figure = generateMinkowskiSum(result);
                updateGraphData(chart, figure);
                minkowskiSumComputed = true;
                updateButtonState();
            }
        } else {
            alert('You must draw two figures before computing the sum.');
        }
    }
    
}

window.onload = function() {
    createGraph();
};
