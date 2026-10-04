const $=id=>document.getElementById(id),uid=()=>`Q-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2,6).toUpperCase()}`;

const FRONT_DEFAULTS = {
  html: '<!doctype html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Front-End Task</title>\n</head>\n<body>\n  <main class="card">\n    <h1>Hello Front End</h1>\n    <p>Edit HTML, CSS, and JavaScript to update this preview.</p>\n    <button id="actionBtn">Click me</button>\n  </main>\n</body>\n</html>',
  css: '* { box-sizing: border-box; }\nbody {\n  margin: 0;\n  min-height: 100vh;\n  display: grid;\n  place-items: center;\n  font-family: Segoe UI, Arial, sans-serif;\n  background: linear-gradient(135deg, #8e44ad, #9b59b6);\n}\n.card {\n  width: min(440px, 90vw);\n  padding: 36px;\n  border-radius: 16px;\n  background: white;\n  text-align: center;\n  box-shadow: 0 18px 50px rgba(0,0,0,.2);\n}\nbutton { padding: 10px 18px; cursor: pointer; }',
  javascript: "document.getElementById('actionBtn')?.addEventListener('click', () => {\n  console.log('Button clicked');\n});"
};

const SAMPLE_MOCK_DATA = {
  "format": "frontend-assessment-complete-json",
  "version": 1,
  "exportedAt": "2026-09-27T18:29:42.170Z",
  "assessment": {
    "format": "frontend-assessment-set",
    "version": 2,
    "setId": "SET-MUK5KO3I",
    "title": "Front-End Assessment",
    "timerMinutes": 60,
    "questions": [
      {
        "id": "Q-MUK5KO3I-LL17",
        "title": "Interactive Counter Component",
        "problemHtml": "<h2>Problem Statement: Interactive Counter</h2><p>Build an interactive counter component in HTML, CSS, and JavaScript with increment, decrement, and reset functionality.</p><h3>Requirements:</h3><ul><li>Display the current count in the element with <code>id=\"count\"</code> (initial value must be <code>0</code>).</li><li>Clicking <code>#incrementBtn</code> should increase the count by <code>1</code>.</li><li>Clicking <code>#decrementBtn</code> should decrease the count by <code>1</code> (do not allow the count to drop below <code>0</code>).</li><li>Clicking <code>#resetBtn</code> should reset the counter back to <code>0</code>.</li><li>Dynamically change the counter text color: <code>#27ae60</code> (green) when count > 0, and <code>#2c3e50</code> when count is 0.</li></ul>",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>Interactive Counter</title>\n</head>\n<body>\n  <main class=\"card\">\n    <h1>Counter App</h1>\n    <div class=\"counter-display\" id=\"count\">0</div>\n    <div class=\"button-group\">\n      <button id=\"decrementBtn\" class=\"btn btn-secondary\">- Decrement</button>\n      <button id=\"resetBtn\" class=\"btn btn-outline\">Reset</button>\n      <button id=\"incrementBtn\" class=\"btn btn-primary\">+ Increment</button>\n    </div>\n  </main>\n</body>\n</html>",
        "tests": [],
        "customFonts": [],
        "problemLocked": false,
        "frontEndHtml": "<!doctype html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>Interactive Counter</title>\n</head>\n<body>\n  <main class=\"card\">\n    <h1>Counter App</h1>\n    <div class=\"counter-display\" id=\"count\">0</div>\n    <div class=\"button-group\">\n      <button id=\"decrementBtn\" class=\"btn btn-secondary\">- Decrement</button>\n      <button id=\"resetBtn\" class=\"btn btn-outline\">Reset</button>\n      <button id=\"incrementBtn\" class=\"btn btn-primary\">+ Increment</button>\n    </div>\n  </main>\n</body>\n</html>",
        "frontEndCss": "* { box-sizing: border-box; }\nbody {\n  margin: 0;\n  min-height: 100vh;\n  display: grid;\n  place-items: center;\n  font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;\n  background: linear-gradient(135deg, #667eea, #764ba2);\n}\n.card {\n  width: min(440px, 90vw);\n  padding: 32px;\n  border-radius: 16px;\n  background: #ffffff;\n  text-align: center;\n  box-shadow: 0 16px 40px rgba(0,0,0,0.18);\n}\nh1 { margin-top: 0; color: #1e293b; font-size: 1.6rem; }\n.counter-display {\n  font-size: 4rem;\n  font-weight: 700;\n  color: #2c3e50;\n  margin: 24px 0;\n  transition: color 0.2s ease;\n}\n.button-group {\n  display: flex;\n  gap: 12px;\n  justify-content: center;\n  flex-wrap: wrap;\n}\n.btn {\n  padding: 10px 18px;\n  font-size: 0.95rem;\n  font-weight: 600;\n  border-radius: 8px;\n  border: none;\n  cursor: pointer;\n  transition: transform 0.1s, opacity 0.2s;\n}\n.btn:active { transform: scale(0.96); }\n.btn-primary { background: #4f46e5; color: white; }\n.btn-secondary { background: #ef4444; color: white; }\n.btn-outline { background: #e2e8f0; color: #334155; }",
        "frontEndJs": "// Write your Counter JavaScript logic here\nlet count = 0;\nconst countDisplay = document.getElementById('count');\nconst incrementBtn = document.getElementById('incrementBtn');\nconst decrementBtn = document.getElementById('decrementBtn');\nconst resetBtn = document.getElementById('resetBtn');\n\nfunction updateDisplay() {\n  countDisplay.textContent = count;\n  countDisplay.style.color = count > 0 ? '#27ae60' : '#2c3e50';\n}\n\nincrementBtn?.addEventListener('click', () => {\n  count++;\n  updateDisplay();\n});\n\ndecrementBtn?.addEventListener('click', () => {\n  if (count > 0) {\n    count--;\n    updateDisplay();\n  }\n});\n\nresetBtn?.addEventListener('click', () => {\n  count = 0;\n  updateDisplay();\n});",
        "language": "html"
      },
      {
        "id": "Q-MUK5KTUA-Q1B2",
        "title": "Dynamic Todo List Application",
        "problemHtml": "<h2>Problem Statement: Dynamic Todo List</h2><p>Create a functional Todo List application where users can add tasks, mark tasks as completed, and remove tasks.</p><h3>Requirements:</h3><ul><li>User types a task inside <code>#taskInput</code> and clicks <code>#addTaskBtn</code> (or presses Enter) to add it.</li><li>Ignore empty or whitespace-only task entries.</li><li>Each new task is appended as a <code>&lt;li&gt;</code> to <code>#taskList</code> with a task title span and a delete button (<code>class=\"delete-btn\"</code>).</li><li>Clicking a task's text toggles the <code>completed</code> class on the task item (striking through the text).</li><li>Clicking the delete button removes the corresponding item from the list.</li><li>Clear the input field and keep it focused after adding a task.</li></ul>",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>Todo List</title>\n</head>\n<body>\n  <main class=\"card\">\n    <h1>My Tasks</h1>\n    <div class=\"input-row\">\n      <input type=\"text\" id=\"taskInput\" placeholder=\"What needs to be done?\" autocomplete=\"off\">\n      <button id=\"addTaskBtn\">Add</button>\n    </div>\n    <ul id=\"taskList\" class=\"task-list\"></ul>\n  </main>\n</body>\n</html>",
        "tests": [],
        "customFonts": [],
        "problemLocked": false,
        "frontEndHtml": "<!doctype html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>Todo List</title>\n</head>\n<body>\n  <main class=\"card\">\n    <h1>My Tasks</h1>\n    <div class=\"input-row\">\n      <input type=\"text\" id=\"taskInput\" placeholder=\"What needs to be done?\" autocomplete=\"off\">\n      <button id=\"addTaskBtn\">Add</button>\n    </div>\n    <ul id=\"taskList\" class=\"task-list\"></ul>\n  </main>\n</body>\n</html>",
        "frontEndCss": "* { box-sizing: border-box; }\nbody {\n  margin: 0;\n  min-height: 100vh;\n  display: grid;\n  place-items: center;\n  font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;\n  background: linear-gradient(135deg, #1e3c72, #2a5298);\n}\n.card {\n  width: min(480px, 92vw);\n  padding: 28px;\n  border-radius: 14px;\n  background: #ffffff;\n  box-shadow: 0 14px 35px rgba(0,0,0,0.2);\n}\nh1 { margin-top: 0; color: #1e293b; font-size: 1.5rem; text-align: center; }\n.input-row {\n  display: flex;\n  gap: 8px;\n  margin-bottom: 20px;\n}\n#taskInput {\n  flex: 1;\n  padding: 10px 14px;\n  border: 1px solid #cbd5e1;\n  border-radius: 8px;\n  font-size: 0.95rem;\n  outline: none;\n}\n#taskInput:focus { border-color: #2563eb; }\n#addTaskBtn {\n  padding: 10px 20px;\n  background: #2563eb;\n  color: white;\n  border: none;\n  border-radius: 8px;\n  font-weight: 600;\n  cursor: pointer;\n}\n.task-list {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n  max-height: 280px;\n  overflow-y: auto;\n}\n.task-item {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 10px 12px;\n  background: #f8fafc;\n  border-radius: 8px;\n  margin-bottom: 8px;\n}\n.task-text {\n  cursor: pointer;\n  flex: 1;\n  word-break: break-word;\n}\n.task-item.completed .task-text {\n  text-decoration: line-through;\n  color: #94a3b8;\n}\n.delete-btn {\n  background: #fee2e2;\n  color: #dc2626;\n  border: none;\n  padding: 6px 10px;\n  border-radius: 6px;\n  cursor: pointer;\n  font-size: 0.85rem;\n}",
        "frontEndJs": "// Write your Todo List JavaScript logic here\nconst taskInput = document.getElementById('taskInput');\nconst addTaskBtn = document.getElementById('addTaskBtn');\nconst taskList = document.getElementById('taskList');\n\nfunction addTask() {\n  const text = taskInput.value.trim();\n  if (!text) return;\n\n  const li = document.createElement('li');\n  li.className = 'task-item';\n  li.innerHTML = `\n    <span class=\"task-text\">${text}</span>\n    <button class=\"delete-btn\">Delete</button>\n  `;\n\n  li.querySelector('.task-text').addEventListener('click', () => {\n    li.classList.toggle('completed');\n  });\n\n  li.querySelector('.delete-btn').addEventListener('click', () => {\n    li.remove();\n  });\n\n  taskList.appendChild(li);\n  taskInput.value = '';\n  taskInput.focus();\n}\n\naddTaskBtn?.addEventListener('click', addTask);\ntaskInput?.addEventListener('keydown', (e) => {\n  if (e.key === 'Enter') addTask();\n});",
        "language": "html"
      },
      {
        "id": "Q-MUK5KUBD-L8LX",
        "title": "Interactive Accordion FAQ Component",
        "problemHtml": "<h2>Problem Statement: Interactive Accordion FAQ</h2><p>Build a responsive FAQ accordion component with collapsible question panels.</p><h3>Requirements:</h3><ul><li>Render at least 3 accordion items inside <code>#accordion</code>.</li><li>Each item contains a header button (<code>class=\"accordion-header\"</code>) and a body panel (<code>class=\"accordion-body\"</code>).</li><li>Clicking an item's header toggles its open/closed state by toggling the <code>active</code> class.</li><li>Only one accordion item should remain expanded at any time (opening an item automatically collapses all other items).</li><li>Include an indicator icon (<code>+</code>/<code>-</code> or arrow) that updates according to the active state.</li></ul>",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>FAQ Accordion</title>\n</head>\n<body>\n  <main class=\"card\">\n    <h1>Frequently Asked Questions</h1>\n    <div id=\"accordion\" class=\"accordion\">\n      <div class=\"accordion-item active\">\n        <button class=\"accordion-header\">\n          <span>What is this assessment platform?</span>\n          <span class=\"icon\">−</span>\n        </button>\n        <div class=\"accordion-body\">\n          <p>This is a live interactive front-end coding environment supporting HTML, CSS, and JS with instant preview.</p>\n        </div>\n      </div>\n      <div class=\"accordion-item\">\n        <button class=\"accordion-header\">\n          <span>How do I submit my answers?</span>\n          <span class=\"icon\">+</span>\n        </button>\n        <div class=\"accordion-body\">\n          <p>When you complete all tasks, click the Finish Assessment button to generate your submission report.</p>\n        </div>\n      </div>\n      <div class=\"accordion-item\">\n        <button class=\"accordion-header\">\n          <span>Are shortcuts enabled during testing?</span>\n          <span class=\"icon\">+</span>\n        </button>\n        <div class=\"accordion-body\">\n          <p>Pressing Tab indents code by two spaces, and Ctrl+Enter triggers an immediate preview refresh.</p>\n        </div>\n      </div>\n    </div>\n  </main>\n</body>\n</html>",
        "tests": [],
        "customFonts": [],
        "problemLocked": false,
        "frontEndHtml": "<!doctype html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>FAQ Accordion</title>\n</head>\n<body>\n  <main class=\"card\">\n    <h1>Frequently Asked Questions</h1>\n    <div id=\"accordion\" class=\"accordion\">\n      <div class=\"accordion-item active\">\n        <button class=\"accordion-header\">\n          <span>What is this assessment platform?</span>\n          <span class=\"icon\">−</span>\n        </button>\n        <div class=\"accordion-body\">\n          <p>This is a live interactive front-end coding environment supporting HTML, CSS, and JS with instant preview.</p>\n        </div>\n      </div>\n      <div class=\"accordion-item\">\n        <button class=\"accordion-header\">\n          <span>How do I submit my answers?</span>\n          <span class=\"icon\">+</span>\n        </button>\n        <div class=\"accordion-body\">\n          <p>When you complete all tasks, click the Finish Assessment button to generate your submission report.</p>\n        </div>\n      </div>\n      <div class=\"accordion-item\">\n        <button class=\"accordion-header\">\n          <span>Are shortcuts enabled during testing?</span>\n          <span class=\"icon\">+</span>\n        </button>\n        <div class=\"accordion-body\">\n          <p>Pressing Tab indents code by two spaces, and Ctrl+Enter triggers an immediate preview refresh.</p>\n        </div>\n      </div>\n    </div>\n  </main>\n</body>\n</html>",
        "frontEndCss": "* { box-sizing: border-box; }\nbody {\n  margin: 0;\n  min-height: 100vh;\n  display: grid;\n  place-items: center;\n  font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;\n  background: linear-gradient(135deg, #0ba360, #3cba92);\n}\n.card {\n  width: min(520px, 92vw);\n  padding: 30px;\n  border-radius: 16px;\n  background: #ffffff;\n  box-shadow: 0 16px 40px rgba(0,0,0,0.15);\n}\nh1 { margin-top: 0; color: #1e293b; font-size: 1.4rem; text-align: center; margin-bottom: 20px; }\n.accordion { display: flex; flex-direction: column; gap: 10px; }\n.accordion-item {\n  border: 1px solid #e2e8f0;\n  border-radius: 8px;\n  overflow: hidden;\n  transition: border-color 0.2s;\n}\n.accordion-item.active { border-color: #0ba360; }\n.accordion-header {\n  width: 100%;\n  padding: 14px 16px;\n  background: #f8fafc;\n  border: none;\n  text-align: left;\n  font-size: 0.95rem;\n  font-weight: 600;\n  color: #334155;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  cursor: pointer;\n}\n.accordion-header:hover { background: #f1f5f9; }\n.accordion-item.active .accordion-header {\n  background: #e6f7ef;\n  color: #0ba360;\n}\n.icon { font-size: 1.2rem; font-weight: bold; }\n.accordion-body {\n  display: none;\n  padding: 14px 16px;\n  background: #ffffff;\n  color: #64748b;\n  font-size: 0.9rem;\n  line-height: 1.5;\n}\n.accordion-item.active .accordion-body {\n  display: block;\n}\n.accordion-body p { margin: 0; }",
        "frontEndJs": "// Write your Accordion JavaScript logic here\nconst items = document.querySelectorAll('.accordion-item');\n\nitems.forEach((item) => {\n  const header = item.querySelector('.accordion-header');\n  header?.addEventListener('click', () => {\n    const isActive = item.classList.contains('active');\n    \n    // Close all items\n    items.forEach((other) => {\n      other.classList.remove('active');\n      const icon = other.querySelector('.icon');\n      if (icon) icon.textContent = '+';\n    });\n\n    // If it was not active, open it\n    if (!isActive) {\n      item.classList.add('active');\n      const icon = item.querySelector('.icon');\n      if (icon) icon.textContent = '−';\n    }\n  });\n});",
        "language": "html"
      },
      {
        "id": "Q-MUK5KUJD-SSFA",
        "title": "Modal Popup Dialog Component",
        "problemHtml": "<h2>Problem Statement: Modal Dialog Popup</h2><p>Build a customizable Modal Dialog window with open, close, and outside-click dismiss functionality.</p><h3>Requirements:</h3><ul><li>A trigger button <code>#openModalBtn</code> that opens the modal dialog.</li><li>The modal backdrop (<code>#modalOverlay</code>) should start hidden (<code>display: none</code> or <code>opacity: 0</code>).</li><li>Clicking <code>#openModalBtn</code> opens the modal with <code>class=\"active\"</code> on <code>#modalOverlay</code>.</li><li>Clicking <code>#closeModalBtn</code> inside the dialog closes the modal.</li><li>Clicking on the background overlay outside <code>#modalBox</code> closes the modal.</li><li>Pressing the <code>Escape</code> key closes the modal if currently open.</li></ul>",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>Modal Popup</title>\n</head>\n<body>\n  <main class=\"card\">\n    <h1>Modal Demo</h1>\n    <p>Click below to test the modal dialog component.</p>\n    <button id=\"openModalBtn\" class=\"btn-primary\">Open Dialog</button>\n  </main>\n\n  <div id=\"modalOverlay\" class=\"modal-overlay\">\n    <div id=\"modalBox\" class=\"modal-box\">\n      <div class=\"modal-header\">\n        <h2>Confirmation</h2>\n        <button id=\"closeModalBtn\" class=\"close-btn\" aria-label=\"Close\">&times;</button>\n      </div>\n      <div class=\"modal-body\">\n        <p>This is an accessible modal popup window. You can close it via the button, clicking outside, or pressing Escape.</p>\n      </div>\n      <div class=\"modal-footer\">\n        <button id=\"confirmModalBtn\" class=\"btn-primary\">Got it!</button>\n      </div>\n    </div>\n  </div>\n</body>\n</html>",
        "tests": [],
        "customFonts": [],
        "problemLocked": false,
        "frontEndHtml": "<!doctype html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>Modal Popup</title>\n</head>\n<body>\n  <main class=\"card\">\n    <h1>Modal Demo</h1>\n    <p>Click below to test the modal dialog component.</p>\n    <button id=\"openModalBtn\" class=\"btn-primary\">Open Dialog</button>\n  </main>\n\n  <div id=\"modalOverlay\" class=\"modal-overlay\">\n    <div id=\"modalBox\" class=\"modal-box\">\n      <div class=\"modal-header\">\n        <h2>Confirmation</h2>\n        <button id=\"closeModalBtn\" class=\"close-btn\" aria-label=\"Close\">&times;</button>\n      </div>\n      <div class=\"modal-body\">\n        <p>This is an accessible modal popup window. You can close it via the button, clicking outside, or pressing Escape.</p>\n      </div>\n      <div class=\"modal-footer\">\n        <button id=\"confirmModalBtn\" class=\"btn-primary\">Got it!</button>\n      </div>\n    </div>\n  </div>\n</body>\n</html>",
        "frontEndCss": "* { box-sizing: border-box; }\nbody {\n  margin: 0;\n  min-height: 100vh;\n  display: grid;\n  place-items: center;\n  font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;\n  background: linear-gradient(135deg, #f093fb, #f5576c);\n}\n.card {\n  width: min(420px, 90vw);\n  padding: 32px;\n  border-radius: 14px;\n  background: #ffffff;\n  text-align: center;\n  box-shadow: 0 14px 35px rgba(0,0,0,0.15);\n}\nh1 { margin-top: 0; color: #1e293b; }\np { color: #64748b; margin-bottom: 24px; }\n.btn-primary {\n  padding: 10px 22px;\n  background: #f5576c;\n  color: white;\n  border: none;\n  border-radius: 8px;\n  font-weight: 600;\n  cursor: pointer;\n}\n.modal-overlay {\n  position: fixed;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.5);\n  display: none;\n  place-items: center;\n  padding: 20px;\n  z-index: 100;\n}\n.modal-overlay.active {\n  display: grid;\n}\n.modal-box {\n  background: #ffffff;\n  border-radius: 12px;\n  width: min(440px, 100%);\n  box-shadow: 0 20px 50px rgba(0,0,0,0.3);\n  overflow: hidden;\n  animation: modalFadeIn 0.2s ease-out;\n}\n@keyframes modalFadeIn {\n  from { opacity: 0; transform: translateY(-16px); }\n  to { opacity: 1; transform: translateY(0); }\n}\n.modal-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 16px 20px;\n  border-bottom: 1px solid #e2e8f0;\n}\n.modal-header h2 { margin: 0; font-size: 1.2rem; color: #1e293b; }\n.close-btn {\n  background: none;\n  border: none;\n  font-size: 1.5rem;\n  cursor: pointer;\n  color: #94a3b8;\n}\n.modal-body { padding: 20px; color: #475569; font-size: 0.95rem; line-height: 1.5; }\n.modal-footer { padding: 14px 20px; background: #f8fafc; text-align: right; border-top: 1px solid #e2e8f0; }",
        "frontEndJs": "// Write your Modal JavaScript logic here\nconst openModalBtn = document.getElementById('openModalBtn');\nconst closeModalBtn = document.getElementById('closeModalBtn');\nconst confirmModalBtn = document.getElementById('confirmModalBtn');\nconst modalOverlay = document.getElementById('modalOverlay');\nconst modalBox = document.getElementById('modalBox');\n\nfunction openModal() {\n  modalOverlay.classList.add('active');\n}\n\nfunction closeModal() {\n  modalOverlay.classList.remove('active');\n}\n\nopenModalBtn?.addEventListener('click', openModal);\ncloseModalBtn?.addEventListener('click', closeModal);\nconfirmModalBtn?.addEventListener('click', closeModal);\n\nmodalOverlay?.addEventListener('click', (e) => {\n  if (e.target === modalOverlay) {\n    closeModal();\n  }\n});\n\ndocument.addEventListener('keydown', (e) => {\n  if (e.key === 'Escape' && modalOverlay?.classList.contains('active')) {\n    closeModal();\n  }\n});",
        "language": "html"
      },
      {
        "id": "Q-MUK5KUOH-3TFH",
        "title": "Dark / Light Theme Toggle Switcher",
        "problemHtml": "<h2>Problem Statement: Dark / Light Theme Toggle</h2><p>Build a responsive Dark / Light theme switcher with persistent styling state and smooth color transitions.</p><h3>Requirements:</h3><ul><li>Add a toggle button <code>#themeToggleBtn</code> that switches between light and dark modes.</li><li>When switched to dark mode, toggle the <code>dark-mode</code> class on <code>document.body</code>.</li><li>Update the button label/icon: show <code>🌙 Dark Mode</code> in light state and <code>☀️ Light Mode</code> in dark state.</li><li>Ensure smooth CSS transitions (<code>0.3s</code>) for background and text colors.</li><li>In Light Mode: page background is <code>#f1f5f9</code>, card background is <code>#ffffff</code>, and text is <code>#0f172a</code>.</li><li>In Dark Mode: page background is <code>#0f172a</code>, card background is <code>#1e293b</code>, and text is <code>#f8fafc</code>.</li></ul>",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>Theme Switcher</title>\n</head>\n<body>\n  <main class=\"card\">\n    <div class=\"card-header\">\n      <h1>Theme Switcher</h1>\n      <button id=\"themeToggleBtn\" class=\"toggle-btn\">🌙 Dark Mode</button>\n    </div>\n    <p class=\"description\">Toggle between sleek light and dark themes with smooth transitions.</p>\n    <div class=\"demo-box\">\n      <h3>Live Feature Card</h3>\n      <p>Clean UI that adapts effortlessly to user theme preferences.</p>\n    </div>\n  </main>\n</body>\n</html>",
        "tests": [],
        "customFonts": [],
        "problemLocked": false,
        "frontEndHtml": "<!doctype html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>Theme Switcher</title>\n</head>\n<body>\n  <main class=\"card\">\n    <div class=\"card-header\">\n      <h1>Theme Switcher</h1>\n      <button id=\"themeToggleBtn\" class=\"toggle-btn\">🌙 Dark Mode</button>\n    </div>\n    <p class=\"description\">Toggle between sleek light and dark themes with smooth transitions.</p>\n    <div class=\"demo-box\">\n      <h3>Live Feature Card</h3>\n      <p>Clean UI that adapts effortlessly to user theme preferences.</p>\n    </div>\n  </main>\n</body>\n</html>",
        "frontEndCss": "* { box-sizing: border-box; }\nbody {\n  margin: 0;\n  min-height: 100vh;\n  display: grid;\n  place-items: center;\n  font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;\n  background-color: #f1f5f9;\n  color: #0f172a;\n  transition: background-color 0.3s ease, color 0.3s ease;\n}\nbody.dark-mode {\n  background-color: #0f172a;\n  color: #f8fafc;\n}\n.card {\n  width: min(480px, 90vw);\n  padding: 30px;\n  border-radius: 16px;\n  background-color: #ffffff;\n  box-shadow: 0 16px 36px rgba(0,0,0,0.1);\n  transition: background-color 0.3s ease, box-shadow 0.3s ease;\n}\nbody.dark-mode .card {\n  background-color: #1e293b;\n  box-shadow: 0 16px 36px rgba(0,0,0,0.4);\n}\n.card-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 16px;\n}\nh1 { margin-top: 0; font-size: 1.4rem; }\n.toggle-btn {\n  padding: 8px 16px;\n  border-radius: 20px;\n  border: 1px solid #cbd5e1;\n  background: #f8fafc;\n  color: #334155;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.2s ease;\n}\nbody.dark-mode .toggle-btn {\n  background: #334155;\n  color: #f8fafc;\n  border-color: #475569;\n}\n.description { color: #64748b; font-size: 0.95rem; margin-bottom: 20px; }\nbody.dark-mode .description { color: #94a3b8; }\n.demo-box {\n  padding: 16px;\n  background: #f8fafc;\n  border-radius: 10px;\n  border: 1px solid #e2e8f0;\n}\nbody.dark-mode .demo-box {\n  background: #0f172a;\n  border-color: #334155;\n}\n.demo-box h3 { margin: 0 0 6px; font-size: 1rem; }\n.demo-box p { margin: 0; font-size: 0.88rem; color: #64748b; }\nbody.dark-mode .demo-box p { color: #94a3b8; }",
        "frontEndJs": "// Write your Theme Toggle JavaScript logic here\nconst themeToggleBtn = document.getElementById('themeToggleBtn');\n\nthemeToggleBtn?.addEventListener('click', () => {\n  const isDark = document.body.classList.toggle('dark-mode');\n  themeToggleBtn.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';\n});",
        "language": "html"
      },
      {
        "id": "Q-MUK5KUTT-D5MB",
        "title": "Digital Stopwatch with Laps",
        "problemHtml": "<h2>Problem Statement: Digital Stopwatch with Laps</h2><p>Build a high-precision digital stopwatch with start, pause, reset, and lap recording functionality.</p><h3>Requirements:</h3><ul><li>Display the time in <code>MM:SS:CS</code> (minutes, seconds, centiseconds/hundredths of a second) format in <code>#timeDisplay</code>.</li><li>Clicking <code>#startBtn</code> starts the timer ticking every 10 milliseconds.</li><li>Clicking <code>#pauseBtn</code> pauses the timer at its current value.</li><li>Clicking <code>#resetBtn</code> stops the timer, resets time to <code>00:00:00</code>, and clears the laps list.</li><li>Clicking <code>#lapBtn</code> records the current timestamp as a new <code>&lt;li&gt;</code> item inside <code>#lapsList</code>.</li><li>Two-digit zero-padding should always be applied for minutes, seconds, and centiseconds (e.g. <code>03:07:09</code>).</li></ul>",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>Digital Stopwatch</title>\n</head>\n<body>\n  <main class=\"card\">\n    <h1>Digital Stopwatch</h1>\n    <div id=\"timeDisplay\" class=\"time-display\">00:00:00</div>\n    <div class=\"controls\">\n      <button id=\"startBtn\" class=\"btn btn-start\">Start</button>\n      <button id=\"pauseBtn\" class=\"btn btn-pause\">Pause</button>\n      <button id=\"lapBtn\" class=\"btn btn-lap\">Lap</button>\n      <button id=\"resetBtn\" class=\"btn btn-reset\">Reset</button>\n    </div>\n    <div class=\"laps-container\">\n      <h3>Lap Times</h3>\n      <ul id=\"lapsList\" class=\"laps-list\"></ul>\n    </div>\n  </main>\n</body>\n</html>",
        "tests": [],
        "customFonts": [],
        "problemLocked": false,
        "frontEndHtml": "<!doctype html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>Digital Stopwatch</title>\n</head>\n<body>\n  <main class=\"card\">\n    <h1>Digital Stopwatch</h1>\n    <div id=\"timeDisplay\" class=\"time-display\">00:00:00</div>\n    <div class=\"controls\">\n      <button id=\"startBtn\" class=\"btn btn-start\">Start</button>\n      <button id=\"pauseBtn\" class=\"btn btn-pause\">Pause</button>\n      <button id=\"lapBtn\" class=\"btn btn-lap\">Lap</button>\n      <button id=\"resetBtn\" class=\"btn btn-reset\">Reset</button>\n    </div>\n    <div class=\"laps-container\">\n      <h3>Lap Times</h3>\n      <ul id=\"lapsList\" class=\"laps-list\"></ul>\n    </div>\n  </main>\n</body>\n</html>",
        "frontEndCss": "* { box-sizing: border-box; }\nbody {\n  margin: 0;\n  min-height: 100vh;\n  display: grid;\n  place-items: center;\n  font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;\n  background: linear-gradient(135deg, #141e30, #243b55);\n}\n.card {\n  width: min(440px, 92vw);\n  padding: 30px;\n  border-radius: 16px;\n  background: #ffffff;\n  text-align: center;\n  box-shadow: 0 16px 40px rgba(0,0,0,0.3);\n}\nh1 { margin-top: 0; color: #1e293b; font-size: 1.4rem; }\n.time-display {\n  font-family: 'Consolas', 'Courier New', monospace;\n  font-size: 3rem;\n  font-weight: 700;\n  color: #0f172a;\n  margin: 20px 0;\n  letter-spacing: 2px;\n}\n.controls {\n  display: flex;\n  gap: 8px;\n  justify-content: center;\n  margin-bottom: 20px;\n}\n.btn {\n  padding: 9px 16px;\n  border: none;\n  border-radius: 8px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: opacity 0.2s;\n}\n.btn:hover { opacity: 0.9; }\n.btn-start { background: #10b981; color: white; }\n.btn-pause { background: #f59e0b; color: white; }\n.btn-lap { background: #3b82f6; color: white; }\n.btn-reset { background: #ef4444; color: white; }\n.laps-container {\n  text-align: left;\n  border-top: 1px solid #e2e8f0;\n  padding-top: 14px;\n}\n.laps-container h3 { margin: 0 0 10px; font-size: 0.95rem; color: #64748b; }\n.laps-list {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n  max-height: 140px;\n  overflow-y: auto;\n}\n.laps-list li {\n  display: flex;\n  justify-content: space-between;\n  padding: 6px 10px;\n  font-family: 'Consolas', monospace;\n  font-size: 0.9rem;\n  background: #f8fafc;\n  border-radius: 6px;\n  margin-bottom: 4px;\n}",
        "frontEndJs": "// Write your Stopwatch JavaScript logic here\nlet startTime = 0;\nlet elapsedTime = 0;\nlet timerInterval = null;\nlet lapCount = 0;\n\nconst timeDisplay = document.getElementById('timeDisplay');\nconst startBtn = document.getElementById('startBtn');\nconst pauseBtn = document.getElementById('pauseBtn');\nconst lapBtn = document.getElementById('lapBtn');\nconst resetBtn = document.getElementById('resetBtn');\nconst lapsList = document.getElementById('lapsList');\n\nfunction formatTime(ms) {\n  const minutes = Math.floor(ms / 60000);\n  const seconds = Math.floor((ms % 60000) / 1000);\n  const centis = Math.floor((ms % 1000) / 10);\n  return (\n    String(minutes).padStart(2, '0') + ':' +\n    String(seconds).padStart(2, '0') + ':' +\n    String(centis).padStart(2, '0')\n  );\n}\n\nstartBtn?.addEventListener('click', () => {\n  if (timerInterval) return;\n  startTime = Date.now() - elapsedTime;\n  timerInterval = setInterval(() => {\n    elapsedTime = Date.now() - startTime;\n    timeDisplay.textContent = formatTime(elapsedTime);\n  }, 10);\n});\n\npauseBtn?.addEventListener('click', () => {\n  clearInterval(timerInterval);\n  timerInterval = null;\n});\n\nresetBtn?.addEventListener('click', () => {\n  clearInterval(timerInterval);\n  timerInterval = null;\n  elapsedTime = 0;\n  lapCount = 0;\n  timeDisplay.textContent = '00:00:00';\n  lapsList.innerHTML = '';\n});\n\nlapBtn?.addEventListener('click', () => {\n  if (elapsedTime === 0) return;\n  lapCount++;\n  const li = document.createElement('li');\n  li.innerHTML = `<span>Lap ${lapCount}</span><span>${formatTime(elapsedTime)}</span>`;\n  lapsList.prepend(li);\n});",
        "language": "html"
      },
      {
        "id": "Q-MUK5KVXL-VFVN",
        "title": "Live Character and Word Counter",
        "problemHtml": "<h2>Problem Statement: Live Character & Word Counter</h2><p>Build a real-time character, word, and limit tracker with dynamic progress feedback.</p><h3>Requirements:</h3><ul><li>Provide a <code>&lt;textarea id=\"textInput\" maxlength=\"200\"&gt;</code> for text input.</li><li>Update character count inside <code>#charCount</code> live as the user types (format: <code>X / 200</code>).</li><li>Calculate and display word count in <code>#wordCount</code> (correctly handling empty strings and consecutive whitespaces).</li><li>Update the width of <code>#progressBar</code> dynamically from <code>0%</code> to <code>100%</code> based on remaining character capacity.</li><li>When remaining characters are 15 or fewer, add <code>class=\"warning\"</code> to the progress bar and character count to highlight in red/amber.</li></ul>",
        "code": "<!doctype html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>Character & Word Counter</title>\n</head>\n<body>\n  <main class=\"card\">\n    <h1>Text Analyzer</h1>\n    <textarea id=\"textInput\" maxlength=\"200\" placeholder=\"Type or paste your text here...\"></textarea>\n    <div class=\"progress-track\">\n      <div id=\"progressBar\" class=\"progress-fill\"></div>\n    </div>\n    <div class=\"stats-row\">\n      <span>Words: <strong id=\"wordCount\">0</strong></span>\n      <span>Characters: <strong id=\"charCount\">0 / 200</strong></span>\n    </div>\n  </main>\n</body>\n</html>",
        "tests": [],
        "customFonts": [],
        "problemLocked": false,
        "frontEndHtml": "<!doctype html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>Character & Word Counter</title>\n</head>\n<body>\n  <main class=\"card\">\n    <h1>Text Analyzer</h1>\n    <textarea id=\"textInput\" maxlength=\"200\" placeholder=\"Type or paste your text here...\"></textarea>\n    <div class=\"progress-track\">\n      <div id=\"progressBar\" class=\"progress-fill\"></div>\n    </div>\n    <div class=\"stats-row\">\n      <span>Words: <strong id=\"wordCount\">0</strong></span>\n      <span>Characters: <strong id=\"charCount\">0 / 200</strong></span>\n    </div>\n  </main>\n</body>\n</html>",
        "frontEndCss": "* { box-sizing: border-box; }\nbody {\n  margin: 0;\n  min-height: 100vh;\n  display: grid;\n  place-items: center;\n  font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;\n  background: linear-gradient(135deg, #43e97b, #38f9d7);\n}\n.card {\n  width: min(500px, 92vw);\n  padding: 30px;\n  border-radius: 16px;\n  background: #ffffff;\n  box-shadow: 0 16px 40px rgba(0,0,0,0.15);\n}\nh1 { margin-top: 0; color: #1e293b; font-size: 1.4rem; text-align: center; }\n#textInput {\n  width: 100%;\n  height: 140px;\n  padding: 14px;\n  border: 1px solid #cbd5e1;\n  border-radius: 10px;\n  font-size: 0.95rem;\n  font-family: inherit;\n  resize: vertical;\n  outline: none;\n  transition: border-color 0.2s;\n}\n#textInput:focus { border-color: #38f9d7; }\n.progress-track {\n  height: 6px;\n  background: #e2e8f0;\n  border-radius: 3px;\n  margin: 12px 0;\n  overflow: hidden;\n}\n.progress-fill {\n  height: 100%;\n  width: 0%;\n  background: #10b981;\n  transition: width 0.15s ease, background 0.2s ease;\n}\n.progress-fill.warning {\n  background: #ef4444;\n}\n.stats-row {\n  display: flex;\n  justify-content: space-between;\n  font-size: 0.9rem;\n  color: #64748b;\n}\n.stats-row strong.warning {\n  color: #ef4444;\n}",
        "frontEndJs": "// Write your Character and Word Counter logic here\nconst textInput = document.getElementById('textInput');\nconst charCount = document.getElementById('charCount');\nconst wordCount = document.getElementById('wordCount');\nconst progressBar = document.getElementById('progressBar');\nconst MAX_CHARS = 200;\n\ntextInput?.addEventListener('input', () => {\n  const text = textInput.value;\n  const chars = text.length;\n  \n  // Count words\n  const trimmed = text.trim();\n  const words = trimmed ? trimmed.split(/\\s+/).length : 0;\n  \n  // Calculate percent\n  const percent = Math.min(100, (chars / MAX_CHARS) * 100);\n  const isNearLimit = MAX_CHARS - chars <= 15;\n  \n  charCount.textContent = `${chars} / ${MAX_CHARS}`;\n  wordCount.textContent = words;\n  progressBar.style.width = `${percent}%`;\n  \n  progressBar.classList.toggle('warning', isNearLimit);\n  charCount.classList.toggle('warning', isNearLimit);\n});",
        "language": "html"
      }
    ]
  }
};

