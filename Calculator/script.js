// ===============================
// Select Elements
// ===============================

const display = document.getElementById("display");
const themeToggle = document.getElementById("themeToggle");
const dateTime = document.getElementById("datetime");

// ===============================
// Calculator Functions
// ===============================

// Add value to display
function appendValue(value) {
    display.value += value;
}

// Clear display
function clearDisplay() {
    display.value = "";
}

// Delete last character
function deleteLast() {
    display.value = display.value.slice(0, -1);
}

// Calculate result
function calculate() {

    if (display.value.trim() === "") return;

    try {

        // Prevent division by zero
        if (display.value.includes("/0")) {
            display.value = "Cannot divide by 0";
            setTimeout(() => {
                display.value = "";
            }, 1500);
            return;
        }

        let result = Function('"use strict"; return (' + display.value + ')')();

        display.value = result;

    } catch (error) {

        display.value = "Error";

        setTimeout(() => {
            display.value = "";
        }, 1200);

    }

}

// ===============================
// Keyboard Support
// ===============================

document.addEventListener("keydown", (event) => {

    const key = event.key;

    // Numbers
    if (!isNaN(key)) {
        appendValue(key);
    }

    // Operators
    else if (["+", "-", "*", "/", "%", "."].includes(key)) {
        appendValue(key);
    }

    // Enter
    else if (key === "Enter") {
        event.preventDefault();
        calculate();
    }

    // Backspace
    else if (key === "Backspace") {
        deleteLast();
    }

    // Escape
    else if (key === "Escape") {
        clearDisplay();
    }

});

// ===============================
// Live Date & Time
// ===============================

function updateDateTime() {

    const now = new Date();
        
    const date = now.toLocaleDateString("en-IN", {
        weekday: "short",
        day: "2-digit",
        month: "short",
        year: "numeric"
    });

    const time = now.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    });

    dateTime.innerHTML = `${date}<br>${time}`;

}

updateDateTime();
setInterval(updateDateTime, 1000);

// ===============================
// Theme Toggle
// ===============================

// Load saved theme
if (localStorage.getItem("theme") === "light") {

    document.body.classList.add("light");
    themeToggle.textContent = "☀️";

} else {

    themeToggle.textContent = "🌙";

}

// Toggle theme
themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("light");

    if (document.body.classList.contains("light")) {

        localStorage.setItem("theme", "light");
        themeToggle.textContent = "☀️";

    } else {

        localStorage.setItem("theme", "dark");
        themeToggle.textContent = "🌙";

    }

});

/* ===========================
   PAGE LOADER
=========================== */

window.addEventListener("load", () => {

    setTimeout(() => {

        document.getElementById("loader").style.display = "none";
        document.getElementById("content").style.display = "block";

    }, 1500);

});
