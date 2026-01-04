// Download functionality
const downloadBtn = document.getElementById('download-btn');
const downloadStatus = document.getElementById('download-status');
const downloadHistory = document.getElementById('download-history');
const clearHistoryBtn = document.getElementById('clear-history-btn');

let downloadCount = parseInt(localStorage.getItem('downloadCount') || '0');
let downloadHistoryList = JSON.parse(localStorage.getItem('downloadHistory') || '[]');

// Generate unique filename
function generateFilename() {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').replace('T', '_').slice(0, -5);
    const randomId = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `test-file-${timestamp}-${randomId}.txt`;
}

// Generate unique content
function generateContent(filename) {
    const now = new Date();
    const timestamp = now.toISOString();
    const randomData = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const randomNumber = Math.floor(Math.random() * 1000000);
    const downloadNumber = downloadCount + 1;
    
    // Simple checksum (sum of character codes)
    const contentString = `${filename}\n${timestamp}\n${randomData}\n${randomNumber}\n${downloadNumber}`;
    const checksum = contentString.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
    
    return `Web Elements Tester - Download File
========================================

Filename: ${filename}
Download Timestamp: ${timestamp}
Download Number: ${downloadNumber}
Random Data: ${randomData}
Random Number: ${randomNumber}
Checksum: ${checksum}

Test Information:
-----------------
This file was generated for testing download functionality.
Each download creates a unique file with unique content.

Verification:
- Filename contains timestamp and random ID
- Content includes checksum for data integrity
- Download number increments with each download
- Random data ensures uniqueness

End of File`;
}

// Download file
function downloadFile() {
    const filename = generateFilename();
    const content = generateContent(filename);
    
    // Create blob and download
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    // Update download count
    downloadCount++;
    localStorage.setItem('downloadCount', downloadCount.toString());
    
    // Add to history
    const downloadInfo = {
        filename: filename,
        timestamp: new Date().toISOString(),
        downloadNumber: downloadCount
    };
    downloadHistoryList.unshift(downloadInfo);
    if (downloadHistoryList.length > 10) {
        downloadHistoryList = downloadHistoryList.slice(0, 10);
    }
    localStorage.setItem('downloadHistory', JSON.stringify(downloadHistoryList));
    
    // Update UI
    downloadStatus.textContent = `Downloaded: ${filename}`;
    updateHistory();
}

// Update download history display
function updateHistory() {
    if (downloadHistoryList.length === 0) {
        downloadHistory.innerHTML = '<p>No downloads yet</p>';
        return;
    }
    
    downloadHistory.innerHTML = downloadHistoryList.map((item, index) => {
        const date = new Date(item.timestamp);
        return `<p>${index + 1}. ${item.filename} - ${date.toLocaleString()}</p>`;
    }).join('');
}

// Clear history
clearHistoryBtn.addEventListener('click', function() {
    downloadHistoryList = [];
    localStorage.removeItem('downloadHistory');
    updateHistory();
    downloadStatus.textContent = 'History cleared';
});

// Download button handler
downloadBtn.addEventListener('click', downloadFile);

// Initialize history display
updateHistory();

