// Function to generate QR code
function generateQRCode(url) {
    // Clear previous QR code
    const qrCodeContainer = document.getElementById("qrcode");
    qrCodeContainer.innerHTML = "";

    // Create a new QR code
    const qrCode = new QRCode(qrCodeContainer, {
        text: url,
        width: 400,
        height: 400,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.L
    });

    // Show download buttons after QR code generation
    setTimeout(() => showDownloadButtons(), 500);
}

// Function to show download buttons
function showDownloadButtons() {
    document.getElementById("download-buttons").style.display = "block";
}

// Function to convert canvas to a downloadable file
function downloadCanvasAs(format) {
    const canvas = document.querySelector("#qrcode canvas");
    if (!canvas) {
        alert("No QR code available to download.");
        return;
    }
    const link = document.createElement("a");
    link.download = `qrcode.${format}`;

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
    if (url) {
        generateQRCode(url);
    } else {
        alert("Please enter a valid URL.");
    }
});

// Event listeners for download buttons
document.getElementById("download-png").addEventListener("click", () => downloadCanvasAs("png"));
document.getElementById("download-jpeg").addEventListener("click", () => downloadCanvasAs("jpeg"));
document.getElementById("download-svg").addEventListener("click", () => downloadCanvasAs("svg"));
