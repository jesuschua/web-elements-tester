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
let filteredData = [...sampleData];

const tableBody = document.getElementById('table-body');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const pageInfo = document.getElementById('page-info');
const paginationInfo = document.getElementById('pagination-info');
const filterResultsInfo = document.getElementById('filter-results-info');

// Filter elements
const searchInput = document.getElementById('search-input');
const filterId = document.getElementById('filter-id');
const filterName = document.getElementById('filter-name');
const filterEmail = document.getElementById('filter-email');
const filterStatus = document.getElementById('filter-status');
const clearFiltersBtn = document.getElementById('clear-filters-btn');

// Filter data based on all filter criteria
function filterData() {
    filteredData = sampleData.filter(item => {
        // Search across all columns
        const searchTerm = searchInput.value.toLowerCase().trim();
        if (searchTerm) {
            const searchableText = `${item.id} ${item.name} ${item.email} ${item.status}`.toLowerCase();
            if (!searchableText.includes(searchTerm)) {
                return false;
            }
        }
        
        // Filter by ID
        if (filterId.value) {
            if (item.id !== parseInt(filterId.value)) {
                return false;
            }
        }
        
        // Filter by Name
        if (filterName.value.trim()) {
            if (!item.name.toLowerCase().includes(filterName.value.toLowerCase().trim())) {
                return false;
            }
        }
        
        // Filter by Email
        if (filterEmail.value.trim()) {
            if (!item.email.toLowerCase().includes(filterEmail.value.toLowerCase().trim())) {
                return false;
            }
        }
        
        // Filter by Status
        if (filterStatus.value) {
            if (item.status !== filterStatus.value) {
                return false;
            }
        }
        
        return true;
    });
    
    // Reset to page 1 when filtering
    currentPage = 1;
    renderTable();
}

// Render table with filtered data
function renderTable() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageData = filteredData.slice(startIndex, endIndex);
    
    tableBody.innerHTML = '';
    
    if (pageData.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = '<td colspan="4">No data found matching the filters</td>';
        tableBody.appendChild(row);
    } else {
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
    }
    
    const totalPages = Math.ceil(filteredData.length / itemsPerPage) || 1;
    pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
    paginationInfo.textContent = `Showing ${startIndex + 1}-${Math.min(endIndex, filteredData.length)} of ${filteredData.length} items`;
    
    // Update filter results info
    if (filteredData.length !== sampleData.length) {
        filterResultsInfo.textContent = `Filtered: ${filteredData.length} of ${sampleData.length} items`;
    } else {
        filterResultsInfo.textContent = `Total: ${sampleData.length} items`;
    }
    
    prevBtn.disabled = currentPage === 1 || filteredData.length === 0;
    nextBtn.disabled = currentPage >= totalPages || filteredData.length === 0;
}

// Event listeners for filters
searchInput.addEventListener('input', filterData);
filterId.addEventListener('input', filterData);
filterName.addEventListener('input', filterData);
filterEmail.addEventListener('input', filterData);
filterStatus.addEventListener('change', filterData);

// Clear all filters
clearFiltersBtn.addEventListener('click', function() {
    searchInput.value = '';
    filterId.value = '';
    filterName.value = '';
    filterEmail.value = '';
    filterStatus.value = '';
    filterData();
});

// Pagination handlers
prevBtn.addEventListener('click', function() {
    if (currentPage > 1) {
        currentPage--;
        renderTable();
    }
});

nextBtn.addEventListener('click', function() {
    const totalPages = Math.ceil(filteredData.length / itemsPerPage) || 1;
    if (currentPage < totalPages) {
        currentPage++;
        renderTable();
    }
});

// Initialize table
renderTable();