function ensureFrontFields(x){
  if(!x)return;
  x.frontEndHtml=x.frontEndHtml!==undefined?x.frontEndHtml:(x.code!==undefined?x.code:'');
  x.frontEndCss=x.frontEndCss!==undefined?x.frontEndCss:'';
  x.frontEndJs=x.frontEndJs!==undefined?x.frontEndJs:'';
  x.code=x.frontEndHtml;
  x.language='html';
  if(x.problemHtml===undefined)x.problemHtml=x.problem||'';
  if(!Array.isArray(x.tests))x.tests=[];
  if(!Array.isArray(x.customFonts))x.customFonts=[];
}

function getDefaultAssessmentState(){
  const clone = JSON.parse(JSON.stringify(SAMPLE_MOCK_DATA.assessment));
  clone.questions.forEach(ensureFrontFields);
  return clone;
}

function getEmptyAssessmentState(){
  return {
    format: 'frontend-assessment-set',
    version: 2,
    setId: `SET-${Date.now().toString(36).toUpperCase()}`,
    title: 'Front-End Assessment',
    timerMinutes: 60,
    questions: [starter()]
  };
}

const starter = () => ({
  id: uid(),
  title: 'Question',
  problemHtml: '',
  code: '',
  frontEndHtml: '',
  frontEndCss: '',
  frontEndJs: '',
  language: 'html',
  tests: [],
  customFonts: [],
  problemLocked: false
});

