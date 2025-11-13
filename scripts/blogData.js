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
                { title: "Modules, import and libraries", url: "tutorials/1-python-basics/5-modules-libraries.html" },
                { title: "Exception Handling & Files", url: "tutorials/1-python-basics/6-exception-handling-files.html" }

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
                { title: "1D Convolutional Neural Networks", url: "blogs/cnn_basics.md" },
                { title: "2D Convolutional Neural Networks", url: "blogs/cnn_basics.md" },
                { title: "Recurrent Neural Networks", url: "tutorials/3-neural-networks/1-rnn.html" }
            ]
        },
        {
            id: 4,
            title: "2D Computer Vision",
            description: "Image processing and 2D vision techniques",
            links: [
                { title: "Coming Soon", url: "tutorials/coming-soon.html" }
            ]
        },
        {
            id: 5,
            title: "CUDA, PyBind11, PyTorch CUDA",
            description: "Coming Soon",
            links: [
                { title: "Coming Soon", url: "tutorials/coming-soon.html" }
            ]
        },
        {
            id: 6,
            title: "3D Point Cloud",
            description: "Coming Soon",
            links: [
                { title: "Coming Soon - Introduction to 3D Point Cloud", url: "tutorials/coming-soon.html" },
                { title: "Farthest Point Sampling (FPS)", url: "tutorials/6-point-cloud/2-fps.html" },
                { title: "K-Nearest Neighbors (KNN)", url: "tutorials/6-point-cloud/3-knn.html" },
                { title: "Coming Soon - Metrics and Evaluation", url: "tutorials/coming-soon.html" }
            ]
        },
        {
            id: 7,
            title: "TinyML",
            description: "Coming Soon",
            links: [
                { title: "Introduction", url: "tutorials/7-Tiny-ML/1-introduction.html" },
                { title: "Coming Soon", url: "tutorials/coming-soon.html" }
            ]
        },
        {
            id: 8,
            title: "Distributed Training",
            description: "Coming Soon",
            links: [
                
                { title: "Coming Soon", url: "tutorials/coming-soon.html" }
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

