PYTHON ASSESSMENT IDE - RICH PROBLEM STATEMENTS
================================================

START
1. Extract this ZIP.
2. Double-click start.bat.
3. If needed, manually run:
   python -m pip install -r requirements.txt
   python server.py
4. Open http://127.0.0.1:8000

RICH PROBLEM STATEMENT
- Type or paste formatted text with Ctrl+C and Ctrl+V.
- Toolbar supports headings, common fonts, sizes, bold, italic, underline, strike-through, colors, highlight, alignment, lists, links, and clear formatting.
- Clipboard images can be pasted with Ctrl+V.
- Image/GIF and Video buttons embed local media.
- Font button embeds WOFF, WOFF2, TTF, or OTF fonts and applies the font.
- Full Screen expands the problem statement editor.

PORTABLE EXPORT
Images, GIFs, videos, and uploaded fonts are stored as data URLs inside each question. Therefore single-question JSON and complete-set ZIP exports preserve those embedded assets for import on another computer. Very large media produces very large export files. For practical sharing, compress videos before embedding.

RESULT FEEDBACK
- All tests passed: centered celebration and confetti animation.
- Any test failed: centered Try again message.
- Both automatically disappear.

SECURITY
The local runner executes Python code on the computer. Use trusted code only. The 5-second timeout and isolated mode are helpful controls, not a production sandbox.

REPORT EXPORTS
- Export HTML creates a self-contained sequential report with Question 1, Question 2, and so on. It retains the richest formatting, embedded animated GIFs, video controls, images, code, test cases, and recorded execution history.
- Export PDF creates a printable sequential report. Animated GIFs are represented by their first frame, and videos are identified with a note because PDF does not provide the same portable playback support as HTML.
- Export Word creates an editable DOCX report with question content, images, code, test cases, and recorded execution history. Embedded video is represented by a note; use HTML for playable embedded video.
- Click an image, GIF, or video and press Delete/Backspace to remove it. Right-click media and select Delete selected media.
- Undo and Redo controls are available above the problem statement.

REPORT EXPORTS
- Export HTML creates a self-contained sequential report with Question 1, Question 2, and so on. It retains the richest formatting, embedded animated GIFs, video controls, images, code, test cases, and recorded execution history.
- Export PDF creates a printable sequential report. Animated GIFs are represented by their first frame, and videos are identified with a note because PDF does not provide the same portable playback support as HTML.
- Export Word creates an editable DOCX report with question content, images, code, test cases, and recorded execution history. Embedded video is represented by a note; use HTML for playable embedded video.
- Click an image, GIF, or video and press Delete/Backspace to remove it. Right-click media and select Delete selected media.
- Undo and Redo controls are available above the problem statement.

STABLE QUESTION NAVIGATION
- Action buttons remain in a dedicated top row and no longer compete for space with question numbers.
- Click the Question selector in the second row to open the All Questions palette.
- The palette displays every question number in a responsive grid and scrolls vertically when a set contains many questions.
- The current question is highlighted. Previous and Next stay visible on either side of the selector.

RUN AND TEST FIX
- Run now executes all configured test cases when Custom Input is not selected.
- Passed/Failed badges and Actual Output remain in the Test Cases tab.
- The success celebration displays when every configured test passes; otherwise Try again displays.
- Select Custom Input only when running one manual input. A successful program with no printed output now shows a readable message instead of a blank black panel.
- The sticky header and action/navigation rows are compact to leave more room for the problem and code areas.

TEACHER PROBLEM-STATEMENT LOCK
- Select Lock Editing after preparing a question.
- Create and confirm a teacher passcode with at least four characters.
- The lock state and passcode hash are included in individual-question and complete-set ZIP exports.
- After another user imports a locked question or ZIP, the problem statement is read-only. Formatting, paste, drop, media insertion, media deletion, and text editing are disabled.
- Problem-statement Full Screen remains available for reading.
- Select Unlock Editing and enter the original teacher passcode to restore editing.
- Python code and test execution remain available to the learner.
- This is an application-level editing control for normal sharing, not cryptographic document-rights management. A person who directly modifies application source files or exported JSON can bypass a client-side lock.

TEACHER TIMER LOCK AND TIME-UP EXPORT
- Set the assessment duration, then select Lock Timer and create a teacher passcode.
- Timer lock state, duration, and passcode hash are included in complete-set ZIP exports and individual-question exports.
- After import, a student cannot change the duration or use Set without the teacher passcode.
- A locked assessment asks “Ready to start?” when opened. The countdown begins only when Yes, Start Assessment is selected.
- When a locked countdown reaches zero, the application triggers downloads of the completed assessment ZIP and sequential PDF report and shows Time is out.
- Browsers can block multiple automatic downloads. If that browser protection is enabled, the application shows a message and the student can use Export Set ZIP and Export PDF manually.
- The passcode is stored only as a SHA-256 hash. This is an application-level control, not cryptographic DRM.