let state = getEmptyAssessmentState(), current = 0, history = [], remaining = 3600, timerHandle;
const code=$('code'),problem=$('problem'),lines=$('lines');function q(){return state.questions[current]}function esc(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}function toast(m){let t=$('toast');t.textContent=m;t.classList.add('show');clearTimeout(t.x);t.x=setTimeout(()=>t.classList.remove('show'),1700)}
function isVeryDarkColor(colorStr){if(!colorStr)return false;const s=String(colorStr).trim().toLowerCase();if(s==='black'||s==='#000'||s==='#000000'||s==='windowtext'||s==='#0f172a'||s==='#1e293b'||s==='#111827'||s==='#0a0a0a'||s==='#1a1a1a'||s==='#222'||s==='#222222'||s==='#333'||s==='#333333')return true;const rgb=s.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);if(rgb){const r=parseInt(rgb[1],10),g=parseInt(rgb[2],10),b=parseInt(rgb[3],10);const lum=0.299*r+0.587*g+0.114*b;return lum<85}if(s.startsWith('#')){let hex=s.slice(1);if(hex.length===3)hex=hex.split('').map(c=>c+c).join('');if(hex.length===6){const r=parseInt(hex.slice(0,2),16),g=parseInt(hex.slice(2,4),16),b=parseInt(hex.slice(4,6),16);const lum=0.299*r+0.587*g+0.114*b;return lum<85}}return false}
function syncQuestionDarkText(){const prob=$('problem');if(!prob)return;const isDark=document.body.classList.contains('dark');const elements=prob.querySelectorAll('[style*="color" i], font[color], font');elements.forEach(el=>{const col=el.style.color||el.getAttribute('color')||'';if(!col){if(el.tagName.toLowerCase()==='font')el.classList.toggle('dark-mode-white-text',isDark);return}if(isVeryDarkColor(col)){el.classList.toggle('dark-mode-white-text',isDark)}else{el.classList.remove('dark-mode-white-text')}})}
function applyFonts(x){(x.customFonts||[]).forEach(f=>{if(!document.getElementById('font-'+f.id)){let s=document.createElement('style');s.id='font-'+f.id;s.textContent=`@font-face{font-family:${JSON.stringify(f.name)};src:url(${JSON.stringify(f.data)})}`;document.head.appendChild(s)}if(![...$('fontName').options].some(o=>o.value===f.name)){$('fontName').add(new Option(f.name,f.name))}})}function saveCurrent(){let x=q();if(!x)return;x.problemHtml=problem.innerHTML;x.code=code.value;save()}function save(){localStorage.setItem('assessment-rich-v3',JSON.stringify(state));$('saveState').textContent='Saved just now'}
function load(){try{let s=JSON.parse(localStorage.getItem('assessment-rich-v3'));if(s?.questions?.length){state=s}else{state=getEmptyAssessmentState()}}catch(e){state=getEmptyAssessmentState()};state.questions.forEach(ensureFrontFields);$('setIdText').textContent=state.setId;$('timerMinutes').value=state.timerMinutes||60;openQuestion(0);setTimer(false);syncQuestionDarkText()}function openQuestion(i){current=i;let x=q();if(!x.problemHtml&&x.problem)x.problemHtml=`<p>${esc(x.problem).replace(/\n/g,'<br>')}</p>`;x.customFonts=x.customFonts||[];applyFonts(x);problem.innerHTML=x.problemHtml||'';syncQuestionDarkText();code.value=x.code||'';$('questionTitle').textContent=`Question ${i+1}`;$('questionId').textContent=x.id;updateLines();renderTests();renderSteps()}function renderSteps(){$('steps').innerHTML=state.questions.map((x,i)=>`<button class="${i===current?'active':''}" onclick="go(${i})">${i+1}</button>`).join('');$('prev').disabled=current===0;$('next').disabled=current===state.questions.length-1}window.go=i=>{saveCurrent();openQuestion(i)};
$('addQuestion').onclick=()=>{saveCurrent();state.questions.push(starter());openQuestion(state.questions.length-1);save()};$('prev').onclick=()=>current&&go(current-1);$('next').onclick=()=>current<state.questions.length-1&&go(current+1);$('deleteQuestion').onclick=()=>{if(state.questions.length<2)return toast('At least one question is required');if(confirm('Delete this question?')){state.questions.splice(current,1);openQuestion(Math.min(current,state.questions.length-1));save()}};
let debounce;problem.oninput=code.oninput=()=>{updateLines();syncQuestionDarkText();clearTimeout(debounce);debounce=setTimeout(saveCurrent,400)};problem.addEventListener('paste',async e=>{let items=[...(e.clipboardData?.items||[])],media=items.find(x=>x.type.startsWith('image/')||x.type.startsWith('video/'));if(media){e.preventDefault();insertFile(media.getAsFile())}setTimeout(syncQuestionDarkText,50)});function updateLines(){lines.textContent=Array.from({length:code.value.split('\n').length},(_,i)=>i+1).join('\n');lines.scrollTop=code.scrollTop}code.onscroll=()=>lines.scrollTop=code.scrollTop;code.onkeydown=e=>{if(e.key==='Tab'){e.preventDefault();code.setRangeText('    ',code.selectionStart,code.selectionEnd,'end');updateLines()}if((e.ctrlKey||e.metaKey)&&e.key==='Enter'){e.preventDefault();runAll()}};
function keepFocus(){problem.focus()}document.querySelectorAll('[data-cmd]').forEach(b=>b.onclick=()=>{keepFocus();document.execCommand(b.dataset.cmd,false,null);syncQuestionDarkText();saveCurrent()});$('styleFormat').onchange=e=>{keepFocus();document.execCommand('formatBlock',false,e.target.value);syncQuestionDarkText();saveCurrent()};$('fontName').onchange=e=>{keepFocus();document.execCommand('fontName',false,e.target.value);syncQuestionDarkText();saveCurrent()};$('fontSize').onchange=e=>{keepFocus();document.execCommand('fontSize',false,e.target.value);syncQuestionDarkText();saveCurrent()};$('foreColor').oninput=e=>{keepFocus();document.execCommand('foreColor',false,e.target.value);syncQuestionDarkText();saveCurrent()};$('backColor').oninput=e=>{keepFocus();document.execCommand('hiliteColor',false,e.target.value);syncQuestionDarkText();saveCurrent()};$('clearFormat').onclick=()=>{keepFocus();document.execCommand('removeFormat');syncQuestionDarkText();saveCurrent()};$('linkBtn').onclick=()=>{let u=prompt('Enter link URL:','https://');if(u){keepFocus();document.execCommand('createLink',false,u);syncQuestionDarkText();saveCurrent()}};
function insertHtml(html){problem.focus();document.execCommand('insertHTML',false,html);syncQuestionDarkText();saveCurrent()}function readData(file){return new Promise((res,rej)=>{let r=new FileReader();r.onload=()=>res(r.result);r.onerror=rej;r.readAsDataURL(file)})}async function insertFile(file){if(!file)return;if(file.size>25*1024*1024&&!confirm('This media file is larger than 25 MB and will make exports very large. Continue?'))return;let data=await readData(file),safe=esc(file.name);if(file.type.startsWith('image/'))insertHtml(`<figure><img src="${data}" alt="${safe}"><figcaption>${safe}</figcaption></figure>`);else if(file.type.startsWith('video/'))insertHtml(`<figure><video controls src="${data}"></video><figcaption>${safe}</figcaption></figure>`);else toast('Unsupported media file')}$('insertImage').onclick=()=>{$('mediaFile').accept='image/*,.gif';$('mediaFile').click()};$('insertVideo').onclick=()=>{$('mediaFile').accept='video/*';$('mediaFile').click()};$('mediaFile').onchange=e=>{insertFile(e.target.files[0]);e.target.value=''};$('insertFont').onclick=()=>$('fontFile').click();$('fontFile').onchange=async e=>{let f=e.target.files[0];if(!f)return;let name=prompt('Font display name:',f.name.replace(/\.[^.]+$/,''));if(!name)return;let obj={id:Date.now().toString(36),name,data:await readData(f),fileName:f.name};q().customFonts.push(obj);applyFonts(q());$('fontName').value=name;problem.focus();document.execCommand('fontName',false,name);syncQuestionDarkText();saveCurrent();toast('Font embedded in this question');e.target.value=''};
function toggleProblemFullscreen(force) {
    const panel = $('problemPanel');
    if (!panel) return;
    const targetState = typeof force === 'boolean' ? force : !panel.classList.contains('full');
    panel.classList.toggle('full', targetState);
    const btn = $('problemFullscreen');
    if (btn) btn.textContent = targetState ? '✕ Exit Full Screen' : '⛶ Full Screen';
    document.body.classList.toggle('problem-fullscreen-active', targetState);
    if (targetState) {
        window.scrollTo(0, 0);
    }
}
function toggleCodeFullscreen(force) {
    const card = document.querySelector('.frontend-editor-card') || document.querySelector('.editor-card');
    if (!card) return;
    const targetState = typeof force === 'boolean' ? force : !card.classList.contains('full');
    card.classList.toggle('full', targetState);
    const btn = $('codeFullscreen');
    if (btn) btn.textContent = targetState ? '✕ Exit Full Screen' : '⛶ Full Screen';
    document.body.classList.toggle('code-fullscreen-active', targetState);
    if (targetState) {
        window.scrollTo(0, 0);
    }
    if (typeof updateFrontLines === 'function') updateFrontLines();
    if (typeof updateLines === 'function') updateLines();
}
function toggleResultFullscreen(force) {
    const targetState = typeof force === 'boolean' ? force : !document.body.classList.contains('result-fullscreen');
    document.body.classList.toggle('result-fullscreen', targetState);
    const btn = $('resultFullscreen');
    if (btn) btn.textContent = targetState ? '✕ Restore' : '⛶ Maximize';
    if (targetState) {
        window.scrollTo(0, 0);
    }
}
if ($('problemFullscreen')) $('problemFullscreen').onclick = () => toggleProblemFullscreen();

function isBrowserFullscreen() {
    return !!(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement);
}

async function enterBrowserFullscreen() {
    const el = document.documentElement;
    try {
        if (el.requestFullscreen) {
            await el.requestFullscreen();
        } else if (el.webkitRequestFullscreen) {
            await el.webkitRequestFullscreen();
        } else if (el.mozRequestFullScreen) {
            await el.mozRequestFullScreen();
        } else if (el.msRequestFullscreen) {
            await el.msRequestFullscreen();
        }
    } catch (err) {
        // Fallback gracefully to CSS workspace fullscreen
    }
}

async function exitBrowserFullscreen() {
    try {
        if (isBrowserFullscreen()) {
            if (document.exitFullscreen) {
                await document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                await document.webkitExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                await document.mozCancelFullScreen();
            } else if (document.msExitFullscreen) {
                await document.msExitFullscreen();
            }
        }
    } catch (err) {
        // Handle exit error
    }
}

async function toggleWorkspaceFullscreen(force) {
    const isCurrentlyFull = document.body.classList.contains('workspace-fullscreen-active') || isBrowserFullscreen();
    const targetState = typeof force === 'boolean' ? force : !isCurrentlyFull;
    document.body.classList.toggle('workspace-fullscreen-active', targetState);
    const btn = $('workspaceFullscreen');
    if (btn) {
        btn.textContent = targetState ? '✕ Exit Full Screen' : '⛶ Full Screen';
    }
    
    if (targetState) {
        await enterBrowserFullscreen();
        toast('Workspace Full Screen Active (Fn+F11 desktop mode) · Esc to exit');
    } else {
        await exitBrowserFullscreen();
        toast('Exited Full Screen');
    }

    if (typeof updateFrontLines === 'function') updateFrontLines();
    if (typeof updateLines === 'function') updateLines();
}

if ($('workspaceFullscreen')) {
    $('workspaceFullscreen').onclick = () => toggleWorkspaceFullscreen();
}
if ($('exitWorkspaceFullscreen')) {
    $('exitWorkspaceFullscreen').onclick = () => toggleWorkspaceFullscreen(false);
}

const syncFullscreenState = () => {
    const isFull = isBrowserFullscreen();
    if (!isFull && document.body.classList.contains('workspace-fullscreen-active')) {
        document.body.classList.remove('workspace-fullscreen-active');
        const btn = $('workspaceFullscreen');
        if (btn) btn.textContent = '⛶ Full Screen';
        if (typeof updateFrontLines === 'function') updateFrontLines();
        if (typeof updateLines === 'function') updateLines();
    }
};

document.addEventListener('fullscreenchange', syncFullscreenState);
document.addEventListener('webkitfullscreenchange', syncFullscreenState);
document.addEventListener('mozfullscreenchange', syncFullscreenState);
document.addEventListener('MSFullscreenChange', syncFullscreenState);

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (document.body.classList.contains('workspace-fullscreen-active')) {
            toggleWorkspaceFullscreen(false);
        }
        if (document.body.classList.contains('problem-fullscreen-active')) {
            toggleProblemFullscreen(false);
        }
        if (document.body.classList.contains('code-fullscreen-active')) {
            toggleCodeFullscreen(false);
        }
        if (document.body.classList.contains('result-fullscreen')) {
            toggleResultFullscreen(false);
        }
    }
});

if ($('codeFullscreen')) {
    $('codeFullscreen').onclick = () => toggleCodeFullscreen();
}

if ($('resultFullscreen')) {
    $('resultFullscreen').onclick = () => toggleResultFullscreen();
}
function renderTests(){$('testCount').textContent=q().tests.length;$('testList').innerHTML=q().tests.map((t,i)=>`<div class="test-card"><div class="test-head"><b>Test Case ${i+1}</b><span><span id="badge${i}" class="badge">Not run</span><button class="delete" onclick="removeTest(${i})">✕</button></span></div><div class="test-grid"><div class="field"><label>INPUT</label><textarea oninput="setTest(${i},'input',this.value)">${esc(t.input)}</textarea></div><div class="field"><label>EXPECTED OUTPUT</label><textarea oninput="setTest(${i},'expected',this.value)">${esc(t.expected)}</textarea></div><div class="field actual"><label>ACTUAL OUTPUT</label><textarea id="actual${i}" readonly></textarea></div></div></div>`).join('')}window.setTest=(i,k,v)=>{q().tests[i][k]=v;save()};window.removeTest=i=>{q().tests.splice(i,1);renderTests();save()};$('addTest').onclick=()=>{q().tests.push({input:'',expected:''});renderTests();save()};async function execute(input){let r=await fetch('/api/run',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({code:code.value,input})});return r.json()}function norm(s){return String(s).replace(/\r\n/g,'\n').trimEnd()}function busy(v){$('runTests').disabled=$('runCustom').disabled=v;$('runTests').textContent=v?'Running...':'Compile and Test'}
async function runAll(){saveCurrent();if(!q().tests.length)return toast('Add a test case');busy(true);document.querySelector('[data-tab=tests]').click();let pass=0;for(let i=0;i<q().tests.length;i++){let b=$('badge'+i);b.textContent='Running...';try{let d=await execute(q().tests[i].input),ok=d.ok&&norm(d.output)===norm(q().tests[i].expected);$('actual'+i).value=(d.output||'')+(d.error||'');b.textContent=ok?'Passed':'Failed';b.className='badge '+(ok?'pass':'fail');pass+=ok?1:0}catch(e){b.textContent='Runner error';b.className='badge fail'}}history.unshift({id:q().id,result:`${pass}/${q().tests.length} passed`,time:new Date().toLocaleTimeString()});renderHistory();busy(false);if(pass===q().tests.length)celebrate();else tryAgain(pass,q().tests.length)}async function runCustom(){busy(true);let input=$('customToggle').checked?(prompt('Enter custom input:','')||''):'';try{let d=await execute(input);showOutput((d.output||'')+(d.error?'\n'+d.error:''))}catch(e){showOutput('Cannot connect. Start server.py.')}busy(false)}function showOutput(t){document.querySelector('[data-tab=execution]').click();$('empty').hidden=true;$('console').hidden=false;$('console').textContent=t}function renderHistory(){$('historyList').innerHTML=history.map(h=>`<div class="history-row"><b>${esc(h.id)} · ${esc(h.result)}</b><span>${h.time}</span></div>`).join('')}$('runTests').onclick=runAll;$('runCustom').onclick=runCustom;
function overlay(text,wrong=false){let o=$('resultOverlay');o.className='result-overlay show'+(wrong?' wrong':'');$('resultCard').textContent=text;setTimeout(()=>o.className='result-overlay',2600)}function tryAgain(p,n){overlay(`Try again · ${p}/${n} passed`,true)}function celebrate(){overlay('🎉 Excellent! All test cases passed! 🎉');let c=$('confetti'),x=c.getContext('2d');c.width=innerWidth;c.height=innerHeight;let pieces=Array.from({length:150},()=>({x:Math.random()*c.width,y:-20-Math.random()*c.height*.5,v:2+Math.random()*5,r:3+Math.random()*6,a:Math.random()*6.28,col:['#ff4d6d','#ffd60a','#22c55e','#3b82f6','#a855f7'][Math.floor(Math.random()*5)]})),start=performance.now();(function draw(t){x.clearRect(0,0,c.width,c.height);pieces.forEach(p=>{p.y+=p.v;p.x+=Math.sin(p.a+=.08)*1.5;x.fillStyle=p.col;x.fillRect(p.x,p.y,p.r,p.r*1.7)});if(t-start<2400)requestAnimationFrame(draw)})(start)}
function download(blob,name){let a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),2000)}$('exportQuestion').onclick=()=>{saveCurrent();download(new Blob([JSON.stringify({format:'python-assessment-rich-question',version:2,question:q()},null,2)],{type:'application/json'}),`${q().id}.question.json`)};$('importQuestion').onclick=()=>$('questionFile').click();$('questionFile').onchange=async e=>{try{let d=JSON.parse(await e.target.files[0].text()),x=d.question||d;if(!x.id||!Array.isArray(x.tests))throw Error();saveCurrent();let i=state.questions.findIndex(v=>v.id===x.id);if(i>=0)state.questions[i]=x;else{state.questions.push(x);i=state.questions.length-1}openQuestion(i);save();toast('Question imported with embedded media and fonts')}catch(err){toast('Invalid question file')}e.target.value=''};$('exportSet').onclick=async()=>{saveCurrent();let r=await fetch('/api/export-set',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(state)});download(await r.blob(),`${state.setId}.zip`)};$('importSet').onclick=()=>$('setFile').click();$('setFile').onchange=async e=>{try{let arr=new Uint8Array(await e.target.files[0].arrayBuffer()),bin='';for(let b of arr)bin+=String.fromCharCode(b);let r=await fetch('/api/import-set',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({base64:btoa(bin)})}),d=await r.json();if(!d.ok)throw Error(d.error);state={...state,...d.manifest,questions:d.questions};$('setIdText').textContent=state.setId;$('timerMinutes').value=state.timerMinutes||60;openQuestion(0);setTimer(false);save();toast('Full set imported')}catch(err){toast(err.message||'Invalid ZIP')}e.target.value=''};
function setTimer(show=true){state.timerMinutes=Math.max(1,parseInt($('timerMinutes').value)||60);remaining=state.timerMinutes*60;clearInterval(timerHandle);tick();timerHandle=setInterval(()=>{remaining--;tick();if(remaining<=0){clearInterval(timerHandle);$('timeoutModal').classList.add('show')}},1000);save();if(show)toast('Timer set')}function tick(){let h=String(Math.floor(remaining/3600)).padStart(2,'0'),m=String(Math.floor(remaining%3600/60)).padStart(2,'0'),s=String(Math.max(0,remaining%60)).padStart(2,'0');const formatted=`${h}:${m}:${s}`;const tEl=$('timer');if(tEl)tEl.textContent=formatted;const finishBtn=$('finishAssessment');if(finishBtn){if(document.body.classList.contains('candidate-running')){finishBtn.innerHTML=`<span class="finish-timer-badge">⏱ ${formatted}</span><span class="finish-divider">|</span><span>Finish Assessment</span>`}else{finishBtn.textContent='Finish Assessment'}}}$('setTimer').onclick=()=>setTimer();document.querySelectorAll('.tabs button').forEach(b=>b.onclick=()=>{document.querySelectorAll('.tabs button,.tab').forEach(x=>x.classList.remove('active'));b.classList.add('active');$(b.dataset.tab).classList.add('active')});$('fontUp').onclick=()=>font(1);$('fontDown').onclick=()=>font(-1);function font(d){let s=parseInt(getComputedStyle(code).fontSize)+d;code.style.fontSize=Math.max(11,Math.min(22,s))+'px';lines.style.fontSize=code.style.fontSize}function initThemeHandler(){const saved=localStorage.getItem('fend_theme_mode');if(saved==='dark'){document.body.classList.add('dark')}const btn=$('theme');const syncText=()=>{if(btn){btn.textContent=document.body.classList.contains('dark')?'☀️ Light':'☾ Dark'}};syncText();const toggle=(e)=>{if(e&&e.type==='touchstart'){e.preventDefault()}document.body.classList.toggle('dark');const isDark=document.body.classList.contains('dark');localStorage.setItem('fend_theme_mode',isDark?'dark':'light');syncText();syncQuestionDarkText();if(typeof refreshFrontPreview==='function'){refreshFrontPreview()}};if(btn){btn.onclick=toggle;btn.addEventListener('touchstart',toggle,{passive:false})}syncQuestionDarkText()}initThemeHandler();load();
/* v4: rich media selection/deletion, undo/redo, and sequential reports */
let selectedMedia=null;
problem.addEventListener('click',e=>{const m=e.target.closest('video,img,figure');if(selectedMedia)selectedMedia.classList.remove('selected-media');selectedMedia=m;if(m)m.classList.add('selected-media')});
problem.addEventListener('contextmenu',e=>{const m=e.target.closest('video,img,figure');if(!m)return;e.preventDefault();if(selectedMedia)selectedMedia.classList.remove('selected-media');selectedMedia=m;m.classList.add('selected-media');const menu=$('mediaContext');menu.style.left=Math.min(e.clientX,innerWidth-170)+'px';menu.style.top=Math.min(e.clientY,innerHeight-70)+'px';menu.classList.add('show')});
document.addEventListener('click',e=>{if(!e.target.closest('#mediaContext')&&!e.target.closest('#problem'))$('mediaContext').classList.remove('show')});
function removeSelectedMedia(){if(!selectedMedia)return;let target=selectedMedia.closest('figure')||selectedMedia;target.remove();selectedMedia=null;$('mediaContext').classList.remove('show');saveCurrent();toast('Media deleted')}
$('deleteMedia').onclick=removeSelectedMedia;
problem.addEventListener('keydown',e=>{if((e.key==='Delete'||e.key==='Backspace')&&selectedMedia){e.preventDefault();removeSelectedMedia()}});
$('problemUndo').onclick=()=>{problem.focus();document.execCommand('undo');syncQuestionDarkText();saveCurrent()};
$('problemRedo').onclick=()=>{problem.focus();document.execCommand('redo');syncQuestionDarkText();saveCurrent()};
function reportPayload(){saveCurrent();return {state,history};}
function safeName(n){return String(n||'assessment').replace(/[^a-z0-9._-]+/gi,'-')}
function exportDownload(endpoint,name){fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(reportPayload())}).then(async r=>{if(!r.ok)throw Error(await r.text());download(await r.blob(),name)}).catch(e=>toast('Export failed: '+e.message))}
$('exportHtml').onclick=()=>exportDownload('/api/export-html',safeName(state.setId)+'-report.html');
$('exportPdf').onclick=()=>exportDownload('/api/export-pdf',safeName(state.setId)+'-report.pdf');
$('exportWord').onclick=()=>exportDownload('/api/export-word',safeName(state.setId)+'-report.docx');

