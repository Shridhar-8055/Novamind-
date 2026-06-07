// Navbar scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const hamburgerMenu = document.getElementById('hamburgerMenu');
const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
const closeMenu = document.getElementById('closeMenu');

if (hamburgerMenu) {
    hamburgerMenu.addEventListener('click', function() {
        mobileMenuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    });
}

if (closeMenu) {
    closeMenu.addEventListener('click', function() {
        mobileMenuOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    });
}

// Close menu when clicking on a link
const mobileMenuLinks = document.querySelectorAll('.mobile-menu-card, .mobile-login-btn, .mobile-get-started-btn');
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', function() {
        mobileMenuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add animation on scroll for sections
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Employee cards horizontal scroll animation
const employeeCardsTop = document.querySelector('.employee-cards-top');
let isScrolling = false;

if (employeeCardsTop) {
    // Auto-scroll animation (optional)
    let scrollAmount = 0;
    
    setInterval(() => {
        if (!isScrolling) {
            scrollAmount += 1;
            employeeCardsTop.scrollLeft = scrollAmount;
            
            if (scrollAmount >= employeeCardsTop.scrollWidth - employeeCardsTop.clientWidth) {
                scrollAmount = 0;
            }
        }
    }, 50);
    
    // Pause auto-scroll on user interaction
    employeeCardsTop.addEventListener('mouseenter', () => {
        isScrolling = true;
    });
    
    employeeCardsTop.addEventListener('mouseleave', () => {
        isScrolling = false;
    });
}

// Button hover effects
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Console message
console.log('%c AI Employees Platform ', 'background: #FFD500; color: #000; font-size: 20px; padding: 10px; font-weight: bold;');
console.log('Welcome to the future of business scaling!');