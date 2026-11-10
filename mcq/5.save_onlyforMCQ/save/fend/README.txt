FRONT-END ASSESSMENT IDE
========================

START
1. Extract this ZIP.
2. Open index.html in Microsoft Edge or Google Chrome.
3. For camera and screen-recording assessment features, serve the folder from localhost, for example: python -m http.server 8000
4. Open http://127.0.0.1:8000

FRONT-END CODING WORKSPACE
- Separate HTML, CSS, and JavaScript tabs.
- Live Result preview updates automatically after code changes.
- Auto Refresh can be enabled or paused and the refresh delay can be selected.
- Refresh Preview updates the output immediately.
- Console captures console.log, console.info, console.warn, console.error, page errors, and unhandled promise rejections from the preview.
- Erase Console clears the console panel.
- Front-end editor and Result areas both support maximize and restore.
- Ctrl+Enter refreshes the preview. Tab inserts two spaces in the active editor.

UNCHANGED ASSESSMENT WORKFLOW
- Rich problem statements, media, question navigation, import/export, teacher locks, timer handling, candidate verification, refresh-safe timer, camera evidence, screen recording, sequential navigation, and submission exports are retained.
- Question and set exports now retain HTML, CSS, and JavaScript for each question.

SECURITY AND PRIVACY
- Preview code runs in a sandboxed iframe. Do not use untrusted external scripts.
- Camera and screen evidence require explicit browser permission and should be used only under applicable organizational policy.
- This application does not perform face recognition, emotion detection, gaze tracking, or automated cheating decisions.

TEACHER COMPLETE JSON BACKUP
- Export JSON saves the entire assessment into one JSON file.
- The JSON includes every question, rich problem statements, embedded images, GIFs, videos, custom fonts, HTML, CSS, JavaScript, tests, locks, timer configuration, owner configuration, and other stored assessment settings.
- Import JSON restores all questions and their saved content into teacher mode.
- Embedded media remains portable because the existing question data stores attached media as data URLs.
- Export JSON and Import JSON are disabled or hidden during an active candidate assessment.