/* v5 stable question selector */
const questionPicker=$('questionPicker'),questionPalette=$('questionPalette');
questionPicker.onclick=e=>{e.stopPropagation();const open=questionPalette.classList.toggle('show');questionPicker.setAttribute('aria-expanded',String(open))};
questionPalette.onclick=e=>e.stopPropagation();
document.addEventListener('click',()=>{questionPalette.classList.remove('show');questionPicker.setAttribute('aria-expanded','false')});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){questionPalette.classList.remove('show');questionPicker.setAttribute('aria-expanded','false')}});
const originalRenderSteps=renderSteps;
renderSteps=function(){
  originalRenderSteps();
  $('currentQuestionLabel').textContent=`Question ${current+1} of ${state.questions.length}`;
  $('questionTotal').textContent=`${state.questions.length} question${state.questions.length===1?'':'s'}`;
  [...$('steps').querySelectorAll('button')].forEach((button,index)=>{button.textContent=index+1;button.title=`Open Question ${index+1} · ${state.questions[index].id}`;button.addEventListener('click',()=>{questionPalette.classList.remove('show');questionPicker.setAttribute('aria-expanded','false')})});
};
renderSteps();

/* v7 reliable run/test flow */
async function runCurrentMode(){
  if(!$('customToggle').checked){
    await runAll();
    return;
  }
  busy(true);
  try{
    const input=prompt('Enter custom input. Use line breaks for multiple values:','');
    if(input===null){busy(false);return;}
    const d=await execute(input);
    const text=(d.output||'')+(d.error?'\n'+d.error:'');
    showOutput(text.trim()?text:'Program completed successfully, but produced no output.');
  }catch(e){
    showOutput('Runner connection failed. Start the application with start.bat and try again.');
  }finally{busy(false)}
}
$('runCustom').onclick=runCurrentMode;
$('runCustom').textContent='Run';
// Harden the test runner so all failures remain visible and feedback always appears.
runAll=async function(){
  saveCurrent();
  if(!q().tests.length){toast('Add at least one test case');return;}
  busy(true);
  document.querySelector('[data-tab="tests"]').click();
  let pass=0;
  try{
    for(let i=0;i<q().tests.length;i++){
      const b=$('badge'+i), actual=$('actual'+i);
      b.className='badge'; b.textContent='Running...'; actual.value='Running...';
      try{
        const d=await execute(q().tests[i].input);
        const output=d.output||'';
        actual.value=output+(d.error?'\n'+d.error:'');
        const ok=!!d.ok&&norm(output)===norm(q().tests[i].expected);
        b.textContent=ok?'Passed':'Failed'; b.className='badge '+(ok?'pass':'fail');
        if(ok)pass++;
      }catch(e){
        actual.value='Runner connection failed. Start the application with start.bat.';
        b.textContent='Runner error'; b.className='badge fail';
      }
    }
    history.unshift({id:q().id,result:`${pass}/${q().tests.length} passed`,time:new Date().toLocaleTimeString()});
    renderHistory();
    if(pass===q().tests.length)celebrate(); else tryAgain(pass,q().tests.length);
  }finally{busy(false)}
};
$('runTests').onclick=runAll;

/* v8 teacher lock for problem statements */
async function pinHash(value){
  const bytes=new TextEncoder().encode(String(value));
  const hash=await crypto.subtle.digest('SHA-256',bytes);
  return [...new Uint8Array(hash)].map(b=>b.toString(16).padStart(2,'0')).join('');
}
function isStatementLocked(){return !!q()?.problemLocked}
function applyStatementLock(){
  const x=q(); if(!x)return;
  x.problemLocked=!!x.problemLocked;
  problem.contentEditable=x.problemLocked?'false':'true';
  problem.setAttribute('aria-readonly',String(x.problemLocked));
  $('problemPanel').classList.toggle('statement-locked',x.problemLocked);
  $('statementLockStatus').textContent=x.problemLocked?'Problem statement locked':'Problem statement editable';
  $('statementLockStatus').classList.toggle('locked',x.problemLocked);
  $('statementLock').textContent=x.problemLocked?'🔒 Unlock Editing':'🔓 Lock Editing';
  $('formatbar').querySelectorAll('button,select,input').forEach(el=>el.disabled=x.problemLocked);
  // Fullscreen remains available while reading a locked statement.
  $('problemFullscreen').disabled=false;
}
const openQuestionBeforeLock=openQuestion;
openQuestion=function(i){openQuestionBeforeLock(i);applyStatementLock()};
$('statementLock').onclick=async()=>{
  const x=q();
  if(!x.problemLocked){
    const first=prompt('Teacher: create a passcode to lock this problem statement. The same passcode is required to unlock after import:','');
    if(first===null)return;
    if(first.length<4){toast('Use a passcode with at least 4 characters');return;}
    const second=prompt('Confirm the passcode:','');
    if(second!==first){toast('Passcodes do not match');return;}
    saveCurrent(); x.problemLockHash=await pinHash(first); x.problemLocked=true; applyStatementLock(); save(); toast('Problem statement locked for sharing');
  }else{
    const entered=prompt('Enter the teacher passcode to unlock editing:','');
    if(entered===null)return;
    if(await pinHash(entered)!==x.problemLockHash){toast('Incorrect passcode. Problem statement remains locked.');return;}
    x.problemLocked=false; applyStatementLock(); save(); toast('Problem statement editing enabled');
  }
};
// Prevent rich-content mutation paths while locked.
problem.addEventListener('beforeinput',e=>{if(isStatementLocked())e.preventDefault()},true);
problem.addEventListener('paste',e=>{if(isStatementLocked()){e.preventDefault();toast('Problem statement is locked by the teacher')}},true);
problem.addEventListener('drop',e=>{if(isStatementLocked())e.preventDefault()},true);
problem.addEventListener('contextmenu',e=>{if(isStatementLocked()&&e.target.closest('video,img,figure'))e.preventDefault()},true);
const removeSelectedMediaBeforeLock=removeSelectedMedia;
removeSelectedMedia=function(){if(isStatementLocked()){toast('Unlock the problem statement before deleting media');return}return removeSelectedMediaBeforeLock()};
applyStatementLock();

/* v9 teacher-locked timer, ready gate, and automatic time-up exports */
let assessmentStarted=false, autoExportStarted=false;
function timerOwner(){return state}
function isTimerLocked(){return !!timerOwner().timerLocked}
function updateTimerLockUI(){
  const locked=isTimerLocked();
  document.body.classList.toggle('timer-locked',locked);
  $('timerMinutes').disabled=locked;
  $('setTimer').disabled=locked;
  $('timerLock').textContent=locked?'🔒 Unlock Timer':'🔓 Lock Timer';
  $('timerLock').title=locked?'Teacher passcode required to edit timer':'Lock timer before exporting';
}
async function lockTimer(){
  const owner=timerOwner();
  if(!owner.timerLocked){
    const minutes=Math.max(1,parseInt($('timerMinutes').value)||60);
    const first=prompt(`Teacher: lock the assessment timer at ${minutes} minute(s). Create a passcode:`, '');
    if(first===null)return;
    if(first.length<4){toast('Use a timer passcode with at least 4 characters');return;}
    const second=prompt('Confirm the timer passcode:', '');
    if(second!==first){toast('Passcodes do not match');return;}
    owner.timerMinutes=minutes; owner.timerLockHash=await pinHash(first); owner.timerLocked=true;
    assessmentStarted=false; clearInterval(timerHandle); remaining=minutes*60; tick();
    document.body.classList.add('timer-waiting'); updateTimerLockUI(); save(); toast('Timer locked for student sharing');
  }else{
    const entered=prompt('Enter the teacher timer passcode to unlock:', '');
    if(entered===null)return;
    if(await pinHash(entered)!==owner.timerLockHash){toast('Incorrect timer passcode');return;}
    owner.timerLocked=false; owner.timerLockHash=''; assessmentStarted=false; document.body.classList.remove('timer-waiting'); updateTimerLockUI(); save(); toast('Timer editing enabled');
  }
}
$('timerLock').onclick=lockTimer;
function showReadyGate(){
  if(!isTimerLocked()||assessmentStarted)return;
  clearInterval(timerHandle); remaining=(Number(state.timerMinutes)||60)*60; tick();
  document.body.classList.add('timer-waiting');
  $('readyText').textContent=`You have ${state.timerMinutes} minute(s). The timer starts only after you select Yes.`;
  $('readyModal').classList.add('show');
}
$('readyNo').onclick=()=>{$('readyModal').classList.remove('show');toast('Timer has not started')};
$('readyYes').onclick=()=>{$('readyModal').classList.remove('show');startLockedAssessment()};
function startLockedAssessment(){
  if(assessmentStarted)return;
  assessmentStarted=true; autoExportStarted=false; remaining=(Number(state.timerMinutes)||60)*60;
  document.body.classList.remove('timer-waiting','timer-finished'); clearInterval(timerHandle); tick();
  timerHandle=setInterval(()=>{remaining=Math.max(0,remaining-1);tick();if(remaining<=0){clearInterval(timerHandle);finishLockedAssessment()}},1000);
  toast('Assessment timer started');
}
async function automaticDownload(endpoint,name){
  const r=await fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(reportPayload())});
  if(!r.ok)throw Error(await r.text()); download(await r.blob(),name);
}
async function finishLockedAssessment(){
  if(autoExportStarted)return; autoExportStarted=true; assessmentStarted=false;
  document.body.classList.add('timer-finished'); $('timeoutModal').classList.add('show'); saveCurrent();
  const base=safeName(state.setId||'assessment');
  const results=[];
  try{await automaticDownload('/api/export-set',base+'-time-up.zip');results.push('ZIP')}catch(e){console.error(e)}
  try{await automaticDownload('/api/export-pdf',base+'-time-up.pdf');results.push('PDF')}catch(e){console.error(e)}
  toast(results.length?`Time is out. ${results.join(' and ')} exported.`:'Time is out. Browser blocked automatic downloads. Use Export Set ZIP and Export PDF.');
}
// Override normal timer-setting behavior: locked timers wait for student confirmation.
const setTimerBeforeTeacherLock=setTimer;
setTimer=function(show=true){
  if(isTimerLocked()){updateTimerLockUI();showReadyGate();return;}
  assessmentStarted=true; setTimerBeforeTeacherLock(show);
};
// Add timer configuration to single-question sharing and restore it on import.
$('exportQuestion').onclick=()=>{saveCurrent();const packet={format:'python-assessment-rich-question',version:3,timer:{minutes:state.timerMinutes,locked:!!state.timerLocked,lockHash:state.timerLockHash||''},question:q()};download(new Blob([JSON.stringify(packet,null,2)],{type:'application/json'}),`${q().id}.question.json`)};
$('questionFile').onchange=async e=>{try{const d=JSON.parse(await e.target.files[0].text()),x=d.question||d;if(!x.id||!Array.isArray(x.tests))throw Error();saveCurrent();let i=state.questions.findIndex(v=>v.id===x.id);if(i>=0)state.questions[i]=x;else{state.questions.push(x);i=state.questions.length-1}if(d.timer){state.timerMinutes=Number(d.timer.minutes)||60;state.timerLocked=!!d.timer.locked;state.timerLockHash=d.timer.lockHash||'';$('timerMinutes').value=state.timerMinutes}openQuestion(i);updateTimerLockUI();save();if(isTimerLocked())showReadyGate();toast('Question and timer settings imported')}catch(err){toast('Invalid question file')}e.target.value=''};
// Wrap full-set import so imported timer lock is enforced after the asynchronous handler completes.
$('setFile').addEventListener('change',()=>setTimeout(()=>{updateTimerLockUI();if(isTimerLocked())showReadyGate()},500));
updateTimerLockUI();
// The original startup begins a timer immediately. Stop it when an imported/saved teacher lock exists.
if(isTimerLocked())showReadyGate();

/* v10 imported candidate mode: first question, forward-only navigation, quiet failures */
let candidateSequentialMode=false;

function updateMobileFloatingNextUI(){
  const btn=$('mobileFloatingNext');
  if(!btn)return;
  const total=state?.questions?.length||1;
  const isFinal=current>=total-1;
  if(isFinal){
    btn.textContent='Finish';
    btn.classList.add('is-finish');
    btn.setAttribute('title','Finish assessment and export submission');
  } else {
    btn.textContent='Next Question ›';
    btn.classList.remove('is-finish');
    btn.setAttribute('title',`Go to Question ${current+2} of ${total}`);
  }
}

function handleMobileFloatingNextClick(){
  const total=state?.questions?.length||1;
  if(current<total-1){
    window.go(current+1);
    applyCandidateMode();
    requestAnimationFrame(()=>{
      const panel=$('problemPanel');
      const header=document.querySelector('header');
      if(!panel)return;
      const headerOffset=header&&getComputedStyle(header).position==='sticky'
        ?header.getBoundingClientRect().height+8
        :0;
      window.scrollTo({
        top:Math.max(0,window.scrollY+panel.getBoundingClientRect().top-headerOffset),
        behavior:'smooth'
      });
    });
  } else {
    const finishBtn=$('finishAssessment');
    if(finishBtn){
      finishBtn.click();
    }
  }
}

const mobileNextEl=$('mobileFloatingNext');
if(mobileNextEl){
  mobileNextEl.onclick=handleMobileFloatingNextClick;
}

function applyCandidateMode(){
  document.body.classList.toggle('candidate-sequential',candidateSequentialMode);
  if(candidateSequentialMode){
    $('prev').disabled=true;
    $('questionPicker').disabled=true;
    $('next').textContent=current>=state.questions.length-1?'Finish':'Next';
  } else {
    $('questionPicker').disabled=false;
    $('next').textContent='Next ›';
  }
  updateMobileFloatingNextUI();
}
const renderStepsBeforeCandidateMode=renderSteps;
renderSteps=function(){renderStepsBeforeCandidateMode();applyCandidateMode();updateMobileFloatingNextUI()};
function enterCandidateMode(){
  candidateSequentialMode=true;
  current=0;
  openQuestion(0);
  applyCandidateMode();
  toast('Assessment opened at Question 1. Navigation is forward only.');
}
// Capture full-set import and switch to candidate mode after the imported state is applied.
$('setFile').addEventListener('change',()=>setTimeout(()=>{if(state.questions&&state.questions.length)enterCandidateMode()},700));
// A shared single question is also treated as candidate content, starting at its imported question.
$('questionFile').addEventListener('change',()=>setTimeout(()=>{candidateSequentialMode=true;applyCandidateMode()},500));
// Prevent any backward jump through the number-grid function while candidate mode is active.
const goBeforeCandidateMode=window.go;
window.go=i=>{
  if(candidateSequentialMode&&i<current){toast('Previous questions cannot be reopened in candidate mode');return}
  goBeforeCandidateMode(i);
};
$('prev').onclick=()=>{if(candidateSequentialMode){toast('Previous questions cannot be reopened in candidate mode');return}if(current)window.go(current-1)};
$('next').onclick=()=>{
  if(current<state.questions.length-1){window.go(current+1);applyCandidateMode()}
  else toast('You are on the final question');
};
// Replace test execution feedback: no failure popup and no pass-count celebration unless every test succeeds.
runAll=async function(){
  saveCurrent();
  if(!q().tests.length){toast('Add at least one test case');return;}
  busy(true);
  document.querySelector('[data-tab="tests"]').click();
  const summary=$('testSummary');
  summary.className='test-summary'; summary.textContent='Evaluating...';
  let pass=0;
  try{
    for(let i=0;i<q().tests.length;i++){
      const badge=$('badge'+i),actual=$('actual'+i);
      badge.className='badge'; badge.textContent='Evaluating'; actual.value='';
      try{
        const d=await execute(q().tests[i].input),output=d.output||'';
        actual.value=output+(d.error?'\n'+d.error:'');
        const ok=!!d.ok&&norm(output)===norm(q().tests[i].expected);
        // Do not reveal individual hidden-style pass/fail details to the candidate.
        badge.textContent='Checked'; badge.className='badge';
        if(ok)pass++;
      }catch(e){actual.value='Execution could not be completed.';badge.textContent='Checked';badge.className='badge'}
    }
    history.unshift({id:q().id,result:`${pass}/${q().tests.length} passed`,time:new Date().toLocaleTimeString()});
    renderHistory();
    if(pass===q().tests.length){
      summary.textContent='All test cases passed'; summary.className='test-summary success';
      celebrate();
    }else{
      summary.textContent=`${pass} of ${q().tests.length} test cases passed`;
      summary.className='test-summary partial';
      // Deliberately no Try Again overlay. Candidate remains in the code workspace.
    }
  }finally{busy(false)}
};
$('runTests').onclick=runAll;
$('runCustom').onclick=runCurrentMode;
applyCandidateMode();

