// Key press detection
const keyName = document.getElementById('key-name');
const keyCode = document.getElementById('key-code');
const keyKeycode = document.getElementById('key-keycode');
const keyShift = document.getElementById('key-shift');
const keyCtrl = document.getElementById('key-ctrl');
const keyAlt = document.getElementById('key-alt');

document.addEventListener('keydown', function(e) {
    keyName.textContent = e.key || '-';
    keyCode.textContent = e.code || '-';
    keyKeycode.textContent = e.keyCode || e.which || '-';
    keyShift.textContent = e.shiftKey ? 'Yes' : 'No';
    keyCtrl.textContent = e.ctrlKey || e.metaKey ? 'Yes' : 'No';
    keyAlt.textContent = e.altKey ? 'Yes' : 'No';
});

// Keyboard shortcuts
const shortcutFeedback = document.getElementById('shortcut-feedback');

document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + K to clear
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        keyName.textContent = '-';
        keyCode.textContent = '-';
        keyKeycode.textContent = '-';
        keyShift.textContent = '-';
        keyCtrl.textContent = '-';
        keyAlt.textContent = '-';
        shortcutFeedback.textContent = 'Key display cleared!';
        setTimeout(() => {
            shortcutFeedback.textContent = '';
        }, 2000);
    }
    
    // Escape to reset
    if (e.key === 'Escape') {
        document.getElementById('keyboard-input').value = '';
        document.getElementById('input-events').textContent = 'No events yet';
        document.getElementById('arrow-counter').textContent = 'Counter: 0';
        shortcutFeedback.textContent = 'All fields reset!';
        setTimeout(() => {
            shortcutFeedback.textContent = '';
        }, 2000);
    }
});

// Input field events
const keyboardInput = document.getElementById('keyboard-input');
const inputEvents = document.getElementById('input-events');
let eventCount = 0;

keyboardInput.addEventListener('keydown', function(e) {
    eventCount++;
    inputEvents.textContent = `Keydown: ${e.key} (Event #${eventCount})`;
});

keyboardInput.addEventListener('keyup', function(e) {
    eventCount++;
    inputEvents.textContent = `Keyup: ${e.key} (Event #${eventCount})`;
});

keyboardInput.addEventListener('keypress', function(e) {
    eventCount++;
    inputEvents.textContent = `Keypress: ${e.key} (Event #${eventCount})`;
});

// Arrow key counter
let counter = 0;
const arrowCounter = document.getElementById('arrow-counter');

document.addEventListener('keydown', function(e) {
    if (e.target.tagName === 'INPUT' && e.target.type === 'text') {
        return; // Don't handle arrow keys when typing in input
    }
    
    switch(e.key) {
        case 'ArrowUp':
            e.preventDefault();
            counter++;
            arrowCounter.textContent = `Counter: ${counter}`;
            break;
        case 'ArrowDown':
            e.preventDefault();
            counter--;
            arrowCounter.textContent = `Counter: ${counter}`;
            break;
        case 'ArrowLeft':
            e.preventDefault();
            counter -= 10;
            arrowCounter.textContent = `Counter: ${counter}`;
            break;
        case 'ArrowRight':
            e.preventDefault();
            counter += 10;
            arrowCounter.textContent = `Counter: ${counter}`;
            break;
    }
});

