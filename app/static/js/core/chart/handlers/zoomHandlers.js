export function setupZoomHandlers(chart) {
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    const canvas = chart.canvas;

    canvas.addEventListener('mousedown', (event) => {
        isDragging = true;
        startX = event.offsetX;
        startY = event.offsetY;
    });

    canvas.addEventListener('mouseup', () => {
        isDragging = false;
    });

    canvas.addEventListener('mouseleave', () => {
        isDragging = false;
    });

    canvas.addEventListener('mousemove', (event) => {
        if (!isDragging) return;

        const deltaX = event.offsetX - startX;
        const deltaY = event.offsetY - startY;

        const xScale = chart.scales.x;
        const yScale = chart.scales.y;

        const xRange = xScale.max - xScale.min;
        const xPixelsPerUnit = xScale.width / xRange;
        const xUnitsMoved = deltaX / xPixelsPerUnit;

        xScale.options.min -= xUnitsMoved;
        xScale.options.max -= xUnitsMoved;

        const yRange = yScale.max - yScale.min;
        const yPixelsPerUnit = yScale.height / yRange;
        const yUnitsMoved = -deltaY / yPixelsPerUnit;

        yScale.options.min -= yUnitsMoved;
        yScale.options.max -= yUnitsMoved;

        chart.update('none');
        startX = event.offsetX;
        startY = event.offsetY;
    });

    document.getElementById('zoomIn').addEventListener('click', () => {
        chart.zoom(1.5, { mode: 'xy' });
    });

    document.getElementById('zoomOut').addEventListener('click', () => {
        chart.zoom(0.5, { mode: 'xy' });
    });
}