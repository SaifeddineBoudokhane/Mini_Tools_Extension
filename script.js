// Function to generate QR code with a specific size
function generateQRCode(url, size) {
    // Clear previous QR code
    const qrCodeContainer = document.getElementById("qrcode");
    qrCodeContainer.innerHTML = "";

    // Create a new QR code
    const qrCode = new QRCode(qrCodeContainer, {
        text: url,
        width: size,   // Dynamically set width
        height: size,  // Dynamically set height
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.L
    });
}

// Function to convert canvas to a downloadable file
function downloadCanvasAs(format, size) {
    const canvas = document.querySelector("#qrcode canvas");
    if (!canvas) {
        alert("No QR code available to download.");
        return;
    }
    const link = document.createElement("a");
    link.download = `qrcode_${size}.${format}`;

    if (format === "png" || format === "jpeg") {
        link.href = canvas.toDataURL(`image/${format}`);
    } else if (format === "svg") {
        const svgContainer = document.querySelector("#qrcode svg");
        if (svgContainer) {
            const serializer = new XMLSerializer();
            const svgBlob = new Blob([serializer.serializeToString(svgContainer)], { type: "image/svg+xml" });
            link.href = URL.createObjectURL(svgBlob);
        } else {
            alert("SVG format not supported with the current QR Code library.");
            return;
        }
    }
    link.click();
}

// Event listener for the Generate button
document.getElementById("generate-btn").addEventListener("click", function () {
    const url = document.getElementById("link").value;
    const size = document.getElementById("qrcode-size").value; // Get the size input
    if (url) {
        generateQRCode(url, size);
    } else {
        alert("Please enter a valid URL.");
    }
});

// Event listener for the download button
document.getElementById("download-btn").addEventListener("click", function () {
    const size = document.getElementById("qrcode-size").value; // Get the size input
    const fileType = document.getElementById("file-type").value; // Get the selected file type
    downloadCanvasAs(fileType, size);
});
