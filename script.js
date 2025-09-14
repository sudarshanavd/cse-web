// Professional CSE Department Website JavaScript

// DOM Elements
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMobile = document.getElementById('nav-mobile');
const typingTextElement = document.getElementById('typing-text');
const scrollIndicator = document.querySelector('.scroll-indicator');

// Navigation functionality
document.addEventListener('DOMContentLoaded', () => {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');
  const dropBtn = document.querySelector('.dropbtn');
  const dropdownContent = document.querySelector('.dropdown-content');

  mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuBtn.setAttribute('aria-expanded', navLinks.classList.contains('active'));
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
      navLinks.classList.remove('active');
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
    }
  });

  // Handle dropdown accessibility
  dropBtn.addEventListener('click', (e) => {
    const isExpanded = dropBtn.getAttribute('aria-expanded') === 'true';
    dropBtn.setAttribute('aria-expanded', !isExpanded);
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!dropBtn.contains(e.target) && !dropdownContent.contains(e.target)) {
      dropBtn.setAttribute('aria-expanded', 'false');
    }
  });
});

// Handle navbar scroll effect
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    if (scrollY > 50 && !isScrolled) {
        navbar.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
        isScrolled = true;
    } else if (scrollY <= 50 && isScrolled) {
        navbar.style.boxShadow = 'none';
        isScrolled = false;
    }
});

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    isMobileMenuOpen = !isMobileMenuOpen;
    
    if (isMobileMenuOpen) {
        navMobile.classList.add('active');
        navToggle.innerHTML = '<i data-lucide="x"></i>';
    } else {
        navMobile.classList.remove('active');
        navToggle.innerHTML = '<i data-lucide="menu"></i>';
    }
    
    // Reinitialize lucide icons
    lucide.createIcons();
});

// Smooth scroll for navigation links
function smoothScrollTo(target) {
    const element = document.querySelector(target);
    if (element) {
        const offsetTop = element.offsetTop - 80; // Account for fixed navbar
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
    
    // Close mobile menu if open
    if (isMobileMenuOpen) {
        navMobile.classList.remove('active');
        navToggle.innerHTML = '<i data-lucide="menu"></i>';
        isMobileMenuOpen = false;
        lucide.createIcons();
    }
}

// Add click events to all navigation links
document.querySelectorAll('.nav-link, .nav-mobile-link, .footer-links a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = link.getAttribute('href');
        smoothScrollTo(target);
    });
});

// Scroll indicator functionality
scrollIndicator?.addEventListener('click', () => {
    smoothScrollTo('#about');
});

// Typing animation for hero section
const typingTexts = [
    'Innovating the Future',
    'Empowering Students',
    'Building Leaders',
    'Advancing Technology'
];

let currentTextIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeText() {
    const currentText = typingTexts[currentTextIndex];
    
    if (isDeleting) {
        // Remove characters
        typingTextElement.textContent = currentText.substring(0, currentCharIndex - 1);
        currentCharIndex--;
        typingSpeed = 50;
    } else {
        // Add characters
        typingTextElement.textContent = currentText.substring(0, currentCharIndex + 1);
        currentCharIndex++;
        typingSpeed = 100;
    }
    
    // Check if word is complete
    if (!isDeleting && currentCharIndex === currentText.length) {
        // Pause at end of word
        typingSpeed = 1500;
        isDeleting = true;
    } else if (isDeleting && currentCharIndex === 0) {
        // Move to next word
        isDeleting = false;
        currentTextIndex = (currentTextIndex + 1) % typingTexts.length;
        typingSpeed = 500;
    }
    
    setTimeout(typeText, typingSpeed);
}

// Start typing animation when page loads
document.addEventListener('DOMContentLoaded', () => {
    if (typingTextElement) {
        setTimeout(typeText, 1000);
    }
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all elements with fade-in-scroll class
document.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll('.fade-in-scroll');
    fadeElements.forEach((element, i) => {
        element.style.transitionDelay = `${i * 0.12}s`;
        observer.observe(element);
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll('.fade-in-scroll');
    fadeElements.forEach(element => {
        observer.observe(element);
    });
});

// Add staggered animation delays to grid items
function addStaggeredAnimations() {
    // Faculty cards
    const facultyCards = document.querySelectorAll('.faculty-card.fade-in-scroll');
    facultyCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // VMO cards
    const vmoCards = document.querySelectorAll('.vmo-card.fade-in-scroll');
    vmoCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.2}s`;
    });
    
    // Program cards
    const programCards = document.querySelectorAll('.program-card');
    programCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // Resource cards
    const resourceCards = document.querySelectorAll('.resource-card');
    resourceCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });
}

// Initialize staggered animations
document.addEventListener('DOMContentLoaded', addStaggeredAnimations);

// Parallax effect for hero section
let ticking = false;

function updateParallax() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-bg-image');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
    
    ticking = false;
}

function requestParallaxTick() {
    if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
    }
}

// Add parallax scroll event
window.addEventListener('scroll', requestParallaxTick);

// Smooth hover effects for cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card-hover, .faculty-card, .vmo-card, .program-card, .resource-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-4px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
});

// Image lazy loading
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});

// Form validation and interaction (for future contact forms)
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Utility function for smooth scrolling to top
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add click event to logo for scroll to top
document.querySelector('.nav-logo')?.addEventListener('click', (e) => {
    e.preventDefault();
    scrollToTop();
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    // Close mobile menu with Escape key
    if (e.key === 'Escape' && isMobileMenuOpen) {
        navMobile.classList.remove('active');
        navToggle.innerHTML = '<i data-lucide="menu"></i>';
        isMobileMenuOpen = false;
        lucide.createIcons();
    }
});

// Performance optimization - debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Debounced scroll handler for better performance
const debouncedScrollHandler = debounce(() => {
    // Additional scroll-based functionality can be added here
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Trigger initial animations
    const initialAnimations = document.querySelectorAll('.fade-in');
    initialAnimations.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// Error handling for missing elements
function safeQuerySelector(selector) {
    try {
        return document.querySelector(selector);
    } catch (error) {
        console.warn(`Element not found: ${selector}`);
        return null;
    }
}

// Initialize all functionality when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('CSE Department Website Loaded Successfully');
    
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // Add smooth scrolling class to html
    document.documentElement.classList.add('smooth-scroll');
});

// Export functions for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        smoothScrollTo,
        validateEmail,
        scrollToTop,
        debounce
    };
}