# Tutorial Template System - Quick Guide

## 🎯 Goal
Create tutorials with **minimal HTML** - just focus on your content!

## 📝 How to Create a New Tutorial

### Step 1: Copy the Template
Copy `tutorials/tutorial-simple-template.html` to your tutorial file:
```bash
cp tutorials/tutorial-simple-template.html tutorials/my-tutorial.html
```

### Step 2: Edit the `tutorialData` Object
Just update the JavaScript object at the bottom of the file:

```javascript
var tutorialData = {
    title: "Your Tutorial Title",
    published: "January 2024",
    category: "Python",
    readingTime: "10 min",
    sections: [
        {
            title: "Introduction",
            content: [
                "First paragraph. Use **bold** text.",
                "Second paragraph with `code` inline."
            ]
        },
        {
            title: "Code Example",
            content: "Here's how to use it:",
            code: {
                code: "print('Hello')",
                language: "python"
            }
        },
        {
            title: "With Image",
            image: {
                src: "../assets/images/diagram.png",
                caption: "<strong>Figure 1:</strong> My diagram",
                size: "large"
            }
        }
    ]
};
```

### Step 3: That's It!
The template automatically:
- ✅ Builds all HTML structure
- ✅ Formats code blocks with copy buttons
- Inserts images with captions
- ✅ Creates navigation links
- ✅ Applies all styling

## 📋 Section Types

### Text Content
```javascript
{
    title: "Section Title",
    content: "Single paragraph"
}
// OR multiple paragraphs:
{
    title: "Section Title",
    content: ["Paragraph 1", "Paragraph 2"]
}
```

### Code Blocks
```javascript
{
    title: "Code Example",
    code: {
        code: "your code here",
        language: "python"  // or "bash", "javascript", etc.
    }
}
```

### Images
```javascript
{
    title: "Diagram",
    image: {
        src: "../assets/images/diagram.png",
        caption: "<strong>Figure 1:</strong> Description",
        size: "large"  // "full", "large", "medium", "small"
    }
}
```

### Lists
```javascript
{
    title: "Prerequisites",
    list: ["Item 1", "Item 2", "Item 3"]
}
```

### Combined
```javascript
{
    title: "Complete Example",
    content: "Some text",
    code: { code: "code here", language: "python" },
    content: "More text after code",
    image: { src: "image.png", caption: "Caption", size: "large" }
}
```

## ✨ Text Formatting

- **Bold**: `**text**` → **text**
- `Code`: `` `code` `` → `code`
- Links: `[text](url)` → [text](url)

## 🎨 Image Sizes

- `full` - Full width, 600px max height
- `large` - Full width, 500px max height (16:9)
- `medium` - Full width, 400px max height (3:2)
- `small` - Full width, 300px max height (4:3)

## 📁 File Structure

```
tutorials/
├── tutorial-simple-template.html  ← Copy this!
├── my-tutorial.html               ← Your new tutorial
└── ...
```

That's it! Much simpler than writing full HTML every time! 🎉

