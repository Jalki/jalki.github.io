document.addEventListener('DOMContentLoaded', function() {
    // Project section switching functionality
    const sections = document.querySelectorAll('.project-section');
    const titleElement = document.querySelector('.project-type-title');
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');
    const projectSectionsContainer = document.querySelector('.project-sections');
    
    // Update the sectionTitles object to include apps
    const sectionTitles = {
        'web': 'Web Dev Projects',
        'marketing': 'Digital Marketing Projects',
        'game': 'Game Dev Projects',
        'apps': 'Mobile Apps'
    };
    
    let currentIndex = 0;
    
    // Function to calculate and set container height
    function updateContainerHeight() {
        const activeSection = document.querySelector('.project-section.active');
        if (activeSection) {
            const height = activeSection.offsetHeight;
            projectSectionsContainer.style.minHeight = height + 'px';
        }
    }
    
    // Initialize container height
    updateContainerHeight();
    window.addEventListener('resize', updateContainerHeight);
    
    // Function to switch sections
    function switchSection(direction) {
        // Remove active class from current section
        sections[currentIndex].classList.remove('active', 'animate-in');
        
        // Calculate new index
        if (direction === 'next') {
            currentIndex = (currentIndex + 1) % sections.length;
        } else {
            currentIndex = (currentIndex - 1 + sections.length) % sections.length;
        }
        
        // Get the data-section attribute of the new active section
        const sectionType = sections[currentIndex].getAttribute('data-section');
        
        // Update title
        titleElement.textContent = sectionTitles[sectionType];
        
        // Add active class to new section with animation
        sections[currentIndex].classList.add('active', 'animate-in');
        
        // Update container height
        updateContainerHeight();
        
        // Remove animation class after it completes
        setTimeout(() => {
            sections[currentIndex].classList.remove('animate-in');
        }, 500);
    }
    
    // Arrow click events
    leftArrow.addEventListener('click', () => switchSection('prev'));
    rightArrow.addEventListener('click', () => switchSection('next'));
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            switchSection('prev');
        } else if (e.key === 'ArrowRight') {
            switchSection('next');
        }
    });
    
    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    projectSectionsContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);
    
    projectSectionsContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);
    
    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            switchSection('next');
        }
        if (touchEndX > touchStartX + 50) {
            switchSection('prev');
        }
    }
    
    // Auto-rotate (optional)
    let autoRotateInterval;
    const startAutoRotate = () => {
        autoRotateInterval = setInterval(() => {
            switchSection('next');
        }, 8000);
    };
    
    const stopAutoRotate = () => {
        clearInterval(autoRotateInterval);
    };
    
    // Start auto-rotate
    startAutoRotate();
    
    // Pause auto-rotate when user interacts
    const projectSelector = document.querySelector('.project-selector');
    projectSelector.addEventListener('mouseenter', stopAutoRotate);
    projectSelector.addEventListener('mouseleave', startAutoRotate);
    projectSelector.addEventListener('touchstart', stopAutoRotate);
    projectSelector.addEventListener('touchend', () => {
        setTimeout(startAutoRotate, 5000);
    });
});