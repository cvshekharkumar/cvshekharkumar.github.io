# SQL Assessment Studio — Browser Edition

Open `index.html` in a modern browser and import an assessment HTML report after the status says **Local SQLite ready**. No Python command, server, or installation is required.

The app uses browser-side [sql.js](https://github.com/sql-js/sql.js). Each imported question receives its own temporary SQLite database, so tables from one question cannot be queried in another question.

The report importer reads each `.question-card` in order:

- first image: Question;
- second image: Workflow;
- a labelled `Solution`/`Answer` block (or an unlabelled SQL/result pair after the workflow image): starter SQL and expected result;
- `Table-1`, `Table-2`, and similar blocks: source data.

SQL snippets between the first and second images are ignored. A source-table block is accepted only when it has a strict one-table export query in the form `SELECT * FROM table_name`, plus a complete grid. Its data is copied into the current question’s in-memory SQLite database.

When an expected-result table is present, Check Query verifies column names and order, every returned cell, row count, and row order. Reports with no saved result still import and allow local query execution, but have no test case to check.

Use **Clear Cookies** to delete page-accessible cookies and discard the temporary assessment workspace. Nothing is uploaded or sent to a Python process.
