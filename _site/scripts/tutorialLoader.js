/**
 * Tutorial Content Loader
 * Allows tutorials to be written in minimal HTML format
 * 
 * Usage:
 * 1. Create a simple HTML file with just content sections
 * 2. Include: <script>tutorialData = { ... }</script>
 * 3. Reference tutorial-base.html structure
 */

(function() {
    'use strict';

    /**
     * Load tutorial content from data object or content sections
     */
    function loadTutorialContent() {
        // Check if tutorialData is defined
        if (typeof tutorialData !== 'undefined') {
            // Method 1: Load from tutorialData object
            loadFromDataObject();
        } else {
            // Method 2: Load from content sections in the page
            loadFromContentSections();
        }
    }

    /**
     * Load content from tutorialData object
     */
    function loadFromDataObject() {
        const data = tutorialData;

        // Set page title
        if (data.title) {
            document.title = data.title + ' - Prashanth Vangari';
            const mainTitle = document.getElementById('tutorial-main-title');
            if (mainTitle) mainTitle.textContent = data.title;
        }

        // Set metadata
        if (data.published) {
            const dateSpan = document.querySelector('#tutorial-date span');
            if (dateSpan) dateSpan.textContent = data.published;
        }

        if (data.category) {
            const categorySpan = document.querySelector('#tutorial-category span');
            if (categorySpan) categorySpan.textContent = data.category;
        }

        if (data.readingTime) {
            const timeSpan = document.querySelector('#tutorial-time span');
            if (timeSpan) timeSpan.textContent = data.readingTime;
        }

        // Build content from sections
        const contentContainer = document.getElementById('tutorial-content');
        if (contentContainer && data.sections) {
            contentContainer.innerHTML = data.sections.map(section => {
                return buildSectionHTML(section);
            }).join('');
        }

        // Initialize image templates after content is loaded
        setTimeout(() => {
            if (typeof initializeImageTemplates === 'function') {
                initializeImageTemplates();
            }
        }, 100);
    }

    /**
     * Load content from HTML sections (fallback method)
     */
    function loadFromContentSections() {
        // Find all content sections
        const contentSections = document.querySelectorAll('[data-tutorial-section]');
        
        if (contentSections.length > 0) {
            const contentContainer = document.getElementById('tutorial-content');
            
            if (contentContainer) {
                contentSections.forEach(section => {
                    const cloned = section.cloneNode(true);
                    cloned.removeAttribute('data-tutorial-section');
                    contentContainer.appendChild(cloned);
                    section.style.display = 'none'; // Hide original
                });
            }
        }
    }

    /**
     * Build HTML for a section
     */
    function buildSectionHTML(section) {
        let html = `<section class="tutorial-section">`;
        
        if (section.title) {
            html += `<h2>${escapeHtml(section.title)}</h2>`;
        }

        if (section.content) {
            html += formatContent(section.content);
        }

        if (section.code) {
            html += buildCodeBlock(section.code);
        }

        if (section.image) {
            html += buildImageBlock(section.image);
        }

        if (section.list) {
            html += buildList(section.list);
        }

        html += `</section>`;
        return html;
    }

    /**
     * Format text content (supports basic markdown-like formatting)
     */
    function formatContent(content) {
        if (Array.isArray(content)) {
            return content.map(para => `<p>${formatInlineText(para)}</p>`).join('');
        }
        return `<p>${formatInlineText(content)}</p>`;
    }

    /**
     * Format inline text (bold, code, links)
     */
    function formatInlineText(text) {
        if (typeof text !== 'string') return text;
        
        // Bold: **text**
        text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
        
        // Inline code: `code`
        text = text.replace(/`(.+?)`/g, '<code>$1</code>');
        
        // Links: [text](url)
        text = text.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank">$1</a>');
        
        return text;
    }

    /**
     * Build code block HTML
     */
    function buildCodeBlock(codeData) {
        const code = typeof codeData === 'string' ? codeData : codeData.code;
        const language = codeData.language || 'python';
        
        return `
            <div class="code-block">
                <div class="code-header">
                    <span class="code-language">${language}</span>
                    <button class="copy-btn" title="Copy code">Copy</button>
                </div>
                <pre><code>${escapeHtml(code)}</code></pre>
            </div>
        `;
    }

    /**
     * Build image block HTML
     */
    function buildImageBlock(imageData) {
        const src = typeof imageData === 'string' ? imageData : imageData.src;
        const caption = imageData.caption || '';
        const size = imageData.size || 'large';
        
        return `
            <figure class="tutorial-image tutorial-image-${size}">
                <img src="${src}" alt="${caption.replace(/<[^>]*>/g, '') || 'Tutorial diagram'}" class="shadow-only">
                ${caption ? `<figcaption>${caption}</figcaption>` : ''}
            </figure>
        `;
    }

    /**
     * Build list HTML
     */
    function buildList(items) {
        if (!Array.isArray(items)) return '';
        
        return `
            <ul class="tutorial-list">
                ${items.map(item => `<li>${formatInlineText(item)}</li>`).join('')}
            </ul>
        `;
    }

    /**
     * Escape HTML
     */
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadTutorialContent);
    } else {
        loadTutorialContent();
    }
})();

