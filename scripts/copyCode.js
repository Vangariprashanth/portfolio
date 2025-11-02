/**
 * Copy Code Functionality
 * Modular script for copying code blocks to clipboard
 * Can be included in any tutorial page
 */

(function() {
    'use strict';

    /**
     * Initialize copy buttons for all code blocks on the page
     */
    function initializeCopyButtons() {
        const codeBlocks = document.querySelectorAll('.code-block');
        
        codeBlocks.forEach(codeBlock => {
            const copyBtn = codeBlock.querySelector('.copy-btn');
            
            if (copyBtn) {
                copyBtn.addEventListener('click', function() {
                    copyCodeBlock(this);
                });
            }
        });
    }

    /**
     * Copy code content to clipboard
     * @param {HTMLElement} button - The copy button element
     */
    function copyCodeBlock(button) {
        const codeBlock = button.closest('.code-block');
        
        if (!codeBlock) {
            console.error('Code block not found');
            return;
        }

        const codeElement = codeBlock.querySelector('code');
        
        if (!codeElement) {
            console.error('Code element not found');
            return;
        }

        const code = codeElement.textContent;
        const originalText = button.textContent;

        // Use the Clipboard API
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(code)
                .then(() => {
                    // Show success feedback
                    button.textContent = 'Copied!';
                    button.style.background = '#28a745';
                    
                    // Reset button after 2 seconds
                    setTimeout(() => {
                        button.textContent = originalText;
                        button.style.background = '';
                    }, 2000);
                })
                .catch(err => {
                    console.error('Failed to copy code:', err);
                    // Fallback to old method
                    fallbackCopyText(code);
                    button.textContent = 'Copied!';
                    setTimeout(() => {
                        button.textContent = originalText;
                    }, 2000);
                });
        } else {
            // Fallback for older browsers
            fallbackCopyText(code);
            button.textContent = 'Copied!';
            setTimeout(() => {
                button.textContent = originalText;
            }, 2000);
        }
    }

    /**
     * Fallback method for copying text (for older browsers)
     * @param {string} text - Text to copy
     */
    function fallbackCopyText(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
        } catch (err) {
            console.error('Fallback copy failed:', err);
        }
        
        document.body.removeChild(textArea);
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeCopyButtons);
    } else {
        // DOM is already ready
        initializeCopyButtons();
    }
})();

