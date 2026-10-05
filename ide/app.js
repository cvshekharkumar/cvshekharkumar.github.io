const $=id=>document.getElementById(id),uid=()=>`Q-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2,6).toUpperCase()}`;
const starter=()=>({id:uid(),title:'Question',problemHtml:'',code:'',codes:{python:'',c:'',cpp:''},tests:[],customFonts:[]});

const SAMPLE_MOCK_DATA = {
  "format": "python-assessment-set",
  "version": 3,
  "setId": "SET-MUJDFHP0",
  "title": "Programming Assessment (C, C++, Python)",
  "timerMinutes": 60,
  "timerLocked": false,
  "timerLockHash": "",
  "customInputLocked": false,
  "customInputChecked": false,
  "customInputLockHash": "",
  "ownerConfig": {
    "email": "",
    "submissionMinutes": 10
  },
  "language": "python",
  "packageSecurity": {
    "protected": false,
    "deleteQuestionsAllowed": true
  },
  "totalQuestions": 6,
  "exportedAt": "2026-09-27T18:04:30.673Z",
  "questions": [
    {
      "id": "Q-MUJDFHP1-QPOG",
      "title": "Question 1: Check Even or Odd",
      "problemHtml": "<h2>Problem Statement</h2><p>Write a program in C, C++, or Python that reads an integer from standard input and prints <code>Even</code> if the number is even, or <code>Odd</code> if the number is odd.</p><p><b>Input Specification:</b><br>A single integer <code>n</code>.</p><p><b>Output Specification:</b><br>Print <code>Even</code> or <code>Odd</code>.</p>",
      "code": "# Read input and write your solution here\nn = int(input().strip())\nif n % 2 == 0:\n    print(\"Even\")\nelse:\n    print(\"Odd\")",
      "codes": {
        "python": "# Read input and write your solution here\nn = int(input().strip())\nif n % 2 == 0:\n    print(\"Even\")\nelse:\n    print(\"Odd\")",
        "c": "#include <stdio.h>\n\nint main(void) {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        if (n % 2 == 0) {\n            printf(\"Even\\n\");\n        } else {\n            printf(\"Odd\\n\");\n        }\n    }\n    return 0;\n}",
        "cpp": "#include <iostream>\n\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        if (n % 2 == 0) {\n            cout << \"Even\" << endl;\n        } else {\n            cout << \"Odd\" << endl;\n        }\n    }\n    return 0;\n}"
      },
      "language": "python",
      "problemLocked": false,
      "problemLockHash": "",
      "testsLocked": false,
      "testLockHash": "",
      "tests": [
        { "input": "4", "expected": "Even", "studentDefined": false },
        { "input": "7", "expected": "Odd", "studentDefined": false },
        { "input": "0", "expected": "Even", "studentDefined": false },
        { "input": "-3", "expected": "Odd", "studentDefined": false }
      ],
      "customFonts": []
    },
    {
      "id": "Q-MUJVUFCF-9QJP",
      "title": "Question 2: Reverse a String",
      "problemHtml": "<h2>Problem Statement</h2><p>Write a program in C, C++, or Python that reads a string from standard input and prints the string reversed.</p><p><b>Input Specification:</b><br>A single line string.</p><p><b>Output Specification:</b><br>Print the reversed string.</p>",
      "code": "# Read input and write your solution here\ns = input().strip()\nprint(s[::-1])",
      "codes": {
        "python": "# Read input and write your solution here\ns = input().strip()\nprint(s[::-1])",
        "c": "#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    char s[1024];\n    if (fgets(s, sizeof(s), stdin)) {\n        s[strcspn(s, \"\\r\\n\")] = '\\0';\n        int len = strlen(s);\n        for (int i = 0; i < len / 2; i++) {\n            char temp = s[i];\n            s[i] = s[len - 1 - i];\n            s[len - 1 - i] = temp;\n        }\n        printf(\"%s\\n\", s);\n    }\n    return 0;\n}",
        "cpp": "#include <iostream>\n#include <string>\n#include <algorithm>\n\nusing namespace std;\n\nint main() {\n    string s;\n    if (getline(cin, s)) {\n        if (!s.empty() && s.back() == '\\r') s.pop_back();\n        reverse(s.begin(), s.end());\n        cout << s << endl;\n    }\n    return 0;\n}"
      },
      "language": "python",
      "problemLocked": false,
      "problemLockHash": "",
      "testsLocked": false,
      "testLockHash": "",
      "tests": [
        { "input": "hello", "expected": "olleh", "studentDefined": false },
        { "input": "Python", "expected": "nohtyP", "studentDefined": false },
        { "input": "12345", "expected": "54321", "studentDefined": false }
      ],
      "customFonts": []
    },
    {
      "id": "Q-MUK4OG7D-X5II",
      "title": "Question 3: Palindrome Check",
      "problemHtml": "<h2>Problem Statement</h2><p>Write a program in C, C++, or Python that checks whether a given string is a palindrome. A palindrome is a word or sequence that reads the same forwards and backwards.</p><p><b>Input Specification:</b><br>A single line containing a string.</p><p><b>Output Specification:</b><br>Print <code>True</code> if the string is a palindrome, otherwise print <code>False</code>.</p>",
      "code": "# Read input and write your solution here\ns = input().strip()\nprint(\"True\" if s == s[::-1] else \"False\")",
      "codes": {
        "python": "# Read input and write your solution here\ns = input().strip()\nprint(\"True\" if s == s[::-1] else \"False\")",
        "c": "#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    char s[1024];\n    if (fgets(s, sizeof(s), stdin)) {\n        s[strcspn(s, \"\\r\\n\")] = '\\0';\n        int len = strlen(s);\n        int isPal = 1;\n        for (int i = 0; i < len / 2; i++) {\n            if (s[i] != s[len - 1 - i]) {\n                isPal = 0;\n                break;\n            }\n        }\n        if (isPal) {\n            printf(\"True\\n\");\n        } else {\n            printf(\"False\\n\");\n        }\n    }\n    return 0;\n}",
        "cpp": "#include <iostream>\n#include <string>\n#include <algorithm>\n\nusing namespace std;\n\nint main() {\n    string s;\n    if (getline(cin, s)) {\n        if (!s.empty() && s.back() == '\\r') s.pop_back();\n        string rev = s;\n        reverse(rev.begin(), rev.end());\n        if (s == rev) {\n            cout << \"True\" << endl;\n        } else {\n            cout << \"False\" << endl;\n        }\n    }\n    return 0;\n}"
      },
      "language": "python",
      "problemLocked": false,
      "problemLockHash": "",
      "testsLocked": false,
      "testLockHash": "",
      "tests": [
        { "input": "radar", "expected": "True", "studentDefined": false },
        { "input": "python", "expected": "False", "studentDefined": false },
        { "input": "level", "expected": "True", "studentDefined": false },
        { "input": "12321", "expected": "True", "studentDefined": false }
      ],
      "customFonts": []
    },
    {
      "id": "Q-MUK4OGM9-OU5Z",
      "title": "Question 4: Factorial of a Number",
      "problemHtml": "<h2>Problem Statement</h2><p>Write a program in C, C++, or Python that reads a non-negative integer <code>n</code> and computes its factorial (<code>n!</code>).</p><p><b>Input Specification:</b><br>A non-negative integer <code>n</code>.</p><p><b>Output Specification:</b><br>Print the factorial value of <code>n</code>.</p>",
      "code": "# Read input and write your solution here\nimport math\nn = int(input().strip())\nprint(math.factorial(n))",
      "codes": {
        "python": "# Read input and write your solution here\nimport math\nn = int(input().strip())\nprint(math.factorial(n))",
        "c": "#include <stdio.h>\n\nint main(void) {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        long long fact = 1;\n        for (int i = 1; i <= n; i++) {\n            fact *= i;\n        }\n        printf(\"%lld\\n\", fact);\n    }\n    return 0;\n}",
        "cpp": "#include <iostream>\n\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        long long fact = 1;\n        for (int i = 1; i <= n; i++) {\n            fact *= i;\n        }\n        cout << fact << endl;\n    }\n    return 0;\n}"
      },
      "language": "python",
      "problemLocked": false,
      "problemLockHash": "",
      "testsLocked": false,
      "testLockHash": "",
      "tests": [
        { "input": "5", "expected": "120", "studentDefined": false },
        { "input": "0", "expected": "1", "studentDefined": false },
        { "input": "3", "expected": "6", "studentDefined": false },
        { "input": "7", "expected": "5040", "studentDefined": false }
      ],
      "customFonts": []
    },
    {
      "id": "Q-MUK4OHA9-QW4L",
      "title": "Question 5: Sum of Array Elements",
      "problemHtml": "<h2>Problem Statement</h2><p>Write a program in C, C++, or Python that reads a space-separated sequence of integers on a single line and calculates the total sum of all elements.</p><p><b>Input Specification:</b><br>Space-separated integers.</p><p><b>Output Specification:</b><br>Print the integer sum of the elements.</p>",
      "code": "# Read input and write your solution here\nnums = list(map(int, input().strip().split()))\nprint(sum(nums))",
      "codes": {
        "python": "# Read input and write your solution here\nnums = list(map(int, input().strip().split()))\nprint(sum(nums))",
        "c": "#include <stdio.h>\n\nint main(void) {\n    int val, sum = 0;\n    while (scanf(\"%d\", &val) == 1) {\n        sum += val;\n    }\n    printf(\"%d\\n\", sum);\n    return 0;\n}",
        "cpp": "#include <iostream>\n\nusing namespace std;\n\nint main() {\n    int val, sum = 0;\n    while (cin >> val) {\n        sum += val;\n    }\n    cout << sum << endl;\n    return 0;\n}"
      },
      "language": "python",
      "problemLocked": false,
      "problemLockHash": "",
      "testsLocked": false,
      "testLockHash": "",
      "tests": [
        { "input": "1 2 3 4 5", "expected": "15", "studentDefined": false },
        { "input": "10 -2 5", "expected": "13", "studentDefined": false },
        { "input": "100", "expected": "100", "studentDefined": false },
        { "input": "0 0 0", "expected": "0", "studentDefined": false }
      ],
      "customFonts": []
    },
    {
      "id": "Q-MUK4OHPL-8KOA",
      "title": "Question 6: Find Maximum in List",
      "problemHtml": "<h2>Problem Statement</h2><p>Write a program in C, C++, or Python that reads a space-separated sequence of integers on a single line and finds the maximum value.</p><p><b>Input Specification:</b><br>Space-separated integers.</p><p><b>Output Specification:</b><br>Print the maximum integer value.</p>",
      "code": "# Read input and write your solution here\nnums = list(map(int, input().strip().split()))\nprint(max(nums))",
      "codes": {
        "python": "# Read input and write your solution here\nnums = list(map(int, input().strip().split()))\nprint(max(nums))",
        "c": "#include <stdio.h>\n\nint main(void) {\n    int val, max_val;\n    if (scanf(\"%d\", &max_val) == 1) {\n        while (scanf(\"%d\", &val) == 1) {\n            if (val > max_val) {\n                max_val = val;\n            }\n        }\n        printf(\"%d\\n\", max_val);\n    }\n    return 0;\n}",
        "cpp": "#include <iostream>\n\nusing namespace std;\n\nint main() {\n    int val, max_val;\n    if (cin >> max_val) {\n        while (cin >> val) {\n            if (val > max_val) {\n                max_val = val;\n            }\n        }\n        cout << max_val << endl;\n    }\n    return 0;\n}"
      },
      "language": "python",
      "problemLocked": false,
      "problemLockHash": "",
      "testsLocked": false,
      "testLockHash": "",
      "tests": [
        { "input": "3 7 2 9 5", "expected": "9", "studentDefined": false },
        { "input": "-10 -5 -20 -1", "expected": "-1", "studentDefined": false },
        { "input": "42", "expected": "42", "studentDefined": false },
        { "input": "8 8 8 8", "expected": "8", "studentDefined": false }
      ],
      "customFonts": []
    }
  ]
};

function getDefaultAssessmentState() {
  return {
    format: "python-assessment-set",
    version: 3,
    setId: `SET-${Date.now().toString(36).toUpperCase()}`,
    title: "Question",
    timerMinutes: 60,
    timerLocked: false,
    timerLockHash: "",
    customInputLocked: false,
    customInputChecked: false,
    customInputLockHash: "",
    ownerConfig: {
      email: "",
      submissionMinutes: 10
    },
    language: "python",
    packageSecurity: {
      protected: false,
      deleteQuestionsAllowed: true
    },
    totalQuestions: 1,
    exportedAt: new Date().toISOString(),
    questions: [
      starter()
    ]
  };
}

let candidateRunning = false, packageProtected = false, assessmentStarted = false, autoExportStarted = false, importInProgress = false;
let state = getDefaultAssessmentState(), current = 0, history = [], remaining = 3600, timerHandle;
const code=$('code'),problem=$('problem'),lines=$('lines');function q(){return state.questions[current]}function esc(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}function toast(m){let t=$('toast');t.textContent=m;t.classList.add('show');clearTimeout(t.x);t.x=setTimeout(()=>t.classList.remove('show'),1700)}
function applyFonts(x){(x.customFonts||[]).forEach(f=>{if(!document.getElementById('font-'+f.id)){let s=document.createElement('style');s.id='font-'+f.id;s.textContent=`@font-face{font-family:${JSON.stringify(f.name)};src:url(${JSON.stringify(f.data)})}`;document.head.appendChild(s)}if(![...$('fontName').options].some(o=>o.value===f.name)){$('fontName').add(new Option(f.name,f.name))}})}
let isClearingData = false;
function saveCurrent(){
  if(isClearingData)return;
  let x=q();if(!x)return;
  if(problem)x.problemHtml=problem.innerHTML;
  if(code){
    x.code=code.value;
    if(!x.codes)x.codes={};
    x.codes[x.language||state.language||'python']=code.value;
  }
  save();
  try{
    if(typeof readExamSession==='function'&&typeof writeExamSession==='function'){
      const s=readExamSession();
      if(s?.started&&s?.active){
        writeExamSession({currentQuestion:current});
      }
    }
  }catch(e){}
}
function save(){
  if(isClearingData)return;
  try{localStorage.setItem('assessment-rich-v3',JSON.stringify(state));}catch(e){}
  if($('saveState'))$('saveState').textContent='Saved just now';
}

