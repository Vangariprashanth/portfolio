// Modular blog data structure
// Easy to maintain and update - just add/edit sections here

const blogData = {
    roadmap: [
        {
            id: 1,
            title: "Python Basics",
            description: "Master the fundamentals of Python programming",
            links: [
                { title: "Introduction", url: "tutorials/1-python-basics/1-introduction.html" },
                { title: "Python Syntax & Variables", url: "tutorials/1-python-basics/2-syntax.html" },
                { title: "Lists, Tuples, Dictionaries", url: "tutorials/1-python-basics/3-list-tuples.html" },
                { title: "Functions & Loops", url: "tutorials/1-python-basics/4-functions-and-loops.html" },
                { title: "Object Oriented Programming", url: "tutorials/1-python-basics/python-basics.html" },
                { title: "Modules, import and libraries", url: "tutorials/1-python-basics/5-modules-libraries.html" }
            ]
        },
        {
            id: 2,
            title: "PyTorch Basics",
            description: "Get started with PyTorch for deep learning",
            links: [
                { title: "Numpy & Pandas for Data Handling", url: "blogs/numpy_pandas.md" },
                { title: "OpenCV Basics", url: "blogs/opencv_basics.md" },
                { title: "Introduction to Machine Learning", url: "blogs/ml_basics.md" }
            ]
        },
        {
            id: 3,
            title: "Neural Networks",
            description: "Understanding neural network architectures",
            links: [
                { title: "Building Your First Neural Network", url: "tutorials/sample-tutorial.html" },
                { title: "Deep Learning Fundamentals", url: "blogs/dl_fundamentals.md" },
                { title: "Convolutional Neural Networks", url: "blogs/cnn_basics.md" },
                { title: "Recurrent Neural Networks", url: "blogs/rnn_basics.md" }
            ]
        },
        {
            id: 4,
            title: "2D Computer Vision",
            description: "Image processing and 2D vision techniques",
            links: [
                { title: "3D Point Clouds", url: "blogs/pointclouds.md" },
                { title: "Human Pose Estimation in 3D", url: "blogs/pose_estimation.md" },
                { title: "Transformer Models for 3D CV", url: "blogs/transformers_3dcv.md" }
            ]
        },
        {
            id: 5,
            title: "3D Point Cloud",
            description: "Working with 3D data and point clouds",
            links: [
                { title: "3D Point Clouds", url: "content/pointclouds.md" },
                { title: "Farthest Point Sampling (FPS)", url: "content/pose_estimation.md" },
                { title: "KNN", url: "content/transformers_3dcv.md" }
            ]
        }
    ]
};

// Function to render roadmap sections
function renderRoadmap() {
    const roadmapContainer = document.getElementById('roadmap');
    if (!roadmapContainer) return;

    roadmapContainer.innerHTML = blogData.roadmap.map(section => `
        <div class="roadmap-card">
            <h3 class="roadmap-title">${section.id}. ${section.title}</h3>
            <p class="roadmap-description">${section.description}</p>
            <ul class="roadmap-links">
                ${section.links.map(link => `
                    <li class="roadmap-link-item">
                        <a href="${link.url}" target="_blank" class="roadmap-link">
                            <span class="link-text">${link.title}</span>
                            <span class="link-icon">→</span>
                        </a>
                    </li>
                `).join('')}
            </ul>
        </div>
    `).join('');
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', renderRoadmap);

