import { getChartOptions } from './config/chartOptions.js';
import { setupZoomHandlers } from './handlers/zoomHandlers.js';
import { setupFigureHandlers } from './handlers/figureHandlers.js';
import { setupNavigationHandlers } from './handlers/navigationHandlers.js';
import { setupExportHandler } from './handlers/exportHandlers.js';

export function initializeChart() {
    const ctx = document.getElementById('myChart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'line',
        data: { datasets: [] },
        options: getChartOptions()
    });

    setupZoomHandlers(chart);
    setupFigureHandlers(chart);
    setupNavigationHandlers(chart);
    setupExportHandler();

    return chart;
}