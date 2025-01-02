function updateGraphData(chart, figure) {
    chart.data.datasets.push(figure);
    chart.update();
}

function createGraphDataset(data, color = 'rgb(0, 0, 0)', isSolid = false) {
    return {
        data: data,
        fill: isSolid ? 'shape' : false,
        borderColor: color,
        backgroundColor: 'rgba(169, 169, 169, 0.5)',
        borderWidth: 2,
        pointRadius: 3,
        pointBackgroundColor: color,
        tension: 0
    };
}

export { updateGraphData, createGraphDataset };
