function updatePropertiesPanel(sumFigure) {
    const propertiesPanel = document.getElementById('properties-panel');

    const area = calculateArea(sumFigure);
    const perimeter = calculatePerimeter(sumFigure);
    const vertices = sumFigure.length;
    const bbox = calculateBoundingBox(sumFigure);
    const centroid = calculateCentroid(sumFigure);
    const aspectRatio = calculateAspectRatio(sumFigure);

    document.getElementById('property-area').textContent = area.toFixed(2);
    document.getElementById('property-perimeter').textContent = perimeter.toFixed(2);
    document.getElementById('property-vertices').textContent = vertices;
    document.getElementById('property-bbox').textContent = `${bbox.width.toFixed(2)}×${bbox.height.toFixed(2)}`;
    document.getElementById('property-centroid').textContent = `(${centroid.x.toFixed(2)}, ${centroid.y.toFixed(2)})`;
    document.getElementById('property-aspect').textContent = aspectRatio.toFixed(2);

    propertiesPanel.classList.add('visible');
    propertiesPanel.classList.remove('collapsed');
}

document.querySelector('.properties-toggle').addEventListener('click', function() {
    document.querySelector('.properties-panel').classList.toggle('collapsed');
});

function calculateArea(points) {
    let area = 0;
    const n = points.length;
    
    for (let i = 0; i < n; i++) {
        const j = (i + 1) % n;
        area += points[i].x * points[j].y;
        area -= points[j].x * points[i].y;
    }
    
    return Math.abs(area) / 2;
}

function calculatePerimeter(points) {
    let perimeter = 0;
    const n = points.length;
    for (let i = 0; i < n; i++) {
        const j = (i + 1) % n;
        const dx = points[j].x - points[i].x;
        const dy = points[j].y - points[i].y;
        perimeter += Math.sqrt(dx*dx + dy*dy);
    }
    return perimeter;
}

function calculateBoundingBox(points) {
    let minX = Infinity, maxX = -Infinity;
    let minY = Infinity, maxY = -Infinity;
    
    points.forEach(point => {
        minX = Math.min(minX, point.x);
        maxX = Math.max(maxX, point.x);
        minY = Math.min(minY, point.y);
        maxY = Math.max(maxY, point.y);
    });
    
    return {
        width: maxX - minX,
        height: maxY - minY,
        minX, maxX, minY, maxY
    };
}

function calculateCentroid(points) {
    let sumX = 0, sumY = 0;
    const n = points.length;
    
    points.forEach(point => {
        sumX += point.x;
        sumY += point.y;
    });
    
    return {
        x: sumX / n,
        y: sumY / n
    };
}

function calculateAspectRatio(points) {
    const { width, height } = calculateBoundingBox(points);
    return width / height;
}

export { updatePropertiesPanel };