/* v17 retained teacher controls, protected candidate start, and browser compiler */
const V17_DEFAULTS={python:'# Write Python 3 code here\nvalue = input().strip()\nprint(value)',c:'#include <stdio.h>\nint main(void){ char value[1024]; if(fgets(value,sizeof value,stdin)) printf("%s",value); return 0; }',cpp:'#include <iostream>\n#include <string>\nusing namespace std;\nint main(){ string value; getline(cin,value); cout << value; return 0; }'};
let packageProtected=false,candidateRunning=false,importInProgress=false;
function lang(){return q()?.language||state.language||'python'}function rid(){return Math.random().toString(36).slice(2)+Date.now().toString(36)}
function setLanguageUI(){const l=lang();$('languageSelect').value=l;$('compilerStatus').textContent='Online compiler · '+l.toUpperCase()}
$('languageSelect').onchange=e=>{saveCurrent();const x=q(),old=x.language||'python',next=e.target.value;const isDefault=!x.code||x.code.trim()===''||Object.values(V17_DEFAULTS).map(v=>v.trim()).includes(x.code.trim())||x.code.trim()==='# Read input and write your solution here\nvalue = input().strip()\nprint(value)'.trim()||x.code.trim()===starter().code.trim();if(isDefault){x.code=V17_DEFAULTS[next];code.value=x.code;updateLines()}x.language=next;state.language=next;setLanguageUI();save()};
const open17=openQuestion;openQuestion=function(i){open17(i);setLanguageUI();applyTestFreeze();applyCustomFreeze();applyCandidateSecurity()};
$('codeFullscreen').onclick=()=>{const p=document.querySelector('.editor-card');p.classList.toggle('full');const f=p.classList.contains('full');document.body.classList.toggle('code-fullscreen-active',f);$('codeFullscreen').textContent=f?'✕ Exit Full Screen':'⛶ Full Screen'};
document.addEventListener('keydown',e=>{if(e.key==='Escape'){const p=document.querySelector('.editor-card');if(p.classList.contains('full')){$('codeFullscreen').click()}}});
function packetText(p){return typeof p==='string'?p:String(p?.output??p?.error??p?.stderr??p?.message??'')}
function stripNoise(v){return String(v||'').replace(/\x1b\[[0-?]*[ -\/]*[@-~]/g,'').replace(/\r\n?/g,'\n').split('\n').filter(line=>!/^\s*(>{3}|\$|\/tmp\/[\w.-]+\.(o|out|exe))\s*$/.test(line)).join('\n').replace(/^\s*[>$]\s?/gm,'').trim()}
function removeEcho(out,input){out=stripNoise(out);input=String(input||'').replace(/\r\n?/g,'\n').trim();if(!input)return out;const o=out.split('\n'),n=input.split('\n');if(n.every((x,i)=>(o[i]||'').trimEnd()===x.trimEnd())&&o.length>n.length)return o.slice(n.length).join('\n').trim();return out}
function remoteRun(language,source,stdin){return new Promise((resolve,reject)=>{if(typeof io!=='function')return reject(Error('Compiler connection library is unavailable.'));const sock=io(`https://repl-web.programiz.com/?sessionId=${rid()}&lang=${language}`,{transports:['websocket'],forceNew:true,reconnection:false});let raw='',done=false,settle,hard;const finish=()=>{if(done)return;done=true;clearTimeout(settle);clearTimeout(hard);sock.disconnect();const err=/error:|traceback|syntaxerror|runtimeerror|segmentation fault|invalid preprocessing directive|undefined reference/i.test(raw);resolve({ok:!err,output:err?'':removeEcho(raw,stdin),error:err?stripNoise(raw):''})};const fail=m=>{if(done)return;done=true;clearTimeout(settle);clearTimeout(hard);sock.disconnect();reject(Error(m))};sock.on('connect',()=>{sock.emit('run',{code:source});if(String(stdin)!==''){const lines=String(stdin).replace(/\r\n?/g,'\n').split('\n');setTimeout(()=>{lines.forEach((x,i)=>setTimeout(()=>sock.emit('evaluate',{code:x}),i*160))},500)}});sock.on('output',p=>{raw+=packetText(p);clearTimeout(settle);settle=setTimeout(finish,1200)});sock.on('error',p=>{raw+=packetText(p)||'Compiler error';clearTimeout(settle);settle=setTimeout(finish,700)});sock.on('connect_error',()=>fail('Unable to connect to compiler server.'));hard=setTimeout(()=>raw?finish():fail('Compiler server did not return output.'),18000)})}
execute=async input=>remoteRun(lang(),code.value,input);
function norm17(v){return String(v??'').replace(/\r\n?/g,'\n').split('\n').map(x=>x.replace(/[ \t]+$/,'')).join('\n').trim()}
runAll=async function(){saveCurrent();if(!q().tests.length)return toast('Add at least one test case');busy(true);document.querySelector('[data-tab=tests]').click();let pass=0;const summary=$('testSummary');summary.textContent='Checking 0 of '+q().tests.length;try{for(let i=0;i<q().tests.length;i++){const t=q().tests[i],b=$('badge'+i),a=$('actual'+i);b.textContent='Running';a.value='Executing...';try{const r=await remoteRun(lang(),code.value,t.input),ok=r.ok&&norm17(r.output)===norm17(t.expected);a.value=r.error||r.output||'[Program produced no output]';b.textContent=ok?'Passed':'Failed';b.className='badge '+(ok?'pass':'fail');if(ok)pass++}catch(e){a.value=e.message;b.textContent='Runner error';b.className='badge fail'}summary.textContent=`Checking ${i+1} of ${q().tests.length}`}history.unshift({id:q().id,result:`${pass}/${q().tests.length} passed`,time:new Date().toLocaleTimeString()});renderHistory();if(pass===q().tests.length){summary.textContent='All test cases passed';summary.className='test-summary success';celebrate()}else{summary.textContent=`${pass} of ${q().tests.length} test cases passed`;summary.className='test-summary partial'}}finally{busy(false)}};$('runTests').onclick=runAll;

/* teacher frozen tests */
function applyTestFreeze(){if(!$('testLock')||!q())return;$('testLock').textContent=q().testsLocked?'🔒 Unfreeze Test Cases':'🔓 Freeze Test Cases';renderTests17()}
function renderTests17(){if(!q())return;const locked=!!q().testsLocked||candidateRunning||!!state.customInputLocked;$('testCount').textContent=q().tests.length;$('testList').innerHTML=q().tests.map((t,i)=>{const frozen=locked&&!t.studentDefined;return `<div class="test-card ${frozen?'teacher-frozen':'student-extra'}"><div class="test-head"><b>Test Case ${i+1} <small>${frozen?'Teacher frozen':'Practice'}</small></b><span><span id="badge${i}" class="badge">Not run</span>${frozen?'':`<button class="delete" onclick="removeTest(${i})">✕</button>`}</span></div><div class="test-grid"><div class="field"><label>INPUT</label><textarea ${frozen?'disabled':''} oninput="setTest17(${i},'input',this.value)">${esc(t.input)}</textarea></div><div class="field"><label>EXPECTED OUTPUT</label><textarea ${frozen?'disabled':''} oninput="setTest17(${i},'expected',this.value)">${esc(t.expected)}</textarea></div><div class="field actual"><label>ACTUAL OUTPUT</label><textarea id="actual${i}" readonly></textarea></div></div></div>`}).join('')}
window.setTest17=(i,k,v)=>{if((q().testsLocked||candidateRunning||state.customInputLocked)&&!q().tests[i].studentDefined)return toast('Teacher test case is frozen');q().tests[i][k]=v;save()};window.removeTest=i=>{if((q().testsLocked||candidateRunning||state.customInputLocked)&&!q().tests[i].studentDefined)return;q().tests.splice(i,1);renderTests17();save()};
$('testLock').onclick=async()=>{const x=q();if(!x.testsLocked){const p=prompt('Create password to freeze teacher test cases:','');if(!p||p.length<4)return toast('Use at least 4 characters');if(prompt('Confirm password:','')!==p)return toast('Passwords do not match');x.tests.forEach(t=>t.studentDefined=false);x.testLockHash=await pinHash(p);x.testsLocked=true}else{const p=prompt('Enter frozen test-case password:','');if(p===null)return;if(await pinHash(p)!==x.testLockHash)return toast('Incorrect password');x.testsLocked=false}save();applyTestFreeze()};

/* custom input state freeze */
function applyCustomFreeze(){const locked=!!state.customInputLocked;$('customToggle').checked=!!state.customInputChecked;$('customToggle').disabled=locked;document.body.classList.toggle('custom-input-locked',locked);$('customInputLock').textContent=locked?'🔒 Unlock Custom Input':'🔓 Freeze Custom Input'}
$('customToggle').onchange=()=>{state.customInputChecked=$('customToggle').checked;save()};
$('customInputLock').onclick=async()=>{if(!state.customInputLocked){state.customInputChecked=$('customToggle').checked;const p=prompt(`Freeze Custom Input as ${state.customInputChecked?'checked':'not checked'}. Create password:`,'');if(!p||p.length<4)return toast('Use at least 4 characters');if(prompt('Confirm password:','')!==p)return toast('Passwords do not match');state.customInputLockHash=await pinHash(p);state.customInputLocked=true}else{const p=prompt('Enter Custom Input password:','');if(p===null)return;if(await pinHash(p)!==state.customInputLockHash)return toast('Incorrect password');state.customInputLocked=false}applyCustomFreeze();save()};
$('addTest').onclick=()=>{q().tests.push({input:'',expected:'',studentDefined:true});renderTests17();save()};

function applyCandidateSecurity(){document.body.classList.toggle('candidate-running',candidateRunning);$('deleteQuestion').disabled=packageProtected||candidateRunning;$('deleteQuestion').hidden=packageProtected||candidateRunning;if(candidateRunning){$('addQuestion').disabled=true;$('importQuestion').disabled=true;$('exportQuestion').disabled=true}}
async function hashPack(p,s){return pinHash(s+'|'+p)}
async function buildAssessmentZip(security,fileName){saveCurrent();const zip=new JSZip();const manifest={...state,questions:undefined,questionIds:state.questions.map(x=>x.id),packageSecurity:security};zip.file('assessment.json',JSON.stringify(manifest,null,2));state.questions.forEach((x,i)=>zip.file(`questions/${String(i+1).padStart(3,'0')}-${x.id}.json`,JSON.stringify(x,null,2)));zip.file('README.txt','Import this assessment ZIP using Browser Assessment IDE.');download(await zip.generateAsync({type:'blob',compression:'DEFLATE'}),fileName||`${state.setId}.zip`)}
$('exportSet').onclick=async()=>{saveCurrent();const use=confirm('Do you want to save password?\n\nOK = Save password\nCancel = Export without password');let sec={protected:false,deleteQuestionsAllowed:true};if(use){const p=prompt('Teacher: enter ZIP password (minimum 4 characters):','');if(!p||p.length<4)return toast('Use at least 4 characters');if(prompt('Confirm ZIP password:','')!==p)return toast('Passwords do not match');const salt=rid();sec={protected:true,salt,hash:await hashPack(p,salt),deleteQuestionsAllowed:false}}else if(!confirm('Export without password?'))return;await buildAssessmentZip(sec,`${state.setId}.zip`)};
$('setFile').onchange=async e=>{try{importInProgress=true;const zip=await JSZip.loadAsync(e.target.files[0]),manifest=JSON.parse(await zip.file('assessment.json').async('text')),sec=manifest.packageSecurity||{};if(sec.protected){const p=prompt('Enter password to open assessment ZIP:','');if(p===null)throw Error('Import cancelled');if(await hashPack(p,sec.salt)!==sec.hash)throw Error('Incorrect password')}const names=Object.keys(zip.files).filter(n=>/^questions\/.*\.json$/i.test(n)).sort(),questions=[];for(const n of names)questions.push(JSON.parse(await zip.file(n).async('text')));if(!questions.length)throw Error('No questions found');delete manifest.packageSecurity;state={...state,...manifest,questions};packageProtected=!!sec.protected;current=0;$('setIdText').textContent=state.setId;$('timerMinutes').value=state.timerMinutes||60;openQuestion(0);save();candidateSequentialMode=true;applyCandidateMode();applyCandidateSecurity();updateTimerLockUI();applyCustomFreeze();if(isTimerLocked())showReadyGate();else{candidateRunning=true;applyCandidateSecurity()}toast('Assessment imported')}catch(err){toast(err.message||'Invalid ZIP')}finally{importInProgress=false;e.target.value=''}};

/* start gate: Not Yet terminates current attempt until page reload */
const blocker=document.createElement('div');blocker.className='assessment-blocker';document.body.appendChild(blocker);
$('readyNo').onclick=()=>{$('readyModal').classList.remove('show');blocker.classList.add('show');clearInterval(timerHandle);assessmentStarted=false};
$('readyYes').onclick=()=>{$('readyModal').classList.remove('show');candidateRunning=true;applyCandidateSecurity();startLockedAssessment()};

function reportHtml17(){saveCurrent();return `<!doctype html><html><head><meta charset="utf-8"><title>${esc(state.title||'Assessment Report')}</title></head><body><h1>${esc(state.title||'Assessment Report')}</h1><p><b>Generated At (IST):</b> ${esc(formatIST(new Date()))}</p>${state.questions.map((x,i)=>`<article><h2>Question ${i+1}</h2><div>${x.problemHtml||''}</div><h3>Candidate Code</h3><pre>${esc(x.code||'')}</pre></article>`).join('')}</body></html>`}
$('exportHtml').onclick=()=>download(new Blob([reportHtml17()],{type:'text/html'}),safeName(state.setId)+'-report.html');$('exportWord').onclick=()=>download(new Blob([reportHtml17()],{type:'application/msword'}),safeName(state.setId)+'-report.doc');$('exportPdf').onclick=()=>{const d=document.createElement('div');d.innerHTML=reportHtml17();html2pdf().set({filename:safeName(state.setId)+'-report.pdf'}).from(d).save()};
finishLockedAssessment=async function(){if(autoExportStarted)return;autoExportStarted=true;assessmentStarted=false;clearInterval(timerHandle);saveCurrent();await buildAssessmentZip({protected:false,deleteQuestionsAllowed:false},safeName(state.setId)+'-completed.zip');const d=document.createElement('div');d.innerHTML=reportHtml17();await html2pdf().set({filename:safeName(state.setId)+'-completed.pdf'}).from(d).save();$('timeoutModal').querySelector('h2').textContent='Time is out';$('timeoutModal').querySelector('p').textContent='Please share exported zip and pdf to the question provider to evaluate';$('timeoutModal').classList.add('show')};
setLanguageUI();applyTestFreeze();applyCustomFreeze();applyCandidateSecurity();

/* v18 refresh-safe timer, locked candidate toolbar, Finish Assessment, and session cleanup */
const EXAM_SESSION_KEY='browser-assessment-active-session-v18';
const EXAM_STATE_KEY='assessment-rich-v3';
function examCookieNames(){return document.cookie.split(';').map(x=>decodeURIComponent((x.split('=')[0]||'').trim())).filter(n=>n.startsWith('assessment_')||n.startsWith('browser_assessment_'))}
function clearExamCookies(){const cookies=document.cookie.split(';');for(const c of cookies){const eqPos=c.indexOf('=');const name=eqPos>-1?c.slice(0,eqPos).trim():c.trim();if(name){document.cookie=`${encodeURIComponent(name)}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax`;document.cookie=`${encodeURIComponent(name)}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;document.cookie=`${encodeURIComponent(name)}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`}}}
function readExamSession(){try{return JSON.parse(localStorage.getItem(EXAM_SESSION_KEY)||'null')}catch(e){return null}}
function writeExamSession(extra={}){const previous=readExamSession()||{};const session={...previous,...extra,setId:state.setId,active:true,packageProtected:!!packageProtected,candidateSequentialMode:true,customInputChecked:!!state.customInputChecked,updatedAt:Date.now()};localStorage.setItem(EXAM_SESSION_KEY,JSON.stringify(session));return session}
function clearExamSession(){clearInterval(timerHandle);localStorage.removeItem(EXAM_SESSION_KEY);localStorage.removeItem(EXAM_STATE_KEY);clearExamCookies();candidateRunning=false;packageProtected=false;assessmentStarted=false;autoExportStarted=false;setExamNavLocked(false)}

/* Top navigation and Exam Setup password protection (Password: 12345) */
const EXAM_NAV_PASSWORD = '12345';
let examNavLocked = false;

function isExamNavLocked() {
  const session = readExamSession();
  return examNavLocked || !!candidateRunning || !!(session && session.active);
}

function setExamNavLocked(locked) {
  examNavLocked = !!locked;
  updateNavLockUI();
}

function updateNavLockUI() {
  const locked = isExamNavLocked();
  document.querySelectorAll('.top-nav-links a.top-link-btn').forEach(btn => {
    btn.classList.toggle('nav-locked', locked);
    if (locked) {
      btn.setAttribute('title', 'Locked');
    } else {
      const href = btn.getAttribute('href') || '';
      if (href.includes('help.html')) btn.setAttribute('title', 'User Guide & Help');
      else if (href.includes('home')) btn.setAttribute('title', 'Home');
      else if (href.includes('interactive-media')) btn.setAttribute('title', 'App store');
    }
  });
  const proctorBtn = $('proctorSettings');
  if (proctorBtn) {
    proctorBtn.classList.toggle('nav-locked', locked);
    if (locked) {
      proctorBtn.setAttribute('title', 'Exam Setup - Locked');
    } else {
      proctorBtn.setAttribute('title', 'Exam Setup');
    }
  }
  const clearBtn = $('clearExamData');
  if (clearBtn) {
    clearBtn.classList.toggle('nav-locked', locked);
    if (locked) {
      clearBtn.setAttribute('title', 'Clear Cookies - Password Locked');
    } else {
      clearBtn.setAttribute('title', 'Clear Cookies');
    }
  }
}

function verifyNavPassword(action) {
  if (!isExamNavLocked()) {
    if (typeof action === 'function') action();
    return true;
  }
  const input = prompt('Enter password');
  if (input === EXAM_NAV_PASSWORD) {
    toast('Access granted');
    if (typeof action === 'function') action();
    return true;
  }
  if (input !== null) {
    toast('Incorrect password. Access locked.');
  }
  return false;
}

document.querySelectorAll('.top-nav-links a.top-link-btn').forEach(link => {
  link.addEventListener('click', e => {
    if (isExamNavLocked()) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      const href = link.getAttribute('href');
      const target = link.getAttribute('target') || '_self';
      verifyNavPassword(() => {
        if (href && href !== '#') {
          window.open(href, target);
        }
      });
    }
  }, true);
});

function setCandidateToolbarLocked(locked){
  const controls=['addQuestion','importQuestion','exportQuestion','importSet','exportSet','exportAllJson','importAllJson','exportHtml','exportPdf','exportWord'];
  controls.forEach(id=>{const el=$(id);if(el){el.disabled=locked;el.setAttribute('aria-disabled',String(locked))}});
  $('finishAssessment').hidden=!locked;
  document.body.classList.toggle('candidate-running',locked);
  $('deleteQuestion').hidden=locked;$('deleteQuestion').disabled=locked;
  setExamNavLocked(locked);
}
function startPersistentCountdown(deadline){
  assessmentStarted=true;candidateRunning=true;autoExportStarted=false;setCandidateToolbarLocked(true);applyCandidateSecurity();
  clearInterval(timerHandle);
  const update=()=>{remaining=Math.max(0,Math.ceil((deadline-Date.now())/1000));tick();if(remaining<=0){clearInterval(timerHandle);finishAssessmentV18('timeout')}};
  update();if(remaining>0)timerHandle=setInterval(update,1000);
}
function beginPersistentAssessment(){
  const duration=Math.max(1,Number(state.timerMinutes)||60);const deadline=Date.now()+duration*60000;
  writeExamSession({started:true,startTime:Date.now(),deadline,durationMinutes:duration});
  startPersistentCountdown(deadline);
}
function resumePersistentAssessment(session){
  packageProtected=!!session.packageProtected;candidateSequentialMode=true;candidateRunning=true;current=Math.max(0,Math.min(Number(session.currentQuestion)||0,state.questions.length-1));
  openQuestion(current);applyCandidateMode();applyCandidateSecurity();setCandidateToolbarLocked(true);applyCustomFreeze();updateTimerLockUI();
  if(session.deadline<=Date.now()){remaining=0;tick();finishAssessmentV18('timeout');return}
  startPersistentCountdown(session.deadline);toast('Assessment resumed from the saved timer');
}
const goV18=window.go;window.go=i=>{goV18(i);const s=readExamSession();if(s?.started)writeExamSession({currentQuestion:current})};
$('readyYes').onclick=()=>{$('readyModal').classList.remove('show');beginPersistentAssessment()};
$('readyNo').onclick=()=>{clearExamSession();$('readyModal').classList.remove('show');location.reload()};

async function completedZipBlobV18(){
  saveCurrent();const zip=new JSZip();
  const manifest={...state,questions:undefined,questionIds:state.questions.map(x=>x.id),completedAt:new Date().toISOString(),submission:true};
  zip.file('assessment.json',JSON.stringify(manifest,null,2));
  state.questions.forEach((x,i)=>zip.file(`questions/${String(i+1).padStart(3,'0')}-${x.id}.json`,JSON.stringify(x,null,2)));
  zip.file('README.txt','Completed assessment submission. Share this ZIP and the exported PDF with the question provider.');
  return zip.generateAsync({type:'blob',compression:'DEFLATE'});
}
async function downloadCompletedPdfV18(base){
  const holder=document.createElement('div');holder.innerHTML=reportHtml17();
  await html2pdf().set({margin:8,filename:base+'-completed.pdf',html2canvas:{scale:1.5},jsPDF:{unit:'mm',format:'a4',orientation:'portrait'}}).from(holder).save();
}
async function finishAssessmentV18(reason){
  if(autoExportStarted)return;autoExportStarted=true;clearInterval(timerHandle);saveCurrent();
  const base=safeName(state.setId||'assessment');let zipStarted=false,pdfStarted=false;
  try{download(await completedZipBlobV18(),base+'-completed.zip');zipStarted=true}catch(e){console.error(e)}
  try{await downloadCompletedPdfV18(base);pdfStarted=true}catch(e){console.error(e)}
  clearExamSession();
  document.body.classList.add('submission-complete');
  const modal=$('timeoutModal');modal.querySelector('h2').textContent=reason==='timeout'?'Time is out':'Assessment finished';
  modal.querySelector('p').textContent='Please share exported zip and pdf to the question provider to evaluate';
  const button=modal.querySelector('button');button.textContent='Return to Import Screen';button.onclick=()=>location.reload();modal.classList.add('show');
  if(!zipStarted||!pdfStarted)toast('If a download was blocked, allow multiple downloads and use Finish Assessment again before closing this page.');
}
$('finishAssessment').onclick=()=>{if(confirm('Finish the assessment now and export the completed ZIP and PDF?'))finishAssessmentV18('manual')};
finishLockedAssessment=()=>finishAssessmentV18('timeout');

// Persist imported candidate package before the start gate is shown.
const setFileV18=$('setFile');setFileV18.addEventListener('change',()=>setTimeout(()=>{
  if(state?.questions?.length&&isTimerLocked())writeExamSession({started:false,deadline:null,currentQuestion:0,packageProtected:!!packageProtected});
},900));

// Resume only an assessment that was actually started. A clean/opened page remains in teacher/import mode.
(function restoreActiveExamV18(){
  const session=readExamSession();
  if(session?.active&&session.started&&state?.setId===session.setId&&state?.questions?.length){resumePersistentAssessment(session)}
  else{setCandidateToolbarLocked(false)}
})();

/* v19 candidate identity, consent-based camera evidence, full-screen gate, and submission package */
const EXAM_EVIDENCE_KEY='browser-assessment-evidence-v19';
let evidenceFrames=[],cameraStream=null,captureHandle=null,candidateMeta=null,finishV19Running=false;
function formatIST(val){if(!val)return '';const d=(val instanceof Date)?val:new Date(val);if(isNaN(d.getTime()))return String(val);return d.toLocaleString('en-IN',{timeZone:'Asia/Kolkata',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:true})+' IST'}
function examNowParts(){const d=new Date();const dateStr=d.toLocaleDateString('en-IN',{timeZone:'Asia/Kolkata'});const parts=new Intl.DateTimeFormat('en-IN',{timeZone:'Asia/Kolkata',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).formatToParts(d);const hour=parts.find(p=>p.type==='hour')?.value||String(d.getHours()).padStart(2,'0');const minute=parts.find(p=>p.type==='minute')?.value||String(d.getMinutes()).padStart(2,'0');return {iso:d.toISOString(),date:dateStr,hour,minute,local:formatIST(d)}}
function updateQuestionCountV19(){const el=$('candidateQuestionCount');if(el)el.textContent=`Current/Total question : ${current+1}/${state.questions.length}`}
const renderStepsV19=renderSteps;renderSteps=function(){renderStepsV19();updateQuestionCountV19()};updateQuestionCountV19();
function ownerConfig(){return state.ownerConfig||{email:'',submissionMinutes:10}}
function applyOwnerConfig(){const c=ownerConfig();$('ownerEmail').value=c.email||'';$('submissionMinutes').value=c.submissionMinutes||10}
$('proctorSettings').onclick=()=>{
  if(isExamNavLocked()){
    verifyNavPassword(()=>{
      applyOwnerConfig();
      $('ownerModal').classList.add('show');
    });
    return;
  }
  applyOwnerConfig();
  $('ownerModal').classList.add('show');
};
$('ownerCancel').onclick=()=>$('ownerModal').classList.remove('show');
$('ownerSave').onclick=()=>{const email=$('ownerEmail').value.trim(),minutes=Math.max(1,Number($('submissionMinutes').value)||10);if(email&&!/^\S+@\S+\.\S+$/.test(email))return toast('Enter a valid owner email');state.ownerConfig={email,submissionMinutes:minutes};save();$('ownerModal').classList.remove('show');toast('Exam owner setup saved in assessment package')};
function populateCandidateTime(){const n=examNowParts();$('candidateDate').value=n.date;$('candidateHour').value=n.hour;$('candidateMinute').value=n.minute}
async function openCandidateCamera(){try{cameraStream=await navigator.mediaDevices.getUserMedia({video:{width:{ideal:640},height:{ideal:360},facingMode:'user'},audio:false});$('cameraPreview').srcObject=cameraStream;$('cameraStatus').textContent='Camera is open. Keep this preview visible while confirming.';updateCandidateStartState()}catch(e){$('cameraStatus').textContent='Camera permission was not granted. The assessment cannot start in evidence mode.';toast('Camera permission is required for this configured assessment')}}
$('openCamera').onclick=openCandidateCamera;
function updateCandidateStartState(){const ok=$('candidateName').value.trim()&&$('candidateRoll').value.trim()&&$('cameraConsent').checked&&cameraStream;$('candidateStart').disabled=!ok}
['candidateName','candidateRoll','cameraConsent'].forEach(id=>$(id).addEventListener('input',updateCandidateStartState));
function watermarkFrame(canvas,stamp){const x=canvas.getContext('2d');x.save();x.font='bold 14px Segoe UI';x.fillStyle='rgba(0,0,0,.60)';x.fillRect(0,canvas.height-34,canvas.width,34);x.fillStyle='#fff';x.fillText(stamp,10,canvas.height-12);x.font='bold 18px Segoe UI';x.fillStyle='rgba(34,197,94,.58)';for(let yy=24;yy<canvas.height-30;yy+=72)for(let xx=18;xx<canvas.width;xx+=110)x.fillText('✓',xx,yy);x.restore()}
function captureEvidenceFrame(){if(!cameraStream||!candidateRunning)return;const v=$('cameraPreview'),c=document.createElement('canvas');c.width=480;c.height=270;const x=c.getContext('2d');x.drawImage(v,0,0,c.width,c.height);const now=new Date(),stamp=formatIST(now)+'.'+String(now.getMilliseconds()).padStart(3,'0');watermarkFrame(c,stamp);c.toBlob(blob=>{if(blob)evidenceFrames.push({name:`evidence/${String(evidenceFrames.length+1).padStart(6,'0')}_${now.toISOString().replace(/[:.]/g,'-')}.png`,blob,stamp})},'image/png')}
function startEvidenceCapture(){clearInterval(captureHandle);captureEvidenceFrame();captureHandle=setInterval(captureEvidenceFrame,1000)}
function stopEvidenceCapture(){clearInterval(captureHandle);captureHandle=null;if(cameraStream){cameraStream.getTracks().forEach(t=>t.stop());cameraStream=null}}
async function requestExamFullscreen(){try{if(!document.fullscreenElement)await document.documentElement.requestFullscreen()}catch(e){toast('Full screen was blocked. Use the browser full-screen control before continuing.')}}
function showCandidateGateV19(){setExamNavLocked(true);populateCandidateTime();$('candidateName').value='';$('candidateRoll').value='';$('cameraConsent').checked=false;$('candidateStart').disabled=true;$('candidateModal').classList.add('show')}
async function startCandidateV19(){const n=examNowParts();candidateMeta={fullName:$('candidateName').value.trim(),rollNumber:$('candidateRoll').value.trim(),currentDate:n.date,currentHour:n.hour,currentMinute:n.minute,startTime:n.iso,ownerEmail:ownerConfig().email||'',submissionMinutes:ownerConfig().submissionMinutes||10};localStorage.setItem(EXAM_EVIDENCE_KEY,JSON.stringify(candidateMeta));$('candidateModal').classList.remove('show');await requestExamFullscreen();beginPersistentAssessment();startEvidenceCapture();alert(`After the exam, share the exported PDF and ZIP with the exam owner within ${candidateMeta.submissionMinutes} minute(s) at ${candidateMeta.ownerEmail||'the email provided by the owner'}. Ending early will finish the attempt.`)}
$('candidateStart').onclick=startCandidateV19;
const readyYesV19=$('readyYes');readyYesV19.onclick=()=>{$('readyModal').classList.remove('show');showCandidateGateV19()};
function blockCandidateClipboard(e){if(e.target&&e.target.closest&&(e.target.closest('.modal')||e.target.closest('.test-card.student-extra')))return;if(candidateRunning){e.preventDefault();toast('Copy, cut, and paste are disabled during the assessment')}}
['copy','cut','paste'].forEach(type=>document.addEventListener(type,blockCandidateClipboard,true));
document.addEventListener('contextmenu',e=>{if(e.target&&e.target.closest&&(e.target.closest('.modal')||e.target.closest('.test-card.student-extra')))return;if(candidateRunning){e.preventDefault();toast('Right-click is disabled during the assessment')}},true);
function instructionTextV19(reason,end){const c=candidateMeta||{};const owner=ownerConfig();const due=new Date(end.getTime()+(Number(c.submissionMinutes||owner.submissionMinutes||10)*60000));return `ASSESSMENT SUBMISSION INSTRUCTIONS\n\nCandidate Full Name: ${c.fullName||''}\nRoll Number: ${c.rollNumber||''}\nCurrent Date: ${c.currentDate||''}\nCurrent Hour: ${c.currentHour||''}\nCurrent Minute: ${c.currentMinute||''}\nExam Start (IST): ${formatIST(c.startTime)}\nExam End (IST): ${formatIST(end)}\nFinish Reason: ${reason}\nTotal Questions: ${state.questions.length}\nOwner Email: ${c.ownerEmail||owner.email||''}\nSubmission Window: ${c.submissionMinutes||owner.submissionMinutes||10} minute(s)\nSubmit By (IST): ${formatIST(due)}\n\nShare both the completed ZIP and PDF with the exam owner. Keep the original files unchanged. Camera images are assessment evidence for authorized review only. This application does not automatically determine cheating, identity, emotion, or gaze.`}
function reportHtmlV19(reason,end){const c=candidateMeta||{};return `<!doctype html><html><head><meta charset="utf-8"><style>body{font-family:Arial;margin:24px;color:#102a43}h1{color:#073b88}.meta{border:1px solid #9fb3c8;padding:12px}.shot{page-break-inside:avoid;margin:12px 0}.shot img{width:100%;max-width:700px}.stamp{font-size:11px}</style></head><body><h1>Assessment Submission Report</h1><div class="meta"><b>Full Name:</b> ${esc(c.fullName||'')}<br><b>Roll Number:</b> ${esc(c.rollNumber||'')}<br><b>Current Date:</b> ${esc(c.currentDate||'')}<br><b>Current Time:</b> ${esc((c.currentHour||'')+':'+(c.currentMinute||''))}<br><b>Exam Start (IST):</b> ${esc(formatIST(c.startTime))}<br><b>Exam End (IST):</b> ${esc(formatIST(end))}<br><b>Finish Reason:</b> ${esc(reason)}<br><b>Total Questions:</b> ${state.questions.length}</div>${state.questions.map((x,i)=>`<article><h2>Question ${i+1}</h2><div>${x.problemHtml||''}</div><h3>Candidate Code</h3><pre>${esc(x.code||'')}</pre></article>`).join('')}<h2>Camera Evidence</h2><div id="evidenceShots"></div></body></html>`}
function evidenceHtmlV20(end){const c=candidateMeta||{};return `<!doctype html><html><head><meta charset="utf-8"><title>Camera Evidence Report</title><style>body{font-family:Arial,sans-serif;margin:24px;color:#102a43}h1{color:#073b88}.meta{border:1px solid #9fb3c8;padding:12px;background:#f4f7fb;border-radius:6px;margin-bottom:20px}.shot{margin:20px 0;padding:15px;border:1px solid #bfd2eb;border-radius:8px;background:#fff;page-break-inside:avoid}.shot img{width:100%;max-width:640px;border-radius:5px;display:block;margin-bottom:10px}.stamp{font-size:12px;font-weight:bold;color:#607495}</style></head><body><h1>Camera Evidence Report</h1><div class="meta"><b>Full Name:</b> ${esc(c.fullName||'')}<br><b>Roll Number:</b> ${esc(c.rollNumber||'')}<br><b>Exam Start (IST):</b> ${esc(formatIST(c.startTime))}<br><b>Exam End (IST):</b> ${esc(formatIST(end))}</div><h2>Evidence Frames</h2><div id="evidenceShots">${evidenceFrames.map((f,i)=>`<div class="shot"><h3>Frame ${i+1}</h3><img src="${f.name}"><div class="stamp">${esc(f.stamp)}</div></div>`).join('')}</div></body></html>`}
async function pdfBlobV19(reason,end){const holder=document.createElement('div');holder.innerHTML=reportHtmlV19(reason,end);const shots=holder.querySelector('#evidenceShots');if(shots){shots.innerHTML='<p>Camera evidence screenshots are generated in HTML format inside the <b>camera-evidence.html</b> file in the completed ZIP.</p>'}return html2pdf().set({margin:8,html2canvas:{scale:1},jsPDF:{unit:'mm',format:'a4',orientation:'portrait'}}).from(holder).output('blob')}
async function completedZipBlobV19(reason,end,pdfBlob,onProgress){saveCurrent();const zip=new JSZip(),manifest={...state,questions:undefined,questionIds:state.questions.map(x=>x.id),candidate:candidateMeta,completedAt:end.toISOString(),finishReason:reason,submission:true};zip.file('assessment.json',JSON.stringify(manifest,null,2));state.questions.forEach((x,i)=>zip.file(`questions/${String(i+1).padStart(3,'0')}-${x.id}.json`,JSON.stringify(x,null,2)));for(const f of evidenceFrames)zip.file(f.name,f.blob);zip.file('camera-evidence.html',evidenceHtmlV20(end));zip.file('instruction.txt',instructionTextV19(reason,end)+'\nCamera Evidence: camera-evidence.html\n');zip.file('assessment-report.pdf',pdfBlob);return zip.generateAsync({type:'blob',compression:'DEFLATE',compressionOptions:{level:1}},metadata=>{if(onProgress)onProgress(Math.round(metadata.percent))})}
async function finishAssessmentV19(reason){if(finishV19Running)return;finishV19Running=true;autoExportStarted=true;clearInterval(timerHandle);captureEvidenceFrame();await new Promise(r=>setTimeout(r,250));stopEvidenceCapture();saveCurrent();const end=new Date(),base=safeName((candidateMeta?.rollNumber||state.setId||'assessment')+'-'+(candidateMeta?.fullName||'candidate'));let pdfBlob,zipBlob;const progressModal=document.createElement('div');progressModal.className='modal show';progressModal.style.zIndex='2147483647';progressModal.innerHTML=`<div class="setup-card" style="text-align:center;max-width:480px;padding:30px;"><h2 style="margin-top:0;color:var(--blue);">Creating Submission Package</h2><p style="margin:15px 0;font-weight:bold;line-height:1.5;color:var(--text);">Please wait for some minutes.<br>The process of ZIP and PDF creation is under progress...</p><div style="background:var(--soft);border-radius:10px;height:20px;width:100%;overflow:hidden;margin:20px 0;border:1px solid var(--line);"><div id="exportProgressBar" style="background:var(--blue);width:0%;height:100%;transition:width 0.1s ease;"></div></div><div id="exportProgressPercent" style="font-size:18px;font-weight:bold;color:var(--text);">0%</div></div>`;document.body.appendChild(progressModal);try{pdfBlob=await pdfBlobV19(reason,end);download(pdfBlob,base+'-completed.pdf');const evidenceHtml=evidenceHtmlV20(end);download(new Blob([evidenceHtml],{type:'text/html'}),base+'-camera-evidence.html');zipBlob=await completedZipBlobV19(reason,end,pdfBlob,percent=>{const bar=document.getElementById('exportProgressBar');const txt=document.getElementById('exportProgressPercent');if(bar)bar.style.width=percent+'%';if(txt)txt.textContent=percent+'%'});download(zipBlob,base+'-completed.zip');download(new Blob([instructionTextV19(reason,end)],{type:'text/plain'}),base+'-instruction.txt')}catch(e){console.error(e);toast('Export failed: '+e.message);finishV19Running=false;progressModal.remove();return}finally{progressModal.remove()}clearExamSession();localStorage.removeItem(EXAM_EVIDENCE_KEY);if(document.fullscreenElement)document.exitFullscreen().catch(()=>{});document.body.classList.add('submission-complete');const m=$('timeoutModal');m.querySelector('h2').textContent=reason==='timeout'?'Time is out':reason==='escape'?'Assessment ended by Esc':'Assessment finished';m.querySelector('p').textContent=`Share the exported PDF and ZIP within ${candidateMeta?.submissionMinutes||ownerConfig().submissionMinutes||10} minute(s) to ${candidateMeta?.ownerEmail||ownerConfig().email||'the exam owner email'}.`;const b=m.querySelector('button');b.textContent='Return to Import Screen';b.onclick=()=>location.reload();m.classList.add('show')}
finishAssessmentV18=finishAssessmentV19;finishLockedAssessment=()=>finishAssessmentV19('timeout');$('finishAssessment').onclick=()=>{if(confirm('Finish now? This ends the attempt and exports the PDF, ZIP, and instruction file.'))finishAssessmentV19('manual')};
let escapeArmed=true;document.addEventListener('keydown',e=>{if(candidateRunning&&e.key==='Escape'){/* Esc does not exit exam */}},true);
// Fullscreen exit does not exit assessment - candidate can continue exam
let clearingInProgress=false;
function autoSaveOnRefreshOrExit(){
  if(clearingInProgress)return;
  try{
    saveCurrent();
    const session=readExamSession();
    if(session&&session.started){
      writeExamSession({currentQuestion:current,active:true});
    }
  }catch(e){}
}
window.addEventListener('beforeunload',e=>{
  autoSaveOnRefreshOrExit();
  if(candidateRunning&&!finishV19Running&&!clearingInProgress){
    e.preventDefault();
    e.returnValue='Your active assessment changes are autosaved.';
  }
});
window.addEventListener('pagehide',autoSaveOnRefreshOrExit);
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden')autoSaveOnRefreshOrExit()});
const originalSetImportV19=$('setFile').onchange;$('setFile').onchange=async e=>{await originalSetImportV19.call($('setFile'),e);updateQuestionCountV19();setExamNavLocked(true)};

/* v19.1 fix: require candidate details/camera for every imported assessment and preserve metadata */
function validCandidateMetaV191(){return !!(candidateMeta&&candidateMeta.fullName&&candidateMeta.rollNumber&&candidateMeta.startTime)}
function restoreCandidateMetaV191(){try{const x=JSON.parse(localStorage.getItem(EXAM_EVIDENCE_KEY)||'null');if(x&&x.fullName&&x.rollNumber)candidateMeta=x}catch(e){}}
restoreCandidateMetaV191();
async function waitForVideoV191(video){if(video.readyState>=2&&video.videoWidth)return;await new Promise((resolve,reject)=>{const done=()=>{cleanup();resolve()},fail=()=>{cleanup();reject(Error('Camera preview could not start'))},cleanup=()=>{video.removeEventListener('loadeddata',done);video.removeEventListener('error',fail)};video.addEventListener('loadeddata',done,{once:true});video.addEventListener('error',fail,{once:true});setTimeout(()=>{cleanup();video.videoWidth?resolve():reject(Error('Camera preview timed out'))},5000)})}
openCandidateCamera=async function(){try{if(cameraStream)cameraStream.getTracks().forEach(t=>t.stop());cameraStream=await navigator.mediaDevices.getUserMedia({video:{width:{ideal:640},height:{ideal:360},facingMode:'user'},audio:true});const v=$('cameraPreview');v.srcObject=cameraStream;await v.play();await waitForVideoV191(v);$('cameraStatus').textContent='Camera is ready. Evidence capture will start after Ready to Exam.';updateCandidateStartState()}catch(e){cameraStream=null;$('cameraStatus').textContent='Camera could not start: '+e.message;$('candidateStart').disabled=true;toast('Open the app from http://127.0.0.1 or HTTPS and allow camera permission')}};
$('openCamera').onclick=openCandidateCamera;
captureEvidenceFrame=function(){if(!cameraStream||!candidateRunning)return;const v=$('cameraPreview');if(v.readyState<2||!v.videoWidth||!v.videoHeight)return;const c=document.createElement('canvas');c.width=480;c.height=270;const x=c.getContext('2d');x.drawImage(v,0,0,c.width,c.height);const now=new Date(),stamp=formatIST(now)+'.'+String(now.getMilliseconds()).padStart(3,'0');watermarkFrame(c,stamp);c.toBlob(blob=>{if(blob)evidenceFrames.push({name:`evidence/${String(evidenceFrames.length+1).padStart(6,'0')}_${now.toISOString().replace(/[:.]/g,'-')}.png`,blob,stamp})},'image/png')};
const startCandidateBeforeV191=startCandidateV19;
startCandidateV19=async function(){if(!cameraStream||$('cameraPreview').readyState<2)return toast('Open the camera and wait until the preview is visible');await startCandidateBeforeV191()};
$('candidateStart').onclick=startCandidateV19;
// Every imported assessment, locked or unlocked, must pass through candidate verification.
$('setFile').addEventListener('change',()=>setTimeout(()=>{if(!state?.questions?.length)return;clearInterval(timerHandle);assessmentStarted=false;candidateRunning=false;autoExportStarted=false;setCandidateToolbarLocked(false);setExamNavLocked(true);applyCandidateSecurity();showCandidateGateV19()},1300));
// Do not permit manual export/finish before identity and camera start are established.
$('finishAssessment').onclick=()=>{if(!validCandidateMetaV191()||!candidateRunning)return toast('Start the assessment with candidate details and camera before finishing');if(confirm('Finish now? This ends the attempt and exports the PDF, ZIP, and instruction file.'))finishAssessmentV19('manual')};
const finishAssessmentBeforeV191=finishAssessmentV19;
finishAssessmentV19=async function(reason){if(!validCandidateMetaV191()){finishV19Running=false;autoExportStarted=false;toast('Candidate details are missing. Return to the start screen and begin the assessment correctly.');return}return finishAssessmentBeforeV191(reason)};
finishAssessmentV18=finishAssessmentV19;finishLockedAssessment=()=>finishAssessmentV19('timeout');

/* v20 clear cookies, no forced fullscreen, keyboard-only code entry, and screen recording */
let screenStream=null,screenRecorder=null,screenChunks=[],screenRecordingBlob=null,screenRecordingStartedAt=null;
function clearAllAssessmentDataV20(){
  if(candidateRunning||isExamNavLocked()){
    const input=prompt('Enter password:');
    if(input!==EXAM_NAV_PASSWORD){
      if(input!==null)toast('Incorrect password. Action locked.');
      return;
    }
    if(!confirm('An assessment is active. Clearing data will end it. Continue?'))return;
  }
  clearingInProgress=true;
  try{stopEvidenceCapture()}catch(e){}
  try{stopScreenRecordingV20()}catch(e){}
  clearInterval(timerHandle);
  clearExamCookies();
  localStorage.removeItem(EXAM_SESSION_KEY);
  localStorage.removeItem(EXAM_STATE_KEY);
  localStorage.removeItem(EXAM_EVIDENCE_KEY);
  localStorage.removeItem('ide_header_nav_locked');
  localStorage.removeItem('fend_header_nav_locked');
  localStorage.removeItem('fend_problem_width_px');
  localStorage.removeItem('fend_work_editor_ratio');
  localStorage.removeItem('fend_work_split_mode');
  localStorage.removeItem('fend_editor_font_size');
  localStorage.removeItem('fend_editor_height_px');
  sessionStorage.clear();
  candidateMeta=null;
  evidenceFrames=[];
  candidateRunning=false;
  packageProtected=false;
  assessmentStarted=false;
  autoExportStarted=false;
  candidateSequentialMode=false;
  history=[];
  frontConsoleEntries=[];
  if(typeof setExamNavLocked==='function')setExamNavLocked(false);
  if(typeof setHeaderNavLocked==='function')setHeaderNavLocked(false);
  if(typeof setCandidateToolbarLocked==='function')setCandidateToolbarLocked(false);
  const emptyState=getEmptyAssessmentState();
  state=emptyState;
  current=0;
  problem.innerHTML='';
  code.value='';
  cssEditor.value='';
  jsEditor.value='';
  $('questionTitle').textContent='Question 1';
  $('questionId').textContent=state.questions[0].id;
  $('setIdText').textContent=state.setId;
  $('timerMinutes').value=60;
  remaining=3600;
  if(typeof tick==='function')tick();
  updateLines();
  updateFrontLines();
  syncQuestionDarkText();
  previewFrame.srcdoc='';
  if($('empty'))$('empty').hidden=false;
  renderFrontConsole();
  renderHistory();
  renderTests();
  renderSteps();
  if(typeof updateQuestionCountV19==='function')updateQuestionCountV19();
  $('liveStatus').textContent='Ready';
  localStorage.setItem(EXAM_STATE_KEY,JSON.stringify(emptyState));
  toast('All cookies, session data, and workspace cleared');
  setTimeout(()=>{clearingInProgress=false},500);
}
$('clearExamData').onclick=clearAllAssessmentDataV20;
async function openScreenCaptureV20(){try{if(!navigator.mediaDevices?.getDisplayMedia)throw Error('Screen sharing is not supported by this browser');if(screenStream)screenStream.getTracks().forEach(t=>t.stop());screenStream=await navigator.mediaDevices.getDisplayMedia({video:{frameRate:{ideal:8,max:12}},audio:true});const v=$('screenPreview');v.srcObject=screenStream;await v.play();$('screenStatus').textContent='Screen sharing is ready. Select the exam screen or browser tab and keep sharing until submission.';screenStream.getVideoTracks()[0].addEventListener('ended',()=>{if(candidateRunning&&!finishV20Running){$('screenStatus').textContent='Screen sharing stopped. The assessment will be finished.';finishAssessmentV20('screen-share-stopped')}});updateCandidateStartStateV20()}catch(e){screenStream=null;$('screenStatus').textContent='Screen sharing could not start: '+e.message;$('candidateStart').disabled=true;toast('Screen sharing permission is required for this configured assessment')}}
$('openScreen').onclick=openScreenCaptureV20;
function updateCandidateStartStateV20(){const ok=$('candidateName').value.trim()&&$('candidateRoll').value.trim()&&$('cameraConsent').checked&&$('screenConsent').checked&&cameraStream&&screenStream&&$('cameraPreview').readyState>=2&&$('screenPreview').readyState>=2;$('candidateStart').disabled=!ok}
updateCandidateStartState=updateCandidateStartStateV20;
['candidateName','candidateRoll','cameraConsent','screenConsent'].forEach(id=>$(id).addEventListener('input',updateCandidateStartStateV20));
const openCameraBeforeV20=openCandidateCamera;openCandidateCamera=async function(){await openCameraBeforeV20();updateCandidateStartStateV20()};$('openCamera').onclick=openCandidateCamera;
function startScreenRecordingV20(){screenChunks=[];screenRecordingBlob=null;screenRecordingStartedAt=new Date();let mime='';for(const type of ['video/webm;codecs=vp9','video/webm;codecs=vp8','video/webm']){if(MediaRecorder.isTypeSupported(type)){mime=type;break}}const recordingTracks=[];if(screenStream){recordingTracks.push(...screenStream.getVideoTracks());recordingTracks.push(...screenStream.getAudioTracks())}if(cameraStream){recordingTracks.push(...cameraStream.getAudioTracks())}const recordingStream=new MediaStream(recordingTracks);screenRecorder=new MediaRecorder(recordingStream,mime?{mimeType:mime,videoBitsPerSecond:450000}:{videoBitsPerSecond:450000});screenRecorder.ondataavailable=e=>{if(e.data&&e.data.size)screenChunks.push(e.data)};screenRecorder.onstop=()=>{screenRecordingBlob=new Blob(screenChunks,{type:'video/mp4'})};screenRecorder.start(1000);$('screenStatus').textContent='Screen recording is active.'}
function stopScreenRecordingV20(){return new Promise(resolve=>{if(screenRecorder&&screenRecorder.state!=='inactive'){screenRecorder.addEventListener('stop',()=>resolve(),{once:true});screenRecorder.stop()}else resolve();if(screenStream){screenStream.getTracks().forEach(t=>t.stop());screenStream=null}})}
// Fullscreen is intentionally not requested after exam start.
requestExamFullscreen=async function(){};
const startCandidateBeforeV20=startCandidateV19;startCandidateV19=async function(){if(!screenStream||$('screenPreview').readyState<2)return toast('Share the exam screen and wait until the preview is visible');if(!$('screenConsent').checked)return toast('Screen-recording consent is required');await startCandidateBeforeV20();startScreenRecordingV20()};$('candidateStart').onclick=startCandidateV19;
// During an active exam, typing is allowed only in the code editor. Clipboard operations and context menus are blocked everywhere.
function blockExamInputV20(e){if(e.target&&e.target.closest&&(e.target.closest('.modal')||e.target.closest('.test-card.student-extra')||e.target.closest('.work-splitter')||e.target.closest('.main-vertical-splitter')))return;if(!candidateRunning)return;if(['copy','cut','paste','drop','dragstart'].includes(e.type)){e.preventDefault();e.stopImmediatePropagation();toast('Copy, paste, drag, and drop are disabled during the assessment');return}if(e.type==='beforeinput'&&e.target!==code&&e.target!==cssEditor&&e.target!==jsEditor){e.preventDefault();e.stopImmediatePropagation();return}if(e.type==='keydown'){const navigation=['Tab','Shift','Control','Alt','Meta','CapsLock','ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home','End','PageUp','PageDown','Backspace','Delete','Enter'];const shortcut=e.ctrlKey||e.metaKey||e.altKey;if(e.target!==code&&e.target!==cssEditor&&e.target!==jsEditor&&!navigation.includes(e.key)){e.preventDefault();e.stopImmediatePropagation()}if(shortcut&&['v','V','c','C','x','X','a','A','s','S','p','P'].includes(e.key)){e.preventDefault();e.stopImmediatePropagation();toast('Keyboard shortcuts are disabled during the assessment')}}}
['copy','cut','paste','drop','dragstart','beforeinput','keydown'].forEach(t=>document.addEventListener(t,blockExamInputV20,true));
document.addEventListener('contextmenu',e=>{if(e.target&&e.target.closest&&(e.target.closest('.modal')||e.target.closest('.test-card.student-extra')||e.target.closest('.work-splitter')||e.target.closest('.main-vertical-splitter')))return;if(candidateRunning){e.preventDefault();e.stopImmediatePropagation();toast('Right-click is disabled during the assessment')}},true);
// Remove all exam termination behavior related to Escape or fullscreen changes.
escapeArmed=true;
let finishV20Running=false;
const originalReportHtmlV19=reportHtmlV19;
function reportHtmlV20(reason,end){const base=originalReportHtmlV19(reason,end);return base.replace('<h2>Camera Evidence</h2><div id="evidenceShots"></div>','<h2>Camera Evidence</h2><div id="evidenceShots"></div><h2>Screen Recording</h2><p>The completed ZIP contains the screen recording in the screen-recording folder. Recording format: MP4. Start (IST): '+esc(formatIST(screenRecordingStartedAt)||'')+'. End (IST): '+esc(formatIST(end))+'.</p>')}
reportHtmlV19=reportHtmlV20;
async function completedZipBlobV20(reason,end,pdfBlob,onProgress){saveCurrent();const zip=new JSZip(),manifest={...state,questions:undefined,questionIds:state.questions.map(x=>x.id),candidate:candidateMeta,completedAt:end.toISOString(),finishReason:reason,submission:true,screenRecording:{file:'screen-recording/exam-screen.mp4',startedAt:screenRecordingStartedAt?.toISOString()||'',endedAt:end.toISOString()}};zip.file('assessment.json',JSON.stringify(manifest,null,2));state.questions.forEach((x,i)=>zip.file(`questions/${String(i+1).padStart(3,'0')}-${x.id}.json`,JSON.stringify(x,null,2)));for(const f of evidenceFrames)zip.file(f.name,f.blob);zip.file('camera-evidence.html',evidenceHtmlV20(end));zip.file('instruction.txt',instructionTextV19(reason,end)+'\nScreen Recording: screen-recording/exam-screen.mp4\nCamera Evidence: camera-evidence.html\n');zip.file('assessment-report.pdf',pdfBlob);if(screenRecordingBlob?.size)zip.file('screen-recording/exam-screen.mp4',screenRecordingBlob);return zip.generateAsync({type:'blob',compression:'DEFLATE',compressionOptions:{level:1}},metadata=>{if(onProgress)onProgress(Math.round(metadata.percent))})}
completedZipBlobV19=completedZipBlobV20;
const finishBeforeV20=finishAssessmentV19;finishAssessmentV20=async function(reason){if(finishV20Running)return;finishV20Running=true;await stopScreenRecordingV20();finishV19Running=false;return finishBeforeV20(reason)};
finishAssessmentV19=finishAssessmentV20;finishAssessmentV18=finishAssessmentV20;finishLockedAssessment=()=>finishAssessmentV20('timeout');$('finishAssessment').onclick=()=>{if(!validCandidateMetaV191()||!candidateRunning)return toast("Start the assessment with candidate details, camera, and screen sharing before finishing");if(confirm('Finish now? This ends the attempt and exports the PDF, ZIP, instruction file, camera evidence, and screen recording.'))finishAssessmentV20('manual')};


/* v21 front-end coding workspace: HTML, CSS, JavaScript live preview and console */
const cssEditor=$('cssCode'),jsEditor=$('jsCode'),previewFrame=$('previewFrame');
let activeFrontEditor='html',frontRefreshTimer=null,frontConsoleEntries=[];
state.format='frontend-assessment-set';state.title=state.title==='Python Assessment'?'Front-End Assessment':state.title;state.questions.forEach(ensureFrontFields);
const saveCurrentBeforeFront=saveCurrent;
saveCurrent=function(){const x=q();if(!x)return;x.problemHtml=problem.innerHTML;x.frontEndHtml=code.value;x.frontEndCss=cssEditor.value;x.frontEndJs=jsEditor.value;x.code=x.frontEndHtml;x.language='html';save()};
const openQuestionBeforeFront=openQuestion;
openQuestion=function(i){openQuestionBeforeFront(i);const x=q();ensureFrontFields(x);code.value=x.frontEndHtml;cssEditor.value=x.frontEndCss;jsEditor.value=x.frontEndJs;activateFrontEditor(activeFrontEditor,false);scheduleFrontPreview(true);updateMobileFloatingNextUI()};
function frontEditor(kind){return kind==='css'?cssEditor:kind==='javascript'?jsEditor:code}
function updateFrontLines(){const editor=frontEditor(activeFrontEditor);lines.textContent=Array.from({length:editor.value.split('\n').length},(_,i)=>i+1).join('\n');lines.scrollTop=editor.scrollTop}
function activateFrontEditor(kind,focus=true){
  activeFrontEditor=kind;
  document.querySelectorAll('.editor-tab').forEach(b=>{
    const on=b.dataset.editor===kind;
    b.classList.toggle('active',on);
    b.setAttribute('aria-selected',String(on));
  });
  document.querySelectorAll('.frontend-code').forEach(e=>e.classList.toggle('active',e.dataset.kind===kind));
  updateFrontLines();
  if(focus){
    const el=frontEditor(kind);
    el.focus();
    try {
      el.setSelectionRange(0, 0);
    } catch(err) {}
    el.scrollTop = 0;
    el.scrollLeft = 0;
    lines.scrollTop = 0;
  }
}
document.querySelectorAll('.editor-tab').forEach(b=>b.onclick=()=>activateFrontEditor(b.dataset.editor));
for(const editor of [code,cssEditor,jsEditor]){
  editor.oninput=()=>{
    updateFrontLines();
    saveCurrent();
    if($('autoRefresh').checked)scheduleFrontPreview();
  };
  editor.onscroll=()=>lines.scrollTop=editor.scrollTop;
  editor.onkeydown=e=>{
    if(e.key==='Tab'){
      e.preventDefault();
      editor.setRangeText('  ',editor.selectionStart,editor.selectionEnd,'end');
      updateFrontLines();
      saveCurrent();
      if($('autoRefresh').checked)scheduleFrontPreview();
    }
    if((e.ctrlKey||e.metaKey)&&e.key==='Enter'){
      e.preventDefault();
      refreshFrontPreview();
    }
  };
}
function consoleValue(v){if(v instanceof Error)return v.stack||v.message;try{return typeof v==='string'?v:JSON.stringify(v,null,2)}catch(e){return String(v)}}
function addFrontConsole(level,args){const stamp=new Date().toLocaleTimeString(),text=args.map(consoleValue).join(' ');frontConsoleEntries.push({level,text,stamp});if(frontConsoleEntries.length>300)frontConsoleEntries.shift();renderFrontConsole()}
function renderFrontConsole(){const c=$('console');c.innerHTML=frontConsoleEntries.length?frontConsoleEntries.map(e=>`<div class="console-entry ${esc(e.level)}"><b>[${esc(e.stamp)}] ${esc(e.level.toUpperCase())}</b> ${esc(e.text)}</div>`).join(''):'<span class="console-empty">Console is clear. Preview errors and console messages will appear here.</span>';$('consoleCount').textContent=frontConsoleEntries.length;c.scrollTop=c.scrollHeight}
function clearFrontConsole(){frontConsoleEntries=[];renderFrontConsole();toast('Console erased')}
function previewDocument(){
  let markup=code.value||'';
  const cssVal=cssEditor.value||'';
  const jsVal=jsEditor.value||'';
  const isDark=document.body.classList.contains('dark');
  if(!markup.trim()&&!cssVal.trim()&&!jsVal.trim()){
    return isDark?`<!doctype html><html><head><meta charset="utf-8"><style>:root{color-scheme:dark;}body{margin:0;min-height:100vh;background:#0f172a;color:#94a3b8;display:flex;align-items:center;justify-content:center;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;font-size:13px;}</style></head><body><div style="opacity:0.6;">Preview will appear here</div></body></html>`:''
  }
  const baseThemeStyle=isDark?`<style id="assessment-base-theme">:root{color-scheme:dark;}body{background-color:#0f172a;color:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;margin:0;min-height:100vh;}</style>`:'';
  const style=`${baseThemeStyle}\n<style id="assessment-live-css">${cssVal}</style>`;
  const bridge=`<script>(function(){const send=(level,args)=>parent.postMessage({source:'front-assessment-console',level,args:Array.from(args).map(v=>{try{return typeof v==='string'?v:JSON.stringify(v)}catch(e){return String(v)}})},'*');['log','info','warn','error'].forEach(level=>{const original=console[level];console[level]=function(){send(level,arguments);original.apply(console,arguments)}});window.addEventListener('error',e=>send('error',[e.message+' at '+e.filename+':'+e.lineno+':'+e.colno]));window.addEventListener('unhandledrejection',e=>send('error',['Unhandled promise rejection: '+String(e.reason)]));})();<\/script>`;
  const script=`<script>${jsVal}<\/script>`;
  if(/<\/head\s*>/i.test(markup))markup=markup.replace(/<\/head\s*>/i,style+'\n'+bridge+'\n</head>');else markup=style+bridge+markup;
  if(/<\/body\s*>/i.test(markup))markup=markup.replace(/<\/body\s*>/i,script+'\n</body>');else markup+=script;
  return markup;
}
function refreshFrontPreview(){saveCurrent();frontConsoleEntries=[];renderFrontConsole();previewFrame.srcdoc=previewDocument();$('liveStatus').textContent='Refreshed '+new Date().toLocaleTimeString();history.unshift({id:q().id,result:'Preview refreshed',time:new Date().toLocaleTimeString()});renderHistory()}
function scheduleFrontPreview(immediate=false){clearTimeout(frontRefreshTimer);$('liveStatus').textContent='Changes pending';frontRefreshTimer=setTimeout(refreshFrontPreview,immediate?0:Number($('refreshDelay').value||350))}
window.addEventListener('message',e=>{if(e.data?.source==='front-assessment-console')addFrontConsole(e.data.level||'log',e.data.args||[])});
$('runCustom').onclick=refreshFrontPreview;$('refreshPreview').onclick=refreshFrontPreview;$('clearConsole').onclick=clearFrontConsole;$('clearConsoleSecondary').onclick=clearFrontConsole;$('refreshDelay').onchange=()=>{if($('autoRefresh').checked)scheduleFrontPreview()};$('autoRefresh').onchange=()=>{toast($('autoRefresh').checked?'Auto refresh enabled':'Auto refresh paused');if($('autoRefresh').checked)scheduleFrontPreview(true)};
if ($('resultFullscreen')) $('resultFullscreen').onclick = () => toggleResultFullscreen();
if ($('codeFullscreen')) $('codeFullscreen').onclick = () => toggleCodeFullscreen();
function applyEditorFontSize(size) {
  const s = Math.max(11, Math.min(28, size));
  const lh = (s + 7) + 'px';
  for (const e of [code, cssEditor, jsEditor]) {
    if (e) {
      e.style.setProperty('font-size', s + 'px', 'important');
      e.style.setProperty('line-height', lh, 'important');
    }
  }
  if (lines) {
    lines.style.setProperty('font-size', s + 'px', 'important');
    lines.style.setProperty('line-height', lh, 'important');
  }
  localStorage.setItem('fend_editor_font_size', String(s));
  if (typeof updateFrontLines === 'function') updateFrontLines();
}

function changeFrontFont(delta) {
  const currentSize = parseInt(getComputedStyle(code).fontSize, 10) || 14;
  const newSize = Math.max(11, Math.min(28, currentSize + delta));
  applyEditorFontSize(newSize);
  toast(`Editor text size: ${newSize}px`);
}

// Initialize saved font size on startup
(function restoreEditorFontSize() {
  const saved = localStorage.getItem('fend_editor_font_size');
  if (saved) {
    const s = parseInt(saved, 10);
    if (!isNaN(s) && s >= 11 && s <= 28) applyEditorFontSize(s);
  }
})();

if ($('fontUp')) $('fontUp').onclick = () => changeFrontFont(1);
if ($('fontDown')) $('fontDown').onclick = () => changeFrontFont(-1);
runAll=refreshFrontPreview;$('runTests').onclick=refreshFrontPreview;
function frontCodeReport(x){ensureFrontFields(x);return `<h3>HTML</h3><pre>${esc(x.frontEndHtml)}</pre><h3>CSS</h3><pre>${esc(x.frontEndCss)}</pre><h3>JavaScript</h3><pre>${esc(x.frontEndJs)}</pre>`}
reportHtml17=function(){saveCurrent();return `<!doctype html><html><head><meta charset="utf-8"><title>${esc(state.title||'Front-End Assessment Report')}</title></head><body><h1>${esc(state.title||'Front-End Assessment Report')}</h1><p><b>Generated At (IST):</b> ${esc(formatIST(new Date()))}</p>${state.questions.map((x,i)=>`<article><h2>Question ${i+1}</h2><div>${x.problemHtml||''}</div>${frontCodeReport(x)}</article>`).join('')}</body></html>`};
reportHtmlV19=function(reason,end){const c=candidateMeta||{};return `<!doctype html><html><head><meta charset="utf-8"><style>body{font-family:Arial;margin:24px;color:#102a43}pre{white-space:pre-wrap;border:1px solid #ccc;padding:12px}.meta{border:1px solid #9fb3c8;padding:12px}</style></head><body><h1>Front-End Assessment Submission Report</h1><div class="meta"><b>Full Name:</b> ${esc(c.fullName||'')}<br><b>Roll Number:</b> ${esc(c.rollNumber||'')}<br><b>Exam Start (IST):</b> ${esc(formatIST(c.startTime))}<br><b>Exam End (IST):</b> ${esc(formatIST(end))}<br><b>Finish Reason:</b> ${esc(reason)}</div>${state.questions.map((x,i)=>`<article><h2>Question ${i+1}</h2><div>${x.problemHtml||''}</div>${frontCodeReport(x)}</article>`).join('')}<h2>Camera Evidence</h2><div id="evidenceShots"></div><h2>Screen Recording</h2><p>The completed ZIP contains the screen recording when capture is enabled.</p></body></html>`};
renderFrontConsole();openQuestion(current);save();


/* v22 teacher complete JSON backup and restore */
const COMPLETE_JSON_FORMAT='frontend-assessment-complete-json';
function completeJsonPayload(){
  saveCurrent();
  state.questions.forEach(ensureFrontFields);
  return {
    format:COMPLETE_JSON_FORMAT,
    version:1,
    exportedAt:new Date().toISOString(),
    assessment:state
  };
}
function validateCompleteJsonPayload(packet){
  const restored=packet?.assessment||packet;
  if(!restored||!Array.isArray(restored.questions)||!restored.questions.length)throw Error('The JSON does not contain assessment questions.');
  for(const item of restored.questions){
    if(!item||typeof item!=='object')throw Error('The JSON contains an invalid question.');
    item.id=item.id||uid();
    item.problemHtml=typeof item.problemHtml==='string'?item.problemHtml:'';
    item.customFonts=Array.isArray(item.customFonts)?item.customFonts:[];
    item.tests=Array.isArray(item.tests)?item.tests:[];
    ensureFrontFields(item);
  }
  return restored;
}
$('exportAllJson').onclick=()=>{
  if(candidateRunning)return toast('Export JSON is available in teacher access only');
  const payload=completeJsonPayload();
  const name=safeName(state.setId||'front-end-assessment')+'-all-questions.json';
  download(new Blob([JSON.stringify(payload,null,2)],{type:'application/json'}),name);
  toast('Complete assessment JSON exported');
};
function applyCompleteJsonPacket(packet, showToast = true) {
  const restored = validateCompleteJsonPayload(packet);
  clearInterval(timerHandle);
  state = restored;
  state.format = 'frontend-assessment-set';
  if (!state.setId) state.setId = `SET-${Date.now().toString(36).toUpperCase()}`;
  if (!state.title) state.title = 'Front-End Assessment';
  state.timerMinutes = Math.max(1, Number(state.timerMinutes) || 60);
  state.questions.forEach(ensureFrontFields);
  current = 0;
  history = [];
  candidateSequentialMode = false;
  candidateRunning = false;
  packageProtected = false;
  assessmentStarted = false;
  autoExportStarted = false;
  $('setIdText').textContent = state.setId;
  $('timerMinutes').value = state.timerMinutes;
  setCandidateToolbarLocked(false);
  document.body.classList.remove('candidate-sequential', 'candidate-running', 'timer-waiting', 'timer-finished', 'submission-complete');
  openQuestion(0);
  updateTimerLockUI();
  applyCustomFreeze();
  save();
  if (showToast) {
    toast(`Imported ${state.questions.length} question${state.questions.length === 1 ? '' : 's'} from JSON`);
  }
}

$('importAllJson').onclick = () => {
  if (candidateRunning) return toast('Import JSON is available in teacher access only');
  $('allJsonFile').click();
};
$('allJsonFile').onchange = async e => {
  const file = e.target.files?.[0];
  if (!file) return;
  try {
    const packet = JSON.parse(await file.text());
    applyCompleteJsonPacket(packet, true);
  } catch (err) {
    console.error(err);
    toast(err.message || 'Invalid assessment JSON file');
  } finally {
    e.target.value = '';
  }
};

/* Welcome / Desktop mode recommendation dialog & Mock Data Import */
async function loadSampleMockData() {
  try {
    const res = await fetch('SET-MUK5KO3I-all-questions.json');
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn('Fetch local mock data failed, using embedded mock data:', err);
  }
  return SAMPLE_MOCK_DATA;
}

const welcomeModal = $('welcomeModal');
function closeWelcomeDialog() {
  if (welcomeModal) welcomeModal.classList.remove('show');
}
if ($('closeWelcomeModal')) $('closeWelcomeModal').onclick = closeWelcomeDialog;
if ($('dismissWelcomeModal')) $('dismissWelcomeModal').onclick = closeWelcomeDialog;
if ($('tryMockData')) {
  $('tryMockData').onclick = async e => {
    e.preventDefault();
    if (candidateRunning) return;
    try {
      const packet = await loadSampleMockData();
      applyCompleteJsonPacket(packet, false);
      closeWelcomeDialog();
    } catch (err) {
      console.error(err);
      closeWelcomeDialog();
    }
  };
}
if (welcomeModal) {
  welcomeModal.addEventListener('click', e => {
    if (e.target === welcomeModal) closeWelcomeDialog();
  });
}
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && welcomeModal && welcomeModal.classList.contains('show')) {
    closeWelcomeDialog();
  }
});

/* Flexible Horizontal Workspace Splitter (Drag up/down to see code & result simultaneously) */
function initWorkSplitter() {
  const splitter = $('workSplitter');
  const workArea = document.querySelector('.frontend-work');
  const editorCard = document.querySelector('.frontend-editor-card');
  const previewFrame = $('previewFrame');
  if (!splitter || !workArea || !editorCard) return;

  function applySavedHeight() {
    if (window.innerWidth <= 1050) {
      editorCard.style.height = '';
      editorCard.style.flex = '';
      return;
    }
    const saved = localStorage.getItem('fend_editor_height_px');
    if (saved) {
      const h = parseInt(saved, 10);
      const minH = 110;
      const maxH = Math.max(minH + 50, (workArea.clientHeight || window.innerHeight * 0.7) - 150);
      if (!isNaN(h) && h >= minH && h <= maxH) {
        editorCard.style.height = h + 'px';
        editorCard.style.flex = `0 0 ${h}px`;
        if (typeof updateFrontLines === 'function') updateFrontLines();
      }
    }
  }
  applySavedHeight();
  window.addEventListener('resize', applySavedHeight);

  let isDragging = false;
  let startY = 0;
  let startHeight = 0;

  function onDragStart(e) {
    if (window.innerWidth <= 1050) return;
    isDragging = true;
    startY = e.clientY || (e.touches && e.touches[0]?.clientY) || 0;
    startHeight = editorCard.getBoundingClientRect().height;
    splitter.classList.add('dragging');
    document.body.classList.add('is-resizing');
    if (previewFrame) previewFrame.style.pointerEvents = 'none';

    window.addEventListener('pointermove', onDragMove, { passive: false });
    window.addEventListener('pointerup', onDragEnd);
    window.addEventListener('touchmove', onDragMove, { passive: false });
    window.addEventListener('touchend', onDragEnd);
  }

  function onDragMove(e) {
    if (!isDragging) return;
    if (e.cancelable) e.preventDefault();
    const clientY = e.clientY || (e.touches && e.touches[0]?.clientY) || 0;
    const deltaY = clientY - startY;
    const workRect = workArea.getBoundingClientRect();
    const minHeight = 110;
    const maxHeight = Math.max(minHeight + 60, workRect.height - 140);
    const newHeight = Math.round(Math.max(minHeight, Math.min(maxHeight, startHeight + deltaY)));

    editorCard.style.height = newHeight + 'px';
    editorCard.style.flex = `0 0 ${newHeight}px`;
    if (typeof updateFrontLines === 'function') updateFrontLines();
  }

  function onDragEnd() {
    if (!isDragging) return;
    isDragging = false;
    splitter.classList.remove('dragging');
    document.body.classList.remove('is-resizing');
    if (previewFrame) previewFrame.style.pointerEvents = '';

    window.removeEventListener('pointermove', onDragMove);
    window.removeEventListener('pointerup', onDragEnd);
    window.removeEventListener('touchmove', onDragMove);
    window.removeEventListener('touchend', onDragEnd);

    const finalH = parseInt(editorCard.style.height, 10);
    if (!isNaN(finalH)) {
      localStorage.setItem('fend_editor_height_px', String(finalH));
    }
  }

  splitter.addEventListener('pointerdown', onDragStart);
  splitter.addEventListener('touchstart', onDragStart, { passive: false });

  // Double-click to toggle between 50/50 balance and large result output
  splitter.addEventListener('dblclick', () => {
    if (window.innerWidth <= 1050) return;
    const workRect = workArea.getBoundingClientRect();
    const currentH = editorCard.getBoundingClientRect().height;
    const halfH = Math.round((workRect.height - 80) * 0.48);
    const largeResultH = Math.round((workRect.height - 80) * 0.28);
    const largeCodeH = Math.round((workRect.height - 80) * 0.68);

    let nextH;
    if (Math.abs(currentH - halfH) <= 30) {
      nextH = largeResultH; // Give max space to result
    } else if (Math.abs(currentH - largeResultH) <= 30) {
      nextH = largeCodeH; // Give max space to code
    } else {
      nextH = halfH; // Back to balanced 50/50
    }

    editorCard.style.height = nextH + 'px';
    editorCard.style.flex = `0 0 ${nextH}px`;
    localStorage.setItem('fend_editor_height_px', String(nextH));
    if (typeof updateFrontLines === 'function') updateFrontLines();
    toast(`Layout adjusted: ${Math.round((nextH / (workRect.height - 80)) * 100)}% Code / ${100 - Math.round((nextH / (workRect.height - 80)) * 100)}% Result`);
  });

  // Keyboard support: Up / Down arrow keys when focused on splitter
  splitter.addEventListener('keydown', e => {
    if (window.innerWidth <= 1050) return;
    const step = e.shiftKey ? 40 : 15;
    const workRect = workArea.getBoundingClientRect();
    let currentH = parseInt(editorCard.style.height, 10) || editorCard.getBoundingClientRect().height;
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const nextH = Math.max(110, currentH - step);
      editorCard.style.height = nextH + 'px';
      editorCard.style.flex = `0 0 ${nextH}px`;
      localStorage.setItem('fend_editor_height_px', String(nextH));
      if (typeof updateFrontLines === 'function') updateFrontLines();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextH = Math.min(workRect.height - 140, currentH + step);
      editorCard.style.height = nextH + 'px';
      editorCard.style.flex = `0 0 ${nextH}px`;
      localStorage.setItem('fend_editor_height_px', String(nextH));
      if (typeof updateFrontLines === 'function') updateFrontLines();
    }
  });
}
initWorkSplitter();

/* Flexible Main Vertical Workspace Splitter (Drag left/right to resize Question Panel & Code/Output section) */
function initMainVerticalSplitter() {
  const splitter = $('mainVerticalSplitter');
  const mainWorkspace = document.querySelector('main');
  const problemPanel = $('problemPanel');
  const previewFrame = $('previewFrame');
  if (!splitter || !mainWorkspace || !problemPanel) return;

  function applySavedWidth() {
    if (window.innerWidth <= 1050) {
      problemPanel.style.width = '';
      problemPanel.style.flex = '';
      return;
    }
    const saved = localStorage.getItem('fend_problem_width_px');
    if (saved) {
      const w = parseInt(saved, 10);
      const minW = 180;
      const maxW = Math.max(minW + 100, (mainWorkspace.clientWidth || window.innerWidth * 0.95) - 260);
      if (!isNaN(w) && w >= minW && w <= maxW) {
        problemPanel.style.width = w + 'px';
        problemPanel.style.flex = `0 0 ${w}px`;
        if (typeof updateFrontLines === 'function') updateFrontLines();
      }
    }
  }
  applySavedWidth();
  window.addEventListener('resize', applySavedWidth);

  let isDragging = false;
  let startX = 0;
  let startWidth = 0;

  function onDragStart(e) {
    if (window.innerWidth <= 1050) return;
    isDragging = true;
    startX = e.clientX || (e.touches && e.touches[0]?.clientX) || 0;
    startWidth = problemPanel.getBoundingClientRect().width;
    splitter.classList.add('dragging');
    document.body.classList.add('is-col-resizing');
    if (previewFrame) previewFrame.style.pointerEvents = 'none';

    window.addEventListener('pointermove', onDragMove, { passive: false });
    window.addEventListener('pointerup', onDragEnd);
    window.addEventListener('touchmove', onDragMove, { passive: false });
    window.addEventListener('touchend', onDragEnd);
  }

  function onDragMove(e) {
    if (!isDragging) return;
    if (e.cancelable) e.preventDefault();
    const clientX = e.clientX || (e.touches && e.touches[0]?.clientX) || 0;
    const deltaX = clientX - startX;
    const mainRect = mainWorkspace.getBoundingClientRect();
    const minWidth = 180;
    const maxWidth = Math.max(minWidth + 100, mainRect.width - 240);
    const newWidth = Math.round(Math.max(minWidth, Math.min(maxWidth, startWidth + deltaX)));

    problemPanel.style.width = newWidth + 'px';
    problemPanel.style.flex = `0 0 ${newWidth}px`;
    if (typeof updateFrontLines === 'function') updateFrontLines();
  }

  function onDragEnd() {
    if (!isDragging) return;
    isDragging = false;
    splitter.classList.remove('dragging');
    document.body.classList.remove('is-col-resizing');
    if (previewFrame) previewFrame.style.pointerEvents = '';

    window.removeEventListener('pointermove', onDragMove);
    window.removeEventListener('pointerup', onDragEnd);
    window.removeEventListener('touchmove', onDragMove);
    window.removeEventListener('touchend', onDragEnd);

    const finalW = parseInt(problemPanel.style.width, 10);
    if (!isNaN(finalW)) {
      localStorage.setItem('fend_problem_width_px', String(finalW));
    }
  }

  splitter.addEventListener('pointerdown', onDragStart);
  splitter.addEventListener('touchstart', onDragStart, { passive: false });

  // Double-click to cycle through presets: 42/58 (standard), 26/74 (compact question, huge IDE), 58/42 (large question)
  splitter.addEventListener('dblclick', () => {
    if (window.innerWidth <= 1050) return;
    const mainRect = mainWorkspace.getBoundingClientRect();
    const currentW = problemPanel.getBoundingClientRect().width;
    const standardW = Math.round(mainRect.width * 0.42);
    const compactQuestionW = Math.round(mainRect.width * 0.26);
    const largeQuestionW = Math.round(mainRect.width * 0.58);

    let nextW;
    if (Math.abs(currentW - standardW) <= 35) {
      nextW = compactQuestionW; // Compact question, maximize code & output
    } else if (Math.abs(currentW - compactQuestionW) <= 35) {
      nextW = largeQuestionW; // Large question view
    } else {
      nextW = standardW; // Back to standard 42%
    }

    problemPanel.style.width = nextW + 'px';
    problemPanel.style.flex = `0 0 ${nextW}px`;
    localStorage.setItem('fend_problem_width_px', String(nextW));
    if (typeof updateFrontLines === 'function') updateFrontLines();
    toast(`Layout adjusted: ${Math.round((nextW / mainRect.width) * 100)}% Question / ${100 - Math.round((nextW / mainRect.width) * 100)}% Workspace`);
  });

  // Keyboard support: Left / Right arrow keys when focused on vertical splitter
  splitter.addEventListener('keydown', e => {
    if (window.innerWidth <= 1050) return;
    const step = e.shiftKey ? 40 : 15;
    const mainRect = mainWorkspace.getBoundingClientRect();
    let currentW = parseInt(problemPanel.style.width, 10) || problemPanel.getBoundingClientRect().width;
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const nextW = Math.max(180, currentW - step);
      problemPanel.style.width = nextW + 'px';
      problemPanel.style.flex = `0 0 ${nextW}px`;
      localStorage.setItem('fend_problem_width_px', String(nextW));
      if (typeof updateFrontLines === 'function') updateFrontLines();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      const nextW = Math.min(mainRect.width - 240, currentW + step);
      problemPanel.style.width = nextW + 'px';
      problemPanel.style.flex = `0 0 ${nextW}px`;
      localStorage.setItem('fend_problem_width_px', String(nextW));
      if (typeof updateFrontLines === 'function') updateFrontLines();
    }
  });
}
initMainVerticalSplitter();

