// Function to generate QR code
function generateQRCode(url) {
    // Clear any previous QR code
    document.getElementById("qrcode").innerHTML = "";
  
    // Create a new QR code for the input URL
    new QRCode(document.getElementById("qrcode"), {
      text: url, // URL or text to encode
      width: 200, // Set the width of the QR code
      height: 200, // Set the height of the QR code
      colorDark: "#000000", // Dark color of the QR code
      colorLight: "#ffffff", // Light color of the QR code
      correctLevel: QRCode.CorrectLevel.L // Error correction level
    });
  }
  
  // Event listener for input change
  document.getElementById("link").addEventListener("input", function() {
    const url = this.value;
    if (url) {
      generateQRCode(url); // Generate QR code for the entered URL
    }
  });
  