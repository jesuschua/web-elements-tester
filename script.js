// Update date and time every second
function updateDateTime() {
    const now = new Date();
    const dateTimeString = now.toLocaleString();
    document.getElementById('datetime').textContent = `Current Date and Time: ${dateTimeString}`;
}

// Initialize date/time and update every second
updateDateTime();
setInterval(updateDateTime, 1000);

// Dynamic image patterns
const imagePatterns = [
    {
        name: 'Pattern 1: Squares',
        svg: '<svg width="300" height="200" xmlns="http://www.w3.org/2000/svg"><rect width="300" height="200" fill="white" stroke="black" stroke-width="2"/><rect x="35" y="30" width="60" height="60" fill="black"/><rect x="120" y="30" width="60" height="60" fill="black"/><rect x="205" y="30" width="60" height="60" fill="black"/><rect x="35" y="110" width="60" height="60" fill="black"/><rect x="120" y="110" width="60" height="60" fill="black"/><rect x="205" y="110" width="60" height="60" fill="black"/></svg>'
    },
    {
        name: 'Pattern 2: Circles',
        svg: '<svg width="300" height="200" xmlns="http://www.w3.org/2000/svg"><rect width="300" height="200" fill="white" stroke="black" stroke-width="2"/><circle cx="100" cy="100" r="50" fill="black"/><circle cx="200" cy="100" r="50" fill="black"/><circle cx="150" cy="100" r="30" fill="white"/></svg>'
    },
    {
        name: 'Pattern 3: Stripes',
        svg: '<svg width="300" height="200" xmlns="http://www.w3.org/2000/svg"><rect width="300" height="200" fill="white" stroke="black" stroke-width="2"/><rect x="0" y="0" width="300" height="25" fill="black"/><rect x="0" y="50" width="300" height="25" fill="black"/><rect x="0" y="100" width="300" height="25" fill="black"/><rect x="0" y="150" width="300" height="25" fill="black"/></svg>'
    },
    {
        name: 'Pattern 4: Checkerboard',
        svg: '<svg width="300" height="200" xmlns="http://www.w3.org/2000/svg"><rect width="300" height="200" fill="white" stroke="black" stroke-width="2"/><rect x="0" y="0" width="75" height="50" fill="black"/><rect x="150" y="0" width="75" height="50" fill="black"/><rect x="75" y="50" width="75" height="50" fill="black"/><rect x="225" y="50" width="75" height="50" fill="black"/><rect x="0" y="100" width="75" height="50" fill="black"/><rect x="150" y="100" width="75" height="50" fill="black"/><rect x="75" y="150" width="75" height="50" fill="black"/><rect x="225" y="150" width="75" height="50" fill="black"/></svg>'
    },
    {
        name: 'Pattern 5: Triangles',
        svg: '<svg width="300" height="200" xmlns="http://www.w3.org/2000/svg"><rect width="300" height="200" fill="white" stroke="black" stroke-width="2"/><polygon points="75,50 25,150 125,150" fill="black"/><polygon points="225,50 175,150 275,150" fill="black"/><polygon points="150,20 100,100 200,100" fill="black"/></svg>'
    }
];

let currentPatternIndex = 0;
const dynamicImageContainer = document.getElementById('dynamic-image-container');
const patternNameElement = document.getElementById('pattern-name');

function updateDynamicImage() {
    const pattern = imagePatterns[currentPatternIndex];
    dynamicImageContainer.innerHTML = pattern.svg;
    patternNameElement.textContent = pattern.name;
    currentPatternIndex = (currentPatternIndex + 1) % imagePatterns.length;
}

// Initialize and update every 3 seconds
updateDynamicImage();
setInterval(updateDynamicImage, 3000);

// Radio button change handler
const radioButtons = document.querySelectorAll('input[name="option"]');
const radioResult = document.getElementById('radio-result');

radioButtons.forEach(radio => {
    radio.addEventListener('change', function() {
        if (this.checked) {
            radioResult.textContent = `Selected: ${this.value}`;
        }
    });
});

// Dropdown change handler
const dropdown = document.getElementById('dropdown');
const dropdownResult = document.getElementById('dropdown-result');

dropdown.addEventListener('change', function() {
    if (this.value) {
        dropdownResult.textContent = `Selected: ${this.value}`;
    } else {
        dropdownResult.textContent = 'No option selected';
    }
});

// Text transformation functions
function textToHex(text) {
    return text.split('').map(char => {
        return char.charCodeAt(0).toString(16).padStart(2, '0');
    }).join(' ');
}

function textToBinary(text) {
    return text.split('').map(char => {
        return char.charCodeAt(0).toString(2).padStart(8, '0');
    }).join(' ');
}

function generateRandomString(length) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

// Transform button handler
const transformBtn = document.getElementById('transform-btn');
const textInput = document.getElementById('text-input');

transformBtn.addEventListener('click', function() {
    const inputText = textInput.value;
    
    if (inputText.trim() === '') {
        alert('Please enter some text to transform');
        return;
    }
    
    document.getElementById('original-text').textContent = inputText;
    document.getElementById('hex-text').textContent = textToHex(inputText);
    document.getElementById('binary-text').textContent = textToBinary(inputText);
    document.getElementById('random-text').textContent = inputText + generateRandomString(10);
});

// Allow Enter key to trigger transformation
textInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        transformBtn.click();
    }
});

// Delayed action handler
const delayBtn = document.getElementById('delay-btn');
const delayStatus = document.getElementById('delay-status');
const delayResult = document.getElementById('delay-result');

delayBtn.addEventListener('click', function() {
    // Disable button during countdown
    delayBtn.disabled = true;
    delayResult.textContent = '';
    
    let countdown = 5;
    delayStatus.textContent = `Waiting... ${countdown} seconds remaining`;
    
    // Update countdown every second
    const countdownInterval = setInterval(function() {
        countdown--;
        if (countdown > 0) {
            delayStatus.textContent = `Waiting... ${countdown} seconds remaining`;
        } else {
            clearInterval(countdownInterval);
            delayStatus.textContent = 'Complete!';
            
            // Show result after 5 seconds
            const timestamp = new Date().toLocaleTimeString();
            delayResult.textContent = `Result displayed at ${timestamp}. The delay has completed successfully!`;
            
            // Re-enable button after a brief moment
            setTimeout(function() {
                delayBtn.disabled = false;
                delayStatus.textContent = 'Ready to start';
            }, 1000);
        }
    }, 1000);
});

