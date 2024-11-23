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

    if (selectedTool !== "Coming-Soon") {
        hideAllSections(); // Hide all sections first
        showSection(selectedTool); // Show the selected tool section
    } else {
        hideAllSections();
    }
});
//Show the QRcode Section initially
hideAllSections();
showSection("qrcode-section");
//Sections
//
//
//QRCODE Section Begin
//
// Event listener for the generate qrcode button
document.getElementById("generate-qrcode").addEventListener("click", function () {
        const url = document.getElementById("link").value;
        const size = document.getElementById("qrcode-size").value; // Get the size input
        if (url) {
            generateQRCode(url, size);
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
    }
}
//
//
//QRCODE Section End
//

//
//
//Color Picker Section Begin
//
// Get the button and color display elements
const eyeDropperBtn = document.getElementById("pick-color");
const colorDisplay = document.getElementById("color-display");
const colorCode = document.getElementById("color-code");

// Listen for button click
eyeDropperBtn.addEventListener("click", async () => {
try {
    // Use the EyeDropper API (modern browsers)
    if (!window.EyeDropper) {
        colorCode.textContent = "Your browser does not support the EyeDropper API.";
        return;
    }

    const eyeDropper = new EyeDropper();
    const result = await eyeDropper.open(); // Opens the color picker
    const color = result.sRGBHex; // Get color in HEX format

    // Update UI with the picked color
    colorDisplay.style.backgroundColor = color;
    colorCode.textContent = color;
} catch (error) {
    console.error("Eye Dropper canceled or failed:", error);
    }
});
//
//
//Color Picker Section End
//

//
//
//New Section Begin
//

//
//
//New Picker Section End
//