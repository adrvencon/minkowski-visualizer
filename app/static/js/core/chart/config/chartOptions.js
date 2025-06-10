export function getChartOptions() {
    const xRange = 23 - (-23);
    const yRange = 10 - (-10);
    const aspectRatio = xRange / yRange;
    return {
        maintainAspectRatio: false,
        responsive: true,
        aspectRatio: aspectRatio,
        scales: {
            x: {
                type: 'linear',
                position: 'center',
                min: -23,
                max: 23,
                ticks: {
                    color: '#a0a0a0',
                    stepSize: 1,
                    font: {
                        family: "'Inter', sans-serif",
                        size: 11,
                        weight: 400
                    }
                },
                grid: {
                    color: '#545454',
                    lineWidth: 0.5,
                },
                border: {
                    color: '#616161',
                },
            },
            y: {
                position: 'center',
                min: -10,
                max: 10,
                ticks: {
                    color: '#a0a0a0',
                    stepSize: 1,
                    font: {
                        family: "'Inter', sans-serif",
                        size: 11,
                        weight: 400
                    }
                },
                grid: {
                    color: '#545454',
                    lineWidth: 0.5,
                },
                border: {
                    color: '#616161',
                },
            },
        },
        plugins: {
            legend: {
                display: false,
                labels: {
                    color: '#d0d0d0',
                    font: {
                        family: "'Inter', sans-serif",
                        size: 12,
                        weight: 400
                    }
                }
            },
            zoom: {
                zoom: {
                    wheel: {
                        enabled: false,
                    },
                    pinch: {
                        enabled: false,
                    },
                    mode: 'xy',
                },
                pan: {
                    enabled: true,
                    mode: 'xy',
                },
            },
            tooltip: {
                bodyFont: {
                    family: "'Inter', sans-serif",
                    size: 14
                },
                titleFont: {
                    family: "'Inter', sans-serif",
                    size: 16,
                    weight: 500
                }
            },
        },
    };
}