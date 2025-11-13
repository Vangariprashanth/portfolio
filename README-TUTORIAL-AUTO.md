# Fully Automated Tutorial System

## 🎯 Goal
Create tutorials with **ZERO HTML knowledge** - just provide text, code, and images!

## 📝 Quick Start

### Step 1: Copy the Template
```bash
cp tutorials/tutorial-auto-template.html tutorials/my-tutorial.html
```

### Step 2: Edit Only the `tutorialData` Object
Open your new file and find the `tutorialData` object. Just edit the content - no HTML needed!

## 📋 Complete Example

```javascript
var tutorialData = {
    // Basic Info
    title: "Introduction to Neural Networks",
    published: "November 2025",
    category: "Deep Learning",
    readingTime: "15 min",

    // Prerequisites (optional)
    prerequisites: [
        "Basic understanding of Python",
        "Familiarity with NumPy",
        "PyTorch installed (version 2.0+)"
    ],

    // Main Content Sections
    sections: [
        {
            title: "Introduction",
            content: [
                "Neural networks are powerful machine learning models.",
                "They can learn complex patterns from data."
            ]
        },
        {
            title: "Simple Example",
            content: "Here's a basic neural network:",
            code: {
                code: `import torch.nn as nn

class SimpleNN(nn.Module):
    def __init__(self):
        super().__init__()
        self.fc = nn.Linear(10, 1)`,
                language: "python"
            }
        },
        {
            title: "Architecture Diagram",
            content: "Here's how it works:",
            image: {
                src: "../assets/images/neural-network.png",
                caption: "<strong>Figure 1:</strong> Neural network architecture",
                size: "large"
            }
        },
        {
            title: "Key Points",
            list: [
                "Point 1 with **bold text**",
                "Point 2 with `code` example",
                "Point 3 with [link](https://example.com)"
            ]
        }
    ],

    // Conclusion (optional)
    conclusion: [
        "You've learned the basics of neural networks!",
        "Next, try building your own model."
    ],

    // Complete Code Files (optional)
    codeFiles: {
        githubUrl: "https://github.com/your-username/tutorial-repo",
        downloadUrl: "../assets/tutorials/tutorial.zip"
    },

    // Additional Resources (optional)
    resources: [
        {
            text: "PyTorch Documentation",
            url: "https://pytorch.org/docs/"
        },
        {
            text: "Deep Learning Book",
            url: "https://www.deeplearningbook.org/"
        }
    ]
};
```

## 🎨 Supported Features

### Text Formatting
- **Bold text**: Use `**bold**`
- `Inline code`: Use backticks
- [Links](url): Use `[text](url)`

### Section Types

#### 1. Text Section
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

#### 2. Code Block
```javascript
{
    title: "Code Example",
    code: {
        code: "your code here",
        language: "python"  // python, bash, javascript, etc.
    }
}
```

#### 3. Multiple Code Blocks
```javascript
{
    title: "Examples",
    code: [
        { code: "code 1", language: "python" },
        { code: "code 2", language: "bash" }
    ]
}
```

#### 4. Image
```javascript
{
    title: "Diagram",
    image: {
        src: "../assets/images/diagram.png",
        caption: "<strong>Figure 1:</strong> Your caption",
        size: "large"  // Options: "small", "medium", "large"
    }
}
```

#### 5. Multiple Images
```javascript
{
    title: "Diagrams",
    image: [
        { src: "image1.png", caption: "Caption 1", size: "large" },
        { src: "image2.png", caption: "Caption 2", size: "medium" }
    ]
}
```

#### 6. List
```javascript
{
    title: "Key Points",
    list: [
        "Point 1",
        "Point 2 with **bold**",
        "Point 3 with `code`"
    ]
}
```

#### 7. Combined Section
```javascript
{
    title: "Complete Example",
    content: "Here's a full example:",
    code: {
        code: "your code",
        language: "python"
    },
    image: {
        src: "diagram.png",
        caption: "Figure 1",
        size: "large"
    },
    list: ["Point 1", "Point 2"]
}
```

## ✅ What's Auto-Generated

The system automatically creates:
- ✅ Complete HTML structure
- ✅ Page title and metadata
- ✅ Prerequisites section
- ✅ All content sections with proper formatting
- ✅ Code blocks with copy buttons
- ✅ Images with captions (using imageTemplate system)
- ✅ Conclusion section
- ✅ Complete Code Files section (GitHub + Download links)
- ✅ Additional Resources section
- ✅ Navigation links (prev/next)
- ✅ All styling and layout

## 🚀 That's It!

You only need to:
1. ✅ Provide text content
2. ✅ Provide code snippets
3. ✅ Provide image paths

Everything else is **automatically generated**!

