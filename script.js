/**
 * Belmont Publishing - Sophisticated JavaScript
 * Modern, performant, and accessible interactions
 */

class BelmontPublishing {
    constructor() {
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupComponents());
        } else {
            this.setupComponents();
        }
    }

    setupComponents() {
        this.setupHeader();
        this.setupSmoothScrolling();
        this.setupAnimations();
        this.setupStatsCounter();
        this.setupBookInteractions();
        this.setupNewsletter();
        this.setupKeyboardNavigation();
        this.setupPerformanceOptimizations();
    }

    /**
     * Header scroll effects and navigation
     */
    setupHeader() {
        const header = document.getElementById('header');
        if (!header) return;

        let lastScrollY = 0;
        let isScrolling = false;

        const updateHeader = () => {
            const currentScrollY = window.pageYOffset;
            const scrollDifference = Math.abs(currentScrollY - lastScrollY);
            
            // Only update if scroll difference is significant (performance optimization)
            if (scrollDifference < 1) return;

            requestAnimationFrame(() => {
                if (currentScrollY > 100) {
                    header.style.setProperty('--header-bg', 'rgba(250, 250, 250, 0.95)');
                    header.style.setProperty('--header-shadow', '0 4px 20px rgba(0, 0, 0, 0.08)');
                } else {
                    header.style.setProperty('--header-bg', 'rgba(250, 250, 250, 0.85)');
                    header.style.setProperty('--header-shadow', 'none');
                }

                lastScrollY = currentScrollY;
            });
        };

        // Throttled scroll listener
        const throttledScroll = this.throttle(updateHeader, 16); // ~60fps
        window.addEventListener('scroll', throttledScroll, { passive: true });

        // Mobile navigation toggle
        const navToggle = document.querySelector('.nav-toggle');
        const navLinks = document.querySelector('.nav-links');
        
        if (navToggle && navLinks) {
            navToggle.addEventListener('click', () => {
                const isOpen = navLinks.classList.contains('nav-open');
                navLinks.classList.toggle('nav-open');
                navToggle.setAttribute('aria-expanded', !isOpen);
                
                // Animate toggle button
                navToggle.classList.toggle('active');
            });
        }
    }

    /**
     * Smooth scrolling with proper offset calculation
     */
    setupSmoothScrolling() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;
                    
                    // Custom smooth scroll with easing
                    this.smoothScrollTo(targetPosition, 800);
                }
            });
        });
    }

    /**
     * Custom smooth scroll with easing
     */
    smoothScrollTo(targetPosition, duration) {
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        const easeInOutCubic = (t) => {
            return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
        };

        const animation = (currentTime) => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            
            const easedProgress = easeInOutCubic(progress);
            window.scrollTo(0, startPosition + distance * easedProgress);
            
            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        };

        requestAnimationFrame(animation);
    }

    /**
     * Intersection Observer for scroll-triggered animations
     */
    setupAnimations() {
        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;

        const observerOptions = {
            threshold: 0.1,
            rootMargin: '-50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Stagger animations for child elements
                    const children = entry.target.querySelectorAll('.stagger-item');
                    children.forEach((child, index) => {
                        setTimeout(() => {
                            child.classList.add('animate-in');
                        }, index * 100);
                    });
                    
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const animatedElements = document.querySelectorAll([
            '.book-card',
            '.stat-item',
            '.feature',
            '.about-visual',
            '.newsletter-container'
        ].join(','));

        animatedElements.forEach(el => {
            el.classList.add('animate-on-scroll');
            observer.observe(el);
        });
    }

    /**
     * Animated statistics counter
     */
    setupStatsCounter() {
        const statNumbers = document.querySelectorAll('.stat-number[data-target]');
        let hasAnimated = false;

        const animateStats = () => {
            if (hasAnimated) return;
            hasAnimated = true;

            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                const duration = 2000;
                const startTime = performance.now();
                
                const updateNumber = (currentTime) => {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    
                    // Easing function for smooth animation
                    const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
                    const currentNumber = Math.floor(target * easeOutExpo);
                    
                    stat.textContent = currentNumber;
                    
                    if (progress < 1) {
                        requestAnimationFrame(updateNumber);
                    } else {
                        stat.textContent = target;
                    }
                };
                
                requestAnimationFrame(updateNumber);
            });
        };

        // Trigger animation when stats section is visible
        const statsSection = document.querySelector('.featured-stats');
        if (statsSection) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateStats();
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });

            observer.observe(statsSection);
        }
    }

    /**
     * Enhanced book interactions
     */
    setupBookInteractions() {
        // Featured book 3D effect
        const featuredBook = document.querySelector('.book-cover-main');
        if (featuredBook) {
            let isHovering = false;
            
            featuredBook.addEventListener('mouseenter', () => {
                isHovering = true;
            });
            
            featuredBook.addEventListener('mouseleave', () => {
                isHovering = false;
                featuredBook.style.transform = '';
            });
            
            featuredBook.addEventListener('mousemove', (e) => {
                if (!isHovering) return;
                
                const rect = featuredBook.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                
                const deltaX = (e.clientX - centerX) / rect.width;
                const deltaY = (e.clientY - centerY) / rect.height;
                
                const rotateY = deltaX * 15;
                const rotateX = -deltaY * 10;
                
                requestAnimationFrame(() => {
                    featuredBook.style.transform = `perspective(1000px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) translateZ(20px)`;
                });
            });
        }

        // Book card hover effects
        const bookCards = document.querySelectorAll('.book-card');
        bookCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                requestAnimationFrame(() => {
                    card.style.transform = 'translateX(8px)';
                    card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.15)';
                });
            });
            
            card.addEventListener('mouseleave', () => {
                requestAnimationFrame(() => {
                    card.style.transform = '';
                    card.style.boxShadow = '';
                });
            });
        });

        // Book stack floating animation
        const bookStack = document.querySelector('.book-stack');
        if (bookStack) {
            let animationId;
            
            const floatAnimation = (timestamp) => {
                const offset = Math.sin(timestamp * 0.001) * 5;
                bookStack.style.transform = `translateY(${offset}px)`;
                animationId = requestAnimationFrame(floatAnimation);
            };
            
            animationId = requestAnimationFrame(floatAnimation);
            
            // Pause animation when page is not visible (performance)
            document.addEventListener('visibilitychange', () => {
                if (document.hidden) {
                    cancelAnimationFrame(animationId);
                } else {
                    animationId = requestAnimationFrame(floatAnimation);
                }
            });
        }
    }

    /**
     * Advanced newsletter functionality
     */
    setupNewsletter() {
        const form = document.querySelector('.newsletter-form');
        const input = document.querySelector('.newsletter-input');
        const button = document.querySelector('.newsletter-submit');
        const submitText = document.querySelector('.submit-text');
        const submitLoading = document.querySelector('.submit-loading');

        if (!form || !input || !button) return;

        // Enhanced form validation
        input.addEventListener('input', () => {
            const isValid = this.validateEmail(input.value);
            input.style.borderColor = input.value ? (isValid ? '#10b981' : '#ef4444') : '';
        });

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const email = input.value.trim();
            if (!this.validateEmail(email)) {
                this.showNotification('Please enter a valid email address', 'error');
                return;
            }

            // Disable form and show loading
            button.disabled = true;
            submitText.style.display = 'none';
            submitLoading.style.display = 'flex';

            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // Success state
                this.showNotification('Thank you for subscribing!', 'success');
                input.value = '';
                
                // Reset button after delay
                setTimeout(() => {
                    submitText.style.display = 'block';
                    submitLoading.style.display = 'none';
                    button.disabled = false;
                }, 2000);
                
            } catch (error) {
                this.showNotification('Something went wrong. Please try again.', 'error');
                submitText.style.display = 'block';
                submitLoading.style.display = 'none';
                button.disabled = false;
            }
        });
    }

    /**
     * Email validation
     */
    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    /**
     * Toast notification system
     */
    showNotification(message, type = 'info') {
        // Remove existing notifications
        const existing = document.querySelector('.notification');
        if (existing) existing.remove();

        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Styles
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '8px',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
            zIndex: '9999',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease',
            fontSize: '14px',
            fontWeight: '500'
        });

        document.body.appendChild(notification);

        // Animate in
        requestAnimationFrame(() => {
            notification.style.transform = 'translateX(0)';
        });

        // Auto remove
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    }

    /**
     * Enhanced keyboard navigation
     */
    setupKeyboardNavigation() {
        // Focus management for accessibility
        const focusableElements = 'a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])';
        
        document.addEventListener('keydown', (e) => {
            // Escape key handling
            if (e.key === 'Escape') {
                const activeElement = document.activeElement;
                if (activeElement && activeElement.blur) {
                    activeElement.blur();
                }
                
                // Close mobile menu if open
                const navLinks = document.querySelector('.nav-links');
                if (navLinks && navLinks.classList.contains('nav-open')) {
                    navLinks.classList.remove('nav-open');
                    document.querySelector('.nav-toggle')?.setAttribute('aria-expanded', 'false');
                }
            }
            
            // Arrow key navigation for book cards
            if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                const activeElement = document.activeElement;
                const bookCards = Array.from(document.querySelectorAll('.book-card'));
                const currentIndex = bookCards.indexOf(activeElement);
                
                if (currentIndex !== -1) {
                    e.preventDefault();
                    const nextIndex = e.key === 'ArrowRight' 
                        ? Math.min(currentIndex + 1, bookCards.length - 1)
                        : Math.max(currentIndex - 1, 0);
                    bookCards[nextIndex]?.focus();
                }
            }
        });

        // Skip to main content link
        const skipLink = document.createElement('a');
        skipLink.href = '#main';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'skip-link';
        
        Object.assign(skipLink.style, {
            position: 'absolute',
            top: '-40px',
            left: '6px',
            background: '#000',
            color: '#fff',
            padding: '8px',
            textDecoration: 'none',
            borderRadius: '4px',
            zIndex: '10000',
            transition: 'top 0.3s'
        });
        
        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '6px';
        });
        
        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-40px';
        });
        
        document.body.prepend(skipLink);
    }

    /**
     * Performance optimizations
     */
    setupPerformanceOptimizations() {
        // Lazy load images if implemented
        if ('IntersectionObserver' in window) {
            const images = document.querySelectorAll('img[data-src]');
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            images.forEach(img => imageObserver.observe(img));
        }

        // Preload critical resources
        const preloadLink = document.createElement('link');
        preloadLink.rel = 'preload';
        preloadLink.href = 'styles.css';
        preloadLink.as = 'style';
        document.head.appendChild(preloadLink);

        // Service worker registration for caching (when available)
        if ('serviceWorker' in navigator && 'caches' in window) {
            window.addEventListener('load', () => {
                // Would register service worker here in production
                console.log('Service worker support detected');
            });
        }
    }

    /**
     * Utility functions
     */
    throttle(func, delay) {
        let timeoutId;
        let lastExecTime = 0;
        
        return function (...args) {
            const currentTime = Date.now();
            
            if (currentTime - lastExecTime > delay) {
                func.apply(this, args);
                lastExecTime = currentTime;
            } else {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    func.apply(this, args);
                    lastExecTime = Date.now();
                }, delay - (currentTime - lastExecTime));
            }
        };
    }

    debounce(func, delay) {
        let timeoutId;
        return function (...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    }
}

// Initialize the application
const app = new BelmontPublishing();

// Global error handling
window.addEventListener('error', (event) => {
    console.error('JavaScript error:', event.error);
    // In production, you might want to send this to an error tracking service
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    event.preventDefault();
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BelmontPublishing;
}