/* 5-second Auto-Dismiss for Media/Paste Note */
let mediaNoteTimer = null;
function showMediaNoteWithTimer(duration = 5000) {
  const note = $('mediaNote') || document.querySelector('.media-note');
  if (!note) return;
  note.classList.remove('fade-out');
  clearTimeout(mediaNoteTimer);
  mediaNoteTimer = setTimeout(() => {
    note.classList.add('fade-out');
  }, duration);
}

// Trigger 5-second display on startup
showMediaNoteWithTimer(5000);

// Re-display for 5 seconds if media actions are triggered
['insertImage', 'insertVideo', 'insertFont'].forEach(id => {
  if ($(id)) $(id).addEventListener('click', () => showMediaNoteWithTimer(5000));
});

/* ==========================================================================
   MOBILE KEYBOARD AUTO-SCROLL & VIEWPORT MANAGEMENT
   ========================================================================== */
function initMobileKeyboardAutoScroll() {
  let scrollTimeout = null;

  function isMobile() {
    return window.innerWidth <= 1050 || ('ontouchstart' in window && window.innerWidth <= 1200);
  }

  function isEditableElement(el) {
    if (!el) return false;
    const tag = el.tagName;
    return tag === 'TEXTAREA' || tag === 'INPUT' || el.isContentEditable || (el.classList && el.classList.contains('rich-editor'));
  }

  function ensureVisibleAboveKeyboard(el, immediate = false) {
    if (!el || !isMobile() || !isEditableElement(el)) return;

    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      try {
        const rect = el.getBoundingClientRect();
        const vHeight = window.visualViewport ? window.visualViewport.height : window.innerHeight;
        
        const desiredTopOffset = Math.max(60, vHeight * 0.16);
        const currentAbsoluteTop = window.pageYOffset || document.documentElement.scrollTop || 0;
        const targetScrollY = currentAbsoluteTop + rect.top - desiredTopOffset;

        if (rect.bottom > vHeight - 35 || rect.top < 55) {
          window.scrollTo({
            top: Math.max(0, targetScrollY),
            behavior: immediate ? 'auto' : 'smooth'
          });
        }

        if (el.tagName === 'TEXTAREA' && typeof el.selectionStart === 'number') {
          const val = el.value || '';
          const pos = el.selectionStart;
          const linesBefore = val.substring(0, pos).split('\n').length;
          const lineHeight = 21;
          const cursorTopPx = (linesBefore - 1) * lineHeight;
          
          if (cursorTopPx < el.scrollTop || cursorTopPx > el.scrollTop + el.clientHeight - 45) {
            el.scrollTop = Math.max(0, cursorTopPx - Math.floor(el.clientHeight / 2));
          }
          if (typeof updateFrontLines === 'function') updateFrontLines();
          else if (lines) lines.scrollTop = el.scrollTop;
        }
      } catch (err) {
        try {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } catch (e) {}
      }
    }, immediate ? 20 : 160);
  }

  document.addEventListener('focusin', (e) => {
    if (isEditableElement(e.target) && isMobile()) {
      document.body.classList.add('keyboard-open');
      ensureVisibleAboveKeyboard(e.target, false);
      setTimeout(() => ensureVisibleAboveKeyboard(e.target, false), 350);
    }
  });

  document.addEventListener('focusout', () => {
    setTimeout(() => {
      const active = document.activeElement;
      if (!isEditableElement(active)) {
        document.body.classList.remove('keyboard-open');
      }
    }, 200);
  });

  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', () => {
      if (!isMobile()) return;
      const isKeyboardUp = window.visualViewport.height < window.innerHeight * 0.85;
      document.body.classList.toggle('keyboard-open', isKeyboardUp);
      
      const active = document.activeElement;
      if (isKeyboardUp && isEditableElement(active)) {
        ensureVisibleAboveKeyboard(active, true);
      }
    });
  }

  let typingDebounce = null;
  document.addEventListener('input', (e) => {
    if (!isMobile() || !isEditableElement(e.target)) return;
    clearTimeout(typingDebounce);
    typingDebounce = setTimeout(() => {
      ensureVisibleAboveKeyboard(e.target, false);
    }, 250);
  });

  document.addEventListener('keyup', (e) => {
    if (!isMobile() || !isEditableElement(e.target)) return;
    if (['Enter', 'ArrowUp', 'ArrowDown', 'Backspace'].includes(e.key)) {
      ensureVisibleAboveKeyboard(e.target, false);
    }
  });

  ['code', 'cssCode', 'jsCode', 'problem'].forEach(id => {
    const el = $(id);
    if (el) {
      el.addEventListener('click', () => {
        if (isMobile()) ensureVisibleAboveKeyboard(el, false);
      });
    }
  });
}

