/**
 * Tutorial Navigation Module
 * Automatically generates Previous/Next navigation based on blogData.js
 * 
 * Usage: Add this div in your tutorial HTML:
 * <div id="tutorial-navigation"></div>
 * 
 * Then include this script (after blogData.js):
 * <script src="path/to/tutorialNavigation.js"></script>
 */

(function () {
    'use strict';

    /**
     * Get the current page URL relative to the site root
     */
    function getCurrentPageUrl() {
        // Get the full path and remove leading slash if present
        let path = window.location.pathname;

        // Remove the site base path if using GitHub Pages or similar
        // This handles cases where the site might be at /portfolio/ instead of root
        const basePath = path.split('/').filter(part =>
            part && part !== 'index.html' && !part.endsWith('.html')
        ).join('/');

        // Get just the file path relative to root
        const pathParts = path.split('/').filter(part => part);
        const fileName = pathParts[pathParts.length - 1];
        const dirParts = pathParts.slice(0, -1);

        // Reconstruct relative path from root
        let relativePath = '';
        if (dirParts.length > 0) {
            // Find tutorials directory index
            const tutorialsIndex = dirParts.indexOf('tutorials');
            if (tutorialsIndex !== -1) {
                relativePath = dirParts.slice(tutorialsIndex).join('/') + '/' + fileName;
            } else {
                relativePath = pathParts.join('/');
            }
        } else {
            relativePath = fileName;
        }

        // If path starts with /, remove it
        if (relativePath.startsWith('/')) {
            relativePath = relativePath.substring(1);
        }

        return relativePath;
    }

    /**
     * Find all tutorials in blogData and create a flat list with navigation info
     * Includes both HTML and markdown files for seamless cross-section navigation
     */
    function buildTutorialList() {
        const tutorialList = [];

        if (typeof blogData === 'undefined' || !blogData.roadmap) {
            console.error('blogData is not defined. Make sure blogData.js is loaded before tutorialNavigation.js');
            return tutorialList;
        }

        blogData.roadmap.forEach(section => {
            section.links.forEach((link, index) => {
                // Include all tutorials (both HTML and markdown)
                if (link.url && (link.url.endsWith('.html') || link.url.endsWith('.md'))) {
                    tutorialList.push({
                        title: link.title,
                        url: link.url,
                        sectionId: section.id,
                        sectionTitle: section.title,
                        index: index,
                        totalInSection: section.links.length,
                        isHtml: link.url.endsWith('.html')
                    });
                }
            });
        });

        return tutorialList;
    }

    /**
     * Find previous and next tutorials
     * Now works across sections and includes both HTML and markdown files
     */
    function findNavigation(tutorialList, currentUrl) {
        const currentIndex = tutorialList.findIndex(tutorial => {
            // Normalize URLs for comparison
            return normalizeUrl(tutorial.url) === normalizeUrl(currentUrl);
        });

        if (currentIndex === -1) {
            // If current tutorial not found, try to find by filename only
            const currentFileName = currentUrl.split('/').pop().toLowerCase();
            const fallbackIndex = tutorialList.findIndex(tutorial => {
                const tutorialFileName = tutorial.url.split('/').pop().toLowerCase();
                return tutorialFileName === currentFileName;
            });

            if (fallbackIndex !== -1) {
                const prev = fallbackIndex > 0 ? tutorialList[fallbackIndex - 1] : null;
                const next = fallbackIndex < tutorialList.length - 1 ? tutorialList[fallbackIndex + 1] : null;
                return { prev, next };
            }

            return { prev: null, next: null };
        }

        const prev = currentIndex > 0 ? tutorialList[currentIndex - 1] : null;
        const next = currentIndex < tutorialList.length - 1 ? tutorialList[currentIndex + 1] : null;

        return { prev, next };
    }

    /**
     * Normalize URL for comparison (remove leading/trailing slashes, etc.)
     */
    function normalizeUrl(url) {
        if (!url) return '';
        return url.replace(/^\/+|\/+$/g, '').toLowerCase();
    }

    /**
     * Calculate the correct relative path from current page to target URL
     * Handles GitHub Pages base paths correctly
     */
    function getRelativePath(targetUrl) {
        if (!targetUrl) return '#';

        // If target is absolute or starts with http, return as is
        if (targetUrl.startsWith('http://') || targetUrl.startsWith('https://')) {
            return targetUrl;
        }

        // Get current path and extract base path (for GitHub Pages)
        const currentPath = window.location.pathname;

        // If target already starts with /, it's already absolute
        if (targetUrl.startsWith('/')) {
            return targetUrl;
        }

        // Get current directory (without filename)
        const currentDir = currentPath.substring(0, currentPath.lastIndexOf('/') + 1);

        // Split paths into components
        const currentParts = currentPath.split('/').filter(part => part && !part.endsWith('.html'));
        const targetParts = targetUrl.split('/').filter(part => part);

        // Remove filename from current path parts
        const currentFile = currentPath.split('/').pop();
        const currentDirs = currentParts.slice(0, -1); // Remove last part which might be filename

        // Find common path
        let commonLength = 0;
        const maxCompare = Math.min(currentDirs.length, targetParts.length - 1);

        for (let i = 0; i < maxCompare; i++) {
            if (currentDirs[i] === targetParts[i]) {
                commonLength++;
            } else {
                break;
            }
        }

        // Calculate how many directories to go up
        const upLevels = currentDirs.length - commonLength;

        // Build relative path
        let relativePath = '';
        if (upLevels > 0) {
            relativePath = '../'.repeat(upLevels);
        }

        // Add remaining target path
        const remainingPath = targetParts.slice(commonLength);
        if (remainingPath.length > 0) {
            relativePath += remainingPath.join('/');
        }

        // Simplified fallback for same directory case
        // Current: /portfolio/tutorials/1-python-basics/1-introduction.html
        // Target: tutorials/1-python-basics/2-syntax.html
        // Should return: 2-syntax.html (same directory)

        if (targetUrl.startsWith('tutorials/') && currentPath.includes('tutorials/')) {
            // Extract paths after 'tutorials/'
            const currentTutorialsIndex = currentPath.indexOf('tutorials/');
            const targetTutorialsIndex = targetUrl.indexOf('tutorials/');

            if (currentTutorialsIndex !== -1 && targetTutorialsIndex !== -1) {
                const currentAfterTutorials = currentPath.substring(currentTutorialsIndex + 'tutorials/'.length);
                const targetAfterTutorials = targetUrl.substring('tutorials/'.length);

                // Get directory and file parts
                const currentParts = currentAfterTutorials.split('/');
                const targetParts = targetAfterTutorials.split('/');

                const currentDir = currentParts.slice(0, -1).join('/'); // Directory without filename
                const targetDir = targetParts.slice(0, -1).join('/'); // Directory without filename
                const targetFile = targetParts[targetParts.length - 1]; // Just filename

                // If same directory, return just filename
                if (currentDir === targetDir) {
                    return targetFile;
                }

                // If different directories but same parent, calculate relative
                if (currentDir && targetDir) {
                    const currentDirParts = currentDir.split('/');
                    const targetDirParts = targetDir.split('/');

                    // Check if they share common parent
                    let commonLength = 0;
                    for (let i = 0; i < Math.min(currentDirParts.length, targetDirParts.length); i++) {
                        if (currentDirParts[i] === targetDirParts[i]) {
                            commonLength++;
                        } else {
                            break;
                        }
                    }

                    // Calculate relative path
                    const upLevels = currentDirParts.length - commonLength;
                    const downPath = targetDirParts.slice(commonLength).join('/');

                    let fallbackPath = '';
                    if (upLevels > 0) {
                        fallbackPath = '../'.repeat(upLevels);
                    }
                    if (downPath) {
                        fallbackPath += downPath + '/';
                    }
                    fallbackPath += targetFile;

                    if (fallbackPath && !fallbackPath.includes('undefined')) {
                        return fallbackPath;
                    }
                }
            }
        }

        return relativePath || targetUrl;
    }

    /**
     * Render the navigation HTML
     */
    function renderNavigation(prev, next) {
        const navContainer = document.getElementById('tutorial-navigation');
        if (!navContainer) {
            console.warn('Navigation container not found. Add <div id="tutorial-navigation"></div> to your HTML.');
            return;
        }

        let prevHtml = '';
        let nextHtml = '';

        if (prev) {
            const prevPath = getRelativePath(prev.url);
            prevHtml = `
                <a href="${prevPath}" class="nav-link prev-link">
                    <span>← ${prev.title}</span>
                </a>
            `;
        } else {
            prevHtml = `
                <span class="nav-link prev-link disabled">
                    <span>← Previous Tutorial</span>
                </span>
            `;
        }

        if (next) {
            const nextPath = getRelativePath(next.url);
            nextHtml = `
                <a href="${nextPath}" class="nav-link next-link">
                    <span>${next.title} →</span>
                </a>
            `;
        } else {
            nextHtml = `
                <span class="nav-link next-link disabled">
                    <span>Next Tutorial →</span>
                </span>
            `;
        }

        navContainer.className = 'tutorial-navigation';
        navContainer.innerHTML = prevHtml + nextHtml;
    }

    /**
     * Initialize navigation
     */
    function initializeNavigation() {
        const currentUrl = getCurrentPageUrl();
        const tutorialList = buildTutorialList();

        if (tutorialList.length === 0) {
            console.warn('No tutorials found in blogData. Make sure your tutorials are listed in blogData.js');
            return;
        }

        const navigation = findNavigation(tutorialList, currentUrl);
        renderNavigation(navigation.prev, navigation.next);
    }

    // Initialize when DOM and blogData are ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
            // Wait a bit for blogData.js to load
            setTimeout(initializeNavigation, 100);
        });
    } else {
        // DOM is already ready, but blogData might not be
        setTimeout(initializeNavigation, 100);
    }
})();