function load(){
  try{
    let s=JSON.parse(localStorage.getItem('assessment-rich-v3'));
    if(s?.questions?.length)state=s;
    else state=getDefaultAssessmentState();
  }catch(e){
    state=getDefaultAssessmentState();
  }
  if($('setIdText'))$('setIdText').textContent=state.setId;
  if($('timerMinutes'))$('timerMinutes').value=state.timerMinutes;
  let targetQ=0;
  try{
    const s=JSON.parse(localStorage.getItem('browser-assessment-active-session-v18')||'null');
    if(s?.active&&s?.started&&typeof s.currentQuestion==='number'){
      targetQ=Math.max(0,Math.min(s.currentQuestion,state.questions.length-1));
    }
  }catch(e){}
  openQuestion(targetQ);
  try{
    const s=JSON.parse(localStorage.getItem('browser-assessment-active-session-v18')||'null');
    if(!(s?.active&&s?.started))setTimer(false);
  }catch(e){setTimer(false);}
  try{
    if(localStorage.getItem('ide_header_nav_locked')==='true'||state.headerNavLocked){
      if(typeof setHeaderNavLocked==='function')setHeaderNavLocked(true);
    }
  }catch(e){}
  if(typeof updateQuestionCountV19==='function')updateQuestionCountV19();
}
function openQuestion(i){
  current=i;let x=q();if(!x)return;
  if(!x.problemHtml&&x.problem)x.problemHtml=`<p>${esc(x.problem).replace(/\n/g,'<br>')}</p>`;
  x.customFonts=x.customFonts||[];applyFonts(x);
  if(problem)problem.innerHTML=x.problemHtml||'';
  const l=x.language||state.language||'python';
  if(x.codes&&x.codes[l]!==undefined)x.code=x.codes[l];
  if(code)code.value=x.code||'';
  if($('questionTitle'))$('questionTitle').textContent=`Question ${i+1}`;
  if($('questionId'))$('questionId').textContent=x.id;
  updateLines();if(typeof renderTests17==='function')renderTests17();else renderTests();renderSteps();
}
function renderSteps(){
  $('steps').innerHTML=state.questions.map((x,i)=>`<button class="${i===current?'active':''}" onclick="go(${i})">${i+1}</button>`).join('');
  $('prev').disabled=current===0;$('next').disabled=current===state.questions.length-1;
}
window.go=i=>{saveCurrent();openQuestion(i);};
$('addQuestion').onclick=()=>{saveCurrent();state.questions.push(starter());openQuestion(state.questions.length-1);save()};
$('prev').onclick=()=>current&&go(current-1);
$('next').onclick=()=>current<state.questions.length-1&&go(current+1);
$('deleteQuestion').onclick=()=>{if(state.questions.length<2)return toast('At least one question is required');if(confirm('Delete this question?')){state.questions.splice(current,1);openQuestion(Math.min(current,state.questions.length-1));save()}};
function lang(){return q()?.language||state?.language||'python'}
function highlightCode(rawCode, language) {
  if (!rawCode) return '';
  const l = (language || 'python').toLowerCase();
  let masterRegex;
  if (l === 'c' || l === 'cpp') {
    masterRegex = new RegExp(
      [
        '(/\\*[\\s\\S]*?\\*/)',
        '(//[^\\n]*)',
        '(#[ \\t]*(?:include|define|undef|ifdef|ifndef|if|elif|else|endif|pragma|error|warning)[^\\n]*)',
        '("(?:\\\\.|[^"\\\\\\n])*")',
        "('(?:\\\\.|[^'\\\\\\n])*')",
        '\\b(auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|inline|int|long|register|restrict|return|short|signed|sizeof|static|struct|switch|typedef|union|unsigned|void|volatile|while|_Bool|_Complex|_Imaginary|alignas|alignof|atomic|bool|catch|class|constexpr|const_cast|decltype|delete|dynamic_cast|explicit|export|false|friend|mutable|namespace|new|noexcept|nullptr|operator|private|protected|public|reinterpret_cast|static_assert|static_cast|template|this|thread_local|throw|true|try|typeid|typename|using|virtual)\\b',
        '\\b(cin|cout|cerr|endl|string|vector|map|set|pair|make_pair|std|printf|scanf|fgets|puts|getchar|putchar|malloc|calloc|realloc|free|memset|memcpy|strcpy|strncpy|strlen|strcmp|strncmp|size_t|ssize_t|int8_t|int16_t|int32_t|int64_t|uint8_t|uint16_t|uint32_t|uint64_t|FILE|NULL|nullptr_t|priority_queue|deque|list|stack|queue|unordered_map|unordered_set|bitset|algorithm|iostream|cstdio|cstdlib|cmath|cstring|iomanip|fstream|sstream)\\b',
        '\\b([a-zA-Z_]\\w*)(?=\\s*\\()',
        '\\b(0[xX][0-9a-fA-F]+[uUlL]*|0[bB][01]+[uUlL]*|\\d+(?:\\.\\d+)?(?:[eE][+-]?\\d+)?[fFlLuU]*)\\b',
        '(==|!=|<=|>=|&&|\\|\\||<<|>>|::|->|\\+\\+|--|\\+=|-=|\\*=|/=|%=|&=|\\|=|\\^=|<<=|>>=|[+\\-*/%<>=!&|^~?:])'
      ].join('|'),
      'g'
    );
  } else {
    masterRegex = new RegExp(
      [
        '("""[\\s\\S]*?"""|\'\'\'[\\s\\S]*?\'\'\')',
        '(#[^\\n]*)',
        '("(?:\\\\.|[^"\\\\\\n])*"|\'(?:\\\\.|[^\'\\\\\\n])*\')',
        '(@[a-zA-Z_]\\w*)',
        '\\b(def)\\s+([a-zA-Z_]\\w*)',
        '\\b(class)\\s+([a-zA-Z_]\\w*)',
        '\\b(and|as|assert|async|await|break|case|class|continue|def|del|elif|else|except|finally|for|from|global|if|import|in|is|lambda|match|nonlocal|not|or|pass|raise|return|try|while|with|yield)\\b',
        '\\b(True|False|None|self|cls|print|input|len|range|str|int|float|list|dict|set|tuple|bool|type|open|sum|min|max|abs|sorted|map|filter|zip|enumerate|isinstance|issubclass|super|all|any|bin|chr|dir|eval|format|hasattr|getattr|setattr|hex|id|iter|next|oct|ord|pow|repr|reversed|round|slice|vars)\\b',
        '\\b([a-zA-Z_]\\w*)(?=\\s*\\()',
        '\\b(0[xX][0-9a-fA-F]+|0[bB][01]+|0[oO][0-7]+|\\d+(?:\\.\\d+)?(?:[eE][+-]?\\d+)?j?)\\b',
        '(==|!=|<=|>=|->|\\+=|-=|\\*=|/=|%=|&=|\\|=|\\^=|//|\\*\\*|[+\\-*/%<>=!&|^~])'
      ].join('|'),
      'g'
    );
  }
  let result = '';
  let lastIndex = 0;
  let match;
  while ((match = masterRegex.exec(rawCode)) !== null) {
    const textBefore = rawCode.slice(lastIndex, match.index);
    if (textBefore) result += esc(textBefore);
    const full = match[0];
    if (l === 'c' || l === 'cpp') {
      if (match[1] || match[2]) result += '<span class="tok-comment">' + esc(full) + '</span>';
      else if (match[3]) result += '<span class="tok-preprocessor">' + esc(full) + '</span>';
      else if (match[4] || match[5]) result += '<span class="tok-string">' + esc(full) + '</span>';
      else if (match[6]) result += '<span class="tok-keyword">' + esc(full) + '</span>';
      else if (match[7]) result += '<span class="tok-builtin">' + esc(full) + '</span>';
      else if (match[8]) result += '<span class="tok-func-call">' + esc(full) + '</span>';
      else if (match[9]) result += '<span class="tok-number">' + esc(full) + '</span>';
      else if (match[10]) result += '<span class="tok-operator">' + esc(full) + '</span>';
      else result += esc(full);
    } else {
      if (match[1]) result += '<span class="tok-string">' + esc(full) + '</span>';
      else if (match[2]) result += '<span class="tok-comment">' + esc(full) + '</span>';
      else if (match[3]) result += '<span class="tok-string">' + esc(full) + '</span>';
      else if (match[4]) result += '<span class="tok-preprocessor">' + esc(full) + '</span>';
      else if (match[5] && match[6]) result += '<span class="tok-keyword">' + esc(match[5]) + '</span> <span class="tok-func-def">' + esc(match[6]) + '</span>';
      else if (match[7] && match[8]) result += '<span class="tok-keyword">' + esc(match[7]) + '</span> <span class="tok-class-def">' + esc(match[8]) + '</span>';
      else if (match[9]) result += '<span class="tok-keyword">' + esc(full) + '</span>';
      else if (match[10]) result += '<span class="tok-builtin">' + esc(full) + '</span>';
      else if (match[11]) result += '<span class="tok-func-call">' + esc(full) + '</span>';
      else if (match[12]) result += '<span class="tok-number">' + esc(full) + '</span>';
      else if (match[13]) result += '<span class="tok-operator">' + esc(full) + '</span>';
      else result += esc(full);
    }
    lastIndex = masterRegex.lastIndex;
  }
  const remaining = rawCode.slice(lastIndex);
  if (remaining) result += esc(remaining);
  if (rawCode.endsWith('\n')) result += ' ';
  return result;
}

function syncCodeScroll() {
  if (lines) lines.scrollTop = code.scrollTop;
  const hl = $('codeHighlight');
  if (hl) {
    hl.scrollTop = code.scrollTop;
    hl.scrollLeft = code.scrollLeft;
  }
}

function updateSyntaxHighlight() {
  const hlContent = $('codeHighlightContent') || $('codeHighlight');
  if (hlContent && code) {
    hlContent.innerHTML = highlightCode(code.value, typeof lang === 'function' ? lang() : (q()?.language || 'python'));
  }
  syncCodeScroll();
}

