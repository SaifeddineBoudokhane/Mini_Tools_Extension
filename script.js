// Variables to store current active tool and section
let currentTool = null;

// Function to hide all tool sections
function hideAllSections() {
    const sections = document.querySelectorAll(".tool-section");
    sections.forEach(section => section.classList.add("hidden"));
}

// Function to show the selected tool's section
function showSection(tool) {
    const section = document.getElementById(tool);
    if (section) section.classList.remove("hidden");
}

// Event listener for tool selection dropdown change
document.getElementById("tool-dropdown").addEventListener("change", function () {
    const selectedTool = this.value;
    const executeBtn = document.getElementById("execute-btn");

    // Enable the execute button only if a tool is selected
    if (selectedTool !== "") {
        executeBtn.disabled = false;
        hideAllSections(); // Hide all sections first
        showSection(selectedTool); // Show the selected tool section
    } else {
        hideAllSections();
        executeBtn.disabled = true; // Disable the execute button if no tool is selected
    }
});

// Event listener for the execute button
document.getElementById("execute-btn").addEventListener("click", function () {
    const selectedTool = document.getElementById("tool-dropdown").value;
    //for QR code section
    if (selectedTool === "qrcode-section") {
        const url = document.getElementById("link").value;
        const size = document.getElementById("qrcode-size").value; // Get the size input

        if (url) {
            generateQRCode(url, size);
        } else {
            alert("Please enter a valid URL.");
        }
    }
    // Add other tool actions here in future
});

// Function to generate QR code with a specific size
function generateQRCode(url, size) {
    // Clear previous QR code
    const qrCodeContainer = document.getElementById("qrcode");
    qrCodeContainer.innerHTML = "";

    // Create a new QR code
    new QRCode(qrCodeContainer, {
        text: url,
        width: size,   // Dynamically set width
        height: size,  // Dynamically set height
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.L
    });
}

// Event listener for download button
document.getElementById("download-btn").addEventListener("click", function () {
    const size = document.getElementById("qrcode-size").value;
    const fileType = document.getElementById("file-type").value;
    const url = document.getElementById("link").value;

    if (url) {
        downloadQRCode(url, size, fileType);
    } else {
        alert("Please enter a valid URL.");
    }
});

// Function to download the generated QR code
function downloadQRCode(url, size, fileType) {
    const qrCodeContainer = document.getElementById("qrcode");
    const qrCodeImage = qrCodeContainer.querySelector("img");

    if (qrCodeImage) {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.width = size;
        canvas.height = size;
        context.drawImage(qrCodeImage, 0, 0, size, size);

        // Convert canvas to data URL based on selected file type
        const dataUrl = canvas.toDataURL(`image/${fileType}`);

        // Create a link element to trigger the download
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = `qrcode.${fileType}`;
        link.click();
    } else {
        alert("QR code has not been generated yet.");
    }
}
