let undoStack = [];
let redoStack = [];
let savedFigures = [];
let minkowskiSumComputed = false;

export function saveState(datasets) {
  undoStack.push(JSON.stringify(datasets));
  redoStack = [];
}

export function undo(chart) {
  if (undoStack.length === 0) return null;
  const prev = undoStack.pop();
  redoStack.push(JSON.stringify(chart.data.datasets));
  return JSON.parse(prev);
}

export function redo(chart) {
  if (redoStack.length === 0) return null;
  const next = redoStack.pop();
  undoStack.push(JSON.stringify(chart.data.datasets));
  return JSON.parse(next);
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