CANDIDATE SEQUENTIAL MODE
- Importing a complete assessment ZIP opens Question 1 automatically.
- Candidate navigation is forward only. Previous and the all-question picker are hidden, and backward navigation is blocked.
- Next advances one question at a time. The candidate cannot reopen an earlier question through the interface.
- Compile and Test keeps the candidate in the Test Cases area. Failed or partial runs do not display a centered Try again interruption.
- A compact summary below the editor shows only the total number of test cases passed.
- The centered solution-success window and celebration appear only when all configured test cases pass.

VERSION 17
- ZIP export retains timer lock, problem-statement locks, frozen teacher tests, frozen Custom Input state, passwords hashes, questions, and test cases.
- Protected candidate import requires the package password and hides Delete Question.
- Locked timer import displays Ready to start with Not Yet and Yes, Start Assessment choices.
- Not Yet terminates the current page attempt. Reload and import again to restart.
- Frozen teacher tests are read-only unless the freeze password is entered. Candidate-added practice tests remain editable.
- Candidate can add extra tests only when Custom Input is checked. The teacher can freeze the checked or unchecked Custom Input state with a password.
- At time-out, completed ZIP and PDF downloads start and the submission message is displayed.

VERSION 18 - REFRESH-SAFE ASSESSMENT SESSION
- Starting a locked assessment stores an absolute deadline and candidate session metadata in browser local storage.
- Browser refresh resumes the same remaining time. Refresh does not reset the timer to the original duration.
- After candidate start, the complete top action section is disabled: + Question, Import Question, Export Question, Import ZIP, Export Set ZIP, Export HTML, Export PDF, and Export Word.
- Finish Assessment exports a completed ZIP and PDF, shows the required sharing message, clears assessment cookies and active import/session data, and returns to a clean import screen after reload.
- Automatic timeout performs the same ZIP/PDF export and cleanup workflow.
- Opening index.html without an active session shows the normal teacher/import window.

VERSION 19 - CONSENT-BASED EXAM EVIDENCE
- Candidate sees total question count at the top.
- Exam Owner Setup stores owner email and post-exam submission window in the assessment package.
- Before starting, candidate enters Full Name and Roll Number. Date, hour, and minute are captured from the device clock.
- Candidate must read the exam notice, explicitly consent, and allow camera access.
- Camera frames are captured once per second at 480x270 PNG resolution. Every image contains its timestamp and repeated green check watermark.
- Finish, timeout, Esc, or exiting browser fullscreen ends the attempt and downloads a completed PDF, completed ZIP, and instruction.txt.
- The completed ZIP contains assessment data, question files, instruction.txt, the PDF report, and timestamped PNG evidence.
- Copy, cut, paste, and right-click are blocked while the candidate session is active.
- The browser may block multiple downloads; allow multiple downloads for the site.
- Submission files are generated locally. The browser cannot silently attach and send files by email; the candidate must send the downloaded files to the configured owner email.
- Privacy safeguard: this app does not use face recognition, gaze tracking, emotion analysis, or automated cheating decisions. Evidence must be reviewed by an authorized examiner under applicable policy.

VERSION 19.1 FIX
- Candidate verification now appears for every imported assessment, including packages without a locked timer.
- Finish is blocked until Full Name, Roll Number, camera consent, a working camera preview, and exam start are recorded.
- Camera capture waits for actual video frames before enabling evidence collection.
- Candidate metadata is restored safely from the active browser session after refresh.

VERSION 20
- Added Clear Cookies at the top. It clears assessment cookies, local assessment state, active session data, camera metadata, and then reloads a clean workspace.
- Removed automatic fullscreen activation and fullscreen-exit termination from the candidate workflow.
- During an active exam, Ctrl+V paste, copy, cut, drag/drop, and right-click are blocked. Text entry is permitted only in the code editor.
- Added explicit screen-recording consent and Share Screen before Ready to Exam.
- Screen recording is stored as screen-recording/exam-screen.webm inside the completed ZIP after the camera evidence folder.
- The PDF lists the screen recording after the Camera Evidence section. WebM video remains inside the ZIP because PDF does not reliably embed playable browser recordings.
- If the candidate manually stops screen sharing during the exam, the attempt is completed and exported.
