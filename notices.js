// notices.js

document.addEventListener('DOMContentLoaded', function() {
    const noticeForm = document.getElementById('notice-form');
    const noticeIdInput = document.getElementById('notice-id');
    const noticeTitleInput = document.getElementById('notice-title');
    const noticeContentInput = document.getElementById('notice-content');
    const noticesList = document.getElementById('notices-list');
    const cancelEditButton = document.getElementById('cancel-edit');

    // Load notices from localStorage or use initial data if none exist
    let notices = JSON.parse(localStorage.getItem('notices'));
    if (!notices) { // If localStorage is empty or invalid JSON
        notices = [
            { id: 1, title: 'Admissions Open for 2025-26!', content: 'Enroll your child now for the upcoming academic year. Limited seats available.' },
            { id: 2, title: 'Annual Sports Day - Nov 15th', content: 'Join us for a day of fun, games, and healthy competition!' },
            { id: 3, title: 'Annual Sports Day - Aug 16th', content: 'Joigfdhdfhompetition!' },
            { id: 4, title: 'Important Update', content: 'This is notification 2 content.' }
        ];
        saveNotices(); // Save the default notices to localStorage on first load
    }
    let nextId = notices.length > 0 ? Math.max(...notices.map(n => n.id)) + 1 : 1;

    // Save notices to localStorage
    function saveNotices() {
        localStorage.setItem('notices', JSON.stringify(notices));
    }

    function renderNotices() {
        noticesList.innerHTML = '';
        notices.forEach(notice => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <h3>${notice.title}</h3>
                <p>${notice.content}</p>
                <button class="edit-button" data-id="${notice.id}">Edit</button>
                <button class="delete-button" data-id="${notice.id}">Delete</button>
            `;
            noticesList.appendChild(listItem);
        });
        // Update the notification count on the index page (if it exists)
        if (window.updateNotificationCount) {
            window.updateNotificationCount(notices.length);
        }
    }

    function addNotice(title, content) {
        const newNotice = { id: nextId++, title, content };
        notices.push(newNotice);
        saveNotices(); // Save after adding
        renderNotices();
    }

    function editNotice(id, title, content) {
        const index = notices.findIndex(notice => notice.id === id);
        if (index !== -1) {
            notices[index] = { id, title, content };
            saveNotices(); // Save after editing
            renderNotices();
        }
    }

    function deleteNotice(id) {
        notices = notices.filter(notice => notice.id !== id);
        saveNotices(); // Save after deleting
        renderNotices();
    }

    noticeForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const id = parseInt(noticeIdInput.value);
        const title = noticeTitleInput.value;
        const content = noticeContentInput.value;

        if (id) {
            editNotice(id, title, content);
        } else {
            addNotice(title, content);
        }
        noticeForm.reset();
        noticeIdInput.value = '';
        cancelEditButton.style.display = 'none';
    });

    noticesList.addEventListener('click', function(event) {
        if (event.target.classList.contains('edit-button')) {
            const id = parseInt(event.target.dataset.id);
            const noticeToEdit = notices.find(notice => notice.id === id);
            if (noticeToEdit) {
                noticeIdInput.value = noticeToEdit.id;
                noticeTitleInput.value = noticeToEdit.title;
                noticeContentInput.value = noticeToEdit.content;
                cancelEditButton.style.display = 'inline-block';
            }
        } else if (event.target.classList.contains('delete-button')) {
            const id = parseInt(event.target.dataset.id);
            if (confirm('Are you sure you want to delete this notice?')) {
                deleteNotice(id);
            }
        }
    });

    cancelEditButton.addEventListener('click', function() {
        noticeForm.reset();
        noticeIdInput.value = '';
        cancelEditButton.style.display = 'none';
    });

    // Initial render
    renderNotices();
});