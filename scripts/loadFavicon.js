// Dynamically load favicon based on current page location
// This script automatically calculates the correct path to the favicon
// based on the script's own location in the directory structure
(function() {
    // Find this script's location
    let scriptUrl = null;
    
    // Try to get current script (works in modern browsers)
    if (document.currentScript && document.currentScript.src) {
        scriptUrl = document.currentScript.src;
    } else {
        // Fallback: find script by searching for this file name
        const scripts = document.getElementsByTagName('script');
        for (let script of scripts) {
            if (script.src && script.src.includes('loadFavicon.js')) {
                scriptUrl = script.src;
                break;
            }
        }
    }
    
    // Calculate the path to assets folder relative to the script location
    let faviconPath;
    
    if (scriptUrl) {
        try {
            // Parse the script URL
            const scriptUrlObj = new URL(scriptUrl);
            const scriptPath = scriptUrlObj.pathname;
            
            // Get the directory containing the script (remove filename)
            const scriptDir = scriptPath.substring(0, scriptPath.lastIndexOf('/'));
            
            // Calculate path to assets folder from script directory
            // Script is in: /portfolio/scripts/ or /portfolio/tutorials/subfolder/../../scripts/
            // We need to go up to root, then into assets
            const pathParts = scriptDir.split('/').filter(p => p);
            
            // Find 'scripts' in the path
            const scriptsIndex = pathParts.indexOf('scripts');
            if (scriptsIndex >= 0) {
                // Count how many directories we need to go up from scripts/ to root
                const depth = scriptsIndex;
                if (depth === 0) {
                    // Script is at root/scripts/, so assets is at root/assets/
                    faviconPath = '../assets/favicon.svg';
                } else {
                    // Go up to root, then into assets
                    faviconPath = '../'.repeat(depth) + 'assets/favicon.svg';
                }
            } else {
                // Fallback: assume we need to go up to root
                // Count directories in the path (excluding empty strings)
                const depth = pathParts.length;
                if (depth <= 1) {
                    faviconPath = 'assets/favicon.svg';
                } else {
                    faviconPath = '../'.repeat(depth - 1) + 'assets/favicon.svg';
                }
            }
        } catch (e) {
            // If URL parsing fails, use fallback method
            console.warn('Failed to parse script URL, using fallback:', e);
            faviconPath = '../../assets/favicon.svg'; // Default for tutorials subfolders
        }
    } else {
        // Ultimate fallback: calculate from page URL
        const path = window.location.pathname;
        const pathParts = path.split('/').filter(p => p && !p.endsWith('.html'));
        const depth = pathParts.length;
        
        if (depth <= 1) {
            faviconPath = 'assets/favicon.svg';
        } else {
            faviconPath = '../'.repeat(depth - 1) + 'assets/favicon.svg';
        }
    }
    
    // Use absolute path if we're on GitHub Pages (more reliable)
    // Check if we're on GitHub Pages by looking for /portfolio/ in the path
    const pathname = window.location.pathname;
    if (pathname.includes('/portfolio/')) {
        // Extract the base path (everything up to and including /portfolio/)
        const basePath = pathname.substring(0, pathname.indexOf('/portfolio/') + '/portfolio/'.length);
        // Use absolute path from repository root
        faviconPath = basePath + 'assets/favicon.svg';
    }
    
    // Ensure the path doesn't start with // (double slash)
    if (faviconPath && faviconPath.startsWith('//')) {
        faviconPath = faviconPath.substring(1);
    }
    
    // Check if favicon link already exists, if not add it
    if (!document.querySelector('link[rel="icon"]') && faviconPath) {
        const link = document.createElement('link');
        link.rel = 'icon';
        link.type = 'image/svg+xml';
        link.href = faviconPath;
        document.head.appendChild(link);
    }
})();

