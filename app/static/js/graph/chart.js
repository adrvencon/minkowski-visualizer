const COLOR_PALETTE = {
    figure1: '#4dc9f6',  // Bright cyan
    figure2: '#f67019',  // Orange
    minkowski: '#ffeb3b', // Bright yellow
    curve: '#acc236',    // Lime green
    polygon: '#537bc4',  // Soft blue
    ellipse: '#f53794',  // Pink
    base: '#8549ba'      // Purple
};


function createGraphDataset(data, color = COLOR_PALETTE.base, isSolid = false, label = undefined) {
    return {
        label: label,
        data: data,
        fill: isSolid ? 'shape' : false,
        borderColor: color,
        backgroundColor: `${color}40`, // Adds 40% opacity
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