let debounce;
problem.oninput = () => {
  let x = q();
  if (x) x.problemHtml = problem.innerHTML;
  clearTimeout(debounce);
  debounce = setTimeout(saveCurrent, 150);
};
code.oninput = () => {
  updateLines();
  let x = q();
  if (x) {
    x.code = code.value;
    if (!x.codes) x.codes = {};
    x.codes[x.language || state.language || 'python'] = code.value;
  }
  clearTimeout(debounce);
  debounce = setTimeout(saveCurrent, 150);
};
// Flush state synchronously so no data is ever lost on page refresh, navigation, or tab change
window.addEventListener('beforeunload', () => { saveCurrent(); });
window.addEventListener('pagehide', () => { saveCurrent(); });
document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') saveCurrent(); });
if (code) code.addEventListener('blur', () => saveCurrent());
if (problem) problem.addEventListener('blur', () => saveCurrent());
problem.addEventListener('paste', async e => {
  let items = [...(e.clipboardData?.items || [])], media = items.find(x => x.type.startsWith('image/') || x.type.startsWith('video/'));
  if (media) { e.preventDefault(); insertFile(media.getAsFile()); }
});
function updateLines() {
  lines.textContent = Array.from({length: code.value.split('\n').length}, (_, i) => i + 1).join('\n');
  syncCodeScroll();
  updateSyntaxHighlight();
}
code.onscroll = syncCodeScroll;
code.onkeydown = e => {
  if (e.key === 'Tab') {
    e.preventDefault();
    code.setRangeText('    ', code.selectionStart, code.selectionEnd, 'end');
    updateLines();
  }
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
    e.preventDefault();
    runAll();
  }
};
function keepFocus(){problem.focus()}document.querySelectorAll('[data-cmd]').forEach(b=>b.onclick=()=>{keepFocus();document.execCommand(b.dataset.cmd,false,null);saveCurrent()});$('styleFormat').onchange=e=>{keepFocus();document.execCommand('formatBlock',false,e.target.value);saveCurrent()};$('fontName').onchange=e=>{keepFocus();document.execCommand('fontName',false,e.target.value);saveCurrent()};$('fontSize').onchange=e=>{keepFocus();document.execCommand('fontSize',false,e.target.value);saveCurrent()};$('foreColor').oninput=e=>{keepFocus();document.execCommand('foreColor',false,e.target.value)};$('backColor').oninput=e=>{keepFocus();document.execCommand('hiliteColor',false,e.target.value)};$('clearFormat').onclick=()=>{keepFocus();document.execCommand('removeFormat');saveCurrent()};$('linkBtn').onclick=()=>{let u=prompt('Enter link URL:','https://');if(u){keepFocus();document.execCommand('createLink',false,u);saveCurrent()}};
function insertHtml(html){problem.focus();document.execCommand('insertHTML',false,html);saveCurrent()}function readData(file){return new Promise((res,rej)=>{let r=new FileReader();r.onload=()=>res(r.result);r.onerror=rej;r.readAsDataURL(file)})}async function insertFile(file){if(!file)return;if(file.size>25*1024*1024&&!confirm('This media file is larger than 25 MB and will make exports very large. Continue?'))return;let data=await readData(file),safe=esc(file.name);if(file.type.startsWith('image/'))insertHtml(`<figure><img src="${data}" alt="${safe}"><figcaption>${safe}</figcaption></figure>`);else if(file.type.startsWith('video/'))insertHtml(`<figure><video controls src="${data}"></video><figcaption>${safe}</figcaption></figure>`);else toast('Unsupported media file')}$('insertImage').onclick=()=>{$('mediaFile').accept='image/*,.gif';$('mediaFile').click()};$('insertVideo').onclick=()=>{$('mediaFile').accept='video/*';$('mediaFile').click()};$('mediaFile').onchange=e=>{insertFile(e.target.files[0]);e.target.value=''};$('insertFont').onclick=()=>$('fontFile').click();$('fontFile').onchange=async e=>{let f=e.target.files[0];if(!f)return;let name=prompt('Font display name:',f.name.replace(/\.[^.]+$/,''));if(!name)return;let obj={id:Date.now().toString(36),name,data:await readData(f),fileName:f.name};q().customFonts.push(obj);applyFonts(q());$('fontName').value=name;problem.focus();document.execCommand('fontName',false,name);saveCurrent();toast('Font embedded in this question');e.target.value=''};$('problemFullscreen').onclick = () => {
    const panel = $('problemPanel');
    panel.classList.toggle('full');

    const isFull = panel.classList.contains('full');

    $('problemFullscreen').textContent =
        isFull ? '✕ Exit Full Screen' : '⛶ Full Screen';

    document.body.classList.toggle('problem-fullscreen-active', isFull);

    if (isFull) {
        window.scrollTo(0, 0);
    }
};

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const panel = $('problemPanel');
        if (panel.classList.contains('full')) {
            panel.classList.remove('full');
            document.body.classList.remove('problem-fullscreen-active');
            $('problemFullscreen').textContent = '⛶ Full Screen';
        }
    }
});$('codeFullscreen').onclick=()=>document.querySelector('.editor-card').classList.toggle('full');
function renderTests(){$('testCount').textContent=q().tests.length;$('testList').innerHTML=q().tests.map((t,i)=>`<div class="test-card"><div class="test-head"><b>Test Case ${i+1}</b><span><span id="badge${i}" class="badge">Not run</span><button class="delete" onclick="removeTest(${i})">✕</button></span></div><div class="test-grid"><div class="field"><label>INPUT</label><textarea oninput="setTest(${i},'input',this.value)">${esc(t.input)}</textarea></div><div class="field"><label>EXPECTED OUTPUT</label><textarea oninput="setTest(${i},'expected',this.value)">${esc(t.expected)}</textarea></div><div class="field actual"><label>ACTUAL OUTPUT</label><textarea id="actual${i}" readonly></textarea></div></div></div>`).join('')}window.setTest=(i,k,v)=>{q().tests[i][k]=v;save()};window.removeTest=i=>{q().tests.splice(i,1);renderTests();save()};$('addTest').onclick=()=>{q().tests.push({input:'',expected:''});renderTests();save()};async function execute(input){let r=await fetch('/api/run',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({code:code.value,input})});return r.json()}function norm(s){return String(s).replace(/\r\n/g,'\n').trimEnd()}function busy(v){$('runTests').disabled=$('runCustom').disabled=v;$('runTests').textContent=v?'Running...':'Compile and Test'}
async function runAll(){saveCurrent();if(!q().tests.length)return toast('Add a test case');busy(true);document.querySelector('[data-tab=tests]').click();let pass=0;for(let i=0;i<q().tests.length;i++){let b=$('badge'+i);b.textContent='Running...';try{let d=await execute(q().tests[i].input),ok=d.ok&&norm(d.output)===norm(q().tests[i].expected);$('actual'+i).value=(d.output||'')+(d.error||'');b.textContent=ok?'Passed':'Failed';b.className='badge '+(ok?'pass':'fail');pass+=ok?1:0}catch(e){b.textContent='Runner error';b.className='badge fail'}}history.unshift({id:q().id,result:`${pass}/${q().tests.length} passed`,time:new Date().toLocaleTimeString()});renderHistory();busy(false);if(pass===q().tests.length)celebrate();else tryAgain(pass,q().tests.length)}async function runCustom(){busy(true);let input=$('customToggle').checked?(prompt('Enter custom input:','')||''):'';try{let d=await execute(input);showOutput((d.output||'')+(d.error?'\n'+d.error:''))}catch(e){showOutput('Runner connection failed. Please check your network connection and try again.')}busy(false)}function showOutput(t){document.querySelector('[data-tab=execution]').click();$('empty').hidden=true;$('console').hidden=false;$('console').textContent=t}function renderHistory(){$('historyList').innerHTML=history.map(h=>`<div class="history-row"><b>${esc(h.id)} · ${esc(h.result)}</b><span>${h.time}</span></div>`).join('')}$('runTests').onclick=runAll;$('runCustom').onclick=runCustom;
function overlay(text,wrong=false){let o=$('resultOverlay');o.className='result-overlay show'+(wrong?' wrong':'');$('resultCard').textContent=text;setTimeout(()=>o.className='result-overlay',2600)}function tryAgain(p,n){overlay(`Try again · ${p}/${n} passed`,true)}function celebrate(){overlay('🎉 Excellent! All test cases passed! 🎉');let c=$('confetti'),x=c.getContext('2d');c.width=innerWidth;c.height=innerHeight;let pieces=Array.from({length:150},()=>({x:Math.random()*c.width,y:-20-Math.random()*c.height*.5,v:2+Math.random()*5,r:3+Math.random()*6,a:Math.random()*6.28,col:['#ff4d6d','#ffd60a','#22c55e','#3b82f6','#a855f7'][Math.floor(Math.random()*5)]})),start=performance.now();(function draw(t){x.clearRect(0,0,c.width,c.height);pieces.forEach(p=>{p.y+=p.v;p.x+=Math.sin(p.a+=.08)*1.5;x.fillStyle=p.col;x.fillRect(p.x,p.y,p.r,p.r*1.7)});if(t-start<2400)requestAnimationFrame(draw)})(start)}
function download(blob,name){let a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),2000)}
function exportAllQuestionsJson(){saveCurrent();const exportData={format:'python-assessment-set',version:3,setId:state.setId||`SET-${Date.now().toString(36).toUpperCase()}`,title:state.title||'Python Assessment',timerMinutes:Number(state.timerMinutes)||60,timerLocked:!!state.timerLocked,timerLockHash:state.timerLockHash||'',customInputLocked:!!state.customInputLocked,customInputChecked:!!state.customInputChecked,customInputLockHash:state.customInputLockHash||'',ownerConfig:state.ownerConfig||{email:'',submissionMinutes:10},language:state.language||'python',packageSecurity:state.packageSecurity||{protected:false,deleteQuestionsAllowed:true},totalQuestions:state.questions.length,exportedAt:new Date().toISOString(),questions:state.questions.map((item,idx)=>({id:item.id||uid(),title:item.title||`Question ${idx+1}`,problemHtml:item.problemHtml||'',code:item.code||'',codes:item.codes||(item.code?{[item.language||state.language||'python']:item.code}:{}),language:item.language||state.language||'python',problemLocked:!!item.problemLocked,problemLockHash:item.problemLockHash||'',testsLocked:!!item.testsLocked,testLockHash:item.testLockHash||'',tests:Array.isArray(item.tests)?item.tests.map(t=>({input:t.input??'',expected:t.expected??'',studentDefined:!!t.studentDefined})):[],customFonts:Array.isArray(item.customFonts)?item.customFonts:[]}))};download(new Blob([JSON.stringify(exportData,null,2)],{type:'application/json'}),`${safeName(state.setId||'assessment')}-all-questions.json`);toast(`Exported ${state.questions.length} question(s) with media & videos to JSON`)}
function exportSingleQuestionJson(){saveCurrent();const currentQ=q(),packet={format:'python-assessment-rich-question',version:3,timer:{minutes:Number(state.timerMinutes)||60,locked:!!state.timerLocked,lockHash:state.timerLockHash||''},question:{id:currentQ.id||uid(),title:currentQ.title||`Question ${current+1}`,problemHtml:currentQ.problemHtml||'',code:currentQ.code||'',codes:currentQ.codes||(currentQ.code?{[currentQ.language||state.language||'python']:currentQ.code}:{}),language:currentQ.language||state.language||'python',problemLocked:!!currentQ.problemLocked,problemLockHash:currentQ.problemLockHash||'',testsLocked:!!currentQ.testsLocked,testLockHash:currentQ.testLockHash||'',tests:Array.isArray(currentQ.tests)?currentQ.tests:[],customFonts:Array.isArray(currentQ.customFonts)?currentQ.customFonts:[]},exportedAt:new Date().toISOString()};download(new Blob([JSON.stringify(packet,null,2)],{type:'application/json'}),`${safeName(currentQ.id||'question')}.question.json`);toast(`Question ${current+1} exported to JSON with images & videos`)}
async function handleJsonImport(file){if(!file)return;try{let data;if(typeof file==='object'&&!(file instanceof Blob)&&!(file instanceof File)&&file!==null){data=file}else{const text=typeof file==='string'?file:(file.text?await file.text():String(file));try{data=JSON.parse(text)}catch(pe){throw Error('Invalid JSON file format')}}candidateSequentialMode=false;if(typeof applyCandidateMode==='function')applyCandidateMode();if(data&&(Array.isArray(data.questions)||data.format==='python-assessment-set'||data.format==='python-assessment-rich-set')){const qList=Array.isArray(data.questions)?data.questions:[];if(!qList.length)throw Error('No questions found in this assessment JSON');const sec=data.packageSecurity||{};if(sec.protected){const p=prompt('Enter password to open assessment JSON:','');if(p===null)return;if(typeof hashPack==='function'&&await hashPack(p,sec.salt)!==sec.hash)throw Error('Incorrect password')}saveCurrent();state.setId=data.setId||`SET-${Date.now().toString(36).toUpperCase()}`;state.title=data.title||'Python Assessment';state.timerMinutes=Number(data.timerMinutes)||60;state.timerLocked=!!data.timerLocked;state.timerLockHash=data.timerLockHash||'';state.customInputLocked=!!data.customInputLocked;state.customInputChecked=!!data.customInputChecked;state.customInputLockHash=data.customInputLockHash||'';state.ownerConfig=data.ownerConfig||{email:'',submissionMinutes:10};state.language=data.language||qList[0]?.language||'python';state.packageSecurity=sec;packageProtected=!!sec.protected;state.questions=qList.map((item,idx)=>({id:item.id||uid(),title:item.title||`Question ${idx+1}`,problemHtml:item.problemHtml||(item.problem?`<p>${esc(item.problem).replace(/\n/g,'<br>')}</p>`:''),code:item.code||(item.codes?(item.codes[item.language||state.language||'python']||Object.values(item.codes)[0]):'')||'',codes:item.codes||(item.code?{[item.language||state.language||'python']:item.code}:{}),language:item.language||state.language||'python',problemLocked:!!item.problemLocked,problemLockHash:item.problemLockHash||'',testsLocked:!!item.testsLocked,testLockHash:item.testLockHash||'',tests:Array.isArray(item.tests)?item.tests.map(t=>({input:t.input??'',expected:t.expected??'',studentDefined:!!t.studentDefined})):[],customFonts:Array.isArray(item.customFonts)?item.customFonts:[]}));state.questions.forEach(qItem=>applyFonts(qItem));$('setIdText').textContent=state.setId;$('timerMinutes').value=state.timerMinutes;current=0;openQuestion(0);save();if(typeof updateQuestionCountV19==='function')updateQuestionCountV19();if(typeof updateTimerLockUI==='function')updateTimerLockUI();if(typeof applyCustomFreeze==='function')applyCustomFreeze();if(typeof applyTestFreeze==='function')applyTestFreeze();if(typeof applyCandidateSecurity==='function')applyCandidateSecurity();if(isTimerLocked())showReadyGate();return}if(Array.isArray(data)&&data.length>0){saveCurrent();state.questions=data.map((item,idx)=>({id:item.id||uid(),title:item.title||`Question ${idx+1}`,problemHtml:item.problemHtml||(item.problem?`<p>${esc(item.problem).replace(/\n/g,'<br>')}</p>`:''),code:item.code||(item.codes?(item.codes[item.language||state.language||'python']||Object.values(item.codes)[0]):'')||'',codes:item.codes||(item.code?{[item.language||state.language||'python']:item.code}:{}),language:item.language||state.language||'python',problemLocked:!!item.problemLocked,problemLockHash:item.problemLockHash||'',testsLocked:!!item.testsLocked,testLockHash:item.testLockHash||'',tests:Array.isArray(item.tests)?item.tests:[],customFonts:Array.isArray(item.customFonts)?item.customFonts:[]}));state.questions.forEach(qItem=>applyFonts(qItem));current=0;openQuestion(0);save();if(typeof updateQuestionCountV19==='function')updateQuestionCountV19();return}const singleQ=data.question||data;if(singleQ&&(singleQ.id||singleQ.problemHtml||Array.isArray(singleQ.tests)||singleQ.code!==undefined)){saveCurrent();const newQ={id:singleQ.id||uid(),title:singleQ.title||`Question ${state.questions.length+1}`,problemHtml:singleQ.problemHtml||(singleQ.problem?`<p>${esc(singleQ.problem).replace(/\n/g,'<br>')}</p>`:''),code:singleQ.code||(singleQ.codes?(singleQ.codes[singleQ.language||state.language||'python']||Object.values(singleQ.codes)[0]):'')||'',codes:singleQ.codes||(singleQ.code?{[singleQ.language||state.language||'python']:singleQ.code}:{}),language:singleQ.language||state.language||'python',problemLocked:!!singleQ.problemLocked,problemLockHash:singleQ.problemLockHash||'',testsLocked:!!singleQ.testsLocked,testLockHash:singleQ.testLockHash||'',tests:Array.isArray(singleQ.tests)?singleQ.tests:[],customFonts:Array.isArray(singleQ.customFonts)?singleQ.customFonts:[]};let idx=state.questions.findIndex(v=>v.id===newQ.id);if(idx>=0){state.questions[idx]=newQ}else{state.questions.push(newQ);idx=state.questions.length-1}if(data.timer){state.timerMinutes=Number(data.timer.minutes)||state.timerMinutes;state.timerLocked=!!data.timer.locked;state.timerLockHash=data.timerLockHash||'';$('timerMinutes').value=state.timerMinutes}applyFonts(newQ);openQuestion(idx);if(typeof updateTimerLockUI==='function')updateTimerLockUI();if(typeof updateQuestionCountV19==='function')updateQuestionCountV19();save();if(isTimerLocked())showReadyGate();return}throw Error('Unrecognized assessment JSON format')}catch(err){console.error('JSON Import error:',err);toast(err.message||'Invalid JSON file')}}
if($('exportJson'))$('exportJson').onclick=exportAllQuestionsJson;
if($('exportQuestion'))$('exportQuestion').onclick=exportSingleQuestionJson;
if($('importJson'))$('importJson').onclick=()=>$('questionFile').click();
if($('importQuestion'))$('importQuestion').onclick=()=>$('questionFile').click();
$('questionFile').onchange=async e=>{await handleJsonImport(e.target.files[0]);e.target.value=''};
$('exportSet').onclick=async()=>{saveCurrent();let r=await fetch('/api/export-set',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(state)});download(await r.blob(),`${state.setId}.zip`)};
$('importSet').onclick=()=>$('setFile').click();
$('setFile').onchange=async e=>{try{let arr=new Uint8Array(await e.target.files[0].arrayBuffer()),bin='';for(let b of arr)bin+=String.fromCharCode(b);let r=await fetch('/api/import-set',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({base64:btoa(bin)})}),d=await r.json();if(!d.ok)throw Error(d.error);state={...state,...d.manifest,questions:d.questions};$('setIdText').textContent=state.setId;$('timerMinutes').value=state.timerMinutes||60;openQuestion(0);setTimer(false);if(typeof setHeaderNavLocked==='function')setHeaderNavLocked(true);save();}catch(err){toast(err.message||'Invalid ZIP')}e.target.value=''};
function setTimer(show=true){state.timerMinutes=Math.max(1,parseInt($('timerMinutes').value)||60);remaining=state.timerMinutes*60;clearInterval(timerHandle);tick();timerHandle=setInterval(()=>{remaining--;tick();if(remaining<=0){clearInterval(timerHandle);$('timeoutModal').classList.add('show')}},1000);save();if(show)toast('Timer set')}function tick(){let h=String(Math.floor(remaining/3600)).padStart(2,'0'),m=String(Math.floor(remaining%3600/60)).padStart(2,'0'),s=String(Math.max(0,remaining%60)).padStart(2,'0');$('timer').textContent=`${h}:${m}:${s}`}$('setTimer').onclick=()=>setTimer();document.querySelectorAll('.tabs button').forEach(b=>b.onclick=()=>{document.querySelectorAll('.tabs button,.tab').forEach(x=>x.classList.remove('active'));b.classList.add('active');$(b.dataset.tab).classList.add('active')});$('fontUp').onclick=()=>font(1);$('fontDown').onclick=()=>font(-1);function font(d){let s=parseInt(getComputedStyle(code).fontSize)+d;const sz=Math.max(11,Math.min(22,s))+'px';const lh=Math.round(parseInt(sz)*1.5)+'px';code.style.fontSize=sz;code.style.lineHeight=lh;lines.style.fontSize=sz;lines.style.lineHeight=lh;const hl=$('codeHighlight');if(hl){hl.style.fontSize=sz;hl.style.lineHeight=lh;}}function initThemeHandler(){const saved=localStorage.getItem('ide_theme_mode');if(saved==='dark'){document.body.classList.add('dark');document.documentElement.classList.add('dark')}const btn=$('theme');const syncText=()=>{if(btn){btn.textContent=document.body.classList.contains('dark')?'☀️ Light':'☾ Dark'}};syncText();const toggle=(e)=>{if(e&&e.type==='touchstart'){e.preventDefault()}document.body.classList.toggle('dark');document.documentElement.classList.toggle('dark');const isDark=document.body.classList.contains('dark');localStorage.setItem('ide_theme_mode',isDark?'dark':'light');syncText()};if(btn){btn.onclick=toggle;btn.addEventListener('touchstart',toggle,{passive:false})}}initThemeHandler();load();
/* v4: rich media selection/deletion, undo/redo, and sequential reports */
let selectedMedia=null;
problem.addEventListener('click',e=>{const m=e.target.closest('video,img,figure');if(selectedMedia)selectedMedia.classList.remove('selected-media');selectedMedia=m;if(m)m.classList.add('selected-media')});
problem.addEventListener('contextmenu',e=>{const m=e.target.closest('video,img,figure');if(!m)return;e.preventDefault();if(selectedMedia)selectedMedia.classList.remove('selected-media');selectedMedia=m;m.classList.add('selected-media');const menu=$('mediaContext');menu.style.left=Math.min(e.clientX,innerWidth-170)+'px';menu.style.top=Math.min(e.clientY,innerHeight-70)+'px';menu.classList.add('show')});
document.addEventListener('click',e=>{if(!e.target.closest('#mediaContext')&&!e.target.closest('#problem'))$('mediaContext').classList.remove('show')});
function removeSelectedMedia(){if(!selectedMedia)return;let target=selectedMedia.closest('figure')||selectedMedia;target.remove();selectedMedia=null;$('mediaContext').classList.remove('show');saveCurrent();toast('Media deleted')}
$('deleteMedia').onclick=removeSelectedMedia;
problem.addEventListener('keydown',e=>{if((e.key==='Delete'||e.key==='Backspace')&&selectedMedia){e.preventDefault();removeSelectedMedia()}});
$('problemUndo').onclick=()=>{problem.focus();document.execCommand('undo');saveCurrent()};
$('problemRedo').onclick=()=>{problem.focus();document.execCommand('redo');saveCurrent()};
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
    showOutput('Runner connection failed. Please check your network connection and try again.');
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
        actual.value='Runner connection failed. Please check your network connection and try again.';
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
  try{
    const s=JSON.parse(localStorage.getItem('browser-assessment-active-session-v18')||'null');
    if((s?.active&&s?.started)||candidateRunning)return;
  }catch(e){}
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
if($('exportQuestion'))$('exportQuestion').onclick=exportSingleQuestionJson;
if($('exportJson'))$('exportJson').onclick=exportAllQuestionsJson;
if($('importJson'))$('importJson').onclick=()=>$('questionFile').click();
if($('importQuestion'))$('importQuestion').onclick=()=>$('questionFile').click();
$('questionFile').onchange=async e=>{await handleJsonImport(e.target.files[0]);e.target.value=''};
// Wrap full-set import so imported timer lock is enforced after the asynchronous handler completes.
$('setFile').addEventListener('change',()=>setTimeout(()=>{updateTimerLockUI();if(isTimerLocked())showReadyGate()},500));
updateTimerLockUI();
// The original startup begins a timer immediately. Stop it when an imported/saved teacher lock exists.
if(isTimerLocked()){
  try{
    const s=JSON.parse(localStorage.getItem('browser-assessment-active-session-v18')||'null');
    if(!(s?.active&&s?.started))showReadyGate();
  }catch(e){showReadyGate();}
}

