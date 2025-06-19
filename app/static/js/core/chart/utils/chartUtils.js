const COLOR_PALETTE = {
    figure1: '#4dc9f6', 
    figure2: '#f67019', 
    minkowski: '#ffeb3b',
    curve: '#acc236',
    polygon: '#537bc4',
    ellipse: '#f53794',
    base: '#8549ba'
};


function createGraphDataset(data, color = COLOR_PALETTE.base, isSolid = false, label = undefined) {
    return {
        label: label,
        data: data,
        fill: isSolid ? 'shape' : false,
        borderColor: color,
        borderWidth: 2,
        pointRadius: 3,
        pointBackgroundColor: color,
        pointHoverRadius: 5,
        tension: 0
    };
}

function createBaseFiguresDataset(data, label) {
    const color = label === 'Figure 1' ? COLOR_PALETTE.figure1 : COLOR_PALETTE.figure2;
    return {
        label: label,
        data: data,
        borderColor: color,
        borderWidth: 1,
        borderDash: [5, 5],
        fill: false,
        pointRadius: 0,
        borderOpacity: 0.7
    };
}

export { createGraphDataset, createBaseFiguresDataset, COLOR_PALETTE };

