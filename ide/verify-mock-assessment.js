#!/usr/bin/env node
'use strict';

// Verifies the same online compiler path used by app.js for every bundled
// language and test case in the mock assessment.
const fs = require('node:fs');
const path = require('node:path');

const args = process.argv.slice(2);
const reportFlag = args.indexOf('--report');
const reportPath = reportFlag >= 0 && args[reportFlag + 1] ? path.resolve(args[reportFlag + 1]) : null;
const assessmentArg = args.find(arg => !arg.startsWith('--') && (reportFlag < 0 || arg !== args[reportFlag + 1]));
const assessmentFile = path.resolve(assessmentArg || 'SET-MUJDFHP0-all-questions.json');
const assessment = JSON.parse(fs.readFileSync(assessmentFile, 'utf8'));
const languages = (process.env.MOCK_VERIFY_LANGUAGES || 'python,c,cpp').split(',').map(language => language.trim()).filter(Boolean);
const concurrency = Math.max(1, Number(process.env.MOCK_VERIFY_CONCURRENCY) || 4);
const inputDelay = Math.max(500, Number(process.env.MOCK_VERIFY_INPUT_DELAY) || 1500);

function normalize(value) {
  return String(value ?? '')
    .replace(/\r\n?/g, '\n')
    .split('\n')
    .map(line => line.replace(/[ \t]+$/g, ''))
    .join('\n')
    .trim();
}

function stripNoise(value) {
  return String(value || '')
    .replace(/\x1b\[[0-?]*[ -/]*[@-~]/g, '')
    .replace(/\r\n?/g, '\n')
    .split('\n')
    .filter(line => !/^\s*(>{3}|\$|\/tmp\/[\w.-]+\.(o|out|exe))\s*$/.test(line))
    .join('\n')
    .replace(/^\s*[>$]\s?/gm, '')
    .trim();
}

function removeEcho(output, input) {
  const cleaned = stripNoise(output);
  const stdin = String(input || '').replace(/\r\n?/g, '\n').trim();
  if (!stdin) return cleaned;
  const outputLines = cleaned.split('\n');
  const inputLines = stdin.split('\n');
  return inputLines.every((line, index) => (outputLines[index] || '').trimEnd() === line.trimEnd()) && outputLines.length > inputLines.length
    ? outputLines.slice(inputLines.length).join('\n').trim()
    : cleaned;
}

function runRemote(language, source, stdin) {
  return new Promise((resolve, reject) => {
    const sessionId = `mock-verify-${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`;
    const url = `wss://repl-web.programiz.com/socket.io/?sessionId=${sessionId}&lang=${language}&EIO=3&transport=websocket`;
    const socket = new WebSocket(url);
    let raw = '';
    let settled = false;
    let inputSent = false;
    let settleTimer;
    let fallbackTimer;
    const timeout = setTimeout(() => finish(raw ? null : 'Compiler server did not return output.'), 22000);
    const close = () => {
      clearTimeout(timeout);
      clearTimeout(settleTimer);
      clearTimeout(fallbackTimer);
      try { socket.close(); } catch (_) {}
    };
    const finish = (failure) => {
      if (settled) return;
      settled = true;
      close();
      if (failure) return reject(new Error(failure));
      const hasError = /error:|traceback|syntaxerror|runtimeerror|segmentation fault|invalid preprocessing directive|undefined reference/i.test(raw);
      resolve({ ok: !hasError, output: hasError ? '' : removeEcho(raw, stdin), error: hasError ? stripNoise(raw) : '' });
    };

    const sendInput = () => {
      if (inputSent) return;
      inputSent = true;
      clearTimeout(fallbackTimer);
      if (String(stdin) !== '') {
        const lines = String(stdin).replace(/\r\n?/g, '\n').split('\n');
        lines.forEach((line, index) => {
          setTimeout(() => {
            try { socket.send(`42${JSON.stringify(['evaluate', { code: line }])}`); } catch (_) {}
          }, index * 160);
        });
      }
    };

    socket.onmessage = event => {
      const message = String(event.data);
      if (message.startsWith('0')) {
        socket.send('40');
      } else if (message === '40') {
        socket.send(`42${JSON.stringify(['run', { code: source }])}`);
        fallbackTimer = setTimeout(sendInput, language === 'python' ? 800 : 2500);
      } else if (message === '2') {
        socket.send('3');
      } else if (message.startsWith('42')) {
        try {
          const [, payload] = JSON.parse(message.slice(2));
          const text = typeof payload === 'string' ? payload : String(payload?.output ?? payload?.error ?? payload?.stderr ?? payload?.message ?? '');
          raw += text;
          if (!inputSent && (/(\.(o|out)|>>>|\$)\s*$/.test(text) || text.length > 0)) {
            sendInput();
          }
        } catch (_) {}
        clearTimeout(settleTimer);
        settleTimer = setTimeout(() => finish(), 1500);
      }
    };
    socket.onerror = () => finish('Unable to connect to compiler server.');
  });
}

const jobs = assessment.questions.flatMap((question, questionIndex) => languages.flatMap(language =>
  question.tests.map((test, testIndex) => ({ question, questionIndex, language, test, testIndex }))
));

async function main() {
  const missing = assessment.questions.flatMap((question, questionIndex) => languages
    .filter(language => !question.codes?.[language])
    .map(language => `Q${questionIndex + 1} (${language})`));
  if (missing.length) throw new Error(`Missing language code: ${missing.join(', ')}`);

  console.log(`Verifying ${jobs.length} executions: ${assessment.questions.length} questions × ${languages.join(', ')} × 4 tests`);
  const failures = [];
  let cursor = 0;
  async function worker() {
    while (true) {
      const index = cursor++;
      if (index >= jobs.length) return;
      const job = jobs[index];
      try {
        const result = await runRemote(job.language, job.question.codes[job.language], job.test.input);
        if (!result.ok || normalize(result.output) !== normalize(job.test.expected)) {
          failures.push({ ...job, actual: result.error || result.output, reason: result.ok ? 'output mismatch' : 'compiler/runtime error' });
        }
      } catch (error) {
        failures.push({ ...job, actual: error.message, reason: 'runner error' });
      }
      if ((index + 1) % 12 === 0 || index + 1 === jobs.length) console.log(`Completed ${index + 1}/${jobs.length}`);
    }
  }
  await Promise.all(Array.from({ length: concurrency }, worker));
  const report = {
    assessmentFile,
    setId: assessment.setId,
    questions: assessment.questions.length,
    testCases: assessment.questions.reduce((count, question) => count + question.tests.length, 0),
    languages,
    executions: jobs.length,
    passed: jobs.length - failures.length,
    failed: failures.length,
    verifiedAt: new Date().toISOString(),
    failures: failures.map(({ questionIndex, language, testIndex, reason, test, actual }) => ({
      question: questionIndex + 1, language, test: testIndex + 1, reason, expected: test.expected, actual
    }))
  };
  if (reportPath) fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);
  if (failures.length) {
    for (const failure of failures) console.error(`FAIL Q${failure.questionIndex + 1} ${failure.language} test ${failure.testIndex + 1}: ${failure.reason}; expected=${JSON.stringify(failure.test.expected)} actual=${JSON.stringify(failure.actual)}`);
    process.exitCode = 1;
    return;
  }
  console.log(`PASS: all ${jobs.length} executions passed.`);
  if (reportPath) console.log(`Report: ${reportPath}`);
}

main().catch(error => { console.error(error.stack || error.message); process.exitCode = 1; });