/* v10 imported candidate mode: first question, forward-only navigation, quiet failures */
let candidateSequentialMode=false;
function applyCandidateMode(){
  document.body.classList.toggle('candidate-sequential',candidateSequentialMode);
  if(candidateSequentialMode){
    $('prev').disabled=true;
    $('questionPicker').disabled=true;
    $('next').textContent=current>=state.questions.length-1?'Finish':'Next ›';
  }else{
    if($('questionPicker'))$('questionPicker').disabled=false;
    if($('next'))$('next').textContent='Next ›';
    if($('prev'))$('prev').disabled=current===0;
    if($('next'))$('next').disabled=current>=state.questions.length-1;
  }
}
const renderStepsBeforeCandidateMode=renderSteps;
renderSteps=function(){renderStepsBeforeCandidateMode();applyCandidateMode()};
function enterCandidateMode(){
  candidateSequentialMode=true;
  current=0;
  openQuestion(0);
  applyCandidateMode();
  toast('Assessment opened at Question 1. Navigation is forward only.');
}
// Capture full-set import and switch to candidate mode after the imported state is applied.
$('setFile').addEventListener('change',()=>setTimeout(()=>{if(state.questions&&state.questions.length)enterCandidateMode()},700));
// Prevent any backward jump through the number-grid function while candidate mode is active.
const goBeforeCandidateMode=window.go;
window.go=i=>{
  if(candidateSequentialMode&&i<current){toast('Previous questions cannot be reopened in candidate mode');return}
  goBeforeCandidateMode(i);
};
$('prev').onclick=()=>{if(candidateSequentialMode){toast('Previous questions cannot be reopened in candidate mode');return}if(current)window.go(current-1)};
$('next').onclick=()=>{
  if(current<state.questions.length-1){window.go(current+1);applyCandidateMode()}
  else{
    if(confirm('Finish the assessment now and export the completed ZIP and PDF?')){
      $('exportZip').click();
    }
  }
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
const V17_DEFAULTS={python:'',c:'',cpp:''};
function lang(){return q()?.language||state.language||'python'}function rid(){return Math.random().toString(36).slice(2)+Date.now().toString(36)}
function setLanguageUI(){const l=lang();$('languageSelect').value=l;$('compilerStatus').textContent='Online compiler · '+l.toUpperCase();updateSyntaxHighlight();}
$('languageSelect').onchange=e=>{saveCurrent();const x=q(),next=e.target.value;if(x){x.language=next;if(!x.codes)x.codes={};if(x.codes[next]!==undefined){x.code=x.codes[next]}else{x.code=V17_DEFAULTS[next]||'';x.codes[next]=x.code}code.value=x.code||'';updateLines()}state.language=next;setLanguageUI();save()};
const open17=openQuestion;openQuestion=function(i){open17(i);setLanguageUI();applyTestFreeze();applyCustomFreeze();applyCandidateSecurity()};
function isDocFullscreen(){return!!(document.fullscreenElement||document.webkitFullscreenElement||document.mozFullScreenElement||document.msFullscreenElement||document.body.classList.contains('app-fullscreen-fallback'))}
async function toggleMainFullscreen(){
  if(isDocFullscreen()){
    try{
      if(document.exitFullscreen)await document.exitFullscreen();
      else if(document.webkitExitFullscreen)await document.webkitExitFullscreen();
      else if(document.webkitCancelFullScreen)await document.webkitCancelFullScreen();
      else if(document.mozCancelFullScreen)await document.mozCancelFullScreen();
      else if(document.msExitFullscreen)await document.msExitFullscreen();
    }catch(e){console.warn('Exit fullscreen error:',e)}
    document.body.classList.remove('app-fullscreen-fallback');
    document.documentElement.classList.remove('app-fullscreen-fallback');
  }else{
    let entered=false;
    const docEl=document.documentElement;
    try{
      if(docEl.requestFullscreen){await docEl.requestFullscreen();entered=true}
      else if(docEl.webkitRequestFullscreen){await docEl.webkitRequestFullscreen();entered=true}
      else if(docEl.webkitRequestFullScreen){await docEl.webkitRequestFullScreen();entered=true}
      else if(docEl.mozRequestFullScreen){await docEl.mozRequestFullScreen();entered=true}
      else if(docEl.msRequestFullscreen){await docEl.msRequestFullscreen();entered=true}
    }catch(e){console.warn('requestFullscreen error, falling back:',e)}
    if(!entered&&!isDocFullscreen()){
      document.body.classList.add('app-fullscreen-fallback');
      document.documentElement.classList.add('app-fullscreen-fallback');
    }
  }
  syncMainFs();
}
function syncMainFs(){
  const b=$('mainFullscreen');
  if(!b)return;
  const isFs=isDocFullscreen();
  b.textContent=isFs?'✕ Exit Full Screen':'⛶ Full Screen';
  b.title=isFs?'Exit Full Screen':'Toggle Full Screen';
  b.classList.toggle('active',isFs);
}
if($('mainFullscreen')){$('mainFullscreen').onclick=toggleMainFullscreen}
['fullscreenchange','webkitfullscreenchange','mozfullscreenchange','MSFullscreenChange'].forEach(evt=>{document.addEventListener(evt,syncMainFs)});
document.addEventListener('keydown',e=>{
  if(e.key==='Escape'&&document.body.classList.contains('app-fullscreen-fallback')){
    document.body.classList.remove('app-fullscreen-fallback');
    document.documentElement.classList.remove('app-fullscreen-fallback');
    syncMainFs();
  }
});
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

/* Header Navigation & Data Controls Auto-Lock (Help Guide, Home, App store, Clear Cookies) with password '12345' */
const HEADER_NAV_PASSWORD = '12345';
let isHeaderNavLocked = false;

function isExamActiveOrLocked() {
  return !!(
    isHeaderNavLocked ||
    (typeof candidateRunning !== 'undefined' && candidateRunning) ||
    (typeof assessmentStarted !== 'undefined' && assessmentStarted) ||
    (typeof packageProtected !== 'undefined' && packageProtected) ||
    (typeof candidateSequentialMode !== 'undefined' && candidateSequentialMode) ||
    (typeof isTimerLocked === 'function' && isTimerLocked()) ||
    (typeof readExamSession === 'function' && readExamSession()?.active) ||
    document.body.classList.contains('candidate-running') ||
    document.body.classList.contains('header-nav-locked') ||
    (typeof $ === 'function' && $('candidateModal') && $('candidateModal').classList.contains('show')) ||
    (typeof $ === 'function' && $('readyModal') && $('readyModal').classList.contains('show'))
  );
}

function setHeaderNavLocked(locked) {
  isHeaderNavLocked = !!locked;
  state.headerNavLocked = isHeaderNavLocked;
  try {
    localStorage.setItem('ide_header_nav_locked', isHeaderNavLocked ? 'true' : 'false');
  } catch(e) {}
  
  const homeBtn = $('homeBtn');
  const appStoreBtn = $('appStoreBtn');
  const helpBtn = $('helpBtn');
  const clearBtn = $('clearExamData');
  
  if (homeBtn) {
    homeBtn.classList.toggle('nav-btn-locked', isHeaderNavLocked);
    homeBtn.innerHTML = isHeaderNavLocked ? '🔒 Home' : 'Home';
    homeBtn.title = isHeaderNavLocked ? 'Locked with password (Enter 12345 to unlock)' : 'Home';
  }
  if (appStoreBtn) {
    appStoreBtn.classList.toggle('nav-btn-locked', isHeaderNavLocked);
    appStoreBtn.innerHTML = isHeaderNavLocked ? '🔒 App store' : 'App store';
    appStoreBtn.title = isHeaderNavLocked ? 'Locked with password (Enter 12345 to unlock)' : 'App store';
  }
  if (helpBtn) {
    helpBtn.classList.toggle('nav-btn-locked', isHeaderNavLocked);
    helpBtn.innerHTML = isHeaderNavLocked ? '🔒 Help Guide' : '📖 Help Guide';
    helpBtn.title = isHeaderNavLocked ? 'Locked with password (Enter 12345 to unlock)' : 'Help Guide';
  }
  if (clearBtn) {
    clearBtn.classList.toggle('nav-btn-locked', isHeaderNavLocked);
    clearBtn.innerHTML = isHeaderNavLocked ? '🔒 Clear Cookies' : 'Clear Cookies';
    clearBtn.title = isHeaderNavLocked ? 'Locked with password (Enter 12345 to unlock)' : 'Clear Cookies';
  }
  document.body.classList.toggle('header-nav-locked', isHeaderNavLocked);
}

function unlockHeaderNavPrompt(targetUrl) {
  const entered = prompt('These buttons (Help Guide, Home, App store, Clear Cookies) are locked for the exam.\nEnter password to unlock:');
  if (entered === null) {
    return;
  }
  if ((entered || '').trim() === HEADER_NAV_PASSWORD) {
    setHeaderNavLocked(false);
    toast('Buttons unlocked successfully');
    if (targetUrl) {
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
    }
  } else {
    toast('Incorrect password. Access to Help Guide, Home, App store, and Clear Cookies is locked.');
  }
}

function handleLockedNavClick(e, targetUrl) {
  if (!isHeaderNavLocked) return;
  e.preventDefault();
  e.stopPropagation();
  e.stopImmediatePropagation();
  unlockHeaderNavPrompt(targetUrl);
}

function initHeaderNavLockListeners() {
  const lockedButtons = [
    { id: 'homeBtn', url: 'https://supportsourcecode.lovable.app/home' },
    { id: 'appStoreBtn', url: 'https://interactive-media-display.lovable.app/' },
    { id: 'helpBtn', url: 'help.html' }
  ];

  lockedButtons.forEach(item => {
    const el = $(item.id);
    if (el) {
      const clickHandler = (e) => {
        if (isHeaderNavLocked) {
          handleLockedNavClick(e, item.url || el.getAttribute('href'));
        }
      };
      el.addEventListener('click', clickHandler, true);
      el.addEventListener('auxclick', clickHandler, true);
    }
  });

  const checkAndIntercept = (e) => {
    if (!isHeaderNavLocked) return;
    const a = e.target.closest('a');
    if (!a) return;
    const href = a.getAttribute('href') || '';
    if (
      a.id === 'homeBtn' || 
      a.id === 'appStoreBtn' || 
      a.id === 'helpBtn' || 
      href === 'help.html' || 
      href.includes('supportsourcecode.lovable.app') || 
      href.includes('interactive-media-display.lovable.app')
    ) {
      handleLockedNavClick(e, href);
    }
  };

  document.addEventListener('click', checkAndIntercept, true);
  document.addEventListener('auxclick', checkAndIntercept, true);
}

function applyCandidateSecurity(){document.body.classList.toggle('candidate-running',candidateRunning);$('deleteQuestion').disabled=packageProtected||candidateRunning;$('deleteQuestion').hidden=packageProtected||candidateRunning;if(candidateRunning){['proctorSettings','addQuestion','importQuestion','exportQuestion','importJson','exportJson','importSet','exportSet'].forEach(id=>{const el=$(id);if(el)el.disabled=true});if(typeof setHeaderNavLocked==='function')setHeaderNavLocked(true);}}
async function hashPack(p,s){return pinHash(s+'|'+p)}
async function buildAssessmentZip(security,fileName){saveCurrent();const zip=new JSZip();const manifest={...state,questions:undefined,questionIds:state.questions.map(x=>x.id),packageSecurity:security};zip.file('assessment.json',JSON.stringify(manifest,null,2));state.questions.forEach((x,i)=>zip.file(`questions/${String(i+1).padStart(3,'0')}-${x.id}.json`,JSON.stringify(x,null,2)));zip.file('README.txt','Import this assessment ZIP using Browser Assessment IDE.');download(await zip.generateAsync({type:'blob',compression:'DEFLATE'}),fileName||`${state.setId}.zip`)}
$('exportSet').onclick=async()=>{saveCurrent();const use=confirm('Do you want to save password?\n\nOK = Save password\nCancel = Export without password');let sec={protected:false,deleteQuestionsAllowed:true};if(use){const p=prompt('Teacher: enter ZIP password (minimum 4 characters):','');if(!p||p.length<4)return toast('Use at least 4 characters');if(prompt('Confirm ZIP password:','')!==p)return toast('Passwords do not match');const salt=rid();sec={protected:true,salt,hash:await hashPack(p,salt),deleteQuestionsAllowed:false}}else if(!confirm('Export without password?'))return;await buildAssessmentZip(sec,`${state.setId}.zip`)};
$('setFile').onchange=async e=>{try{importInProgress=true;const zip=await JSZip.loadAsync(e.target.files[0]),manifest=JSON.parse(await zip.file('assessment.json').async('text')),sec=manifest.packageSecurity||{};if(sec.protected){const p=prompt('Enter password to open assessment ZIP:','');if(p===null)throw Error('Import cancelled');if(await hashPack(p,sec.salt)!==sec.hash)throw Error('Incorrect password')}const names=Object.keys(zip.files).filter(n=>/^questions\/.*\.json$/i.test(n)).sort(),questions=[];for(const n of names)questions.push(JSON.parse(await zip.file(n).async('text')));if(!questions.length)throw Error('No questions found');state={...state,...manifest,questions};if(sec.protected){state.packageSecurity=sec}packageProtected=!!sec.protected;current=0;$('setIdText').textContent=state.setId;$('timerMinutes').value=state.timerMinutes||60;openQuestion(0);save();candidateSequentialMode=true;applyCandidateMode();applyCandidateSecurity();updateTimerLockUI();applyCustomFreeze();setHeaderNavLocked(true);if(isTimerLocked())showReadyGate();else{candidateRunning=true;applyCandidateSecurity()}}catch(err){toast(err.message||'Invalid ZIP')}finally{importInProgress=false;e.target.value=''}};

/* start gate: Not Yet terminates current attempt until page reload */
const blocker=document.createElement('div');blocker.className='assessment-blocker';document.body.appendChild(blocker);
$('readyNo').onclick=()=>{$('readyModal').classList.remove('show');blocker.classList.add('show');clearInterval(timerHandle);assessmentStarted=false};
$('readyYes').onclick=()=>{$('readyModal').classList.remove('show');candidateRunning=true;applyCandidateSecurity();startLockedAssessment()};

function reportHtml17(){saveCurrent();return `<!doctype html><html><head><meta charset="utf-8"><title>${esc(state.title||'Assessment Report')}</title></head><body><h1>${esc(state.title||'Assessment Report')}</h1>${state.questions.map((x,i)=>`<article><h2>Question ${i+1}</h2><div>${x.problemHtml||''}</div><h3>Candidate Code</h3><pre>${esc(x.code||'')}</pre></article>`).join('')}</body></html>`}
$('exportHtml').onclick=()=>download(new Blob([reportHtml17()],{type:'text/html'}),safeName(state.setId)+'-report.html');$('exportWord').onclick=()=>download(new Blob([reportHtml17()],{type:'application/msword'}),safeName(state.setId)+'-report.doc');$('exportPdf').onclick=()=>{const d=document.createElement('div');d.innerHTML=reportHtml17();html2pdf().set({filename:safeName(state.setId)+'-report.pdf'}).from(d).save()};
finishLockedAssessment=async function(){if(autoExportStarted)return;autoExportStarted=true;assessmentStarted=false;clearInterval(timerHandle);saveCurrent();await buildAssessmentZip({protected:false,deleteQuestionsAllowed:false},safeName(state.setId)+'-completed.zip');const d=document.createElement('div');d.innerHTML=reportHtml17();await html2pdf().set({filename:safeName(state.setId)+'-completed.pdf'}).from(d).save();$('timeoutModal').querySelector('h2').textContent='Time is out';$('timeoutModal').querySelector('p').textContent='Please share exported zip and pdf to the question provider to evaluate';$('timeoutModal').classList.add('show')};
setLanguageUI();applyTestFreeze();applyCustomFreeze();applyCandidateSecurity();

/* v18 refresh-safe timer, locked candidate toolbar, Finish Assessment, and session cleanup */
const EXAM_SESSION_KEY='browser-assessment-active-session-v18';
const EXAM_STATE_KEY='assessment-rich-v3';
function clearExamCookies(){
  document.cookie.split(';').forEach(c => {
    const eqPos = c.indexOf('=');
    const name = eqPos > -1 ? c.substring(0, eqPos).trim() : c.trim();
    if (name) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax`;
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${location.hostname}; SameSite=Lax`;
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`;
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT;`;
    }
  });
}
function readExamSession(){try{return JSON.parse(localStorage.getItem(EXAM_SESSION_KEY)||'null')}catch(e){return null}}
function writeExamSession(extra={}){const previous=readExamSession()||{};const session={...previous,...extra,setId:state.setId,active:true,packageProtected:!!packageProtected,candidateSequentialMode:true,customInputChecked:!!state.customInputChecked,headerNavLocked:!!isHeaderNavLocked,updatedAt:Date.now()};localStorage.setItem(EXAM_SESSION_KEY,JSON.stringify(session));return session}
function clearExamSession(){clearInterval(timerHandle);localStorage.removeItem(EXAM_SESSION_KEY);localStorage.removeItem(EXAM_STATE_KEY);localStorage.removeItem('ide_header_nav_locked');setHeaderNavLocked(false);clearExamCookies();candidateRunning=false;packageProtected=false;assessmentStarted=false;autoExportStarted=false;}
function setCandidateToolbarLocked(locked){
  const controls=['addQuestion','importQuestion','exportQuestion','importJson','exportJson','importSet','exportSet','exportHtml','exportPdf','exportWord'];
  controls.forEach(id=>{const el=$(id);if(el){el.disabled=locked;el.setAttribute('aria-disabled',String(locked))}});
  $('finishAssessment').hidden=!locked;
  document.body.classList.toggle('candidate-running',locked);
  $('deleteQuestion').hidden=locked;$('deleteQuestion').disabled=locked;
  if(locked && typeof setHeaderNavLocked==='function') setHeaderNavLocked(true);
}
function startPersistentCountdown(deadline){
  assessmentStarted=true;candidateRunning=true;autoExportStarted=false;setCandidateToolbarLocked(true);applyCandidateSecurity();
  clearInterval(timerHandle);
  const update=()=>{remaining=Math.max(0,Math.ceil((deadline-Date.now())/1000));tick();if(remaining<=0){clearInterval(timerHandle);finishAssessmentV18('timeout')}};
  update();if(remaining>0)timerHandle=setInterval(update,1000);
}
function beginPersistentAssessment(){
  const duration=Math.max(1,Number(state.timerMinutes)||60);const deadline=Date.now()+duration*60000;
  writeExamSession({started:true,active:true,startTime:Date.now(),deadline,durationMinutes:duration,currentQuestion:current});
  startPersistentCountdown(deadline);
}
function resumePersistentAssessment(session){
  if(typeof restoreCandidateMetaV191==='function')restoreCandidateMetaV191();
  packageProtected=!!session.packageProtected;candidateSequentialMode=true;candidateRunning=true;
  current=Math.max(0,Math.min(Number(session.currentQuestion)||0,state.questions.length-1));
  openQuestion(current);applyCandidateMode();applyCandidateSecurity();setCandidateToolbarLocked(true);applyCustomFreeze();updateTimerLockUI();
  
  const rm=$('readyModal');if(rm)rm.classList.remove('show');
  const cm=$('candidateModal');if(cm)cm.classList.remove('show');
  const blk=document.querySelector('.assessment-blocker');if(blk)blk.classList.remove('show');
  
  if(session.deadline<=Date.now()){remaining=0;tick();finishAssessmentV18('timeout');return}
  startPersistentCountdown(session.deadline);toast('Assessment resumed from saved session. Timer and code preserved.');
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
function restoreActiveExamV18(){
  const session=readExamSession();
  if(session?.active&&session.started&&state?.questions?.length){resumePersistentAssessment(session)}
  else{setCandidateToolbarLocked(false)}
}
restoreActiveExamV18();

/* v19 candidate identity, consent-based camera evidence, full-screen gate, and submission package */
const EXAM_EVIDENCE_KEY='browser-assessment-evidence-v19';
let evidenceFrames=[],cameraStream=null,captureHandle=null,candidateMeta=null,finishV19Running=false;
function formatIstDateTime(d){if(!d)return '';const date=typeof d==='string'||typeof d==='number'?new Date(d):d;if(isNaN(date.getTime()))return String(d);return date.toLocaleString('en-IN',{timeZone:'Asia/Kolkata',hour12:true})+' IST'}
function formatIstDate(d){if(!d)return '';const date=typeof d==='string'||typeof d==='number'?new Date(d):d;if(isNaN(date.getTime()))return String(d);return date.toLocaleDateString('en-IN',{timeZone:'Asia/Kolkata'})}
function formatIstTime(d){if(!d)return '';const date=typeof d==='string'||typeof d==='number'?new Date(d):d;if(isNaN(date.getTime()))return String(d);return date.toLocaleTimeString('en-IN',{timeZone:'Asia/Kolkata',hour:'2-digit',minute:'2-digit',hour12:false})}
function examNowParts(){const d=new Date(),dateStr=d.toLocaleDateString('en-IN',{timeZone:'Asia/Kolkata'}),parts=new Intl.DateTimeFormat('en-IN',{timeZone:'Asia/Kolkata',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).formatToParts(d),hour=parts.find(p=>p.type==='hour')?.value||String(d.getHours()).padStart(2,'0'),minute=parts.find(p=>p.type==='minute')?.value||String(d.getMinutes()).padStart(2,'0');return {iso:d.toISOString(),date:dateStr,hour,minute,local:formatIstDateTime(d),ist:formatIstDateTime(d)}}
function updateQuestionCountV19(){
  const el=$('candidateQuestionCount');
  const total=state?.questions?.length||0;
  const curr=total>0?(current+1):0;
  if(el) el.textContent=`Current/Total question : ${curr}/${total}`;
  const mobCount=$('mobileQuestionCount');
  if(mobCount) mobCount.textContent=`${curr}/${total}`;
  const mobBtn=$('mobileNextBtn');
  if(mobBtn){
    const isLast=total>0&&current>=total-1;
    const label=mobBtn.querySelector('.mobile-next-label');
    const arrow=mobBtn.querySelector('.mobile-next-arrow');
    if(isLast){
      mobBtn.classList.add('is-last');
      if(label) label.textContent='Last question';
      if(arrow) arrow.textContent='•';
    }else{
      mobBtn.classList.remove('is-last');
      if(label) label.textContent='Next';
      if(arrow) arrow.textContent='›';
    }
  }
}
const renderStepsV19=renderSteps;renderSteps=function(){renderStepsV19();updateQuestionCountV19()};updateQuestionCountV19();
function ownerConfig(){return state.ownerConfig||{email:'',submissionMinutes:10}}
function applyOwnerConfig(){const c=ownerConfig();$('ownerEmail').value=c.email||'';$('submissionMinutes').value=c.submissionMinutes||10}
$('proctorSettings').onclick=()=>{applyOwnerConfig();$('ownerModal').classList.add('show')};
$('ownerCancel').onclick=()=>$('ownerModal').classList.remove('show');
$('ownerSave').onclick=()=>{const email=$('ownerEmail').value.trim(),minutes=Math.max(1,Number($('submissionMinutes').value)||10);if(email&&!/^\S+@\S+\.\S+$/.test(email))return toast('Enter a valid owner email');state.ownerConfig={email,submissionMinutes:minutes};save();$('ownerModal').classList.remove('show');toast('Exam owner setup saved in assessment package')};
function populateCandidateTime(){const n=examNowParts();$('candidateDate').value=n.date;$('candidateHour').value=n.hour;$('candidateMinute').value=n.minute}
async function openCandidateCamera(){try{cameraStream=await navigator.mediaDevices.getUserMedia({video:{width:{ideal:640},height:{ideal:360},facingMode:'user'},audio:false});$('cameraPreview').srcObject=cameraStream;$('cameraStatus').textContent='Camera is open. Keep this preview visible while confirming.';updateCandidateStartState()}catch(e){$('cameraStatus').textContent='Camera permission was not granted. The assessment cannot start in evidence mode.';toast('Camera permission is required for this configured assessment')}}
$('openCamera').onclick=openCandidateCamera;
function updateCandidateStartState(){const ok=$('candidateName').value.trim()&&$('candidateRoll').value.trim()&&$('cameraConsent').checked&&cameraStream;$('candidateStart').disabled=!ok}
['candidateName','candidateRoll','cameraConsent'].forEach(id=>$(id).addEventListener('input',updateCandidateStartState));
function watermarkFrame(canvas,stamp){const x=canvas.getContext('2d');x.save();x.font='bold 14px Segoe UI';x.fillStyle='rgba(0,0,0,.60)';x.fillRect(0,canvas.height-34,canvas.width,34);x.fillStyle='#fff';x.fillText(stamp,10,canvas.height-12);x.font='bold 18px Segoe UI';x.fillStyle='rgba(34,197,94,.58)';for(let yy=24;yy<canvas.height-30;yy+=72)for(let xx=18;xx<canvas.width;xx+=110)x.fillText('✓',xx,yy);x.restore()}
function captureEvidenceFrame(){if(!cameraStream||!candidateRunning)return;const v=$('cameraPreview'),c=document.createElement('canvas');c.width=480;c.height=270;const x=c.getContext('2d');x.drawImage(v,0,0,c.width,c.height);const now=new Date(),stamp=formatIstDateTime(now)+'.'+String(now.getMilliseconds()).padStart(3,'0');watermarkFrame(c,stamp);c.toBlob(blob=>{if(blob)evidenceFrames.push({name:`evidence/${String(evidenceFrames.length+1).padStart(6,'0')}_${now.toISOString().replace(/[:.]/g,'-')}.png`,blob,stamp})},'image/png')}
function startEvidenceCapture(){clearInterval(captureHandle);captureEvidenceFrame();captureHandle=setInterval(captureEvidenceFrame,1000)}
function stopEvidenceCapture(){clearInterval(captureHandle);captureHandle=null;if(cameraStream){cameraStream.getTracks().forEach(t=>t.stop());cameraStream=null}}
async function requestExamFullscreen(){try{if(!document.fullscreenElement)await document.documentElement.requestFullscreen()}catch(e){toast('Full screen was blocked. Use the browser full-screen control before continuing.')}}
function showCandidateGateV19(){populateCandidateTime();$('candidateName').value='';$('candidateRoll').value='';$('cameraConsent').checked=false;$('candidateStart').disabled=true;$('candidateModal').classList.add('show')}
async function startCandidateV19(){const n=examNowParts();candidateMeta={fullName:$('candidateName').value.trim(),rollNumber:$('candidateRoll').value.trim(),currentDate:n.date,currentHour:n.hour,currentMinute:n.minute,startTime:n.iso,ownerEmail:ownerConfig().email||'',submissionMinutes:ownerConfig().submissionMinutes||10};localStorage.setItem(EXAM_EVIDENCE_KEY,JSON.stringify(candidateMeta));$('candidateModal').classList.remove('show');await requestExamFullscreen();beginPersistentAssessment();startEvidenceCapture();alert(`After the exam, share the exported PDF and ZIP with the exam owner within ${candidateMeta.submissionMinutes} minute(s) at ${candidateMeta.ownerEmail||'the email provided by the owner'}. Do not press Esc or close the exam. Ending early will finish the attempt.`)}
$('candidateStart').onclick=startCandidateV19;
const readyYesV19=$('readyYes');readyYesV19.onclick=()=>{$('readyModal').classList.remove('show');showCandidateGateV19()};
function blockCandidateClipboard(e){if(e.target&&e.target.closest&&(e.target.closest('.modal')||e.target.closest('.test-card.student-extra')))return;if(candidateRunning){e.preventDefault();toast('Copy, cut, and paste are disabled during the assessment')}}
['copy','cut','paste'].forEach(type=>document.addEventListener(type,blockCandidateClipboard,true));
document.addEventListener('contextmenu',e=>{if(e.target&&e.target.closest&&(e.target.closest('.modal')||e.target.closest('.test-card.student-extra')))return;if(candidateRunning){e.preventDefault();toast('Right-click is disabled during the assessment')}},true);
function instructionTextV19(reason,end){const c=candidateMeta||{};const owner=ownerConfig();const due=new Date(end.getTime()+(Number(c.submissionMinutes||owner.submissionMinutes||10)*60000));const startDisp=formatIstDateTime(c.startTime)||c.startTime||'',endDisp=formatIstDateTime(end),dueDisp=formatIstDateTime(due);return `ASSESSMENT SUBMISSION INSTRUCTIONS\n\nCandidate Full Name: ${c.fullName||''}\nRoll Number: ${c.rollNumber||''}\nCurrent Date: ${c.currentDate||formatIstDate(c.startTime)}\nCurrent Hour: ${c.currentHour||''}\nCurrent Minute: ${c.currentMinute||''}\nExam Start (IST): ${startDisp}\nExam End (IST): ${endDisp}\nFinish Reason: ${reason}\nTotal Questions: ${state.questions.length}\nOwner Email: ${c.ownerEmail||owner.email||''}\nSubmission Window: ${c.submissionMinutes||owner.submissionMinutes||10} minute(s)\nSubmit By (IST): ${dueDisp}\n\nShare both the completed ZIP and PDF with the exam owner. Keep the original files unchanged. Camera images are assessment evidence for authorized review only. This application does not automatically determine cheating, identity, emotion, or gaze.`}
function reportHtmlV19(reason,end){const c=candidateMeta||{};const startDisp=formatIstDateTime(c.startTime)||esc(c.startTime||''),endDisp=formatIstDateTime(end),dateDisp=c.currentDate||formatIstDate(c.startTime)||formatIstDate(new Date()),timeDisp=c.currentHour&&c.currentMinute?(c.currentHour+':'+c.currentMinute+' IST'):formatIstTime(c.startTime)||formatIstTime(new Date());return `<!doctype html><html><head><meta charset="utf-8"><style>body{font-family:Arial,sans-serif;margin:24px;color:#102a43}h1{color:#073b88}.meta{border:1px solid #9fb3c8;padding:12px;background:#f4f7fb;border-radius:6px;margin-bottom:20px}.shot{page-break-inside:avoid;margin:12px 0}.shot img{width:100%;max-width:700px}.stamp{font-size:11px}</style></head><body><h1>Assessment Submission Report</h1><div class="meta"><b>Full Name:</b> ${esc(c.fullName||'')}<br><b>Roll Number:</b> ${esc(c.rollNumber||'')}<br><b>Current Date:</b> ${esc(dateDisp)}<br><b>Current Time:</b> ${esc(timeDisp)}<br><b>Exam Start (IST):</b> ${esc(startDisp)}<br><b>Exam End (IST):</b> ${esc(endDisp)}<br><b>Finish Reason:</b> ${esc(reason)}<br><b>Total Questions:</b> ${state.questions.length}</div>${state.questions.map((x,i)=>`<article><h2>Question ${i+1}</h2><div>${x.problemHtml||''}</div><h3>Candidate Code</h3><pre>${esc(x.code||'')}</pre></article>`).join('')}<h2>Camera Evidence</h2><div id="evidenceShots"></div></body></html>`}
function evidenceHtmlV20(end){const c=candidateMeta||{};return `<!doctype html><html><head><meta charset="utf-8"><title>Camera Evidence Report</title><style>body{font-family:Arial,sans-serif;margin:24px;color:#102a43}h1{color:#073b88}.meta{border:1px solid #9fb3c8;padding:12px;background:#f4f7fb;border-radius:6px;margin-bottom:20px}.shot{margin:20px 0;padding:15px;border:1px solid #bfd2eb;border-radius:8px;background:#fff;page-break-inside:avoid}.shot img{width:100%;max-width:640px;border-radius:5px;display:block;margin-bottom:10px}.stamp{font-size:12px;font-weight:bold;color:#607495}</style></head><body><h1>Camera Evidence Report</h1><div class="meta"><b>Full Name:</b> ${esc(c.fullName||'')}<br><b>Roll Number:</b> ${esc(c.rollNumber||'')}<br><b>Exam Start (IST):</b> ${esc(formatIstDateTime(c.startTime))}<br><b>Exam End (IST):</b> ${esc(formatIstDateTime(end))}</div><h2>Evidence Frames</h2><div id="evidenceShots">${evidenceFrames.map((f,i)=>`<div class="shot"><h3>Frame ${i+1}</h3><img src="${f.name}"><div class="stamp">${esc(f.stamp)}</div></div>`).join('')}</div></body></html>`}
async function pdfBlobV19(reason,end){const holder=document.createElement('div');holder.innerHTML=reportHtmlV19(reason,end);const shots=holder.querySelector('#evidenceShots');if(shots){shots.innerHTML='<p>Camera evidence screenshots are generated in HTML format inside the <b>camera-evidence.html</b> file in the completed ZIP.</p>'}return html2pdf().set({margin:8,html2canvas:{scale:1},jsPDF:{unit:'mm',format:'a4',orientation:'portrait'}}).from(holder).output('blob')}
async function completedZipBlobV19(reason,end,pdfBlob,onProgress){saveCurrent();const zip=new JSZip(),manifest={...state,questions:undefined,questionIds:state.questions.map(x=>x.id),candidate:candidateMeta,completedAt:end.toISOString(),finishReason:reason,submission:true};zip.file('assessment.json',JSON.stringify(manifest,null,2));state.questions.forEach((x,i)=>zip.file(`questions/${String(i+1).padStart(3,'0')}-${x.id}.json`,JSON.stringify(x,null,2)));for(const f of evidenceFrames)zip.file(f.name,f.blob);zip.file('camera-evidence.html',evidenceHtmlV20(end));zip.file('instruction.txt',instructionTextV19(reason,end)+'\nCamera Evidence: camera-evidence.html\n');zip.file('assessment-report.pdf',pdfBlob);return zip.generateAsync({type:'blob',compression:'DEFLATE',compressionOptions:{level:1}},metadata=>{if(onProgress)onProgress(Math.round(metadata.percent))})}
async function finishAssessmentV19(reason){if(finishV19Running)return;finishV19Running=true;autoExportStarted=true;clearInterval(timerHandle);captureEvidenceFrame();await new Promise(r=>setTimeout(r,250));stopEvidenceCapture();saveCurrent();const end=new Date(),base=safeName((candidateMeta?.rollNumber||state.setId||'assessment')+'-'+(candidateMeta?.fullName||'candidate'));let pdfBlob,zipBlob;const progressModal=document.createElement('div');progressModal.className='modal show';progressModal.style.zIndex='2147483647';progressModal.innerHTML=`<div class="setup-card" style="text-align:center;max-width:480px;padding:30px;"><h2 style="margin-top:0;color:var(--blue);">Creating Submission Package</h2><p style="margin:15px 0;font-weight:bold;line-height:1.5;color:var(--text);">Please wait for some minutes.<br>The process of ZIP and PDF creation is under progress...</p><div style="background:var(--soft);border-radius:10px;height:20px;width:100%;overflow:hidden;margin:20px 0;border:1px solid var(--line);"><div id="exportProgressBar" style="background:var(--blue);width:0%;height:100%;transition:width 0.1s ease;"></div></div><div id="exportProgressPercent" style="font-size:18px;font-weight:bold;color:var(--text);">0%</div></div>`;document.body.appendChild(progressModal);try{pdfBlob=await pdfBlobV19(reason,end);download(pdfBlob,base+'-completed.pdf');const evidenceHtml=evidenceHtmlV20(end);download(new Blob([evidenceHtml],{type:'text/html'}),base+'-camera-evidence.html');zipBlob=await completedZipBlobV19(reason,end,pdfBlob,percent=>{const bar=document.getElementById('exportProgressBar');const txt=document.getElementById('exportProgressPercent');if(bar)bar.style.width=percent+'%';if(txt)txt.textContent=percent+'%'});download(zipBlob,base+'-completed.zip');download(new Blob([instructionTextV19(reason,end)],{type:'text/plain'}),base+'-instruction.txt')}catch(e){console.error(e);toast('Export failed: '+e.message);finishV19Running=false;progressModal.remove();return}finally{progressModal.remove()}clearExamSession();localStorage.removeItem(EXAM_EVIDENCE_KEY);if(document.fullscreenElement)document.exitFullscreen().catch(()=>{});document.body.classList.add('submission-complete');const m=$('timeoutModal');m.querySelector('h2').textContent=reason==='timeout'?'Time is out':reason==='escape'?'Assessment ended by Esc':'Assessment finished';m.querySelector('p').textContent=`Share the exported PDF and ZIP within ${candidateMeta?.submissionMinutes||ownerConfig().submissionMinutes||10} minute(s) to ${candidateMeta?.ownerEmail||ownerConfig().email||'the exam owner email'}.`;const b=m.querySelector('button');b.textContent='Return to Import Screen';b.onclick=()=>location.reload();m.classList.add('show')}
finishAssessmentV18=finishAssessmentV19;finishLockedAssessment=()=>finishAssessmentV19('timeout');$('finishAssessment').onclick=()=>{if(confirm('Finish now? This ends the attempt and exports the PDF, ZIP, and instruction file.'))finishAssessmentV19('manual')};
// Exiting full screen or pressing Escape will NOT close or finish the exam.
let escapeArmed=true;
window.addEventListener('beforeunload',e=>{
  saveCurrent();
  try{
    const s=readExamSession();
    if(s?.started&&s?.active)writeExamSession({currentQuestion:current});
  }catch(err){}
  if(candidateRunning&&!finishV19Running){
    e.preventDefault();
    e.returnValue='Your active assessment is in progress. Edits and time are saved, but refresh is monitored.';
  }
});
const originalSetImportV19=$('setFile').onchange;$('setFile').onchange=async e=>{await originalSetImportV19.call($('setFile'),e);updateQuestionCountV19()};

/* v19.1 fix: require candidate details/camera for every imported assessment and preserve metadata */
function validCandidateMetaV191(){return !!(candidateMeta&&candidateMeta.fullName&&candidateMeta.rollNumber&&candidateMeta.startTime)}
function restoreCandidateMetaV191(){try{const x=JSON.parse(localStorage.getItem(EXAM_EVIDENCE_KEY)||'null');if(x&&x.fullName&&x.rollNumber)candidateMeta=x}catch(e){}}
restoreCandidateMetaV191();
async function waitForVideoV191(video){if(video.readyState>=2&&video.videoWidth)return;await new Promise((resolve,reject)=>{const done=()=>{cleanup();resolve()},fail=()=>{cleanup();reject(Error('Camera preview could not start'))},cleanup=()=>{video.removeEventListener('loadeddata',done);video.removeEventListener('error',fail)};video.addEventListener('loadeddata',done,{once:true});video.addEventListener('error',fail,{once:true});setTimeout(()=>{cleanup();video.videoWidth?resolve():reject(Error('Camera preview timed out'))},5000)})}
openCandidateCamera=async function(){try{if(cameraStream)cameraStream.getTracks().forEach(t=>t.stop());cameraStream=await navigator.mediaDevices.getUserMedia({video:{width:{ideal:640},height:{ideal:360},facingMode:'user'},audio:true});const v=$('cameraPreview');v.srcObject=cameraStream;await v.play();await waitForVideoV191(v);$('cameraStatus').textContent='Camera is ready. Evidence capture will start after Ready to Exam.';updateCandidateStartState()}catch(e){cameraStream=null;$('cameraStatus').textContent='Camera could not start: '+e.message;$('candidateStart').disabled=true;toast('Please allow camera and microphone permissions in your browser settings')}};
$('openCamera').onclick=openCandidateCamera;
captureEvidenceFrame=function(){if(!cameraStream||!candidateRunning)return;const v=$('cameraPreview');if(v.readyState<2||!v.videoWidth||!v.videoHeight)return;const c=document.createElement('canvas');c.width=480;c.height=270;const x=c.getContext('2d');x.drawImage(v,0,0,c.width,c.height);const now=new Date(),stamp=formatIstDateTime(now)+'.'+String(now.getMilliseconds()).padStart(3,'0');watermarkFrame(c,stamp);c.toBlob(blob=>{if(blob)evidenceFrames.push({name:`evidence/${String(evidenceFrames.length+1).padStart(6,'0')}_${now.toISOString().replace(/[:.]/g,'-')}.png`,blob,stamp})},'image/png')};
const startCandidateBeforeV191=startCandidateV19;
startCandidateV19=async function(){if(!cameraStream||$('cameraPreview').readyState<2)return toast('Open the camera and wait until the preview is visible');await startCandidateBeforeV191()};
$('candidateStart').onclick=startCandidateV19;
// Every imported assessment, locked or unlocked, must pass through candidate verification.
$('setFile').addEventListener('change',()=>setTimeout(()=>{if(!state?.questions?.length)return;clearInterval(timerHandle);assessmentStarted=false;candidateRunning=false;autoExportStarted=false;setCandidateToolbarLocked(false);applyCandidateSecurity();if(typeof setHeaderNavLocked==='function')setHeaderNavLocked(true);showCandidateGateV19()},1300));
// Do not permit manual export/finish before identity and camera start are established.
$('finishAssessment').onclick=()=>{if(!validCandidateMetaV191()||!candidateRunning)return toast('Start the assessment with candidate details and camera before finishing');if(confirm('Finish now? This ends the attempt and exports the PDF, ZIP, and instruction file.'))finishAssessmentV19('manual')};
const finishAssessmentBeforeV191=finishAssessmentV19;
finishAssessmentV19=async function(reason){if(!validCandidateMetaV191()){finishV19Running=false;autoExportStarted=false;toast('Candidate details are missing. Return to the start screen and begin the assessment correctly.');return}return finishAssessmentBeforeV191(reason)};
finishAssessmentV18=finishAssessmentV19;finishLockedAssessment=()=>finishAssessmentV19('timeout');

/* v20 clear cookies, no forced fullscreen, keyboard-only code entry, and screen recording */
let screenStream=null,screenRecorder=null,screenChunks=[],screenRecordingBlob=null,screenRecordingStartedAt=null;
function clearAllAssessmentDataV20(){
  if (isExamActiveOrLocked()) {
    const entered = prompt('Clear Cookies is locked during the exam.\nEnter password (12345) to unlock:');
    if (entered === null) {
      return;
    }
    if ((entered || '').trim() !== HEADER_NAV_PASSWORD) {
      toast('Incorrect password. Clear Cookies is locked during the exam.');
      return;
    }
    if (!confirm('Password verified. Clearing cookies will end your active exam session and reset all data. Continue?')) {
      return;
    }
  } else {
    if (!confirm('Clear all assessment cookies and local data?')) return;
  }
  isClearingData = true;
  try{stopEvidenceCapture()}catch(e){}
  try{stopScreenRecordingV20()}catch(e){}
  clearInterval(timerHandle);
  clearExamCookies();
  try{localStorage.clear();}catch(e){}
  try{sessionStorage.clear();}catch(e){}
  if(typeof setHeaderNavLocked==='function')setHeaderNavLocked(false);
  candidateMeta=null;
  evidenceFrames=[];
  current=0;
  history=[];
  candidateRunning=false;
  assessmentStarted=false;
  autoExportStarted=false;
  packageProtected=false;
  state=getDefaultAssessmentState();
  try{localStorage.setItem(EXAM_STATE_KEY,JSON.stringify(state));}catch(e){}
  if(problem)problem.innerHTML='';
  if(code)code.value='';
  if($('codeHighlightContent'))$('codeHighlightContent').innerHTML='';
  if($('testList'))$('testList').innerHTML='';
  if($('testCount'))$('testCount').textContent='0';
  if($('testSummary')){$('testSummary').textContent='Not evaluated';$('testSummary').className='test-summary';}
  if($('lines'))$('lines').textContent='1';
  if($('questionTitle'))$('questionTitle').textContent='Question 1';
  if($('questionId'))$('questionId').textContent=state.questions[0]?.id||'';
  if($('setIdText'))$('setIdText').textContent=state.setId||'';
  if($('candidateQuestionCount'))$('candidateQuestionCount').textContent='Current/Total question : 1/1';
  if($('mobileQuestionCount'))$('mobileQuestionCount').textContent='1/1';
  if($('steps'))$('steps').innerHTML='<button class="active" onclick="go(0)">1</button>';
  if($('prev'))$('prev').disabled=true;
  if($('next'))$('next').disabled=true;
  if($('console')){$('console').hidden=true;$('console').textContent='';}
  if($('empty'))$('empty').hidden=false;
  if($('historyList'))$('historyList').textContent='No executions yet.';
  toast('Assessment cookies and local session data cleared');
  setTimeout(()=>location.reload(),350);
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
function blockExamInputV20(e){if(e.target&&e.target.closest&&(e.target.closest('.modal')||e.target.closest('.test-card.student-extra')||e.target.closest('.work-resizer')||e.target.closest('.split-btn')||e.target.closest('.main-resizer')||e.target.closest('.v-split-btn')))return;if(!candidateRunning)return;if(['copy','cut','paste','drop','dragstart'].includes(e.type)){e.preventDefault();e.stopImmediatePropagation();toast('Copy, paste, drag, and drop are disabled during the assessment');return}if(e.type==='beforeinput'&&e.target!==code){e.preventDefault();e.stopImmediatePropagation();return}if(e.type==='keydown'){const navigation=['Tab','Shift','Control','Alt','Meta','CapsLock','ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home','End','PageUp','PageDown','Backspace','Delete','Enter'];const shortcut=e.ctrlKey||e.metaKey||e.altKey;if(e.target!==code&&!navigation.includes(e.key)){e.preventDefault();e.stopImmediatePropagation()}if(shortcut&&['v','V','c','C','x','X','a','A','s','S','p','P'].includes(e.key)){e.preventDefault();e.stopImmediatePropagation();toast('Keyboard shortcuts are disabled during the assessment')}}}
['copy','cut','paste','drop','dragstart','beforeinput','keydown'].forEach(t=>document.addEventListener(t,blockExamInputV20,true));
document.addEventListener('contextmenu',e=>{if(e.target&&e.target.closest&&(e.target.closest('.modal')||e.target.closest('.test-card.student-extra')||e.target.closest('.work-resizer')||e.target.closest('.split-btn')||e.target.closest('.main-resizer')||e.target.closest('.v-split-btn')))return;if(candidateRunning){e.preventDefault();e.stopImmediatePropagation();toast('Right-click is disabled during the assessment')}},true);
// Remove all exam termination behavior related to Escape or fullscreen changes.
escapeArmed=true;
let finishV20Running=false;
const originalReportHtmlV19=reportHtmlV19;
function reportHtmlV20(reason,end){const base=originalReportHtmlV19(reason,end);const startDisp=formatIstDateTime(screenRecordingStartedAt),endDisp=formatIstDateTime(end);return base.replace('<h2>Camera Evidence</h2><div id="evidenceShots"></div>','<h2>Camera Evidence</h2><div id="evidenceShots"></div><h2>Screen Recording</h2><p>The completed ZIP contains the screen recording in the screen-recording folder. Recording format: MP4. Start (IST): '+esc(startDisp)+'. End (IST): '+esc(endDisp)+'.</p>')}
reportHtmlV19=reportHtmlV20;
async function completedZipBlobV20(reason,end,pdfBlob,onProgress){saveCurrent();const zip=new JSZip(),manifest={...state,questions:undefined,questionIds:state.questions.map(x=>x.id),candidate:candidateMeta,completedAt:end.toISOString(),finishReason:reason,submission:true,screenRecording:{file:'screen-recording/exam-screen.mp4',startedAt:screenRecordingStartedAt?.toISOString()||'',endedAt:end.toISOString()}};zip.file('assessment.json',JSON.stringify(manifest,null,2));state.questions.forEach((x,i)=>zip.file(`questions/${String(i+1).padStart(3,'0')}-${x.id}.json`,JSON.stringify(x,null,2)));for(const f of evidenceFrames)zip.file(f.name,f.blob);zip.file('camera-evidence.html',evidenceHtmlV20(end));zip.file('instruction.txt',instructionTextV19(reason,end)+'\nScreen Recording: screen-recording/exam-screen.mp4\nCamera Evidence: camera-evidence.html\n');zip.file('assessment-report.pdf',pdfBlob);if(screenRecordingBlob?.size)zip.file('screen-recording/exam-screen.mp4',screenRecordingBlob);return zip.generateAsync({type:'blob',compression:'DEFLATE',compressionOptions:{level:1}},metadata=>{if(onProgress)onProgress(Math.round(metadata.percent))})}
completedZipBlobV19=completedZipBlobV20;
const finishBeforeV20=finishAssessmentV19;finishAssessmentV20=async function(reason){if(finishV20Running)return;finishV20Running=true;await stopScreenRecordingV20();finishV19Running=false;return finishBeforeV20(reason)};
finishAssessmentV19=finishAssessmentV20;finishAssessmentV18=finishAssessmentV20;finishLockedAssessment=()=>finishAssessmentV20('timeout');$('finishAssessment').onclick=()=>{if(!validCandidateMetaV191()||!candidateRunning)return toast('Start the assessment with candidate details, camera, and screen sharing before finishing');if(confirm('Finish now? This ends the attempt and exports the PDF, ZIP, instruction file, camera evidence, and screen recording.'))finishAssessmentV20('manual')};



/* ==========================================================================
   FLEXIBLE WORK RESIZER (HORIZONTAL SPLITTER BETWEEN CODE & TEST CASES)
   ========================================================================== */
function initWorkResizer() {
  const work = $('workSection') || document.querySelector('.work');
  const resizer = $('workResizer');
  const topBtn = $('splitTopBtn');
  const midBtn = $('splitMidBtn');
  const downBtn = $('splitDownBtn');
  
  if (!work || !resizer) return;

  let isDragging = false;
  let startY = 0;
  let startEditorHeight = 0;

  function updateActiveButton(mode) {
    if (topBtn) topBtn.classList.toggle('active', mode === 'top');
    if (midBtn) midBtn.classList.toggle('active', mode === 'mid');
    if (downBtn) downBtn.classList.toggle('active', mode === 'down');
  }

  function getAvailableHeight() {
    const workRect = work.getBoundingClientRect();
    const runbar = work.querySelector('.runbar');
    const resizerHeight = resizer.offsetHeight || 24;
    const runbarHeight = runbar ? runbar.offsetHeight : 44;
    const padding = 14;
    return Math.max(140, workRect.height - resizerHeight - runbarHeight - padding);
  }

  function setEditorHeight(heightPx, mode = 'custom', save = true) {
    const totalAvail = getAvailableHeight();
    const minH = 50;
    const maxH = Math.max(minH, totalAvail - 50);
    const clampedH = Math.max(minH, Math.min(maxH, Math.round(heightPx)));
    
    work.style.setProperty('--editor-height', `${clampedH}px`);
    updateActiveButton(mode);

    if (save) {
      const ratio = totalAvail > 0 ? (clampedH / totalAvail) : 0.5;
      localStorage.setItem('ide_work_editor_ratio', ratio.toFixed(3));
      localStorage.setItem('ide_work_split_mode', mode);
    }
  }

  function snapTop() {
    // Top mode: editor minimized (52px), Test Cases & execution given maximum space to read during question
    setEditorHeight(52, 'top', true);
  }

  function snapMid() {
    // Balanced 50/50 view: both Code and Test cases visible at the same time
    const totalAvail = getAvailableHeight();
    setEditorHeight(Math.round(totalAvail * 0.48), 'mid', true);
  }

  function snapDown() {
    // Down mode: Code editor maximized (~82%), Test cases minimized
    const totalAvail = getAvailableHeight();
    setEditorHeight(Math.round(totalAvail * 0.82), 'down', true);
  }

  // Quick Shift Buttons
  if (topBtn) {
    topBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      snapTop();
    });
  }
  if (midBtn) {
    midBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      snapMid();
    });
  }
  if (downBtn) {
    downBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      snapDown();
    });
  }

  // Double-click resizer to toggle or reset to 50/50
  resizer.addEventListener('dblclick', (e) => {
    if (e.target && e.target.closest && e.target.closest('.split-btn')) return;
    const currentMode = localStorage.getItem('ide_work_split_mode');
    if (currentMode === 'mid') {
      snapTop();
    } else {
      snapMid();
    }
  });

  // Dragging handlers (Mouse & Touch)
  function startDrag(clientY) {
    isDragging = true;
    startY = clientY;
    const editorCard = $('editorCard') || work.querySelector('.editor-card');
    startEditorHeight = editorCard ? editorCard.getBoundingClientRect().height : (getAvailableHeight() * 0.5);

    resizer.classList.add('active');
    work.classList.add('is-resizing');
    document.body.classList.add('is-resizing-v');
  }

  function onDrag(clientY) {
    if (!isDragging) return;
    const deltaY = clientY - startY;
    const targetH = startEditorHeight + deltaY;
    setEditorHeight(targetH, 'custom', false);
  }

  function stopDrag() {
    if (!isDragging) return;
    isDragging = false;
    resizer.classList.remove('active');
    work.classList.remove('is-resizing');
    document.body.classList.remove('is-resizing-v');

    const editorCard = $('editorCard') || work.querySelector('.editor-card');
    if (editorCard) {
      const h = editorCard.getBoundingClientRect().height;
      const totalAvail = getAvailableHeight();
      const ratio = totalAvail > 0 ? (h / totalAvail) : 0.5;
      localStorage.setItem('ide_work_editor_ratio', ratio.toFixed(3));
      localStorage.setItem('ide_work_split_mode', 'custom');
      updateActiveButton('custom');
    }
  }

  // Mouse drag events
  resizer.addEventListener('mousedown', (e) => {
    if (e.target && e.target.closest && e.target.closest('.split-btn')) return;
    e.preventDefault();
    startDrag(e.clientY);
  });

  window.addEventListener('mousemove', (e) => {
    if (isDragging) {
      e.preventDefault();
      onDrag(e.clientY);
    }
  });

  window.addEventListener('mouseup', () => {
    if (isDragging) stopDrag();
  });

  // Touch drag events
  resizer.addEventListener('touchstart', (e) => {
    if (e.target && e.target.closest && e.target.closest('.split-btn')) return;
    if (e.touches && e.touches.length === 1) {
      startDrag(e.touches[0].clientY);
    }
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (isDragging && e.touches && e.touches.length === 1) {
      onDrag(e.touches[0].clientY);
    }
  }, { passive: true });

  window.addEventListener('touchend', () => {
    if (isDragging) stopDrag();
  });

  // Restore saved preference on load
  function restoreSavedSplit() {
    const savedMode = localStorage.getItem('ide_work_split_mode');
    const savedRatio = parseFloat(localStorage.getItem('ide_work_editor_ratio'));

    if (savedMode === 'top') {
      snapTop();
    } else if (savedMode === 'down') {
      snapDown();
    } else if (savedMode === 'mid') {
      snapMid();
    } else if (!isNaN(savedRatio) && savedRatio > 0 && savedRatio < 1) {
      const totalAvail = getAvailableHeight();
      setEditorHeight(Math.round(totalAvail * savedRatio), 'custom', false);
    } else {
      snapMid();
    }
  }

  setTimeout(restoreSavedSplit, 50);
  window.addEventListener('resize', () => {
    if (!isDragging) {
      const savedMode = localStorage.getItem('ide_work_split_mode');
      if (savedMode === 'top') snapTop();
      else if (savedMode === 'down') snapDown();
      else if (savedMode === 'mid') snapMid();
    }
  });
}

