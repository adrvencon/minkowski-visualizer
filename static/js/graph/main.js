import { updateGraphData } from './chart.js';
import { openLinePolygonModal, openCircleEllipseModal, openCurveModal } from './modal.js';
import { generateCircleOrEllipse, generateCurve, generateLineOrPolygon } from './figures.js';

function createGraph() {
    const ctx = document.getElementById('myChart').getContext('2d');

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

    function handleLineOrPolygon(coordinates, isPolygon = false, color) {
        const figure = generateLineOrPolygon(coordinates, isPolygon, color);
        updateGraphData(chart, figure);
    }

    function handleCircleOrEllipse(centerX, centerY, radiusX, radiusY, color) {
        const figure = generateCircleOrEllipse(centerX, centerY, radiusX, radiusY, color);
        updateGraphData(chart, figure);
    }

    function handleCurve(functionString, rangeStart, rangeEnd, stepSize, color) {
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

    function closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'none';
        }
    }
    
    document.getElementById('closeModal').addEventListener('click', function() {
        closeModal('linePolygonModal');
    });
    
    document.getElementById('closeCircleEllipseModal').addEventListener('click', function() {
        closeModal('circleEllipseModal');
    });
    
    document.getElementById('closeCurveModal').addEventListener('click', function() {
        closeModal('curveModal');
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
    
            alert('Figura válida: ' + result.status);
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    });
    
}

window.onload = function() {
    createGraph();
};