// Ensure all button aliases and actions are wired up and responsive
function initAllIDEButtonListeners() {
  if (typeof initHeaderNavLockListeners === 'function') initHeaderNavLockListeners();
  if (localStorage.getItem('ide_header_nav_locked') === 'true' || localStorage.getItem('fend_header_nav_locked') === 'true' || state?.headerNavLocked) {
    if (typeof setHeaderNavLocked === 'function') setHeaderNavLocked(true);
    if (typeof setExamNavLocked === 'function') setExamNavLocked(true);
  }
  if ($('mainFullscreen')) $('mainFullscreen').onclick = () => toggleWorkspaceFullscreen();
  if ($('workspaceFullscreen')) $('workspaceFullscreen').onclick = () => toggleWorkspaceFullscreen();
  if ($('exitWorkspaceFullscreen')) $('exitWorkspaceFullscreen').onclick = () => toggleWorkspaceFullscreen(false);
  if ($('addQuestion')) $('addQuestion').onclick = () => { saveCurrent(); state.questions.push(starter()); openQuestion(state.questions.length - 1); save(); };
  if ($('importJson')) $('importJson').onclick = () => $('questionFile').click();
  if ($('importAllJson')) $('importAllJson').onclick = () => $('allJsonFile') ? $('allJsonFile').click() : $('questionFile').click();
  if ($('exportJson')) $('exportJson').onclick = exportAllQuestionsJson;
  if ($('exportAllJson')) $('exportAllJson').onclick = exportAllQuestionsJson;
  if ($('exportQuestion')) $('exportQuestion').onclick = exportSingleQuestionJson;
  if ($('importQuestion')) $('importQuestion').onclick = () => $('questionFile').click();
  if ($('importSet')) $('importSet').onclick = () => $('setFile').click();
  if ($('prev')) $('prev').onclick = () => current && go(current - 1);
  if ($('next')) $('next').onclick = () => current < state.questions.length - 1 && go(current + 1);
  if ($('deleteQuestion')) $('deleteQuestion').onclick = () => { if (state.questions.length < 2) return toast('At least one question is required'); if (confirm('Delete this question?')) { state.questions.splice(current, 1); openQuestion(Math.min(current, state.questions.length - 1)); save(); } };
  if ($('runTests')) $('runTests').onclick = (typeof runAll === 'function') ? runAll : refreshFrontPreview;
  if ($('runCustom')) $('runCustom').onclick = (typeof refreshFrontPreview === 'function') ? refreshFrontPreview : runCustom;
  if ($('fontUp')) $('fontUp').onclick = () => font(1);
  if ($('fontDown')) $('fontDown').onclick = () => font(-1);
  if ($('setTimer')) $('setTimer').onclick = () => setTimer();
  if ($('timerLock')) $('timerLock').onclick = lockTimer;
  if ($('proctorSettings')) $('proctorSettings').onclick = () => { applyOwnerConfig(); $('ownerModal').classList.add('show'); };
  if ($('ownerCancel')) $('ownerCancel').onclick = () => $('ownerModal').classList.remove('show');
  if ($('clearExamData')) $('clearExamData').onclick = clearAllAssessmentDataV20;
  if ($('mobileFloatingNext')) $('mobileFloatingNext').onclick = () => { if ($('next') && !$('next').disabled) $('next').click(); else if (candidateRunning) finishAssessmentV20('manual'); };
  if ($('mobileNextBtn')) $('mobileNextBtn').onclick = () => { if ($('next') && !$('next').disabled) $('next').click(); };
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initMobileKeyboardAutoScroll();
    initAllIDEButtonListeners();
  });
} else {
  initMobileKeyboardAutoScroll();
  initAllIDEButtonListeners();
}

