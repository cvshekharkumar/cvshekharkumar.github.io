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

    // Quick Access Button Logic
    const quickAccessToggle = document.querySelector('.quick-access-toggle');
    const quickAccessMenu = document.querySelector('.quick-access-menu');

    if (quickAccessToggle && quickAccessMenu) {
        quickAccessToggle.addEventListener('click', function() {
            quickAccessMenu.classList.toggle('active');
            quickAccessToggle.classList.toggle('active');
        });
    }

    // Notification button scroll logic
    const notificationButton = document.getElementById('notification-link');
    const newsEventsSection = document.getElementById('news-events-section');

    if (notificationButton && newsEventsSection) {
        notificationButton.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default link behavior
            newsEventsSection.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // About Us button scroll logic
    const aboutUsButton = document.querySelector('a[href="#about-us-section"]');
    const aboutUsSection = document.getElementById('about-us-section');

    if (aboutUsButton && aboutUsSection) {
        aboutUsButton.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default link behavior
            aboutUsSection.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Courses button scroll logic
    const coursesButton = document.querySelector('a[href="#our-courses-section"]');
    const coursesSection = document.getElementById('our-courses-section');

    if (coursesButton && coursesSection) {
        coursesButton.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default link behavior
            coursesSection.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Faculty button scroll logic
    const facultyButton = document.querySelector('a[href="#faculty-section"]');
    const facultySection = document.getElementById('faculty-section');

    if (facultyButton && facultySection) {
        facultyButton.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default link behavior
            facultySection.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Review button scroll logic
    const reviewButton = document.querySelector('a[href="#testimonials-section"]');
    const reviewSection = document.getElementById('testimonials-section');

    if (reviewButton && reviewSection) {
        reviewButton.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default link behavior
            reviewSection.scrollIntoView({ behavior: 'smooth' });
        });
    }
});