// Initialize work splitter
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initWorkResizer);
} else {
  initWorkResizer();
}

/* ==========================================================================
   VERTICAL RESIZER (BETWEEN QUESTION PANEL & CODING/TESTS SECTION)
   ========================================================================== */
function initMainResizer() {
  const main = document.querySelector('main');
  const resizer = $('mainResizer');
  const problemPanel = $('problemPanel');
  const leftBtn = $('splitLeftBtn');
  const midBtn = $('splitMainMidBtn');
  const rightBtn = $('splitRightBtn');

  if (!main || !resizer || !problemPanel) return;

  let isDragging = false;
  let startX = 0;
  let startProblemWidth = 0;

  function updateActiveButton(mode) {
    if (leftBtn) leftBtn.classList.toggle('active', mode === 'left');
    if (midBtn) midBtn.classList.toggle('active', mode === 'mid');
    if (rightBtn) rightBtn.classList.toggle('active', mode === 'right');
  }

  function getAvailableWidth() {
    const mainRect = main.getBoundingClientRect();
    const resizerWidth = resizer.offsetWidth || 26;
    return Math.max(300, mainRect.width - resizerWidth);
  }

  function setProblemWidth(widthPx, mode = 'custom', save = true) {
    const totalAvail = getAvailableWidth();
    const minW = 60;
    const maxW = Math.max(minW, totalAvail - 120);
    const clampedW = Math.max(minW, Math.min(maxW, Math.round(widthPx)));

    problemPanel.style.setProperty('--problem-width', `${clampedW}px`);
    updateActiveButton(mode);

    if (save) {
      const ratio = totalAvail > 0 ? (clampedW / totalAvail) : 0.43;
      localStorage.setItem('ide_main_problem_ratio', ratio.toFixed(3));
      localStorage.setItem('ide_main_split_mode', mode);
    }
  }

  function snapLeft() {
    // Left mode: Question minimized (~80px), Coding & Tests maximized
    setProblemWidth(80, 'left', true);
  }

  function snapMid() {
    // Balanced 50/50 view: Question and Code/Tests visible at the same time
    const totalAvail = getAvailableWidth();
    setProblemWidth(Math.round(totalAvail * 0.5), 'mid', true);
  }

  function snapRight() {
    // Right mode: Question maximized (~72%), Code/Tests compacted
    const totalAvail = getAvailableWidth();
    setProblemWidth(Math.round(totalAvail * 0.72), 'right', true);
  }

  // Quick Shift Buttons
  if (leftBtn) {
    leftBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      snapLeft();
    });
  }
  if (midBtn) {
    midBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      snapMid();
    });
  }
  if (rightBtn) {
    rightBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      snapRight();
    });
  }

  // Double-click resizer to toggle or reset to 50/50
  resizer.addEventListener('dblclick', (e) => {
    if (e.target && e.target.closest && e.target.closest('.v-split-btn')) return;
    const currentMode = localStorage.getItem('ide_main_split_mode');
    if (currentMode === 'mid') {
      snapLeft();
    } else {
      snapMid();
    }
  });

  // Dragging handlers (Mouse & Touch)
  function startDrag(clientX) {
    isDragging = true;
    startX = clientX;
    startProblemWidth = problemPanel.getBoundingClientRect().width;

    resizer.classList.add('active');
    main.classList.add('is-resizing-h');
    document.body.classList.add('is-resizing-h');
  }

  function onDrag(clientX) {
    if (!isDragging) return;
    const deltaX = clientX - startX;
    const targetW = startProblemWidth + deltaX;
    setProblemWidth(targetW, 'custom', false);
  }

  function stopDrag() {
    if (!isDragging) return;
    isDragging = false;
    resizer.classList.remove('active');
    main.classList.remove('is-resizing-h');
    document.body.classList.remove('is-resizing-h');

    const w = problemPanel.getBoundingClientRect().width;
    const totalAvail = getAvailableWidth();
    const ratio = totalAvail > 0 ? (w / totalAvail) : 0.43;
    localStorage.setItem('ide_main_problem_ratio', ratio.toFixed(3));
    localStorage.setItem('ide_main_split_mode', 'custom');
    updateActiveButton('custom');
  }

  // Mouse drag events
  resizer.addEventListener('mousedown', (e) => {
    if (e.target && e.target.closest && e.target.closest('.v-split-btn')) return;
    e.preventDefault();
    startDrag(e.clientX);
  });

  window.addEventListener('mousemove', (e) => {
    if (isDragging) {
      e.preventDefault();
      onDrag(e.clientX);
    }
  });

  window.addEventListener('mouseup', () => {
    if (isDragging) stopDrag();
  });

  // Touch drag events
  resizer.addEventListener('touchstart', (e) => {
    if (e.target && e.target.closest && e.target.closest('.v-split-btn')) return;
    if (e.touches && e.touches.length === 1) {
      startDrag(e.touches[0].clientX);
    }
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (isDragging && e.touches && e.touches.length === 1) {
      onDrag(e.touches[0].clientX);
    }
  }, { passive: true });

  window.addEventListener('touchend', () => {
    if (isDragging) stopDrag();
  });

  // Restore saved preference on load
  function restoreSavedSplit() {
    if (window.innerWidth <= 1050) return;
    const savedMode = localStorage.getItem('ide_main_split_mode');
    const savedRatio = parseFloat(localStorage.getItem('ide_main_problem_ratio'));

    if (savedMode === 'left') {
      snapLeft();
    } else if (savedMode === 'right') {
      snapRight();
    } else if (savedMode === 'mid') {
      snapMid();
    } else if (!isNaN(savedRatio) && savedRatio > 0 && savedRatio < 1) {
      const totalAvail = getAvailableWidth();
      setProblemWidth(Math.round(totalAvail * savedRatio), 'custom', false);
    } else {
      snapMid();
    }
  }

  setTimeout(restoreSavedSplit, 50);
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1050 && !isDragging) {
      const savedMode = localStorage.getItem('ide_main_split_mode');
      if (savedMode === 'left') snapLeft();
      else if (savedMode === 'right') snapRight();
      else if (savedMode === 'mid') snapMid();
    }
  });
}

