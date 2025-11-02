/**
 * Tutorial Image Template Helper
 * Simplifies adding images to tutorial pages
 * 
 * Usage:
 * Add this HTML where you want an image:
 * <div class="tutorial-image-template" data-src="path/to/image.png" data-caption="Your caption text"></div>
 * 
 * Or use the function directly:
 * addTutorialImage('path/to/image.png', 'Your caption text', 'large')
 */

(function() {
    'use strict';

    /**
     * Add a tutorial image programmatically
     * @param {string} imageSrc - Path to the image
     * @param {string} caption - Caption text (optional)
     * @param {string} size - Size class: 'full', 'large', 'medium', 'small' (default: 'large')
     * @param {string} styleClass - Additional style class: 'bordered', 'shadow-only' (optional)
     * @returns {string} HTML string for the image
     */
    function generateImageHTML(imageSrc, caption, size, styleClass) {
        size = size || 'large';
        const sizeClass = `tutorial-image-${size}`;
        const style = styleClass ? ` class="${styleClass}"` : '';
        const captionHTML = caption ? `
                    <figcaption>
                        ${caption}
                    </figcaption>` : '';

        return `
                <figure class="tutorial-image ${sizeClass}">
                    <img src="${imageSrc}" alt="${caption || 'Tutorial diagram'}"${style}>
                    ${captionHTML}
                </figure>`;
    }

    /**
     * Initialize auto-generation from data attributes
     */
    function initializeImageTemplates() {
        const templates = document.querySelectorAll('.tutorial-image-template');
        
        templates.forEach(template => {
            const imageSrc = template.getAttribute('data-src');
            const caption = template.getAttribute('data-caption') || '';
            const size = template.getAttribute('data-size') || 'large';
            const styleClass = template.getAttribute('data-style') || '';
            
            if (imageSrc) {
                template.outerHTML = generateImageHTML(imageSrc, caption, size, styleClass);
            }
        });
    }

    // Make function available globally
    window.addTutorialImage = function(imageSrc, caption, size, styleClass) {
        const container = document.createElement('div');
        container.innerHTML = generateImageHTML(imageSrc, caption, size, styleClass);
        return container.firstElementChild;
    };

    // Auto-initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeImageTemplates);
    } else {
        initializeImageTemplates();
    }
})();

