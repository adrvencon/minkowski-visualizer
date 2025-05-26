// TODO: Funcionalidad rota, hay que arreglarla.

let undoStack = [];
let redoStack = [];
let savedFigures = [];
let minkowskiSumComputed = false;

export function saveState(datasets) {
    undoStack.push(JSON.stringify(datasets));
    redoStack = [];
}

export function restoreState() {
    if (undoStack.length > 0) {
        const lastState = undoStack.pop();
        redoStack.push(JSON.stringify(chart.data.datasets));
        return JSON.parse(lastState);
    }
    return null;
}

export function getSavedFigures() {
    return savedFigures;
}

export function addSavedFigure(figure) {
    savedFigures.push(figure);
}

export function clearSavedFigures() {
    savedFigures = [];
}

export function clearUndoRedoStacks() {
    undoStack = [];
    redoStack = [];
}

export function setMinkowskiSumComputed(value) {
    minkowskiSumComputed = value;
}

export function getMinkowskiSumComputed() {
    return minkowskiSumComputed;
}