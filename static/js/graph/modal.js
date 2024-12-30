function openLinePolygonModal(isPolygon, submitCallback) {
    const modal = document.getElementById('linePolygonModal');
    const coordinatesInput = document.getElementById('coordinatesInput');
    const submitButton = document.getElementById('submitCoordinates');

    submitButton.onclick = function() {
        const coordinates = coordinatesInput.value.trim();
        modal.style.display = 'none';
        submitCallback(coordinates, isPolygon, 'blue');
    };

    modal.style.display = 'flex';
}

function openCircleEllipseModal(submitCallback) {
    const modal = document.getElementById('circleEllipseModal');
    const centerXInput = document.getElementById('centerX');
    const centerYInput = document.getElementById('centerY');
    const radiusXInput = document.getElementById('radiusX');
    const radiusYInput = document.getElementById('radiusY');
    const submitButton = document.getElementById('submitCircleEllipse');

    submitButton.onclick = function() {
        const centerX = parseFloat(centerXInput.value);
        const centerY = parseFloat(centerYInput.value);
        const radiusX = parseFloat(radiusXInput.value);
        const radiusY = parseFloat(radiusYInput.value);

        modal.style.display = 'none';
        submitCallback(centerX, centerY, radiusX, radiusY, 'red');
    };

    modal.style.display = 'flex';
}

function openCurveModal(submitCallback) {
    const modal = document.getElementById('curveModal');
    modal.style.display = 'flex';

    const submitButton = document.getElementById('submitCurve');
    submitButton.onclick = function () {
        const functionString = document.getElementById('curveFunction').value.trim();
        const rangeStart = parseFloat(document.getElementById('rangeStart').value);
        const rangeEnd = parseFloat(document.getElementById('rangeEnd').value);
        const stepSize = parseFloat(document.getElementById('stepSize').value);

        modal.style.display = 'none';
        submitCallback(functionString, rangeStart, rangeEnd, stepSize, 'green');
    };
}

export { openLinePolygonModal, openCircleEllipseModal, openCurveModal };
