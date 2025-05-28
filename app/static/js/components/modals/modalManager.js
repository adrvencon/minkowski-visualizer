import { COLOR_PALETTE } from '../../core/chart/utils/chartUtils.js'

function openLinePolygonModal(isPolygon, submitCallback) {
    const modal = document.getElementById('linePolygonModal');
    const tableBody = document.querySelector('#coords-table tbody');
    const addRowButton = document.getElementById('addRowButton');
    const submitButton = document.getElementById('submitCoordinates');
    const errorMessage = document.getElementById('linePolygonError');

    modal.classList.add('active');
    tableBody.innerHTML = '';
    errorMessage.innerHTML = '<i class="fas fa-exclamation-circle"></i><span></span>';
    errorMessage.style.display = 'none';

    function addRow(x = '', y = '') {
        const newRow = document.createElement('tr');
        newRow.className = 'coord-row';
        newRow.innerHTML = `
            <td><input type="number" step="0.01" value="${x}" class="coord-input" placeholder="0.0"></td>
            <td><input type="number" step="0.01" value="${y}" class="coord-input" placeholder="0.0"></td>
            <td><button class="remove-row-btn"><i class="fas fa-minus"></i></button></td>
        `;
        tableBody.appendChild(newRow);

        const removeButton = newRow.querySelector('.remove-row-btn');
        removeButton.addEventListener('click', () => {
            if (tableBody.children.length > 1) {
                newRow.remove();
            }
        });
        
        if (tableBody.children.length <= 1) {
            removeButton.disabled = true;
            removeButton.innerHTML = '<i class="fas fa-minus" style="opacity:0.5"></i>';
        }
    }

    addRow();
    addRow();

    const newAddRowButton = addRowButton.cloneNode(true);
    addRowButton.parentNode.replaceChild(newAddRowButton, addRowButton);

    newAddRowButton.addEventListener('click', () => {
        addRow();
        const removeButton = document.querySelectorAll('.remove-row-button');
        if (tableBody.children.length > 1) {
            removeButton.disabled = true;
        }
    });

    submitButton.onclick = function() {
        const inputs = document.querySelectorAll('#coords-table input');
        const coords = [];

        for (let i = 0; i < inputs.length; i += 2) {
            const x = parseFloat(inputs[i].value);
            const y = parseFloat(inputs[i + 1].value);

            coords.push({ x, y });
        }

        const coordinatesString = coords.map(coord => `${coord.x},${coord.y}`).join(' ');

        fetch('/validate-polygon', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ coords: coordinatesString }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                errorMessage.textContent = data.error;
                errorMessage.style.display = 'block';
            } else {
                errorMessage.style.display = 'none';
                modal.style.display = 'none';
                submitCallback(coordinatesString, isPolygon, COLOR_PALETTE.polygon);
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
                submitCallback(centerX, centerY, radiusX, radiusY, COLOR_PALETTE.ellipse);
            }
        })
        .catch(error => {
            errorMessage.textContent = 'An error occurred while validating circle/ellipse data.';
            errorMessage.style.display = 'block';
        });
    };

    modal.style.display = 'flex';
}

function isValidMathExpression(exprStr) {
  try {
    const node = math.parse(exprStr);
    const code = node.compile();
    code.evaluate({ x: 1 });
    return true;
  } catch (err) {
    return false;
  }
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

        if (!isValidMathExpression(functionString)) {
            errorMessage.textContent = 'Please enter a valid mathematical expression.';
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
                submitCallback(functionString, rangeStart, rangeEnd, stepSize, COLOR_PALETTE.curve);
            }
        })
        .catch(error => {
            errorMessage.textContent = 'An error occurred while validating curve data.';
            errorMessage.style.display = 'block';
        });
    };

    modal.style.display = 'flex';
}

const curveInputs = ['curveFunction', 'rangeStart', 'rangeEnd', 'stepSize'];
curveInputs.forEach(id => {
    document.getElementById(id).addEventListener('input', updateCurvePreview);
});

function updateCurvePreview() {
    const func = document.getElementById('curveFunction').value || 'x';
    const start = document.getElementById('rangeStart').value || '-10';
    const end = document.getElementById('rangeEnd').value || '10';
    const step = document.getElementById('stepSize').value || '0.1';
    
    document.getElementById('curvePreview').textContent = 
        `f(x) = ${func} from ${start} to ${end} (step: ${step})`;
}


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


export { openLinePolygonModal, openCircleEllipseModal, openCurveModal };
