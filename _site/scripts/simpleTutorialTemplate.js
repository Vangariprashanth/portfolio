/**
 * Simple Tutorial Template System
 * Allows creating tutorials with minimal HTML - just define content sections
 * 
 * HOW TO USE:
 * 1. Copy tutorial-base.html and rename it
 * 2. Add a <script> tag before the closing body tag with tutorialData
 * 3. That's it! No need for complex HTML structure
 */

// Example tutorialData structure:
/*
<script>
var tutorialData = {
    title: "My Tutorial Title",
    published: "January 2024",
    category: "Python",
    readingTime: "10 min",
    sections: [
        {
            title: "Section Title",
            content: "Paragraph text here. Use **bold** and `code` inline.",
            code: { code: "print('Hello')", language: "python" },
            image: { src: "path/to/image.png", caption: "Caption", size: "large" },
            list: ["Item 1", "Item 2"]
        }
    ]
};
</script>
*/

