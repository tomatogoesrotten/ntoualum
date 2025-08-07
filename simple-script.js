// Enhanced JavaScript for Alumni Website with Bootstrap

document.addEventListener('DOMContentLoaded', function() {
    // Load navbar component
    loadNavbar();
    
    function loadNavbar() {
        const headerElement = document.querySelector('header');
        if (headerElement) {
            headerElement.innerHTML = getNavbarHTML();
            
            // Set active page based on current URL
            setActivePage();
            
            // Re-initialize Bootstrap components
            initializeBootstrapComponents();
        }
    }
    
    function getNavbarHTML() {
        return `
        <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top">
            <div class="container">
                <a class="navbar-brand fw-bold text-primary fs-4 d-flex align-items-center" href="index.html">
                    <img src="ntoulogo.gif" alt="NTOU Logo" class="me-2" style="height: 40px; width: auto;">
                    <span class="d-none d-sm-inline">國立台灣海洋大學馬來西亞校友會</span>
                    <span class="d-sm-none">NTOU Alumni</span>
                </a>
                
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span class="navbar-toggler-icon"></span>
                </button>
                
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav mx-auto">
                        <li class="nav-item">
                            <a class="nav-link" href="index.html" data-page="home">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="events.html" data-page="events">Events</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="directory.html" data-page="directory">Directory</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="news.html" data-page="news">News</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="contact.html" data-page="contact">Contact</a>
                        </li>
                    </ul>
                    
                    <div class="d-flex gap-2">
                        <a href="login.html" class="btn btn-outline-primary">Sign In</a>
                        <a href="register.html" class="btn btn-primary">Join Now</a>
                    </div>
                </div>
            </div>
        </nav>
        `;
    }
    
    function setActivePage() {
        const currentPage = window.location.pathname.split('/').pop();
        const navLinks = document.querySelectorAll('.nav-link[data-page]');
        
        // Remove active class from all links
        navLinks.forEach(link => link.classList.remove('active'));
        
        // Add active class to current page
        if (currentPage === 'index.html' || currentPage === '' || currentPage === 'index.html') {
            document.querySelector('.nav-link[data-page="home"]')?.classList.add('active');
        } else if (currentPage === 'events.html') {
            document.querySelector('.nav-link[data-page="events"]')?.classList.add('active');
        } else if (currentPage === 'directory.html') {
            document.querySelector('.nav-link[data-page="directory"]')?.classList.add('active');
        } else if (currentPage === 'news.html') {
            document.querySelector('.nav-link[data-page="news"]')?.classList.add('active');
        } else if (currentPage === 'contact.html') {
            document.querySelector('.nav-link[data-page="contact"]')?.classList.add('active');
        }
    }
    
    function initializeBootstrapComponents() {
        // Initialize tooltips
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
        
        // Initialize popovers
        const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
        const popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
            return new bootstrap.Popover(popoverTriggerEl);
        });
    }
    // Initialize page with loading animation
    document.body.classList.add('page-loading');
    
    // Remove loading state after everything is loaded
    window.addEventListener('load', function() {
        document.body.classList.remove('page-loading');
        document.body.classList.add('page-loaded');
    });
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link, .btn[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Check if it's an internal link (starts with #)
            if (href && href.startsWith('#')) {
                e.preventDefault();
                
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const headerHeight = 76; // Account for fixed navbar
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    const navbarCollapse = document.getElementById('navbarNav');
                    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                        const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                        bsCollapse.hide();
                    }
                }
            }
        });
    });
    
    // Add active state to navigation links based on scroll position
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop && 
                window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
        
        // Handle back to top button
        handleBackToTopButton();
    });
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-on-scroll');
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);
    
    // Observe cards and other elements for animation
    const animatedElements = document.querySelectorAll('.card, .hero .col-lg-6');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
    
    // Create and manage back to top button
    function createBackToTopButton() {
        const backToTopBtn = document.createElement('button');
        backToTopBtn.innerHTML = '↑';
        backToTopBtn.className = 'back-to-top';
        backToTopBtn.setAttribute('aria-label', 'Back to top');
        backToTopBtn.setAttribute('title', 'Back to top');
        
        document.body.appendChild(backToTopBtn);
        
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        return backToTopBtn;
    }
    
    const backToTopButton = createBackToTopButton();
    
    function handleBackToTopButton() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    }
    
    // Enhanced form validation for future use
    function validateForm(form) {
        const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                input.classList.add('is-invalid');
                isValid = false;
            } else {
                input.classList.remove('is-invalid');
                
                // Email validation
                if (input.type === 'email' && !validateEmail(input.value)) {
                    input.classList.add('is-invalid');
                    isValid = false;
                }
            }
        });
        
        return isValid;
    }
    
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Add to global scope for future use
    window.validateForm = validateForm;
    window.validateEmail = validateEmail;
    
    // Bootstrap tooltip initialization
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // Bootstrap popover initialization
    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    const popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });
    
    // Handle navbar background on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });
    
    // Handle responsive images loading
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
    
    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // ESC key to close mobile menu
        if (e.key === 'Escape') {
            const navbarCollapse = document.getElementById('navbarNav');
            if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
        }
    });
    
    // Handle viewport height for mobile browsers
    function setVH() {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    setVH();
    window.addEventListener('resize', setVH);
    
    // Performance optimization: debounce scroll events
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
    
    // Apply debouncing to scroll handler
    window.addEventListener('scroll', debounce(function() {
        // Scroll-dependent functions here
    }, 10));
    
    // Add loading states for dynamic content
    function showLoading(element) {
        element.innerHTML = '<div class="d-flex justify-content-center"><div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div></div>';
    }
    
    function hideLoading(element, content) {
        element.innerHTML = content;
    }
    
    window.showLoading = showLoading;
    window.hideLoading = hideLoading;
    
    console.log('Enhanced Alumni Website JavaScript with Bootstrap loaded successfully!');
});