// script.js

// Función de inicio de sesión
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'PLANIFICACION' && password === 'plani2024') {
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('main-container').style.display = 'block';
    } else {
        alert('Usuario o contraseña incorrectos');
    }
}

// Función para generar el código QR
function generateQRCode() {
    const url = document.getElementById('url').value;
    if (!url) {
        alert('Por favor, ingresa una URL.');
        return;
    }

    const qr = new QRious({
        value: url,
        size: 350
    });

    const canvas = document.createElement('canvas');
    canvas.width = qr.size;
    canvas.height = qr.size;
    const context = canvas.getContext('2d');
    context.drawImage(qr.image, 0, 0);

    const logo = new Image();
    logo.onload = () => {
        const logoSize = 70;
        context.drawImage(logo, (canvas.width - logoSize) / 2, (canvas.height - logoSize) / 2, logoSize, logoSize);

        const img = new Image();
        img.src = canvas.toDataURL();
        const qrcodeContainer = document.getElementById('qrcode');
        qrcodeContainer.innerHTML = '';
        qrcodeContainer.appendChild(img);

        const urlDisplay = document.getElementById('url-display');
        urlDisplay.textContent = `URL: ${url}`;

        const instructionsContainer = document.getElementById('instructions-container');
        instructionsContainer.style.display = 'block';
    };
    logo.src = 'logo1.png';
}

document.getElementById('downloadPdf').addEventListener('click', function () {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const instructions = "El siguiente Codigo QR brinda acceso al mapa interactivo del despliegue de la presente Orden de Servicio, para ello se deberá escanear mediante camara correspondiente a dispositivo movil para visualizar su contenido.";
    const qrCanvas = document.getElementById('qrcode').querySelector('img');
    const url = document.getElementById('url-display').innerText;

    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const maxWidth = pageWidth - margin * 2;

    // Ajustar y centrar el texto manualmente
    const splitInstructions = doc.splitTextToSize(instructions, maxWidth);
    const textHeight = doc.getTextDimensions(splitInstructions).h;

    doc.setFontSize(12);
    const textY = margin + textHeight;
    doc.text(splitInstructions, pageWidth / 2, margin, { align: "center" });

    // Añadir la imagen QR centrada
    const qrDataUrl = qrCanvas.src;
    const qrImageWidth = 70;
    const qrImageHeight = 70;
    const qrImageX = (pageWidth - qrImageWidth) / 2;
    const qrImageY = margin + textHeight + 10;
    doc.addImage(qrDataUrl, 'PNG', qrImageX, qrImageY, qrImageWidth, qrImageHeight);

    // Añadir la URL centrada y ajustada al ancho de la página
    doc.setFontSize(12);
    const splitUrl = doc.splitTextToSize(url, maxWidth);
    const urlY = qrImageY + qrImageHeight + 20;
    doc.text(splitUrl, pageWidth / 2, urlY, { align: "center" });

    doc.save('QR_Code_Document.pdf');
});

