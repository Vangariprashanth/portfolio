// Helper function to get current page name
function getCurrentPage() {
    const path = window.location.pathname;
    let filename = path.split('/').pop() || '';
    
    // Handle root or empty path (should be index.html)
    if (filename === '' || filename === '/' || path.endsWith('/')) {
        filename = 'index.html';
    }
    
    return filename.toLowerCase();
}

// Helper function to highlight active page
function highlightActivePage() {
    const currentPage = getCurrentPage();
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href) {
            let linkPage = href.split('/').pop().toLowerCase();
            
            // Handle index.html or empty href
            if (linkPage === '' || href.endsWith('/')) {
                linkPage = 'index.html';
            }
            
            // Remove active class from all links
            link.classList.remove('active');
            
            // Add active class to current page
            if (linkPage === currentPage) {
                link.classList.add('active');
            }
        }
    });
}

// Load header
fetch('components/header.html')
    .then(response => {
        if (!response.ok) throw new Error('Header not found');
        return response.text();
    })
    .then(data => {
        const headerElement = document.getElementById('header');
        if (headerElement) {
            headerElement.innerHTML = data;
            // Highlight active page after header loads
            highlightActivePage();
        }
    })
    .catch(err => console.error("Header failed to load:", err));

// Load footer
fetch('components/footer.html')
    .then(response => {
        if (!response.ok) throw new Error('Footer not found');
        return response.text();
    })
    .then(data => {
        const footerElement = document.getElementById('footer');
        if (footerElement) {
            footerElement.innerHTML = data;
        }
    })
    .catch(err => console.error("Footer failed to load:", err));
