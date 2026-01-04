// Required form validation
const requiredForm = document.getElementById('required-form');
const requiredName = document.getElementById('required-name');
const requiredEmail = document.getElementById('required-email');
const requiredNameError = document.getElementById('required-name-error');
const requiredEmailError = document.getElementById('required-email-error');
const requiredFormResult = document.getElementById('required-form-result');

requiredForm.addEventListener('submit', function(e) {
    e.preventDefault();
    let isValid = true;
    
    // Clear previous errors
    requiredNameError.textContent = '';
    requiredEmailError.textContent = '';
    
    // Validate name
    if (!requiredName.value.trim()) {
        requiredNameError.textContent = 'Name is required';
        isValid = false;
    }
    
    // Validate email
    if (!requiredEmail.value.trim()) {
        requiredEmailError.textContent = 'Email is required';
        isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(requiredEmail.value)) {
        requiredEmailError.textContent = 'Please enter a valid email address';
        isValid = false;
    }
    
    if (isValid) {
        requiredFormResult.textContent = 'Form submitted successfully!';
        requiredFormResult.style.color = 'black';
    } else {
        requiredFormResult.textContent = 'Please fix the errors above';
        requiredFormResult.style.color = 'black';
    }
});

// Custom form validation
const customForm = document.getElementById('custom-form');
const customPassword = document.getElementById('custom-password');
const customAge = document.getElementById('custom-age');
const customUrl = document.getElementById('custom-url');
const customPasswordError = document.getElementById('custom-password-error');
const customAgeError = document.getElementById('custom-age-error');
const customUrlError = document.getElementById('custom-url-error');
const customFormResult = document.getElementById('custom-form-result');

customForm.addEventListener('submit', function(e) {
    e.preventDefault();
    let isValid = true;
    
    // Clear previous errors
    customPasswordError.textContent = '';
    customAgeError.textContent = '';
    customUrlError.textContent = '';
    
    // Validate password
    if (customPassword.value && customPassword.value.length < 8) {
        customPasswordError.textContent = 'Password must be at least 8 characters';
        isValid = false;
    }
    
    // Validate age
    const age = parseInt(customAge.value);
    if (customAge.value && (isNaN(age) || age < 18 || age > 100)) {
        customAgeError.textContent = 'Age must be between 18 and 100';
        isValid = false;
    }
    
    // Validate URL
    if (customUrl.value) {
        try {
            new URL(customUrl.value);
        } catch {
            customUrlError.textContent = 'Please enter a valid URL';
            isValid = false;
        }
    }
    
    if (isValid) {
        customFormResult.textContent = 'All validations passed!';
        customFormResult.style.color = 'black';
    } else {
        customFormResult.textContent = 'Please fix the errors above';
        customFormResult.style.color = 'black';
    }
});

// Real-time validation
const realtimeInput = document.getElementById('realtime-input');
const realtimeError = document.getElementById('realtime-error');
const realtimeSuccess = document.getElementById('realtime-success');

realtimeInput.addEventListener('input', function() {
    const value = this.value;
    realtimeError.textContent = '';
    realtimeSuccess.textContent = '';
    
    if (value.length === 0) {
        return;
    }
    
    if (value.length < 3) {
        realtimeError.textContent = 'Username must be at least 3 characters';
    } else if (value.length > 20) {
        realtimeError.textContent = 'Username must be no more than 20 characters';
    } else if (!/^[a-zA-Z0-9]+$/.test(value)) {
        realtimeError.textContent = 'Username can only contain letters and numbers';
    } else {
        realtimeSuccess.textContent = 'Username is valid!';
    }
});