// Initialize main vertical splitter
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMainResizer);
} else {
  initMainResizer();
}

/* ==========================================================================
   MOBILE KEYBOARD AUTO-SCROLL & VIEWPORT MANAGEMENT
   ========================================================================== */
function initMobileKeyboardAutoScroll() {
  let scrollTimeout = null;
  let isTyping = false;

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
        
        // Target comfortable top position: ~12-20% from visible top
        const desiredTopOffset = Math.max(60, vHeight * 0.16);
        const currentAbsoluteTop = window.pageYOffset || document.documentElement.scrollTop || 0;
        const targetScrollY = currentAbsoluteTop + rect.top - desiredTopOffset;

        // Auto-scroll screen up so input is completely visible above keyboard
        if (rect.bottom > vHeight - 35 || rect.top < 55) {
          window.scrollTo({
            top: Math.max(0, targetScrollY),
            behavior: immediate ? 'auto' : 'smooth'
          });
        }

        // If it's a textarea (like #code), also keep active line inside textarea visible
        if (el.tagName === 'TEXTAREA' && typeof el.selectionStart === 'number') {
          const val = el.value || '';
          const pos = el.selectionStart;
          const linesBefore = val.substring(0, pos).split('\n').length;
          const lineHeight = 21; // Consolas line height
          const cursorTopPx = (linesBefore - 1) * lineHeight;
          
          if (cursorTopPx < el.scrollTop || cursorTopPx > el.scrollTop + el.clientHeight - 45) {
            el.scrollTop = Math.max(0, cursorTopPx - Math.floor(el.clientHeight / 2));
          }
          if (el.id === 'code') {
            const linesEl = $('lines');
            if (linesEl) linesEl.scrollTop = el.scrollTop;
          }
        }
      } catch (err) {
        try {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } catch (e) {}
      }
    }, immediate ? 20 : 160);
  }

  // Handle focusin on any input / textarea / contenteditable
  document.addEventListener('focusin', (e) => {
    if (isEditableElement(e.target) && isMobile()) {
      document.body.classList.add('keyboard-open');
      ensureVisibleAboveKeyboard(e.target, false);
      // Re-check once virtual keyboard slide animation completes
      setTimeout(() => ensureVisibleAboveKeyboard(e.target, false), 350);
    }
  });

  // Handle focusout
  document.addEventListener('focusout', () => {
    setTimeout(() => {
      const active = document.activeElement;
      if (!isEditableElement(active)) {
        document.body.classList.remove('keyboard-open');
      }
    }, 200);
  });

  // Track visualViewport resize (virtual keyboard appearing/closing)
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

  // Track live typing input in code, problem, or textareas
  let typingDebounce = null;
  document.addEventListener('input', (e) => {
    if (!isMobile() || !isEditableElement(e.target)) return;
    clearTimeout(typingDebounce);
    typingDebounce = setTimeout(() => {
      ensureVisibleAboveKeyboard(e.target, false);
    }, 250);
  });

  // Handle keyup navigation (Enter, Arrow keys)
  document.addEventListener('keyup', (e) => {
    if (!isMobile() || !isEditableElement(e.target)) return;
    if (['Enter', 'ArrowUp', 'ArrowDown', 'Backspace'].includes(e.key)) {
      ensureVisibleAboveKeyboard(e.target, false);
    }
  });

  // Tap/click on editor to scroll immediately
  if (code) {
    code.addEventListener('click', () => {
      if (isMobile()) ensureVisibleAboveKeyboard(code, false);
    });
  }
  if (problem) {
    problem.addEventListener('click', () => {
      if (isMobile()) ensureVisibleAboveKeyboard(problem, false);
    });
  }
}

