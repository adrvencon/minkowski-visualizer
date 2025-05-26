export function setupExportHandler() {
    document.getElementById('export')?.addEventListener('click', openExportModal);
    document.querySelector('.export-close')?.addEventListener('click', closeExportModal);
    
    document.querySelectorAll('.export-option').forEach(option => {
        option.addEventListener('click', () => {
            const format = option.getAttribute('data-format');
            exportChart(format);
            closeExportModal();
        });
    });
}

function openExportModal() {
    document.getElementById('exportModal').classList.add('active');
}

function closeExportModal() {
    document.getElementById('exportModal').classList.remove('active');
}

function exportChart(format) {
  const filename = `minkowski-sum.${format}`;
  const canvas = document.getElementById('myChart');
  const chart = Chart.getChart(canvas);
  
  switch(format) {
    case 'png':
      exportAsPNG(canvas, filename);
      break;
      
    case 'jpg':
      exportAsJPG(canvas, filename);
      break;
      
    case 'csv':
      exportAsCSV(chart, filename);
      break;
      
    case 'pdf':
      exportAsPDF(canvas, filename);
      break;
  }
}

function exportAsPNG(canvas, filename) {
  const link = document.createElement('a');
  link.href = canvas.toDataURL('image/png');
  link.download = filename;
  link.click();
}

function exportAsJPG(canvas, filename) {
  const link = document.createElement('a');
  link.href = canvas.toDataURL('image/jpeg', 0.92);
  link.download = filename;
  link.click();
}

function exportAsCSV(chart, filename) {
  if (!chart || !chart.data) return;

  const datasets = chart.data.datasets;

  let csv = datasets.map((ds, i) => {
    const label = ds.label || `Figure ${i + 1}`;
    return `X (${label}),Y (${label})`;
  }).join(',') + '\n';

  const maxLen = Math.max(...datasets.map(ds => ds.data.length));

  for (let i = 0; i < maxLen; i++) {
    const row = [];
    datasets.forEach(ds => {
      const point = ds.data[i] || {};
      row.push(point.x ?? '', point.y ?? '');
    });
    csv += row.join(',') + '\n';
  }

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
}

function exportAsPDF(canvas, filename) {
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF();

  const imgData = canvas.toDataURL('image/png');
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();
  const imgAspectRatio = canvas.width / canvas.height;
  const pdfAspectRatio = pdfWidth / pdfHeight;

  let width, height;
  if (imgAspectRatio > pdfAspectRatio) {
    width = pdfWidth;
    height = width / imgAspectRatio;
  } else {
    height = pdfHeight;
    width = height * imgAspectRatio;
  }

  pdf.addImage(imgData, 'PNG', 0, 0, width, height);
  pdf.save(filename);
}