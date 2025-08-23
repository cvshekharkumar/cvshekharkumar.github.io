// script.js

document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            menuToggle.classList.toggle('active'); // Toggle active class on the button itself
        });
    }

    // Notification Count Logic
    const notificationCountElement = document.querySelector('.notification-count');

    // Function to update the notification count badge
    function updateNotificationCount(count) {
        if (notificationCountElement) { // Check if the element exists
            if (count > 0) {
                notificationCountElement.textContent = count;
                notificationCountElement.style.display = 'block'; // Show the badge
            } else {
                notificationCountElement.style.display = 'none'; // Hide the badge
            }
        }
    }

    // Function to render news and events on index.html
    function renderNewsAndEvents() {
        const newsEventsContainer = document.querySelector('#news-events-section .events-announcements-carousel');
        // Load notices from localStorage
        const notices = JSON.parse(localStorage.getItem('notices')) || [];

        if (newsEventsContainer) {
            newsEventsContainer.innerHTML = ''; // Clear existing content
            notices.forEach(notice => {
                const eventItem = document.createElement('div');
                eventItem.classList.add('event-item');
                eventItem.innerHTML = `
                    <h3>${notice.title}</h3>
                    <p>${notice.content}</p>
                `;
                newsEventsContainer.appendChild(eventItem);
            });
            updateNotificationCount(notices.length); // Update notification count based on rendered events
        }
    }

    // Initial render of news and events and update notification count
    renderNewsAndEvents();

    // Expose updateNotificationCount globally so notices.js can call it
    window.updateNotificationCount = updateNotificationCount;

    // Listen for changes in localStorage from other tabs/windows
    window.addEventListener('storage', function(event) {
        if (event.key === 'notices') {
            renderNewsAndEvents(); // Re-render if notices data changes in localStorage
        }
    });

    // Close mobile menu after clicking a navigation link
    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    });

    // Quick Access Button Logic
    const quickAccessToggle = document.querySelector('.quick-access-toggle');
    const quickAccessMenu = document.querySelector('.quick-access-menu');

    if (quickAccessToggle && quickAccessMenu) {
        quickAccessToggle.addEventListener('click', function() {
            quickAccessMenu.classList.toggle('active');
            quickAccessToggle.classList.toggle('active');
        });
    }

    // Function to get the height of the fixed header
    function getFixedHeaderHeight() {
        const header = document.querySelector('.main-header');
        return header ? header.offsetHeight : 0;
    }

    

    // Smooth scrolling for all internal anchor links, accounting for fixed header
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerHeight = getFixedHeaderHeight();
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Testimonials Carousel Logic
    const carouselTrack = document.querySelector('.carousel-track');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    const testimonialCards = document.querySelectorAll('.carousel-track .testimonial-card');
    let currentIndex = 0;

    function updateCarousel() {
        const cardWidth = testimonialCards[0].offsetWidth;
        carouselTrack.style.transform = `translateX(${-currentIndex * cardWidth}px)`;
    }

    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % testimonialCards.length;
        updateCarousel();
    });

    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + testimonialCards.length) % testimonialCards.length;
        updateCarousel();
    });

    // Optional: Auto-play carousel
    setInterval(() => {
        nextButton.click();
    }, 5000); // Change slide every 5 seconds

    // Update carousel on window resize
    window.addEventListener('resize', updateCarousel);

    // Initial update
    updateCarousel();
});