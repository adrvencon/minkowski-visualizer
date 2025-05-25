document.getElementById('export').addEventListener('click', function() {
    document.getElementById('exportModal').classList.add('active');
});

document.querySelector('.export-close').addEventListener('click', function() {
    document.getElementById('exportModal').classList.remove('active');
});

document.querySelectorAll('.export-option').forEach(option => {
    option.addEventListener('click', function() {
        const format = this.getAttribute('data-format');
        exportChart(format);
        document.getElementById('exportModal').classList.remove('active');
    });
});

function exportChart(format) {
  const filename = `minkowski-sum.${format}`;
  const canvas = document.getElementById('myChart');
  
  switch(format) {
    case 'png':
      exportAsPNG(canvas, filename);
      break;
      
    case 'jpg':
      exportAsJPG(canvas, filename);
      break;
      
    case 'svg':
      exportAsSVG(canvas, filename);
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

// TODO: hacer implementación real de SVG, ahora mismo es el canvas como imagen dentro de un SVG.
function exportAsSVG(canvas, filename) {
  const imgData = canvas.toDataURL('image/png');
  const svgContent = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${canvas.width}" height="${canvas.height}">
      <image href="${imgData}" width="${canvas.width}" height="${canvas.height}" />
    </svg>
  `;

  const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
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