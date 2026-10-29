
const sensorRange = document.getElementById("sensorRange");
const rangeLabel = document.getElementById("rangeLabel");
const raw = document.getElementById("raw");

const fanText = document.getElementById("fanText");
const ledText = document.getElementById("ledText");

const lcd1 = document.getElementById("lcd1");
const lcd2 = document.getElementById("lcd2");
const fan = document.getElementById("fan");
const explain = document.getElementById("explain");

const normalBtn = document.getElementById("normalBtn");
const moderateBtn = document.getElementById("moderateBtn");
const highBtn = document.getElementById("highBtn");
const toggleBtn = document.getElementById("toggleBtn");

// Demonstration thresholds:
// GREEN: 0–479
// YELLOW: 480–599
// RED: 600–1023

let manualFan = null;

function updateSimulation() {
    const value = Number(sensorRange.value);

    // Update sensor readings
    rangeLabel.textContent = value;
    raw.textContent = `${value} / 1023`;

    // Determine status and colors
    let status;
    let statusColor;
    let message;

    if (value >= 600) {
        status = "RED";
        statusColor = "#ff3030";
        message = "High simulated reading. Fan control is activated automatically.";
    } else if (value >= 480) {
        status = "YELLOW";
        statusColor = "#ffd21f";
        message = "Moderate simulated reading. Monitor the air-quality indicator.";
    } else {
        status = "GREEN";
        statusColor = "#16e76b";
        message = "Low simulated reading. Green status is active.";
    }

    // Update status LED label
    ledText.textContent = status;
    ledText.style.color = statusColor;

    // Update LCD text
    lcd1.textContent = `AIR VALUE: ${value}`;
    lcd2.textContent = `${status} - ${value >= 600 ? "HIGH" : value >= 480 ? "MODERATE" : "NORMAL"}`;

    // Color the LCD text
    const lcd = document.getElementById("lcd");
    lcd.style.color = statusColor;

    // Fan control: automatic at 600+, unless manually overridden
    const automaticFan = value >= 600;
    const fanOn = manualFan === null ? automaticFan : manualFan;

    fanText.textContent = fanOn ? "ON" : "OFF";
    fanText.style.color = fanOn ? "#16e76b" : "#ff3030";

    // Animate fan when ON
    fan.style.animation = fanOn ? "spin 1s linear infinite" : "none";
    fan.style.opacity = fanOn ? "1" : "0.5";

    // Update explanation
    explain.textContent = `${message} Fan output: ${fanOn ? "ON" : "OFF"}.`;

    // Update toggle button
    toggleBtn.textContent = fanOn ? "Turn fan OFF" : "Turn fan ON";
}

// Slider: restore automatic fan control when the value changes
sensorRange.addEventListener("input", () => {
    manualFan = null;
    updateSimulation();
});

// Normal button: 290
normalBtn.addEventListener("click", () => {
    sensorRange.value = 290;
    manualFan = null;
    updateSimulation();
});

// Moderate button: 480
moderateBtn.addEventListener("click", () => {
    sensorRange.value = 480;
    manualFan = null;
    updateSimulation();
});

// High button: 700
highBtn.addEventListener("click", () => {
    sensorRange.value = 700;
    manualFan = null;
    updateSimulation();
});

// Manual fan toggle
toggleBtn.addEventListener("click", () => {
    const automaticFan = Number(sensorRange.value) >= 600;
    const currentFan = manualFan === null ? automaticFan : manualFan;

    manualFan = !currentFan;
    updateSimulation();
});

// Initialize the webpage
updateSimulation();