// Initialize mobile keyboard auto-scroll
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initMobileKeyboardAutoScroll();
    if (typeof restoreActiveExamV18 === 'function') restoreActiveExamV18();
  });
} else {
  initMobileKeyboardAutoScroll();
  if (typeof restoreActiveExamV18 === 'function') restoreActiveExamV18();
}
window.addEventListener('load', () => {
  if (typeof restoreActiveExamV18 === 'function') restoreActiveExamV18();
});

/* ==========================================================================
   WELCOME / DESKTOP MODE RECOMMENDATION MODAL & MOCK DATA IMPORT
   ========================================================================== */
const welcomeModal = $('welcomeModal');

function closeWelcomeDialog() {
  if (welcomeModal) {
    welcomeModal.classList.remove('show');
    welcomeModal.style.display = 'none';
  }
}
window.closeWelcomeDialog = closeWelcomeDialog;
window.closeWelcomeModal = closeWelcomeDialog;

if ($('closeWelcomeModal')) $('closeWelcomeModal').onclick = closeWelcomeDialog;
if ($('dismissWelcomeModal')) $('dismissWelcomeModal').onclick = closeWelcomeDialog;

async function loadSampleMockData() {
  try {
    const res = await fetch('SET-MUJDFHP0-all-questions.json');
    if (res.ok) {
      return await res.json();
    }
  } catch (e) {}
  return SAMPLE_MOCK_DATA;
}

