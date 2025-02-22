function createGraphDataset(data, color = 'rgb(0, 0, 0)', isSolid = false, label = undefined) {
    return {
        label: label,
        data: data,
        fill: isSolid ? 'shape' : false,
        borderColor: color,
        backgroundColor: 'rgba(169, 169, 169, 0.5)',
        borderWidth: 2,
        pointRadius: 2,
        pointBackgroundColor: color,
        tension: 0
    };
}

function createBaseFiguresDataset(data, label) {
    return {
        label: label,
        data: data,
        borderColor: 'grey',
        borderWidth: 1,
        borderDash: [5, 5],
        fill: false,
        pointRadius: 0,
    };
}

export { createGraphDataset, createBaseFiguresDataset };
