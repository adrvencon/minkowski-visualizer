import { 
    undo,
    redo, 
    clearSavedFigures, 
    clearUndoRedoStacks, 
    setMinkowskiSumComputed,
    getMinkowskiSumComputed,
    getSavedFigures
} from './stateHandler.js';

export function setupNavigationHandlers(chart) {
    document.getElementById('undo').addEventListener('click', () => {
        if (getMinkowskiSumComputed()) {
            alert('Cannot undo after Minkowski sum has been computed.', "warning");
            return;
        }
        const prev = undo(chart);
        if (prev) {
            chart.data.datasets = prev;
            chart.update();
        }
    });

    document.getElementById('redo').addEventListener('click', () => {
        if (getMinkowskiSumComputed()) {
            alert('Cannot redo after Minkowski sum has been computed.', "warning");
            return;
        }
        const next = redo(chart);
        if (next) {
            chart.data.datasets = next;
            chart.update();
        }
    });

    document.getElementById('restart').addEventListener('click', () => {
        document.getElementById('properties-panel').classList.remove('visible');
        chart.data.datasets = [];
        clearUndoRedoStacks();
        clearSavedFigures();
        chart.resetZoom();
        
        chart.options.scales.x.min = -23;
        chart.options.scales.x.max = 23;
        chart.options.scales.y.min = -10;
        chart.options.scales.y.max = 10;
        
        chart.update();
        setMinkowskiSumComputed(false);
        updateLegendVisibility(chart);
        updateButtonState();
    });

    document.getElementById('restartFigure').addEventListener('click', () => {
        if (getMinkowskiSumComputed()) {
            alert('Cannot clear the figure after Minkowski sum has been computed. Try creating a new canvas instead.');
        } else {
            chart.data.datasets = [];
            chart.resetZoom();

            chart.options.scales.x.min = -23;
            chart.options.scales.x.max = 23;
            chart.options.scales.y.min = -10;
            chart.options.scales.y.max = 10;

            chart.update();
            updateButtonState();
        }
    });
}

export function updateLegendVisibility(chart) {
    const hasLabels = chart.data.datasets.some(dataset => dataset.label);
    chart.options.plugins.legend.display = hasLabels;
    chart.update();
}

export function updateButtonState() {
    const finishFigureButton = document.getElementById('finishFigure');
    const minkowskiSumButton = document.getElementById('minkowskiSum');
    const restartFigureButton = document.getElementById('restartFigure');
    const undoButton = document.getElementById('undo');
    const redoButton = document.getElementById('redo');
    
    const savedFigures = getSavedFigures();
    const minkowskiComputed = getMinkowskiSumComputed();
    
    finishFigureButton.disabled = savedFigures.length === 2 || minkowskiComputed;
    minkowskiSumButton.disabled = savedFigures.length !== 2 || minkowskiComputed;
    restartFigureButton.disabled = savedFigures.length === 2;
    undoButton.disabled = savedFigures.length === 2;
    redoButton.disabled = savedFigures.length === 2;
}