async function loadMockTestData() {
  const m = $('welcomeModal');
  if (m) {
    m.classList.remove('show');
    m.style.display = 'none';
  }
  if (typeof window.closeWelcomeDialog === 'function') window.closeWelcomeDialog();
  if (typeof candidateRunning !== 'undefined' && candidateRunning) return;

  try {
    let packet = null;
    try {
      packet = await loadSampleMockData();
    } catch (e) {}
    if (!packet && typeof SAMPLE_MOCK_DATA !== 'undefined') {
      packet = SAMPLE_MOCK_DATA;
    }
    if (packet) {
      await handleJsonImport(packet);
      toast('Mock test data loaded successfully!');
    }
  } catch (err) {
    console.error('Mock data error:', err);
    try {
      await handleJsonImport(SAMPLE_MOCK_DATA);
      toast('Mock test data loaded successfully!');
    } catch (e2) {
      toast('Failed to load mock data');
    }
  }
}
window.loadMockTestData = loadMockTestData;

if ($('tryMockData')) {
  $('tryMockData').onclick = async (e) => {
    if (e) e.preventDefault();
    await loadMockTestData();
  };
}

if (welcomeModal) {
  welcomeModal.addEventListener('click', (e) => {
    if (e.target === welcomeModal) closeWelcomeDialog();
  });
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && welcomeModal && (welcomeModal.classList.contains('show') || welcomeModal.style.display === 'grid' || welcomeModal.style.display === 'flex')) {
    closeWelcomeDialog();
  }
});

// Ensure all button aliases and actions are wired up and responsive
function initAllIDEButtonListeners() {
  if (typeof initHeaderNavLockListeners === 'function') initHeaderNavLockListeners();
  if (localStorage.getItem('ide_header_nav_locked') === 'true' || state?.headerNavLocked) {
    if (typeof setHeaderNavLocked === 'function') setHeaderNavLocked(true);
  }
  if ($('mainFullscreen')) $('mainFullscreen').onclick = toggleMainFullscreen;
  if ($('workspaceFullscreen')) $('workspaceFullscreen').onclick = toggleMainFullscreen;
  if ($('addQuestion')) $('addQuestion').onclick = () => { saveCurrent(); state.questions.push(starter()); openQuestion(state.questions.length - 1); save(); };
  if ($('importJson')) $('importJson').onclick = () => $('questionFile').click();
  if ($('importAllJson')) $('importAllJson').onclick = () => $('questionFile').click();
  if ($('exportJson')) $('exportJson').onclick = exportAllQuestionsJson;
  if ($('exportAllJson')) $('exportAllJson').onclick = exportAllQuestionsJson;
  if ($('exportQuestion')) $('exportQuestion').onclick = exportSingleQuestionJson;
  if ($('importQuestion')) $('importQuestion').onclick = () => $('questionFile').click();
  if ($('importSet')) $('importSet').onclick = () => $('setFile').click();
  if ($('prev')) $('prev').onclick = () => current && go(current - 1);
  if ($('next')) $('next').onclick = () => current < state.questions.length - 1 && go(current + 1);
  if ($('deleteQuestion')) $('deleteQuestion').onclick = () => { if (state.questions.length < 2) return toast('At least one question is required'); if (confirm('Delete this question?')) { state.questions.splice(current, 1); openQuestion(Math.min(current, state.questions.length - 1)); save(); } };
  if ($('runTests')) $('runTests').onclick = runAll;
  if ($('runCustom')) $('runCustom').onclick = (typeof runCurrentMode === 'function') ? runCurrentMode : runCustom;
  if ($('fontUp')) $('fontUp').onclick = () => font(1);
  if ($('fontDown')) $('fontDown').onclick = () => font(-1);
  if ($('setTimer')) $('setTimer').onclick = () => setTimer();
  if ($('timerLock')) $('timerLock').onclick = lockTimer;
  if ($('proctorSettings')) $('proctorSettings').onclick = () => { applyOwnerConfig(); $('ownerModal').classList.add('show'); };
  if ($('ownerCancel')) $('ownerCancel').onclick = () => $('ownerModal').classList.remove('show');
  if ($('clearExamData')) $('clearExamData').onclick = clearAllAssessmentDataV20;
  if ($('mobileNextBtn')) $('mobileNextBtn').onclick = () => { if ($('next')) $('next').click(); };
  syncMobileTimerPlacement();
}

function syncMobileTimerPlacement() {
  const hud = $('examTimerFinishHud');
  const addBtn = $('addQuestion');
  const headActions = document.querySelector('.head-actions');
  const mainFullscreen = $('mainFullscreen');
  if (!hud || !addBtn) return;

  const isMobile = window.innerWidth <= 768;
  if (isMobile) {
    if (addBtn.previousElementSibling !== hud && addBtn.parentNode) {
      addBtn.parentNode.insertBefore(hud, addBtn);
    }
  } else {
    if (headActions && !headActions.contains(hud)) {
      if (mainFullscreen && mainFullscreen.parentNode === headActions) {
        headActions.insertBefore(hud, mainFullscreen);
      } else {
        headActions.appendChild(hud);
      }
    }
  }
}

window.addEventListener('resize', syncMobileTimerPlacement);

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initAllIDEButtonListeners();
    syncMobileTimerPlacement();
  });
} else {
  initAllIDEButtonListeners();
  syncMobileTimerPlacement();
}








