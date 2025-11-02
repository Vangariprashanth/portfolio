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
     */
    function getRelativePath(targetUrl) {
        if (!targetUrl) return '#';

        const currentPath = window.location.pathname;
        const currentDir = currentPath.substring(0, currentPath.lastIndexOf('/'));

        // If target is absolute or starts with http, return as is
        if (targetUrl.startsWith('http://') || targetUrl.startsWith('https://') || targetUrl.startsWith('/')) {
            return targetUrl;
        }

        // Calculate relative path from current directory
        const pathParts = currentPath.split('/').filter(part => part && !part.endsWith('.html'));
        const targetParts = targetUrl.split('/').filter(part => part);

        // Remove common path parts
        let relativePath = '';
        let commonLength = 0;

        // Find common directory structure
        for (let i = 0; i < Math.min(pathParts.length, targetParts.length - 1); i++) {
            if (pathParts[i] === targetParts[i]) {
                commonLength++;
            } else {
                break;
            }
        }

        // Build relative path
        // Go up (..) for directories not in common
        const upLevels = pathParts.length - commonLength;
        relativePath = '../'.repeat(upLevels);

        // Add remaining target path
        relativePath += targetParts.slice(commonLength).join('/');

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

