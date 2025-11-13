// Dynamically load favicon based on current page location
// This script automatically calculates the correct path to the favicon
// based on the script's own location in the directory structure
(function() {
    // Find this script's location
    let scriptPath = null;
    
    // Try to get current script (works in modern browsers)
    if (document.currentScript && document.currentScript.src) {
        scriptPath = new URL(document.currentScript.src).pathname;
    } else {
        // Fallback: find script by searching for this file name
        const scripts = document.getElementsByTagName('script');
        for (let script of scripts) {
            if (script.src && script.src.includes('loadFavicon.js')) {
                scriptPath = new URL(script.src).pathname;
                break;
            }
        }
    }
    
    // Calculate depth based on script location
    // scripts/loadFavicon.js is at root level
    // ../../scripts/loadFavicon.js means we're 2 levels deep
    let depth = 0;
    if (scriptPath) {
        const parts = scriptPath.split('/').filter(p => p);
        // Find where 'scripts' appears and count directories before it
        const scriptsIndex = parts.indexOf('scripts');
        if (scriptsIndex > 0) {
            depth = scriptsIndex;
        }
    } else {
        // Fallback: calculate from page URL
        const path = window.location.pathname;
        const pathParts = path.split('/').filter(p => p && !p.endsWith('.html'));
        depth = pathParts.length;
    }
    
    // Determine the correct relative path to assets folder
    let faviconPath;
    if (depth === 0) {
        // Root level
        faviconPath = 'assets/favicon.svg';
    } else {
        // Subdirectories: go up to root, then into assets
        faviconPath = '../'.repeat(depth) + 'assets/favicon.svg';
    }
    
    // Check if favicon link already exists, if not add it
    if (!document.querySelector('link[rel="icon"]')) {
        const link = document.createElement('link');
        link.rel = 'icon';
        link.type = 'image/svg+xml';
        link.href = faviconPath;
        document.head.appendChild(link);
    }
})();

