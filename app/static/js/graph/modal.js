function openLinePolygonModal(isPolygon, submitCallback) {
    const modal = document.getElementById('linePolygonModal');
    const coordinatesInput = document.getElementById('coordinatesInput');
    const submitButton = document.getElementById('submitCoordinates');
    const errorMessage = document.getElementById('linePolygonError');

    submitButton.onclick = function() {
        const coordinates = coordinatesInput.value.trim();

        if (!coordinates) {
            errorMessage.textContent = 'Please enter coordinates.';
            errorMessage.style.display = 'block';
            return;
        }

        fetch('/validate-polygon', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ coords: coordinates }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                errorMessage.textContent = data.error;
                errorMessage.style.display = 'block';
            } else {
                errorMessage.style.display = 'none';
                modal.style.display = 'none';
                submitCallback(coordinates, isPolygon, 'blue');
            }
        })
        .catch(error => {
            errorMessage.textContent = 'An error occurred while validating coordinates.';
            errorMessage.style.display = 'block';
        });
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
    const errorMessage = document.getElementById('circleEllipseError');

    submitButton.onclick = function() {
        const centerX = parseFloat(centerXInput.value);
        const centerY = parseFloat(centerYInput.value);
        const radiusX = parseFloat(radiusXInput.value);
        const radiusY = parseFloat(radiusYInput.value);

        if (isNaN(centerX) || isNaN(centerY) || isNaN(radiusX) || isNaN(radiusY)) {
            errorMessage.textContent = 'All fields are required and must be valid numbers.';
            errorMessage.style.display = 'block';
            return;
        }

        fetch('/validate-circle-ellipse', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                centerX: centerX,
                centerY: centerY,
                radiusX: radiusX,
                radiusY: radiusY,
            }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                errorMessage.textContent = data.error;
                errorMessage.style.display = 'block';
            } else {
                errorMessage.style.display = 'none';
                modal.style.display = 'none';
                submitCallback(centerX, centerY, radiusX, radiusY, 'red');
            }
        })
        .catch(error => {
            errorMessage.textContent = 'An error occurred while validating circle/ellipse data.';
            errorMessage.style.display = 'block';
        });
    };

    modal.style.display = 'flex';
}

function openCurveModal(submitCallback) {
    const modal = document.getElementById('curveModal');
    const functionInput = document.getElementById('curveFunction');
    const rangeStartInput = document.getElementById('rangeStart');
    const rangeEndInput = document.getElementById('rangeEnd');
    const stepSizeInput = document.getElementById('stepSize');
    const submitButton = document.getElementById('submitCurve');
    const errorMessage = document.getElementById('curveError');

    submitButton.onclick = function () {
        const functionString = functionInput.value.trim();
        const rangeStart = parseFloat(rangeStartInput.value);
        const rangeEnd = parseFloat(rangeEndInput.value);
        const stepSize = parseFloat(stepSizeInput.value);

        if (!functionString || isNaN(rangeStart) || isNaN(rangeEnd) || isNaN(stepSize)) {
            errorMessage.textContent = 'All fields are required and must be valid.';
            errorMessage.style.display = 'block';
            return;
        }

        fetch('/validate-curve', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                functionString: functionString,
                rangeStart: rangeStart,
                rangeEnd: rangeEnd,
                stepSize: stepSize,
            }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                errorMessage.textContent = data.error;
                errorMessage.style.display = 'block';
            } else {
                errorMessage.style.display = 'none';
                modal.style.display = 'none';
                submitCallback(functionString, rangeStart, rangeEnd, stepSize, 'green');
            }
        })
        .catch(error => {
            errorMessage.textContent = 'An error occurred while validating curve data.';
            errorMessage.style.display = 'block';
        });
    };

    modal.style.display = 'flex';
}


export { openLinePolygonModal, openCircleEllipseModal, openCurveModal };
