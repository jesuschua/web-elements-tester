// Sample data
const sampleData = [
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Active' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', status: 'Inactive' },
    { id: 4, name: 'Alice Williams', email: 'alice@example.com', status: 'Active' },
    { id: 5, name: 'Charlie Brown', email: 'charlie@example.com', status: 'Active' },
    { id: 6, name: 'Diana Prince', email: 'diana@example.com', status: 'Inactive' },
    { id: 7, name: 'Edward Lee', email: 'edward@example.com', status: 'Active' },
    { id: 8, name: 'Fiona Green', email: 'fiona@example.com', status: 'Active' },
    { id: 9, name: 'George White', email: 'george@example.com', status: 'Inactive' },
    { id: 10, name: 'Helen Black', email: 'helen@example.com', status: 'Active' },
    { id: 11, name: 'Ian Gray', email: 'ian@example.com', status: 'Active' },
    { id: 12, name: 'Julia Blue', email: 'julia@example.com', status: 'Active' },
    { id: 13, name: 'Kevin Red', email: 'kevin@example.com', status: 'Inactive' },
    { id: 14, name: 'Laura Yellow', email: 'laura@example.com', status: 'Active' },
    { id: 15, name: 'Mike Orange', email: 'mike@example.com', status: 'Active' }
];

let currentPage = 1;
const itemsPerPage = 5;
const tableBody = document.getElementById('table-body');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const pageInfo = document.getElementById('page-info');
const paginationInfo = document.getElementById('pagination-info');

function renderTable() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageData = sampleData.slice(startIndex, endIndex);
    
    tableBody.innerHTML = '';
    
    pageData.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.email}</td>
            <td>${item.status}</td>
        `;
        tableBody.appendChild(row);
    });
    
    const totalPages = Math.ceil(sampleData.length / itemsPerPage);
    pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
    paginationInfo.textContent = `Showing ${startIndex + 1}-${Math.min(endIndex, sampleData.length)} of ${sampleData.length} items`;
    
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
}

prevBtn.addEventListener('click', function() {
    if (currentPage > 1) {
        currentPage--;
        renderTable();
    }
});

nextBtn.addEventListener('click', function() {
    const totalPages = Math.ceil(sampleData.length / itemsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        renderTable();
    }
});

// Initialize table
renderTable();

