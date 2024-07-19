function generateQRCode() {
    const url = document.getElementById('url').value;
    if (!url) {
        alert('Por favor, ingresa una URL.');
        return;
    }
    
    // Incrementar el tamaño del QR a 350
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
        const logoSize = 70; // Aumentar el tamaño del logo
        context.drawImage(logo, (canvas.width - logoSize) / 2, (canvas.height - logoSize) / 2, logoSize, logoSize);

        const img = new Image();
        img.src = canvas.toDataURL();
        const qrcodeContainer = document.getElementById('qrcode');
        qrcodeContainer.innerHTML = '';
        qrcodeContainer.appendChild(img);
        
        const urlDisplay = document.getElementById('url-display');
        urlDisplay.textContent = `URL: ${url}`;
        
        // Mostrar las instrucciones
        const instructionsContainer = document.getElementById('instructions-container');
        instructionsContainer.style.display = 'block';
    };
    logo.src = 'logo1.png'; // Asegúrate de tener tu logo en la misma carpeta o especificar la ruta correcta
}
