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
  "totalQuestions": 30,
  "exportedAt": "2026-10-20T10:30:00.000Z",
  "questions": [
    {
      "id": "Q-MV29WLF3-K20K",
      "title": "Question 1: Membership Spend Reward",
      "problemHtml": "<h2>Problem Statement</h2>\n<p>A store rewards purchases that meet a spend threshold, weighting each qualifying purchase by its 1-based position. A purchase at 1-based position <code>p</code> qualifies if its amount is at least <code>K</code>, and then earns <code>p</code> multiplied by its amount. Your task is to find and return an integer value representing the total reward over all qualifying purchases.</p>\n<p><b>Note:</b> Purchases strictly below the threshold earn nothing.</p>\n<p><b>Input Specification:</b><br>\nLine 1: Space-separated integers representing the array <code>A</code> (purchase amounts).<br>\nLine 2: An integer <code>K</code>, representing the spend threshold.\n</p>\n<p><b>Output Specification:</b><br>\nPrint an integer value representing the total reward over all qualifying purchases.\n</p>\n<h3>Example 1:</h3>\n<p>\n<b>Input:</b><br>\n<pre>8 3 12 7\n6</pre>\n<b>Output:</b><br>\n<pre>72</pre>\n<b>Explanation:</b><br>\nPosition 1, amount 8 >= 6: add 1 * 8 = 8.<br>\nPosition 2, amount 3 < 6: skipped.<br>\nPosition 3, amount 12 >= 6: add 3 * 12 = 36.<br>\nPosition 4, amount 7 >= 6: add 4 * 7 = 28.<br>\nTotal reward = 8 + 36 + 28 = 72.\n</p>\n<h3>Example 2:</h3>\n<p>\n<b>Input:</b><br>\n<pre>5 11 4 9 2 14\n8</pre>\n<b>Output:</b><br>\n<pre>142</pre>\n<b>Explanation:</b><br>\nFor K = 8: Position 2 (11 >= 8) -> 2 * 11 = 22; Position 4 (9 >= 8) -> 4 * 9 = 36; Position 6 (14 >= 8) -> 6 * 14 = 84.<br>\nTotal reward = 22 + 36 + 84 = 142.\n</p>",
      "code": "\ndef main():\n    lines = []\n    for _ in range(2):\n        try:\n            lines.append(input())\n        except EOFError:\n            break\n    tokens = \" \".join(lines).split()\n    if not tokens:\n        print(0)\n        return\n    k = int(tokens[-1])\n    a = list(map(int, tokens[:-1]))\n    total = 0\n    for p, val in enumerate(a, start=1):\n        if val >= k:\n            total += p * val\n    print(total)\n\nif __name__ == '__main__':\n    main()",
      "codes": {
        "python": "\ndef main():\n    lines = []\n    for _ in range(2):\n        try:\n            lines.append(input())\n        except EOFError:\n            break\n    tokens = \" \".join(lines).split()\n    if not tokens:\n        print(0)\n        return\n    k = int(tokens[-1])\n    a = list(map(int, tokens[:-1]))\n    total = 0\n    for p, val in enumerate(a, start=1):\n        if val >= k:\n            total += p * val\n    print(total)\n\nif __name__ == '__main__':\n    main()",
        "c": "#include <stdio.h>\n#include <string.h>\n#include <stdlib.h>\n\nint main(void) {\n    char line[10000];\n    if (!fgets(line, sizeof(line), stdin)) return 0;\n    int a[1000];\n    int n = 0;\n    char *tok = strtok(line, \" \\t\\r\\n\");\n    while (tok) {\n        a[n++] = atoi(tok);\n        tok = strtok(NULL, \" \\t\\r\\n\");\n    }\n    int k;\n    if (scanf(\"%d\", &k) != 1) return 0;\n    long long total = 0;\n    for (int i = 0; i < n; i++) {\n        if (a[i] >= k) {\n            total += (long long)(i + 1) * a[i];\n        }\n    }\n    printf(\"%lld\\n\", total);\n    return 0;\n}\n",
        "cpp": "#include <iostream>\n#include <sstream>\n#include <vector>\n#include <string>\n\nusing namespace std;\n\nint main() {\n    string line;\n    if (!getline(cin, line)) return 0;\n    stringstream ss(line);\n    vector<int> a;\n    int val;\n    while (ss >> val) a.push_back(val);\n    int k;\n    if (!(cin >> k)) return 0;\n    long long total = 0;\n    for (size_t i = 0; i < a.size(); ++i) {\n        if (a[i] >= k) {\n            total += (long long)(i + 1) * a[i];\n        }\n    }\n    cout << total << endl;\n    return 0;\n}\n"
      },
      "language": "python",
      "problemLocked": false,
      "problemLockHash": "",
      "testsLocked": false,
      "testLockHash": "",
      "tests": [
        {
          "input": "8 3 12 7\n6",
          "expected": "72",
          "studentDefined": false
        },
        {
          "input": "5 11 4 9 2 14\n8",
          "expected": "142",
          "studentDefined": false
        },
        {
          "input": "2 3 4\n10",
          "expected": "0",
          "studentDefined": false
        },
        {
          "input": "10 20 30\n5",
          "expected": "140",
          "studentDefined": false
        }
      ],
      "customFonts": []
    },
    {
      "id": "Q-MV2A1Z7Z-5BVV",
      "title": "Question 2: Cab Fare Prime Loyalty Bonus",
      "problemHtml": "<h2>Problem Statement</h2>\n<p>A rideshare app rewards the first few trips whose fare happens to be a prime number with a loyalty bonus. You are given an integer <code>K</code>, an integer <code>N</code>, and an integer array <code>A</code> of trip fares in order. The total is the sum of all fares plus, scanning in order, a bonus equal to the fare for each of the first <code>K</code> fares that are prime.</p>\n<p><b>Note:</b> At most <code>K</code> bonuses are awarded, granted to the earliest qualifying prime fares. Fares 0 and 1 are not prime numbers.</p>\n<p><b>Input Specification:</b><br>\nLine 1: An integer value <code>K</code>, representing the bonus cap.<br>\nLine 2: An integer value <code>N</code>, representing the number of trips.<br>\nLine 3: <code>N</code> space-separated integers representing array <code>A</code> (the trip fares).\n</p>\n<p><b>Output Specification:</b><br>\nPrint an integer value representing the total amount (all fares plus up to <code>K</code> prime-fare bonuses).\n</p>\n<h3>Example 1:</h3>\n<p>\n<b>Input:</b><br>\n<pre>2\n3\n4 7 13</pre>\n<b>Output:</b><br>\n<pre>44</pre>\n<b>Explanation:</b><br>\nBase total = 4 + 7 + 13 = 24.<br>\nScan fares in order with bonus cap K = 2:<br>\n- 4 is not prime -> no bonus<br>\n- 7 is prime and bonus slot 1/2 is free -> add bonus 7<br>\n- 13 is prime and bonus slot 2/2 is free -> add bonus 13<br>\nTotal = 24 + 7 + 13 = 44.\n</p>\n<h3>Example 2:</h3>\n<p>\n<b>Input:</b><br>\n<pre>2\n4\n3 5 8 7</pre>\n<b>Output:</b><br>\n<pre>31</pre>\n<b>Explanation:</b><br>\nBase total = 3 + 5 + 8 + 7 = 23.<br>\n- 3 is prime (slot 1/2) -> add bonus 3<br>\n- 5 is prime (slot 2/2) -> add bonus 5<br>\n- 8 is not prime -> no bonus<br>\n- 7 is prime, but cap K = 2 is reached -> no bonus<br>\nTotal = 23 + 3 + 5 = 31.\n</p>",
      "code": "\ndef is_prime(x):\n    if x < 2:\n        return False\n    d = 2\n    while d * d <= x:\n        if x % d == 0:\n            return False\n        d += 1\n    return True\n\ndef main():\n    lines = []\n    for _ in range(3):\n        try:\n            lines.append(input())\n        except EOFError:\n            break\n    tokens = \" \".join(lines).split()\n    if not tokens:\n        print(0)\n        return\n    k = int(tokens[0])\n    n = int(tokens[1])\n    a = list(map(int, tokens[2:2+n]))\n    total = sum(a)\n    primes_found = 0\n    for fare in a:\n        if primes_found < k and is_prime(fare):\n            total += fare\n            primes_found += 1\n    print(total)\n\nif __name__ == '__main__':\n    main()",
      "codes": {
        "python": "\ndef is_prime(x):\n    if x < 2:\n        return False\n    d = 2\n    while d * d <= x:\n        if x % d == 0:\n            return False\n        d += 1\n    return True\n\ndef main():\n    lines = []\n    for _ in range(3):\n        try:\n            lines.append(input())\n        except EOFError:\n            break\n    tokens = \" \".join(lines).split()\n    if not tokens:\n        print(0)\n        return\n    k = int(tokens[0])\n    n = int(tokens[1])\n    a = list(map(int, tokens[2:2+n]))\n    total = sum(a)\n    primes_found = 0\n    for fare in a:\n        if primes_found < k and is_prime(fare):\n            total += fare\n            primes_found += 1\n    print(total)\n\nif __name__ == '__main__':\n    main()",
        "c": "#include <stdio.h>\n#include <stdbool.h>\n\nbool is_prime(int x) {\n    if (x < 2) return false;\n    for (int d = 2; (long long)d * d <= x; d++) {\n        if (x % d == 0) return false;\n    }\n    return true;\n}\n\nint main(void) {\n    int k, n;\n    if (scanf(\"%d %d\", &k, &n) != 2) return 0;\n    long long total = 0;\n    int primes_found = 0;\n    for (int i = 0; i < n; i++) {\n        int fare;\n        scanf(\"%d\", &fare);\n        total += fare;\n        if (primes_found < k && is_prime(fare)) {\n            total += fare;\n            primes_found++;\n        }\n    }\n    printf(\"%lld\\n\", total);\n    return 0;\n}",
        "cpp": "#include <iostream>\n#include <vector>\n\nusing namespace std;\n\nbool isPrime(int x) {\n    if (x < 2) return false;\n    for (long long d = 2; d * d <= x; ++d) {\n        if (x % d == 0) return false;\n    }\n    return true;\n}\n\nint main() {\n    int k, n;\n    if (!(cin >> k >> n)) return 0;\n    long long total = 0;\n    int primes_found = 0;\n    for (int i = 0; i < n; ++i) {\n        int fare;\n        cin >> fare;\n        total += fare;\n        if (primes_found < k && isPrime(fare)) {\n            total += fare;\n            primes_found++;\n        }\n    }\n    cout << total << endl;\n    return 0;\n}"
      },
      "language": "python",
      "problemLocked": false,
      "problemLockHash": "",
      "testsLocked": false,
      "testLockHash": "",
      "tests": [
        {
          "input": "2\n3\n4 7 13",
          "expected": "44",
          "studentDefined": false
        },
        {
          "input": "2\n4\n3 5 8 7",
          "expected": "31",
          "studentDefined": false
        },
        {
          "input": "0\n3\n2 3 5",
          "expected": "10",
          "studentDefined": false
        },
        {
          "input": "5\n4\n1 4 6 8",
          "expected": "19",
          "studentDefined": false
        }
      ],
      "customFonts": []
    },
    {
      "id": "Q-MV2A4G6A-LLTL",
      "title": "Question 3: Shipping-Label Shift",
      "problemHtml": "<h2>Problem Statement</h2>\n<p>A depot relabels shipping labels by shifting each lowercase letter forward in the alphabet according to its 0-based position in the string. You are given a string <code>S</code> of lowercase letters. Replace each character at position <code>i</code> (0-based) by shifting it forward by <code>i + 1</code> positions in the alphabet, wrapping around from 'z' back to 'a'. Your task is to find and return a string representing the relabeled string.</p>\n<p><b>Note:</b> The character at 0-based position <code>i</code> is shifted forward by <code>i + 1</code> positions.</p>\n<p><b>Input Specification:</b><br>\nA single line containing the string <code>S</code> of lowercase label characters.\n</p>\n<p><b>Output Specification:</b><br>\nPrint a string representing the relabeled string.\n</p>\n<h3>Example 1:</h3>\n<p>\n<b>Input:</b><br>\n<pre>cab</pre>\n<b>Output:</b><br>\n<pre>dce</pre>\n<b>Explanation:</b><br>\nPosition 0: 'c' shifted by 1 -> 'd'.<br>\nPosition 1: 'a' shifted by 2 -> 'c'.<br>\nPosition 2: 'b' shifted by 3 -> 'e'.<br>\nResult = \"dce\".\n</p>\n<h3>Example 2:</h3>\n<p>\n<b>Input:</b><br>\n<pre>tide</pre>\n<b>Output:</b><br>\n<pre>ukgi</pre>\n<b>Explanation:</b><br>\nPosition 0: 't' shifted by 1 -> 'u'.<br>\nPosition 1: 'i' shifted by 2 -> 'k'.<br>\nPosition 2: 'd' shifted by 3 -> 'g'.<br>\nPosition 3: 'e' shifted by 4 -> 'i'.<br>\nResult = \"ukgi\".\n</p>",
      "code": "\ndef main():\n    s = input().strip()\n    if not s:\n        print(\"\")\n        return\n    res = []\n    for i, ch in enumerate(s):\n        base = ord(ch) - ord('a')\n        shifted = (base + (i + 1)) % 26\n        res.append(chr(ord('a') + shifted))\n    print(\"\".join(res))\n\nif __name__ == '__main__':\n    main()",
      "codes": {
        "python": "\ndef main():\n    s = input().strip()\n    if not s:\n        print(\"\")\n        return\n    res = []\n    for i, ch in enumerate(s):\n        base = ord(ch) - ord('a')\n        shifted = (base + (i + 1)) % 26\n        res.append(chr(ord('a') + shifted))\n    print(\"\".join(res))\n\nif __name__ == '__main__':\n    main()",
        "c": "#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    char s[10000];\n    if (scanf(\"%s\", s) == 1) {\n        int len = strlen(s);\n        for (int i = 0; i < len; i++) {\n            int base = s[i] - 'a';\n            int shifted = (base + (i + 1)) % 26;\n            s[i] = (char)('a' + shifted);\n        }\n        printf(\"%s\\n\", s);\n    }\n    return 0;\n}",
        "cpp": "#include <iostream>\n#include <string>\n\nusing namespace std;\n\nint main() {\n    string s;\n    if (cin >> s) {\n        for (size_t i = 0; i < s.length(); ++i) {\n            int base = s[i] - 'a';\n            int shifted = (base + (int)(i + 1)) % 26;\n            s[i] = (char)('a' + shifted);\n        }\n        cout << s << endl;\n    }\n    return 0;\n}"
      },
      "language": "python",
      "problemLocked": false,
      "problemLockHash": "",
      "testsLocked": false,
      "testLockHash": "",
      "tests": [
        {
          "input": "cab",
          "expected": "dce",
          "studentDefined": false
        },
        {
          "input": "tide",
          "expected": "ukgi",
          "studentDefined": false
        },
        {
          "input": "z",
          "expected": "a",
          "studentDefined": false
        },
        {
          "input": "xyz",
          "expected": "yac",
          "studentDefined": false
        }
      ],
      "customFonts": []
    },
    {
      "id": "Q-MV2A65RR-NJTR",
      "title": "Question 4: SpectrumExpansionCipher",
      "problemHtml": "<h2>Problem Statement</h2>\n<p>A radio encoder shifts each character further along the alphabet as the set of distinct characters seen increases. You are given a string <code>S</code> of lowercase letters. Reading from left to right, each character is shifted forward by the number of distinct letters seen so far (including the current one), wrapping from 'z' back to 'a'. Your task is to find and return a string representing the encoded string.</p>\n<p><b>Note:</b> The shift grows by one each time a brand-new letter first appears.</p>\n<p><b>Input Specification:</b><br>\nA single line containing the string <code>S</code> to encode.\n</p>\n<p><b>Output Specification:</b><br>\nPrint a string representing the encoded string.\n</p>\n<h3>Example 1:</h3>\n<p>\n<b>Input:</b><br>\n<pre>gvmug</pre>\n<b>Output:</b><br>\n<pre>hxpyk</pre>\n<b>Explanation:</b><br>\nPosition 1 ('g'): distinct seen so far = 1 -> 'g' + 1 = 'h'.<br>\nPosition 2 ('v'): distinct seen so far = 2 -> 'v' + 2 = 'x'.<br>\nPosition 3 ('m'): distinct seen so far = 3 -> 'm' + 3 = 'p'.<br>\nPosition 4 ('u'): distinct seen so far = 4 -> 'u' + 4 = 'y'.<br>\nPosition 5 ('g'): distinct seen so far = 4 -> 'g' + 4 = 'k'.<br>\nEncoded string = \"hxpyk\".\n</p>\n<h3>Example 2:</h3>\n<p>\n<b>Input:</b><br>\n<pre>haytjmv</pre>\n<b>Output:</b><br>\n<pre>icbxosc</pre>\n<b>Explanation:</b><br>\nS = \"haytjmv\":<br>\nPosition 1 ('h'): distinct = 1 -> 'i'.<br>\nPosition 2 ('a'): distinct = 2 -> 'c'.<br>\nPosition 3 ('y'): distinct = 3 -> 'b'.<br>\nPosition 4 ('t'): distinct = 4 -> 'x'.<br>\nPosition 5 ('j'): distinct = 5 -> 'o'.<br>\nPosition 6 ('m'): distinct = 6 -> 's'.<br>\nPosition 7 ('v'): distinct = 7 -> 'c'.<br>\nResult = \"icbxosc\".\n</p>",
      "code": "\ndef main():\n    s = input().strip()\n    if not s:\n        print(\"\")\n        return\n    seen = set()\n    res = []\n    for ch in s:\n        seen.add(ch)\n        shift = len(seen)\n        base = ord(ch) - ord('a')\n        res.append(chr(ord('a') + (base + shift) % 26))\n    print(\"\".join(res))\n\nif __name__ == '__main__':\n    main()",
      "codes": {
        "python": "\ndef main():\n    s = input().strip()\n    if not s:\n        print(\"\")\n        return\n    seen = set()\n    res = []\n    for ch in s:\n        seen.add(ch)\n        shift = len(seen)\n        base = ord(ch) - ord('a')\n        res.append(chr(ord('a') + (base + shift) % 26))\n    print(\"\".join(res))\n\nif __name__ == '__main__':\n    main()",
        "c": "#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    char s[10000];\n    if (scanf(\"%s\", s) == 1) {\n        int seen[26] = {0};\n        int distinct = 0;\n        int len = strlen(s);\n        for (int i = 0; i < len; i++) {\n            int idx = s[i] - 'a';\n            if (!seen[idx]) {\n                seen[idx] = 1;\n                distinct++;\n            }\n            int shifted = (idx + distinct) % 26;\n            s[i] = (char)('a' + shifted);\n        }\n        printf(\"%s\\n\", s);\n    }\n    return 0;\n}",
        "cpp": "#include <iostream>\n#include <string>\n#include <vector>\n\nusing namespace std;\n\nint main() {\n    string s;\n    if (cin >> s) {\n        vector<bool> seen(26, false);\n        int distinct = 0;\n        for (char &c : s) {\n            int idx = c - 'a';\n            if (!seen[idx]) {\n                seen[idx] = true;\n                distinct++;\n            }\n            c = (char)('a' + (idx + distinct) % 26);\n        }\n        cout << s << endl;\n    }\n    return 0;\n}"
      },
      "language": "python",
      "problemLocked": false,
      "problemLockHash": "",
      "testsLocked": false,
      "testLockHash": "",
      "tests": [
        {
          "input": "gvmug",
          "expected": "hxpyk",
          "studentDefined": false
        },
        {
          "input": "haytjmv",
          "expected": "icbxosc",
          "studentDefined": false
        },
        {
          "input": "aaaa",
          "expected": "bbbb",
          "studentDefined": false
        },
        {
          "input": "abc",
          "expected": "bdf",
          "studentDefined": false
        }
      ],
      "customFonts": []
    },
    {
      "id": "Q-MV2A9HVX-9TV5",
      "title": "Question 5: Conveyor Surge Settling Score",
      "problemHtml": "<h2>Problem Statement</h2>\n<p>A conveyor belt of weighing stations suffers settling stress whenever a heavier station is immediately followed by a lighter one. You are given an integer <code>N</code> and an integer array <code>A</code> of station weights. For every adjacent pair where <code>A[i-1] > A[i]</code> (called a step-down), add <code>A[i-1] + A[i]</code> to the total. Adjacent pairs that rise or remain equal contribute 0. Your task is to find and return an integer value representing the total settling stress over every step-down.</p>\n<p><b>Note:</b> Only strictly descending adjacent pairs contribute.</p>\n<p><b>Input Specification:</b><br>\nLine 1: An integer value <code>N</code>, representing the number of stations.<br>\nLine 2: <code>N</code> space-separated integers representing the station weights <code>A</code>.\n</p>\n<p><b>Output Specification:</b><br>\nPrint an integer value representing the total settling stress over every step-down.\n</p>\n<h3>Example 1:</h3>\n<p>\n<b>Input:</b><br>\n<pre>3\n20 6 14</pre>\n<b>Output:</b><br>\n<pre>26</pre>\n<b>Explanation:</b><br>\n20 -> 6 is a step-down: add 20 + 6 = 26.<br>\n6 -> 14 is not a step-down: skip.<br>\nTotal = 26.\n</p>\n<h3>Example 2:</h3>\n<p>\n<b>Input:</b><br>\n<pre>4\n18 3 14 6</pre>\n<b>Output:</b><br>\n<pre>41</pre>\n<b>Explanation:</b><br>\n18 -> 3 is a step-down: add 18 + 3 = 21.<br>\n3 -> 14 is not a step-down: skip.<br>\n14 -> 6 is a step-down: add 14 + 6 = 20.<br>\nTotal = 21 + 20 = 41.\n</p>",
      "code": "\ndef main():\n    lines = []\n    for _ in range(2):\n        try:\n            lines.append(input())\n        except EOFError:\n            break\n    tokens = \" \".join(lines).split()\n    if not tokens:\n        print(0)\n        return\n    n = int(tokens[0])\n    a = list(map(int, tokens[1:1+n]))\n    total = 0\n    for i in range(1, len(a)):\n        if a[i-1] > a[i]:\n            total += a[i-1] + a[i]\n    print(total)\n\nif __name__ == '__main__':\n    main()",
      "codes": {
        "python": "\ndef main():\n    lines = []\n    for _ in range(2):\n        try:\n            lines.append(input())\n        except EOFError:\n            break\n    tokens = \" \".join(lines).split()\n    if not tokens:\n        print(0)\n        return\n    n = int(tokens[0])\n    a = list(map(int, tokens[1:1+n]))\n    total = 0\n    for i in range(1, len(a)):\n        if a[i-1] > a[i]:\n            total += a[i-1] + a[i]\n    print(total)\n\nif __name__ == '__main__':\n    main()",
        "c": "#include <stdio.h>\n\nint main(void) {\n    int n;\n    if (scanf(\"%d\", &n) != 1 || n <= 1) {\n        printf(\"0\\n\");\n        return 0;\n    }\n    int prev;\n    scanf(\"%d\", &prev);\n    long long total = 0;\n    for (int i = 1; i < n; i++) {\n        int curr;\n        scanf(\"%d\", &curr);\n        if (prev > curr) {\n            total += prev + curr;\n        }\n        prev = curr;\n    }\n    printf(\"%lld\\n\", total);\n    return 0;\n}",
        "cpp": "#include <iostream>\n#include <vector>\n\nusing namespace std;\n\nint main() {\n    int n;\n    if (!(cin >> n) || n <= 1) {\n        cout << 0 << endl;\n        return 0;\n    }\n    int prev;\n    cin >> prev;\n    long long total = 0;\n    for (int i = 1; i < n; ++i) {\n        int curr;\n        cin >> curr;\n        if (prev > curr) {\n            total += prev + curr;\n        }\n        prev = curr;\n    }\n    cout << total << endl;\n    return 0;\n}"
      },
      "language": "python",
      "problemLocked": false,
      "problemLockHash": "",
      "testsLocked": false,
      "testLockHash": "",
      "tests": [
        {
          "input": "3\n20 6 14",
          "expected": "26",
          "studentDefined": false
        },
        {
          "input": "4\n18 3 14 6",
          "expected": "41",
          "studentDefined": false
        },
        {
          "input": "3\n1 2 3",
          "expected": "0",
          "studentDefined": false
        },
        {
          "input": "3\n5 5 5",
          "expected": "0",
          "studentDefined": false
        }
      ],
      "customFonts": []
    },
    {
      "id": "Q-MV2AC6AD-745X",
      "title": "Question 6: Signal Tower Fortification",
      "problemHtml": "<h2>Problem Statement</h2>\n<p>A communication grid strengthens each tower reading with the maximum signal seen up to that point. You are given an integer <code>N</code> and an integer array <code>A</code> representing tower readings. The fortified value at position <code>i</code> is calculated as <code>B[i] = A[i] + max(A[0..i])</code>. Your task is to find and return an integer array representing the fortified array <code>B</code>.</p>\n<p><b>Note:</b> The running maximum never decreases as <code>i</code> grows.</p>\n<p><b>Input Specification:</b><br>\nLine 1: An integer value <code>N</code>, representing the number of towers.<br>\nLine 2: <code>N</code> space-separated integers representing the readings <code>A</code>.\n</p>\n<p><b>Output Specification:</b><br>\nPrint space-separated integers representing the fortified array <code>B</code>.\n</p>\n<h3>Example 1:</h3>\n<p>\n<b>Input:</b><br>\n<pre>5\n7 3 5 9 2</pre>\n<b>Output:</b><br>\n<pre>14 10 12 18 11</pre>\n<b>Explanation:</b><br>\nStation 1 (7): peak = 7 -> 7 + 7 = 14.<br>\nStation 2 (3): peak = 7 -> 3 + 7 = 10.<br>\nStation 3 (5): peak = 7 -> 5 + 7 = 12.<br>\nStation 4 (9): peak = 9 -> 9 + 9 = 18.<br>\nStation 5 (2): peak = 9 -> 2 + 9 = 11.<br>\nFortified array = 14 10 12 18 11.\n</p>\n<h3>Example 2:</h3>\n<p>\n<b>Input:</b><br>\n<pre>7\n12 4 18 6 11 30 9</pre>\n<b>Output:</b><br>\n<pre>24 16 36 24 29 60 39</pre>\n<b>Explanation:</b><br>\nResulting array = 24 16 36 24 29 60 39.\n</p>",
      "code": "\ndef main():\n    lines = []\n    for _ in range(2):\n        try:\n            lines.append(input())\n        except EOFError:\n            break\n    tokens = \" \".join(lines).split()\n    if not tokens:\n        return\n    n = int(tokens[0])\n    a = list(map(int, tokens[1:1+n]))\n    if not a:\n        return\n    peak = a[0]\n    b = []\n    for x in a:\n        if x > peak:\n            peak = x\n        b.append(str(x + peak))\n    print(\" \".join(b))\n\nif __name__ == '__main__':\n    main()",
      "codes": {
        "python": "\ndef main():\n    lines = []\n    for _ in range(2):\n        try:\n            lines.append(input())\n        except EOFError:\n            break\n    tokens = \" \".join(lines).split()\n    if not tokens:\n        return\n    n = int(tokens[0])\n    a = list(map(int, tokens[1:1+n]))\n    if not a:\n        return\n    peak = a[0]\n    b = []\n    for x in a:\n        if x > peak:\n            peak = x\n        b.append(str(x + peak))\n    print(\" \".join(b))\n\nif __name__ == '__main__':\n    main()",
        "c": "#include <stdio.h>\n\nint main(void) {\n    int n;\n    if (scanf(\"%d\", &n) != 1 || n <= 0) return 0;\n    int peak;\n    scanf(\"%d\", &peak);\n    printf(\"%d\", peak + peak);\n    for (int i = 1; i < n; i++) {\n        int x;\n        scanf(\"%d\", &x);\n        if (x > peak) peak = x;\n        printf(\" %d\", x + peak);\n    }\n    printf(\"\\n\");\n    return 0;\n}",
        "cpp": "#include <iostream>\n#include <vector>\n#include <algorithm>\n\nusing namespace std;\n\nint main() {\n    int n;\n    if (!(cin >> n) || n <= 0) return 0;\n    int peak;\n    cin >> peak;\n    cout << peak + peak;\n    for (int i = 1; i < n; ++i) {\n        int x;\n        cin >> x;\n        if (x > peak) peak = x;\n        cout << \" \" << x + peak;\n    }\n    cout << endl;\n    return 0;\n}"
      },
      "language": "python",
      "problemLocked": false,
      "problemLockHash": "",
      "testsLocked": false,
      "testLockHash": "",
      "tests": [
        {
          "input": "5\n7 3 5 9 2",
          "expected": "14 10 12 18 11",
          "studentDefined": false
        },
        {
          "input": "7\n12 4 18 6 11 30 9",
          "expected": "24 16 36 24 29 60 39",
          "studentDefined": false
        },
        {
          "input": "1\n5",
          "expected": "10",
          "studentDefined": false
        },
        {
          "input": "3\n10 5 20",
          "expected": "20 15 40",
          "studentDefined": false
        }
      ],
      "customFonts": []
    },
    {
      "id": "Q-MV2AF099-E160",
      "title": "Question 7: Clockwork Gear Mesh Load",
      "problemHtml": "<h2>Problem Statement</h2>\n<p>A clockwork train consists of <code>N</code> gears. Each gear contributes to the total mesh load based on its 1-based position. For the <code>i</code>-th gear (1 &le; i &le; N), its contribution is <code>min(i, K)</code>, where <code>K</code> is the maximum number of teeth that can engage per gear. Your task is to find and return an integer value representing the total mesh load summed over all gears.</p>\n<p><b>Note:</b> Each gear contribution is capped at <code>K</code>.</p>\n<p><b>Input Specification:</b><br>\nLine 1: An integer value <code>N</code>, representing the number of gears.<br>\nLine 2: An integer value <code>K</code>, representing the per-gear tooth cap.\n</p>\n<p><b>Output Specification:</b><br>\nPrint an integer value representing the total mesh load summed over all gears.\n</p>\n<h3>Example 1:</h3>\n<p>\n<b>Input:</b><br>\n<pre>8\n5</pre>\n<b>Output:</b><br>\n<pre>30</pre>\n<b>Explanation:</b><br>\nGears 1 to 5 contribute 1 + 2 + 3 + 4 + 5 = 15.<br>\nGears 6 to 8 contribute 5 + 5 + 5 = 15.<br>\nTotal = 15 + 15 = 30.\n</p>\n<h3>Example 2:</h3>\n<p>\n<b>Input:</b><br>\n<pre>9\n3</pre>\n<b>Output:</b><br>\n<pre>24</pre>\n<b>Explanation:</b><br>\nGears 1 to 3 contribute 1 + 2 + 3 = 6.<br>\nGears 4 to 9 (6 gears) contribute 6 * 3 = 18.<br>\nTotal = 6 + 18 = 24.\n</p>",
      "code": "\ndef main():\n    lines = []\n    for _ in range(2):\n        try:\n            lines.append(input())\n        except EOFError:\n            break\n    tokens = \" \".join(lines).split()\n    if not tokens:\n        print(0)\n        return\n    n = int(tokens[0])\n    k = int(tokens[1])\n    if n <= k:\n        total = n * (n + 1) // 2\n    else:\n        total = k * (k + 1) // 2 + (n - k) * k\n    print(total)\n\nif __name__ == '__main__':\n    main()",
      "codes": {
        "python": "\ndef main():\n    lines = []\n    for _ in range(2):\n        try:\n            lines.append(input())\n        except EOFError:\n            break\n    tokens = \" \".join(lines).split()\n    if not tokens:\n        print(0)\n        return\n    n = int(tokens[0])\n    k = int(tokens[1])\n    if n <= k:\n        total = n * (n + 1) // 2\n    else:\n        total = k * (k + 1) // 2 + (n - k) * k\n    print(total)\n\nif __name__ == '__main__':\n    main()",
        "c": "#include <stdio.h>\n\nint main(void) {\n    long long n, k;\n    if (scanf(\"%lld %lld\", &n, &k) == 2) {\n        long long total = 0;\n        if (n <= k) {\n            total = n * (n + 1) / 2;\n        } else {\n            total = k * (k + 1) / 2 + (n - k) * k;\n        }\n        printf(\"%lld\\n\", total);\n    }\n    return 0;\n}",
        "cpp": "#include <iostream>\n\nusing namespace std;\n\nint main() {\n    long long n, k;\n    if (cin >> n >> k) {\n        long long total = 0;\n        if (n <= k) {\n            total = n * (n + 1) / 2;\n        } else {\n            total = k * (k + 1) / 2 + (n - k) * k;\n        }\n        cout << total << endl;\n    }\n    return 0;\n}"
      },
      "language": "python",
      "problemLocked": false,
      "problemLockHash": "",
      "testsLocked": false,
      "testLockHash": "",
      "tests": [
        {
          "input": "8\n5",
          "expected": "30",
          "studentDefined": false
        },
        {
          "input": "9\n3",
          "expected": "24",
          "studentDefined": false
        },
        {
          "input": "3\n5",
          "expected": "6",
          "studentDefined": false
        },
        {
          "input": "1\n1",
          "expected": "1",
          "studentDefined": false
        }
      ],
      "customFonts": []
    },
    {
      "id": "Q-MV2AHD2H-S0M2",
      "title": "Question 8: Microbe Colony Diversity Load",
      "problemHtml": "<h2>Problem Statement</h2>\n<p>A microbiology lab assigns each colony with a diversity load equal to its cell count multiplied by the number of distinct prime factors of that count. You are given an integer <code>N</code> and an integer array <code>A</code> of colony cell counts. Your task is to find and return an integer value representing the total diversity load over all colonies.</p>\n<p><b>Note:</b> A prime number has exactly one distinct prime factor. The number 1 has 0 prime factors.</p>\n<p><b>Input Specification:</b><br>\nLine 1: An integer value <code>N</code>, representing the number of colonies.<br>\nLine 2: <code>N</code> space-separated integers representing the cell counts <code>A</code>.\n</p>\n<p><b>Output Specification:</b><br>\nPrint an integer value representing the total diversity load over all colonies.\n</p>\n<h3>Example 1:</h3>\n<p>\n<b>Input:</b><br>\n<pre>3\n6 10 15</pre>\n<b>Output:</b><br>\n<pre>62</pre>\n<b>Explanation:</b><br>\n6 = 2 * 3 (2 distinct prime factors) -> contribution = 6 * 2 = 12.<br>\n10 = 2 * 5 (2 distinct prime factors) -> contribution = 10 * 2 = 20.<br>\n15 = 3 * 5 (2 distinct prime factors) -> contribution = 15 * 2 = 30.<br>\nTotal = 12 + 20 + 30 = 62.\n</p>\n<h3>Example 2:</h3>\n<p>\n<b>Input:</b><br>\n<pre>4\n12 30 7 20</pre>\n<b>Output:</b><br>\n<pre>161</pre>\n<b>Explanation:</b><br>\n12 = 2^2 * 3 (2 factors) -> 12 * 2 = 24.<br>\n30 = 2 * 3 * 5 (3 factors) -> 30 * 3 = 90.<br>\n7 = 7 (1 factor) -> 7 * 1 = 7.<br>\n20 = 2^2 * 5 (2 factors) -> 20 * 2 = 40.<br>\nTotal = 24 + 90 + 7 + 40 = 161.\n</p>",
      "code": "\ndef count_distinct_prime_factors(n):\n    if n <= 1:\n        return 0\n    cnt = 0\n    d = 2\n    temp = n\n    while d * d <= temp:\n        if temp % d == 0:\n            cnt += 1\n            while temp % d == 0:\n                temp //= d\n        d += 1\n    if temp > 1:\n        cnt += 1\n    return cnt\n\ndef main():\n    lines = []\n    for _ in range(2):\n        try:\n            lines.append(input())\n        except EOFError:\n            break\n    tokens = \" \".join(lines).split()\n    if not tokens:\n        print(0)\n        return\n    n = int(tokens[0])\n    a = list(map(int, tokens[1:1+n]))\n    total = sum(x * count_distinct_prime_factors(x) for x in a)\n    print(total)\n\nif __name__ == '__main__':\n    main()",
      "codes": {
        "python": "\ndef count_distinct_prime_factors(n):\n    if n <= 1:\n        return 0\n    cnt = 0\n    d = 2\n    temp = n\n    while d * d <= temp:\n        if temp % d == 0:\n            cnt += 1\n            while temp % d == 0:\n                temp //= d\n        d += 1\n    if temp > 1:\n        cnt += 1\n    return cnt\n\ndef main():\n    lines = []\n    for _ in range(2):\n        try:\n            lines.append(input())\n        except EOFError:\n            break\n    tokens = \" \".join(lines).split()\n    if not tokens:\n        print(0)\n        return\n    n = int(tokens[0])\n    a = list(map(int, tokens[1:1+n]))\n    total = sum(x * count_distinct_prime_factors(x) for x in a)\n    print(total)\n\nif __name__ == '__main__':\n    main()",
        "c": "#include <stdio.h>\n\nint count_distinct_prime_factors(int n) {\n    if (n <= 1) return 0;\n    int cnt = 0;\n    int temp = n;\n    for (int d = 2; (long long)d * d <= temp; d++) {\n        if (temp % d == 0) {\n            cnt++;\n            while (temp % d == 0) {\n                temp /= d;\n            }\n        }\n    }\n    if (temp > 1) cnt++;\n    return cnt;\n}\n\nint main(void) {\n    int n;\n    if (scanf(\"%d\", &n) != 1) return 0;\n    long long total = 0;\n    for (int i = 0; i < n; i++) {\n        int x;\n        scanf(\"%d\", &x);\n        total += (long long)x * count_distinct_prime_factors(x);\n    }\n    printf(\"%lld\\n\", total);\n    return 0;\n}",
        "cpp": "#include <iostream>\n\nusing namespace std;\n\nint countDistinctPrimeFactors(int n) {\n    if (n <= 1) return 0;\n    int cnt = 0;\n    int temp = n;\n    for (int d = 2; (long long)d * d <= temp; ++d) {\n        if (temp % d == 0) {\n            cnt++;\n            while (temp % d == 0) {\n                temp /= d;\n            }\n        }\n    }\n    if (temp > 1) cnt++;\n    return cnt;\n}\n\nint main() {\n    int n;\n    if (!(cin >> n)) return 0;\n    long long total = 0;\n    for (int i = 0; i < n; ++i) {\n        int x;\n        cin >> x;\n        total += (long long)x * countDistinctPrimeFactors(x);\n    }\n    cout << total << endl;\n    return 0;\n}"
      },
      "language": "python",
      "problemLocked": false,
      "problemLockHash": "",
      "testsLocked": false,
      "testLockHash": "",
      "tests": [
        {
          "input": "3\n6 10 15",
          "expected": "62",
          "studentDefined": false
        },
        {
          "input": "4\n12 30 7 20",
          "expected": "161",
          "studentDefined": false
        },
        {
          "input": "1\n2",
          "expected": "2",
          "studentDefined": false
        },
        {
          "input": "2\n1 8",
          "expected": "8",
          "studentDefined": false
        }
      ],
      "customFonts": []
    },
    {
      "id": "Q-MV2AIY7C-LAXZ",
      "title": "Question 9: Carousel SensorPairing",
      "problemHtml": "<h2>Problem Statement</h2>\n<p>Sensors arranged around a circular carousel are each summed with the sensor located a fixed number of positions ahead <code>K</code>. Each position <code>i</code> (0-based) is paired with position <code>(i + K) mod N</code>, and the output stores the pairwise sum <code>B[i] = A[i] + A[(i + K) mod N]</code>. Your task is to find and return an integer array representing array <code>B</code>.</p>\n<p><b>Note:</b> The ring wraps around, so indices taken are modulo <code>N</code>.</p>\n<p><b>Input Specification:</b><br>\nLine 1: Space-separated integers representing array <code>A</code> (sensor readings).<br>\nLine 2: An integer <code>K</code>, representing the forward offset.\n</p>\n<p><b>Output Specification:</b><br>\nPrint space-separated integers representing the array <code>B</code>.\n</p>\n<h3>Example 1:</h3>\n<p>\n<b>Input:</b><br>\n<pre>6 2 9 4\n2</pre>\n<b>Output:</b><br>\n<pre>15 6 15 6</pre>\n<b>Explanation:</b><br>\nN = 4, K = 2:<br>\nSensor 0 (6) pairs with (0+2)%4 = 2 (9) -> 6 + 9 = 15.<br>\nSensor 1 (2) pairs with (1+2)%4 = 3 (4) -> 2 + 4 = 6.<br>\nSensor 2 (9) pairs with (2+2)%4 = 0 (6) -> 9 + 6 = 15.<br>\nSensor 3 (4) pairs with (3+2)%4 = 1 (2) -> 4 + 2 = 6.<br>\nResult = 15 6 15 6.\n</p>\n<h3>Example 2:</h3>\n<p>\n<b>Input:</b><br>\n<pre>5 3 8 1 7 2\n3</pre>\n<b>Output:</b><br>\n<pre>6 10 10 6 10 10</pre>\n<b>Explanation:</b><br>\nOffset K = 3 on 6 sensors gives 6 10 10 6 10 10.\n</p>",
      "code": "\ndef main():\n    lines = []\n    for _ in range(2):\n        try:\n            lines.append(input())\n        except EOFError:\n            break\n    tokens = \" \".join(lines).split()\n    if not tokens:\n        return\n    k = int(tokens[-1])\n    a = list(map(int, tokens[:-1]))\n    n = len(a)\n    if n == 0:\n        return\n    b = [str(a[i] + a[(i + k) % n]) for i in range(n)]\n    print(\" \".join(b))\n\nif __name__ == '__main__':\n    main()",
      "codes": {
        "python": "\ndef main():\n    lines = []\n    for _ in range(2):\n        try:\n            lines.append(input())\n        except EOFError:\n            break\n    tokens = \" \".join(lines).split()\n    if not tokens:\n        return\n    k = int(tokens[-1])\n    a = list(map(int, tokens[:-1]))\n    n = len(a)\n    if n == 0:\n        return\n    b = [str(a[i] + a[(i + k) % n]) for i in range(n)]\n    print(\" \".join(b))\n\nif __name__ == '__main__':\n    main()",
        "c": "#include <stdio.h>\n#include <string.h>\n#include <stdlib.h>\n\nint main(void) {\n    char line[10000];\n    if (!fgets(line, sizeof(line), stdin)) return 0;\n    int a[1000];\n    int n = 0;\n    char *tok = strtok(line, \" \\t\\r\\n\");\n    while (tok) {\n        a[n++] = atoi(tok);\n        tok = strtok(NULL, \" \\t\\r\\n\");\n    }\n    int k;\n    if (scanf(\"%d\", &k) != 1) return 0;\n    if (n == 0) return 0;\n    for (int i = 0; i < n; i++) {\n        int pair_idx = (i + (k % n) + n) % n;\n        printf(\"%d%c\", a[i] + a[pair_idx], (i == n - 1) ? '\\n' : ' ');\n    }\n    return 0;\n}\n",
        "cpp": "#include <iostream>\n#include <sstream>\n#include <vector>\n#include <string>\n\nusing namespace std;\n\nint main() {\n    string line;\n    if (!getline(cin, line)) return 0;\n    stringstream ss(line);\n    vector<int> a;\n    int val;\n    while (ss >> val) a.push_back(val);\n    int k;\n    if (!(cin >> k)) return 0;\n    int n = a.size();\n    if (n == 0) return 0;\n    for (int i = 0; i < n; ++i) {\n        int pair_idx = (i + (k % n) + n) % n;\n        cout << a[i] + a[pair_idx] << (i == n - 1 ? \"\" : \" \");\n    }\n    cout << endl;\n    return 0;\n}\n"
      },
      "language": "python",
      "problemLocked": false,
      "problemLockHash": "",
      "testsLocked": false,
      "testLockHash": "",
      "tests": [
        {
          "input": "6 2 9 4\n2",
          "expected": "15 6 15 6",
          "studentDefined": false
        },
        {
          "input": "5 3 8 1 7 2\n3",
          "expected": "6 10 10 6 10 10",
          "studentDefined": false
        },
        {
          "input": "10 20\n1",
          "expected": "30 30",
          "studentDefined": false
        },
        {
          "input": "1 2 3\n0",
          "expected": "2 4 6",
          "studentDefined": false
        }
      ],
      "customFonts": []
    },
    {
      "id": "Q-MV2ALQWK-4IZ1",
      "title": "Question 10: Cross-Dock Pallet Match Load",
      "problemHtml": "<h2>Problem Statement</h2>\n<p>Two barcode scanners at a cross-dock log letters, and matching letters reinforce each other based on how often they appear on each side. You are given a string <code>A</code> and a string <code>B</code>. For every letter that appears in both strings, add the product of its count in <code>A</code>, its count in <code>B</code>, and its letter value (where a = 1, ..., z = 26). Your task is to find and return an integer value representing the total match load over all shared letters.</p>\n<p><b>Note:</b> A letter contributes only if it appears in both strings.</p>\n<p><b>Input Specification:</b><br>\nLine 1: A string <code>A</code> from the first scanner.<br>\nLine 2: A string <code>B</code> from the second scanner.\n</p>\n<p><b>Output Specification:</b><br>\nPrint an integer value representing the total match load over all shared letters.\n</p>\n<h3>Example 1:</h3>\n<p>\n<b>Input:</b><br>\n<pre>cat\nact</pre>\n<b>Output:</b><br>\n<pre>24</pre>\n<b>Explanation:</b><br>\n'a': countA = 1, countB = 1, val = 1 -> 1 * 1 * 1 = 1.<br>\n'c': countA = 1, countB = 1, val = 3 -> 1 * 1 * 3 = 3.<br>\n't': countA = 1, countB = 1, val = 20 -> 1 * 1 * 20 = 20.<br>\nTotal = 1 + 3 + 20 = 24.\n</p>\n<h3>Example 2:</h3>\n<p>\n<b>Input:</b><br>\n<pre>moon\nmood</pre>\n<b>Output:</b><br>\n<pre>73</pre>\n<b>Explanation:</b><br>\n'm': countA = 1, countB = 1, val = 13 -> 13.<br>\n'o': countA = 2, countB = 2, val = 15 -> 2 * 2 * 15 = 60.<br>\n'n' and 'd' are not shared.<br>\nTotal = 13 + 60 = 73.\n</p>",
      "code": "def main():\n    lines = []\n    for _ in range(2):\n        try:\n            lines.append(input())\n        except EOFError:\n            break\n    tokens = \" \".join(lines).split()\n    if len(tokens) < 2:\n        print(0)\n        return\n    a, b = tokens[0], tokens[1]\n    cA = {}\n    for ch in a:\n        cA[ch] = cA.get(ch, 0) + 1\n    cB = {}\n    for ch in b:\n        cB[ch] = cB.get(ch, 0) + 1\n    total = 0\n    for ch in cA:\n        if ch in cB and 'a' <= ch <= 'z':\n            val = ord(ch) - ord('a') + 1\n            total += cA[ch] * cB[ch] * val\n    print(total)\n\nif __name__ == '__main__':\n    main()\n",
      "codes": {
        "python": "def main():\n    lines = []\n    for _ in range(2):\n        try:\n            lines.append(input())\n        except EOFError:\n            break\n    tokens = \" \".join(lines).split()\n    if len(tokens) < 2:\n        print(0)\n        return\n    a, b = tokens[0], tokens[1]\n    cA = {}\n    for ch in a:\n        cA[ch] = cA.get(ch, 0) + 1\n    cB = {}\n    for ch in b:\n        cB[ch] = cB.get(ch, 0) + 1\n    total = 0\n    for ch in cA:\n        if ch in cB and 'a' <= ch <= 'z':\n            val = ord(ch) - ord('a') + 1\n            total += cA[ch] * cB[ch] * val\n    print(total)\n\nif __name__ == '__main__':\n    main()\n",
        "c": "#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    char a[10000], b[10000];\n    if (scanf(\"%s %s\", a, b) == 2) {\n        int cntA[26] = {0}, cntB[26] = {0};\n        int lenA = strlen(a), lenB = strlen(b);\n        for (int i = 0; i < lenA; i++) if (a[i] >= 'a' && a[i] <= 'z') cntA[a[i] - 'a']++;\n        for (int i = 0; i < lenB; i++) if (b[i] >= 'a' && b[i] <= 'z') cntB[b[i] - 'a']++;\n        long long total = 0;\n        for (int i = 0; i < 26; i++) {\n            if (cntA[i] > 0 && cntB[i] > 0) {\n                total += (long long)cntA[i] * cntB[i] * (i + 1);\n            }\n        }\n        printf(\"%lld\\n\", total);\n    }\n    return 0;\n}",
        "cpp": "#include <iostream>\n#include <string>\n#include <vector>\n\nusing namespace std;\n\nint main() {\n    string a, b;\n    if (cin >> a >> b) {\n        vector<int> cntA(26, 0), cntB(26, 0);\n        for (char c : a) if (c >= 'a' && c <= 'z') cntA[c - 'a']++;\n        for (char c : b) if (c >= 'a' && c <= 'z') cntB[c - 'a']++;\n        long long total = 0;\n        for (int i = 0; i < 26; ++i) {\n            if (cntA[i] > 0 && cntB[i] > 0) {\n                total += (long long)cntA[i] * cntB[i] * (i + 1);\n            }\n        }\n        cout << total << endl;\n    }\n    return 0;\n}"
      },
      "language": "python",
      "problemLocked": false,
      "problemLockHash": "",
      "testsLocked": false,
      "testLockHash": "",
      "tests": [
        {
          "input": "cat\nact",
          "expected": "24",
          "studentDefined": false
        },
        {
          "input": "moon\nmood",
          "expected": "73",
          "studentDefined": false
        },
        {
          "input": "abc\ndef",
          "expected": "0",
          "studentDefined": false
        },
        {
          "input": "xyz\nxyz",
          "expected": "75",
          "studentDefined": false
        }
      ],
      "customFonts": []
    },
    {
      "id": "Q-MV2ANLQ1-9QP2",
      "title": "Question 11: Gearbox Resonance Score",
      "problemHtml": "<h2>Problem Statement</h2>\n<p>A test rig spins a gearbox for <code>N</code> cycles. Each cycle's resonance is determined by the binary representation of its cycle number. For each cycle number <code>K</code> (1 &le; K &le; N), the resonance equals:\n<ul>\n  <li>the number of trailing zero bits in <code>K</code>, plus</li>\n  <li>the number of set bits (1-bits) in <code>K</code>.</li>\n</ul>\nYour task is to find and return an integer value representing the total resonance summed over all <code>N</code> cycles.</p>\n<p><b>Note:</b> The trailing zero bits and set bits are computed using the binary representation of <code>K</code>.</p>\n<p><b>Input Specification:</b><br>\nA single integer <code>N</code>, representing the number of cycles.\n</p>\n<p><b>Output Specification:</b><br>\nPrint an integer value representing the total resonance summed over all <code>N</code> cycles.\n</p>\n<h3>Example 1:</h3>\n<p>\n<b>Input:</b><br>\n<pre>9</pre>\n<b>Output:</b><br>\n<pre>22</pre>\n<b>Explanation:</b><br>\nK=1 (1): trailing 0, set 1 -> 1.<br>\nK=2 (10): trailing 1, set 1 -> 2.<br>\nK=3 (11): trailing 0, set 2 -> 2.<br>\nK=4 (100): trailing 2, set 1 -> 3.<br>\nK=5 (101): trailing 0, set 2 -> 2.<br>\nK=6 (110): trailing 1, set 2 -> 3.<br>\nK=7 (111): trailing 0, set 3 -> 3.<br>\nK=8 (1000): trailing 3, set 1 -> 4.<br>\nK=9 (1001): trailing 0, set 2 -> 2.<br>\nTotal = 1 + 2 + 2 + 3 + 2 + 3 + 3 + 4 + 2 = 22.\n</p>\n<h3>Example 2:</h3>\n<p>\n<b>Input:</b><br>\n<pre>12</pre>\n<b>Output:</b><br>\n<pre>32</pre>\n<b>Explanation:</b><br>\nSumming resonance for K = 1 to 12 gives 32.\n</p>",
      "code": "\ndef main():\n    lines = []\n    for _ in range(1):\n        try:\n            lines.append(input())\n        except EOFError:\n            break\n    tokens = \" \".join(lines).split()\n    if not tokens:\n        print(0)\n        return\n    n = int(tokens[0])\n    total = 0\n    for k in range(1, n + 1):\n        tz = (k & -k).bit_length() - 1\n        sb = bin(k).count('1')\n        total += tz + sb\n    print(total)\n\nif __name__ == '__main__':\n    main()",
      "codes": {
        "python": "\ndef main():\n    lines = []\n    for _ in range(1):\n        try:\n            lines.append(input())\n        except EOFError:\n            break\n    tokens = \" \".join(lines).split()\n    if not tokens:\n        print(0)\n        return\n    n = int(tokens[0])\n    total = 0\n    for k in range(1, n + 1):\n        tz = (k & -k).bit_length() - 1\n        sb = bin(k).count('1')\n        total += tz + sb\n    print(total)\n\nif __name__ == '__main__':\n    main()",
        "c": "#include <stdio.h>\n\nint main(void) {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        long long total = 0;\n        for (int k = 1; k <= n; k++) {\n            int tz = __builtin_ctz(k);\n            int sb = __builtin_popcount(k);\n            total += tz + sb;\n        }\n        printf(\"%lld\\n\", total);\n    }\n    return 0;\n}",
        "cpp": "#include <iostream>\n\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        long long total = 0;\n        for (int k = 1; k <= n; ++k) {\n            int tz = 0;\n            int temp = k;\n            while ((temp & 1) == 0) {\n                tz++;\n                temp >>= 1;\n            }\n            int sb = 0;\n            temp = k;\n            while (temp > 0) {\n                if (temp & 1) sb++;\n                temp >>= 1;\n            }\n            total += tz + sb;\n        }\n        cout << total << endl;\n    }\n    return 0;\n}"
      },
      "language": "python",
      "problemLocked": false,
      "problemLockHash": "",
      "testsLocked": false,
      "testLockHash": "",
      "tests": [
        {
          "input": "9",
          "expected": "22",
          "studentDefined": false
        },
        {
          "input": "12",
          "expected": "32",
          "studentDefined": false
        },
        {
          "input": "1",
          "expected": "1",
          "studentDefined": false
        },
        {
          "input": "4",
          "expected": "8",
          "studentDefined": false
        }
      ],
      "customFonts": []
    },
    {
      "id": "Q-MV2AQX74-GQKW",
      "title": "Question 12: Beacon Brightest-Digit Tally",
      "problemHtml": "<h2>Problem Statement</h2>\n<p>A network powers beacons with sequential IDs from 1 to <code>N</code>. Each beacon shines as bright as the largest decimal digit of its ID. Beacon <code>i</code> (for <code>i</code> from 1 to <code>N</code>) shines with a brightness equal to the largest decimal digit of <code>i</code>. Your task is to find and return an integer value representing the total brightness summed over all beacon IDs.</p>\n<p><b>Note:</b> Brightness of an ID is its maximum decimal digit.</p>\n<p><b>Input Specification:</b><br>\nA single integer value <code>N</code>, representing the number of beacons.\n</p>\n<p><b>Output Specification:</b><br>\nPrint an integer value representing the total brightness summed over all beacon IDs.\n</p>\n<h3>Example 1:</h3>\n<p>\n<b>Input:</b><br>\n<pre>6</pre>\n<b>Output:</b><br>\n<pre>21</pre>\n<b>Explanation:</b><br>\nBeacons 1 to 6 have brightest digits 1, 2, 3, 4, 5, 6.<br>\nTotal = 1 + 2 + 3 + 4 + 5 + 6 = 21.\n</p>\n<h3>Example 2:</h3>\n<p>\n<b>Input:</b><br>\n<pre>11</pre>\n<b>Output:</b><br>\n<pre>47</pre>\n<b>Explanation:</b><br>\nBeacons 1..9 sum to 45. Beacon 10 has max digit 1, Beacon 11 has max digit 1.<br>\nTotal = 45 + 1 + 1 = 47.\n</p>",
      "code": "\ndef main():\n    lines = []\n    for _ in range(1):\n        try:\n            lines.append(input())\n        except EOFError:\n            break\n    tokens = \" \".join(lines).split()\n    if not tokens:\n        print(0)\n        return\n    n = int(tokens[0])\n    total = sum(max(int(d) for d in str(i)) for i in range(1, n + 1))\n    print(total)\n\nif __name__ == '__main__':\n    main()",
      "codes": {
        "python": "\ndef main():\n    lines = []\n    for _ in range(1):\n        try:\n            lines.append(input())\n        except EOFError:\n            break\n    tokens = \" \".join(lines).split()\n    if not tokens:\n        print(0)\n        return\n    n = int(tokens[0])\n    total = sum(max(int(d) for d in str(i)) for i in range(1, n + 1))\n    print(total)\n\nif __name__ == '__main__':\n    main()",
        "c": "#include <stdio.h>\n\nint max_digit(int x) {\n    int m = 0;\n    while (x > 0) {\n        int d = x % 10;\n        if (d > m) m = d;\n        x /= 10;\n    }\n    return m;\n}\n\nint main(void) {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        long long total = 0;\n        for (int i = 1; i <= n; i++) {\n            total += max_digit(i);\n        }\n        printf(\"%lld\\n\", total);\n    }\n    return 0;\n}",
        "cpp": "#include <iostream>\n\nusing namespace std;\n\nint maxDigit(int x) {\n    int m = 0;\n    while (x > 0) {\n        int d = x % 10;\n        if (d > m) m = d;\n        x /= 10;\n    }\n    return m;\n}\n\nint main() {\n    int n;\n    if (cin >> n) {\n        long long total = 0;\n        for (int i = 1; i <= n; ++i) {\n            total += maxDigit(i);\n        }\n        cout << total << endl;\n    }\n    return 0;\n}"
      },
      "language": "python",
      "problemLocked": false,
      "problemLockHash": "",
      "testsLocked": false,
      "testLockHash": "",
      "tests": [
        {
          "input": "6",
          "expected": "21",
          "studentDefined": false
        },
        {
          "input": "11",
          "expected": "47",
          "studentDefined": false
        },
        {
          "input": "1",
          "expected": "1",
          "studentDefined": false
        },
        {
          "input": "15",
          "expected": "61",
          "studentDefined": false
        }
      ],
      "customFonts": []
    },
    {
      "id": "Q-MV2AT84Q-SWQR",
      "title": "Question 13: Drum Roll Intensity",
      "problemHtml": "<h2>Problem Statement</h2>\n<p>A drummer strikes pads, and repeated hits on the same pad form a roll whose loudness grows with each consecutive strike. You are given an integer <code>N</code> and a string <code>S</code> of pad letters (loudness: a = 1, b = 2, ..., z = 26). Within a run of the same pad, the multiplier grows:\n<ul>\n  <li>The 1st consecutive hit counts at 1x</li>\n  <li>The 2nd consecutive hit counts at 2x</li>\n  <li>The 3rd consecutive hit counts at 3x, and so on.</li>\n</ul>\nChanging pads resets the multiplier back to 1. Your task is to find and return an integer value representing the total intensity of the whole performance.</p>\n<p><b>Note:</b> The run multiplier starts at 1 for the first hit and resets to 1 whenever the pad changes.</p>\n<p><b>Input Specification:</b><br>\nLine 1: An integer value <code>N</code>, representing the number of hits.<br>\nLine 2: A string <code>S</code> representing the pad letters.\n</p>\n<p><b>Output Specification:</b><br>\nPrint an integer value representing the total intensity of the whole performance.\n</p>\n<h3>Example 1:</h3>\n<p>\n<b>Input:</b><br>\n<pre>3\ncat</pre>\n<b>Output:</b><br>\n<pre>24</pre>\n<b>Explanation:</b><br>\nPad 'c' (3) * 1 = 3.<br>\nPad 'a' (1) * 1 = 1.<br>\nPad 't' (20) * 1 = 20.<br>\nTotal = 3 + 1 + 20 = 24.\n</p>\n<h3>Example 2:</h3>\n<p>\n<b>Input:</b><br>\n<pre>4\nbell</pre>\n<b>Output:</b><br>\n<pre>43</pre>\n<b>Explanation:</b><br>\n'b' (2) * 1 = 2.<br>\n'e' (5) * 1 = 5.<br>\n'l' (12) * 1 = 12.<br>\n'l' (12) * 2 = 24.<br>\nTotal = 2 + 5 + 12 + 24 = 43.\n</p>",
      "code": "\ndef main():\n    lines = []\n    for _ in range(2):\n        try:\n            lines.append(input())\n        except EOFError:\n            break\n    tokens = \" \".join(lines).split()\n    if not tokens:\n        print(0)\n        return\n    n = int(tokens[0])\n    s = tokens[1] if len(tokens) > 1 else \"\"\n    total = 0\n    cur_run = 0\n    prev_ch = None\n    for ch in s[:n]:\n        val = ord(ch) - ord('a') + 1\n        if ch == prev_ch:\n            cur_run += 1\n        else:\n            cur_run = 1\n            prev_ch = ch\n        total += val * cur_run\n    print(total)\n\nif __name__ == '__main__':\n    main()",
      "codes": {
        "python": "\ndef main():\n    lines = []\n    for _ in range(2):\n        try:\n            lines.append(input())\n        except EOFError:\n            break\n    tokens = \" \".join(lines).split()\n    if not tokens:\n        print(0)\n        return\n    n = int(tokens[0])\n    s = tokens[1] if len(tokens) > 1 else \"\"\n    total = 0\n    cur_run = 0\n    prev_ch = None\n    for ch in s[:n]:\n        val = ord(ch) - ord('a') + 1\n        if ch == prev_ch:\n            cur_run += 1\n        else:\n            cur_run = 1\n            prev_ch = ch\n        total += val * cur_run\n    print(total)\n\nif __name__ == '__main__':\n    main()",
        "c": "#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    int n;\n    char s[10000];\n    if (scanf(\"%d %s\", &n, s) == 2) {\n        long long total = 0;\n        int cur_run = 0;\n        char prev = '\\0';\n        for (int i = 0; i < n && s[i] != '\\0'; i++) {\n            int val = s[i] - 'a' + 1;\n            if (s[i] == prev) {\n                cur_run++;\n            } else {\n                cur_run = 1;\n                prev = s[i];\n            }\n            total += (long long)val * cur_run;\n        }\n        printf(\"%lld\\n\", total);\n    }\n    return 0;\n}",
        "cpp": "#include <iostream>\n#include <string>\n\nusing namespace std;\n\nint main() {\n    int n;\n    string s;\n    if (cin >> n >> s) {\n        long long total = 0;\n        int cur_run = 0;\n        char prev = '\\0';\n        for (int i = 0; i < n && i < (int)s.length(); ++i) {\n            int val = s[i] - 'a' + 1;\n            if (s[i] == prev) {\n                cur_run++;\n            } else {\n                cur_run = 1;\n                prev = s[i];\n            }\n            total += (long long)val * cur_run;\n        }\n        cout << total << endl;\n    }\n    return 0;\n}"
      },
      "language": "python",
      "problemLocked": false,
      "problemLockHash": "",
      "testsLocked": false,
      "testLockHash": "",
      "tests": [
        {
          "input": "3\ncat",
          "expected": "24",
          "studentDefined": false
        },
        {
          "input": "4\nbell",
          "expected": "43",
          "studentDefined": false
        },
        {
          "input": "3\naaa",
          "expected": "6",
          "studentDefined": false
        },
        {
          "input": "1\nz",
          "expected": "26",
          "studentDefined": false
        }
      ],
      "customFonts": []
    },
    {
      "id": "Q-MV2AW6TB-O2D0",
      "title": "Question 14: Cafe Menu Score",
      "problemHtml": "<h2>Problem Statement</h2>\n<p>A cafe menu string <code>S</code> contains lowercase letters where a = 1, b = 2, ..., z = 26. Each vowel (a, e, i, o, u) scores 3 times its alphabet value, while each consonant scores 1 time its alphabet value. For each character in <code>S</code>, calculate its score and return an integer value representing the total menu score.</p>\n<p><b>Note:</b> Only 'a', 'e', 'i', 'o', 'u' are treated as vowels.</p>\n<p><b>Input Specification:</b><br>\nLine 1: An integer <code>N</code>, representing the length of the menu string.<br>\nLine 2: A string <code>S</code> of lowercase menu characters.\n</p>\n<p><b>Output Specification:</b><br>\nPrint an integer value representing the total menu score.\n</p>\n<h3>Example 1:</h3>\n<p>\n<b>Input:</b><br>\n<pre>4\ncafe</pre>\n<b>Output:</b><br>\n<pre>27</pre>\n<b>Explanation:</b><br>\n'c' is consonant: 3 * 1 = 3.<br>\n'a' is vowel: 1 * 3 = 3.<br>\n'f' is consonant: 6 * 1 = 6.<br>\n'e' is vowel: 5 * 3 = 15.<br>\nTotal = 3 + 3 + 6 + 15 = 27.\n</p>\n<h3>Example 2:</h3>\n<p>\n<b>Input:</b><br>\n<pre>3\nbee</pre>\n<b>Output:</b><br>\n<pre>32</pre>\n<b>Explanation:</b><br>\n'b' (2) + 'e' (15) + 'e' (15) = 32.\n</p>",
      "code": "\ndef main():\n    lines = []\n    for _ in range(2):\n        try:\n            lines.append(input())\n        except EOFError:\n            break\n    tokens = \" \".join(lines).split()\n    if not tokens:\n        print(0)\n        return\n    n = int(tokens[0])\n    s = tokens[1] if len(tokens) > 1 else \"\"\n    vowels = set(\"aeiou\")\n    total = 0\n    for ch in s[:n]:\n        val = ord(ch) - ord('a') + 1\n        if ch in vowels:\n            total += val * 3\n        else:\n            total += val * 1\n    print(total)\n\nif __name__ == '__main__':\n    main()",
      "codes": {
        "python": "\ndef main():\n    lines = []\n    for _ in range(2):\n        try:\n            lines.append(input())\n        except EOFError:\n            break\n    tokens = \" \".join(lines).split()\n    if not tokens:\n        print(0)\n        return\n    n = int(tokens[0])\n    s = tokens[1] if len(tokens) > 1 else \"\"\n    vowels = set(\"aeiou\")\n    total = 0\n    for ch in s[:n]:\n        val = ord(ch) - ord('a') + 1\n        if ch in vowels:\n            total += val * 3\n        else:\n            total += val * 1\n    print(total)\n\nif __name__ == '__main__':\n    main()",
        "c": "#include <stdio.h>\n#include <string.h>\n\nint is_vowel(char c) {\n    return c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u';\n}\n\nint main(void) {\n    int n;\n    char s[10000];\n    if (scanf(\"%d %s\", &n, s) == 2) {\n        long long total = 0;\n        for (int i = 0; i < n && s[i] != '\\0'; i++) {\n            int val = s[i] - 'a' + 1;\n            if (is_vowel(s[i])) {\n                total += val * 3;\n            } else {\n                total += val;\n            }\n        }\n        printf(\"%lld\\n\", total);\n    }\n    return 0;\n}",
        "cpp": "#include <iostream>\n#include <string>\n\nusing namespace std;\n\nbool isVowel(char c) {\n    return c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u';\n}\n\nint main() {\n    int n;\n    string s;\n    if (cin >> n >> s) {\n        long long total = 0;\n        for (int i = 0; i < n && i < (int)s.length(); ++i) {\n            int val = s[i] - 'a' + 1;\n            if (isVowel(s[i])) {\n                total += val * 3;\n            } else {\n                total += val;\n            }\n        }\n        cout << total << endl;\n    }\n    return 0;\n}"
      },
      "language": "python",
      "problemLocked": false,
      "problemLockHash": "",
      "testsLocked": false,
      "testLockHash": "",
      "tests": [
        {
          "input": "4\ncafe",
          "expected": "27",
          "studentDefined": false
        },
        {
          "input": "3\nbee",
          "expected": "32",
          "studentDefined": false
        },
        {
          "input": "1\na",
          "expected": "3",
          "studentDefined": false
        },
        {
          "input": "2\nhi",
          "expected": "35",
          "studentDefined": false
        }
      ],
      "customFonts": []
    },
    {
      "id": "Q-MV2AXJTV-PJC2",
      "title": "Question 15: Marathon Bib Prime Sum",
      "problemHtml": "<h2>Problem Statement</h2>\n<p>A marathon organizer lists <code>N</code> bib numbers in the order runners cross the finish line. Calculate the sum of bib numbers at prime 0-based indices (2, 3, 5, 7, 11, ...) in the array. Your task is to find and return an integer value representing the prime-index sum.</p>\n<p><b>Note:</b> 0 and 1 are not prime numbers. Primes considered are 2, 3, 5, 7, 11, 13, and so on.</p>\n<p><b>Input Specification:</b><br>\nLine 1: An integer <code>N</code>, representing the number of finishers.<br>\nLine 2: <code>N</code> space-separated integers representing the bib numbers <code>B</code>.\n</p>\n<p><b>Output Specification:</b><br>\nPrint an integer value representing the prime-index sum.\n</p>\n<h3>Example 1:</h3>\n<p>\n<b>Input:</b><br>\n<pre>6\n10 20 30 40 50 60</pre>\n<b>Output:</b><br>\n<pre>130</pre>\n<b>Explanation:</b><br>\nPrime indices in range 0..5 are 2, 3, 5.<br>\nB[2] = 30, B[3] = 40, B[5] = 60.<br>\nSum = 30 + 40 + 60 = 130.\n</p>\n<h3>Example 2:</h3>\n<p>\n<b>Input:</b><br>\n<pre>4\n7 7 7 7</pre>\n<b>Output:</b><br>\n<pre>14</pre>\n<b>Explanation:</b><br>\nPrime indices in range 0..3 are 2 and 3.<br>\nB[2] = 7, B[3] = 7 -> Sum = 7 + 7 = 14.\n</p>",
      "code": "\ndef is_prime(x):\n    if x < 2:\n        return False\n    d = 2\n    while d * d <= x:\n        if x % d == 0:\n            return False\n        d += 1\n    return True\n\ndef main():\n    lines = []\n    for _ in range(2):\n        try:\n            lines.append(input())\n        except EOFError:\n            break\n    tokens = \" \".join(lines).split()\n    if not tokens:\n        print(0)\n        return\n    n = int(tokens[0])\n    b = list(map(int, tokens[1:1+n]))\n    total = sum(b[i] for i in range(len(b)) if is_prime(i))\n    print(total)\n\nif __name__ == '__main__':\n    main()",
      "codes": {
        "python": "\ndef is_prime(x):\n    if x < 2:\n        return False\n    d = 2\n    while d * d <= x:\n        if x % d == 0:\n            return False\n        d += 1\n    return True\n\ndef main():\n    lines = []\n    for _ in range(2):\n        try:\n            lines.append(input())\n        except EOFError:\n            break\n    tokens = \" \".join(lines).split()\n    if not tokens:\n        print(0)\n        return\n    n = int(tokens[0])\n    b = list(map(int, tokens[1:1+n]))\n    total = sum(b[i] for i in range(len(b)) if is_prime(i))\n    print(total)\n\nif __name__ == '__main__':\n    main()",
        "c": "#include <stdio.h>\n#include <stdbool.h>\n\nbool is_prime(int x) {\n    if (x < 2) return false;\n    for (int d = 2; (long long)d * d <= x; d++) {\n        if (x % d == 0) return false;\n    }\n    return true;\n}\n\nint main(void) {\n    int n;\n    if (scanf(\"%d\", &n) == 1) {\n        long long total = 0;\n        for (int i = 0; i < n; i++) {\n            int bib;\n            scanf(\"%d\", &bib);\n            if (is_prime(i)) {\n                total += bib;\n            }\n        }\n        printf(\"%lld\\n\", total);\n    }\n    return 0;\n}",
        "cpp": "#include <iostream>\n\nusing namespace std;\n\nbool isPrime(int x) {\n    if (x < 2) return false;\n    for (long long d = 2; d * d <= x; ++d) {\n        if (x % d == 0) return false;\n    }\n    return true;\n}\n\nint main() {\n    int n;\n    if (cin >> n) {\n        long long total = 0;\n        for (int i = 0; i < n; ++i) {\n            int bib;\n            cin >> bib;\n            if (isPrime(i)) {\n                total += bib;\n            }\n        }\n        cout << total << endl;\n    }\n    return 0;\n}"
      },
      "language": "python",
      "problemLocked": false,
      "problemLockHash": "",
      "testsLocked": false,
      "testLockHash": "",
      "tests": [
        {
          "input": "6\n10 20 30 40 50 60",
          "expected": "130",
          "studentDefined": false
        },
        {
          "input": "4\n7 7 7 7",
          "expected": "14",
          "studentDefined": false
        },
        {
          "input": "2\n100 200",
          "expected": "0",
          "studentDefined": false
        },
        {
          "input": "3\n5 10 15",
          "expected": "15",
          "studentDefined": false
        }
      ],
      "customFonts": []
    },
    {
      "id": "Q-MV2AZ7FP-A5ZH",
      "title": "Question 16: Diver Oxygen Check",
      "problemHtml": "<h2>Problem Statement</h2>\n<p>A diver takes <code>N</code> depth readings during descent. Given a target safe depth <code>D</code>, each reading <code>r</code> contributes <code>D - |r - D|</code> to the total reward. Readings equal to <code>D</code> give the maximum reward <code>D</code>, and readings that deviate more than <code>D</code> contribute a negative amount. Your task is to find and return an integer value representing the total reward across all readings.</p>\n<p><b>Note:</b> The contribution for a reading <code>r</code> is <code>D - |r - D|</code>. It can be negative when <code>|r - D| > D</code>.</p>\n<p><b>Input Specification:</b><br>\nLine 1: An integer <code>N</code>, representing the number of readings.<br>\nLine 2: <code>N</code> space-separated integers representing depth readings <code>R</code>.<br>\nLine 3: An integer <code>D</code>, representing the target depth.\n</p>\n<p><b>Output Specification:</b><br>\nPrint an integer value representing the total reward across all readings.\n</p>\n<h3>Example 1:</h3>\n<p>\n<b>Input:</b><br>\n<pre>3\n10 12 14\n12</pre>\n<b>Output:</b><br>\n<pre>32</pre>\n<b>Explanation:</b><br>\nReading 10: 12 - |10 - 12| = 10.<br>\nReading 12: 12 - |12 - 12| = 12.<br>\nReading 14: 12 - |14 - 12| = 10.<br>\nTotal reward = 10 + 12 + 10 = 32.\n</p>\n<h3>Example 2:</h3>\n<p>\n<b>Input:</b><br>\n<pre>2\n5 20\n10</pre>\n<b>Output:</b><br>\n<pre>5</pre>\n<b>Explanation:</b><br>\nReading 5: 10 - |5 - 10| = 5.<br>\nReading 20: 10 - |20 - 10| = 0.<br>\nTotal reward = 5 + 0 = 5.\n</p>",
      "code": "\ndef main():\n    lines = []\n    for _ in range(3):\n        try:\n            lines.append(input())\n        except EOFError:\n            break\n    tokens = \" \".join(lines).split()\n    if not tokens:\n        print(0)\n        return\n    n = int(tokens[0])\n    r = list(map(int, tokens[1:1+n]))\n    d = int(tokens[1+n])\n    total = sum(d - abs(x - d) for x in r)\n    print(total)\n\nif __name__ == '__main__':\n    main()",
      "codes": {
        "python": "\ndef main():\n    lines = []\n    for _ in range(3):\n        try:\n            lines.append(input())\n        except EOFError:\n            break\n    tokens = \" \".join(lines).split()\n    if not tokens:\n        print(0)\n        return\n    n = int(tokens[0])\n    r = list(map(int, tokens[1:1+n]))\n    d = int(tokens[1+n])\n    total = sum(d - abs(x - d) for x in r)\n    print(total)\n\nif __name__ == '__main__':\n    main()",
        "c": "#include <stdio.h>\n#include <stdlib.h>\n\nint main(void) {\n    int n;\n    if (scanf(\"%d\", &n) != 1) return 0;\n    int r[10000];\n    for (int i = 0; i < n; i++) scanf(\"%d\", &r[i]);\n    int d;\n    scanf(\"%d\", &d);\n    long long total = 0;\n    for (int i = 0; i < n; i++) {\n        total += d - abs(r[i] - d);\n    }\n    printf(\"%lld\\n\", total);\n    return 0;\n}",
        "cpp": "#include <iostream>\n#include <vector>\n#include <cmath>\n\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<int> r(n);\n        for (int i = 0; i < n; ++i) cin >> r[i];\n        int d;\n        cin >> d;\n        long long total = 0;\n        for (int x : r) {\n            total += d - abs(x - d);\n        }\n        cout << total << endl;\n    }\n    return 0;\n}"
      },
      "language": "python",
      "problemLocked": false,
      "problemLockHash": "",
      "testsLocked": false,
      "testLockHash": "",
      "tests": [
        {
          "input": "3\n10 12 14\n12",
          "expected": "32",
          "studentDefined": false
        },
        {
          "input": "2\n5 20\n10",
          "expected": "5",
          "studentDefined": false
        },
        {
          "input": "1\n50\n10",
          "expected": "-30",
          "studentDefined": false
        },
        {
          "input": "2\n15 15\n15",
          "expected": "30",
          "studentDefined": false
        }
      ],
      "customFonts": []
    },
    {
      "id": "Q-MV2B1DAA-KI88",
      "title": "Question 17: Email Spam Flag",
      "problemHtml": "<h2>Problem Statement</h2>\n<p>Given a message string <code>S</code> and a forbidden single-character letter <code>L</code>, scan the first <code>N</code> characters of <code>S</code>. For every 0-based index <code>i</code> where <code>S[i]</code> equals <code>L</code>, add <code>(i + 1)</code> to the running spam score. Your task is to find and return an integer value representing the total spam score.</p>\n<p><b>Note:</b> Only the first <code>N</code> characters of <code>S</code> are inspected.</p>\n<p><b>Input Specification:</b><br>\nLine 1: An integer <code>N</code>, representing the prefix length to inspect.<br>\nLine 2: A string <code>S</code> representing the message.<br>\nLine 3: A single-character string <code>L</code> representing the forbidden letter.\n</p>\n<p><b>Output Specification:</b><br>\nPrint an integer value representing the total spam score.\n</p>\n<h3>Example 1:</h3>\n<p>\n<b>Input:</b><br>\n<pre>5\nabacada\na</pre>\n<b>Output:</b><br>\n<pre>9</pre>\n<b>Explanation:</b><br>\nPrefix of length 5 is \"abaca\".<br>\nIndex 0 ('a'): +1.<br>\nIndex 2 ('a'): +3.<br>\nIndex 4 ('a'): +5.<br>\nTotal = 1 + 3 + 5 = 9.\n</p>\n<h3>Example 2:</h3>\n<p>\n<b>Input:</b><br>\n<pre>4\nbanana\nn</pre>\n<b>Output:</b><br>\n<pre>3</pre>\n<b>Explanation:</b><br>\nPrefix of length 4 is \"bana\".<br>\nIndex 2 ('n'): +3.<br>\nTotal = 3.\n</p>",
      "code": "\ndef main():\n    lines = []\n    for _ in range(3):\n        try:\n            lines.append(input())\n        except EOFError:\n            break\n    tokens = \" \".join(lines).split()\n    if len(tokens) < 3:\n        print(0)\n        return\n    n = int(tokens[0])\n    s = tokens[1]\n    l = tokens[2]\n    total = 0\n    target = l[0]\n    for i in range(min(n, len(s))):\n        if s[i] == target:\n            total += i + 1\n    print(total)\n\nif __name__ == '__main__':\n    main()",
      "codes": {
        "python": "\ndef main():\n    lines = []\n    for _ in range(3):\n        try:\n            lines.append(input())\n        except EOFError:\n            break\n    tokens = \" \".join(lines).split()\n    if len(tokens) < 3:\n        print(0)\n        return\n    n = int(tokens[0])\n    s = tokens[1]\n    l = tokens[2]\n    total = 0\n    target = l[0]\n    for i in range(min(n, len(s))):\n        if s[i] == target:\n            total += i + 1\n    print(total)\n\nif __name__ == '__main__':\n    main()",
        "c": "#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    int n;\n    char s[10000], l[100];\n    if (scanf(\"%d %s %s\", &n, s, l) == 3) {\n        long long total = 0;\n        char target = l[0];\n        int len = strlen(s);\n        for (int i = 0; i < n && i < len; i++) {\n            if (s[i] == target) {\n                total += i + 1;\n            }\n        }\n        printf(\"%lld\\n\", total);\n    }\n    return 0;\n}",
        "cpp": "#include <iostream>\n#include <string>\n\nusing namespace std;\n\nint main() {\n    int n;\n    string s, l;\n    if (cin >> n >> s >> l) {\n        long long total = 0;\n        char target = l[0];\n        for (int i = 0; i < n && i < (int)s.length(); ++i) {\n            if (s[i] == target) {\n                total += i + 1;\n            }\n        }\n        cout << total << endl;\n    }\n    return 0;\n}"
      },
      "language": "python",
      "problemLocked": false,
      "problemLockHash": "",
      "testsLocked": false,
      "testLockHash": "",
      "tests": [
        {
          "input": "5\nabacada\na",
          "expected": "9",
          "studentDefined": false
        },
        {
          "input": "4\nbanana\nn",
          "expected": "3",
          "studentDefined": false
        },
        {
          "input": "3\nxyz\na",
          "expected": "0",
          "studentDefined": false
        },
        {
          "input": "3\naaa\na",
          "expected": "6",
          "studentDefined": false
        }
      ],
      "customFonts": []
    },
    {
      "id": "Q-MV2B30ZG-SF1Q",
      "title": "Question 18: Robot Charge Deltas",
      "problemHtml": "<h2>Problem Statement</h2>\n<p>A robot records its battery level across multiple steps in an integer array <code>B</code>, where <code>B[i]</code> represents the battery level recorded at step <code>i</code>. A boost is registered at index <code>i</code> (<code>i &ge; 1</code>) if the difference <code>B[i] - B[i - 1]</code> is strictly greater than the threshold <code>D</code>. Your task is to find and return an integer value representing the total number of boosts registered.</p>\n<p><b>Note:</b> Only differences strictly greater than <code>D</code> are considered boosts. Index 0 cannot be a boost since it has no previous battery level for comparison.</p>\n<p><b>Input Specification:</b><br>\nLine 1: An integer <code>D</code>, representing the boost delta threshold.<br>\nLine 2: Space-separated integers representing the battery readings <code>B</code>.\n</p>\n<p><b>Output Specification:</b><br>\nPrint an integer value representing the total number of boosts registered.\n</p>\n<h3>Example 1:</h3>\n<p>\n<b>Input:</b><br>\n<pre>3\n10 15 14 25</pre>\n<b>Output:</b><br>\n<pre>2</pre>\n<b>Explanation:</b><br>\nB[1] - B[0] = 15 - 10 = 5 > 3 -> Boost registered.<br>\nB[2] - B[1] = 14 - 15 = -1 <= 3 -> No boost.<br>\nB[3] - B[2] = 25 - 14 = 11 > 3 -> Boost registered.<br>\nTotal boosts = 2.\n</p>\n<h3>Example 2:</h3>\n<p>\n<b>Input:</b><br>\n<pre>5\n20 22 28 29</pre>\n<b>Output:</b><br>\n<pre>1</pre>\n<b>Explanation:</b><br>\n22 - 20 = 2 <= 5.<br>\n28 - 22 = 6 > 5 -> Boost registered.<br>\n29 - 28 = 1 <= 5.<br>\nTotal boosts = 1.\n</p>",
      "code": "\ndef main():\n    lines = []\n    for _ in range(2):\n        try:\n            lines.append(input())\n        except EOFError:\n            break\n    tokens = \" \".join(lines).split()\n    if len(tokens) < 2:\n        print(0)\n        return\n    d = int(tokens[0])\n    b = list(map(int, tokens[1:]))\n    boosts = 0\n    for i in range(1, len(b)):\n        if b[i] - b[i-1] > d:\n            boosts += 1\n    print(boosts)\n\nif __name__ == '__main__':\n    main()",
      "codes": {
        "python": "\ndef main():\n    lines = []\n    for _ in range(2):\n        try:\n            lines.append(input())\n        except EOFError:\n            break\n    tokens = \" \".join(lines).split()\n    if len(tokens) < 2:\n        print(0)\n        return\n    d = int(tokens[0])\n    b = list(map(int, tokens[1:]))\n    boosts = 0\n    for i in range(1, len(b)):\n        if b[i] - b[i-1] > d:\n            boosts += 1\n    print(boosts)\n\nif __name__ == '__main__':\n    main()",
        "c": "#include <stdio.h>\n#include <string.h>\n#include <stdlib.h>\n\nint main(void) {\n    int d;\n    if (scanf(\"%d\", &d) != 1) return 0;\n    char line[10000];\n    while (getchar() != '\\n');\n    if (!fgets(line, sizeof(line), stdin)) {\n        printf(\"0\\n\");\n        return 0;\n    }\n    char *tok = strtok(line, \" \\t\\r\\n\");\n    if (!tok) {\n        printf(\"0\\n\");\n        return 0;\n    }\n    int prev = atoi(tok);\n    int boosts = 0;\n    tok = strtok(NULL, \" \\t\\r\\n\");\n    while (tok) {\n        int curr = atoi(tok);\n        if (curr - prev > d) {\n            boosts++;\n        }\n        prev = curr;\n        tok = strtok(NULL, \" \\t\\r\\n\");\n    }\n    printf(\"%d\\n\", boosts);\n    return 0;\n}\n",
        "cpp": "#include <iostream>\n#include <sstream>\n#include <vector>\n#include <string>\n\nusing namespace std;\n\nint main() {\n    int d;\n    if (!(cin >> d)) return 0;\n    string line;\n    while (line.empty()) {\n        if (!getline(cin, line)) {\n            cout << 0 << endl;\n            return 0;\n        }\n    }\n    stringstream ss(line);\n    int prev, curr, boosts = 0;\n    if (ss >> prev) {\n        while (ss >> curr) {\n            if (curr - prev > d) boosts++;\n            prev = curr;\n        }\n    }\n    cout << boosts << endl;\n    return 0;\n}\n"
      },
      "language": "python",
      "problemLocked": false,
      "problemLockHash": "",
      "testsLocked": false,
      "testLockHash": "",
      "tests": [
        {
          "input": "3\n10 15 14 25",
          "expected": "2",
          "studentDefined": false
        },
        {
          "input": "5\n20 22 28 29",
          "expected": "1",
          "studentDefined": false
        },
        {
          "input": "10\n1 2 3",
          "expected": "0",
          "studentDefined": false
        },
        {
          "input": "2\n10 20 30",
          "expected": "2",
          "studentDefined": false
        }
      ],
      "customFonts": []
    },
    {
      "id": "Q-MV2B4HT3-DUBS",
      "title": "Question 19: Ferry Load Balance",
      "problemHtml": "<h2>Problem Statement</h2>\n<p>A ferry loads <code>N</code> cars in the order they arrive. The first <code>N / 2</code> cars (using integer division) are placed on the left side, and the remaining cars are placed on the right side. Your task is to find and return an integer value representing the absolute difference between the left and right total weights.</p>\n<p><b>Note:</b> <code>N / 2</code> uses integer division, so the right side will have one more car when <code>N</code> is odd.</p>\n<p><b>Input Specification:</b><br>\nLine 1: An integer <code>N</code>, representing the number of cars.<br>\nLine 2: <code>N</code> space-separated integers representing the car weights <code>W</code> in arrival order.\n</p>\n<p><b>Output Specification:</b><br>\nPrint an integer value representing the absolute difference between the left and right total weights.\n</p>\n<h3>Example 1:</h3>\n<p>\n<b>Input:</b><br>\n<pre>4\n10 20 30 40</pre>\n<b>Output:</b><br>\n<pre>40</pre>\n<b>Explanation:</b><br>\nSplit point = 4 // 2 = 2.<br>\nLeft side = [10, 20], sum = 30.<br>\nRight side = [30, 40], sum = 70.<br>\nAbsolute difference = |30 - 70| = 40.\n</p>\n<h3>Example 2:</h3>\n<p>\n<b>Input:</b><br>\n<pre>5\n5 5 5 5 5</pre>\n<b>Output:</b><br>\n<pre>5</pre>\n<b>Explanation:</b><br>\nSplit point = 5 // 2 = 2.<br>\nLeft side = [5, 5], sum = 10.<br>\nRight side = [5, 5, 5], sum = 15.<br>\nAbsolute difference = |10 - 15| = 5.\n</p>",
      "code": "\ndef main():\n    lines = []\n    for _ in range(2):\n        try:\n            lines.append(input())\n        except EOFError:\n            break\n    tokens = \" \".join(lines).split()\n    if not tokens:\n        print(0)\n        return\n    n = int(tokens[0])\n    w = list(map(int, tokens[1:1+n]))\n    mid = n // 2\n    left = sum(w[:mid])\n    right = sum(w[mid:])\n    print(abs(left - right))\n\nif __name__ == '__main__':\n    main()",
      "codes": {
        "python": "\ndef main():\n    lines = []\n    for _ in range(2):\n        try:\n            lines.append(input())\n        except EOFError:\n            break\n    tokens = \" \".join(lines).split()\n    if not tokens:\n        print(0)\n        return\n    n = int(tokens[0])\n    w = list(map(int, tokens[1:1+n]))\n    mid = n // 2\n    left = sum(w[:mid])\n    right = sum(w[mid:])\n    print(abs(left - right))\n\nif __name__ == '__main__':\n    main()",
        "c": "#include <stdio.h>\n#include <stdlib.h>\n\nint main(void) {\n    int n;\n    if (scanf(\"%d\", &n) != 1) return 0;\n    int mid = n / 2;\n    long long left = 0, right = 0;\n    for (int i = 0; i < n; i++) {\n        int weight;\n        scanf(\"%d\", &weight);\n        if (i < mid) {\n            left += weight;\n        } else {\n            right += weight;\n        }\n    }\n    long long diff = left - right;\n    if (diff < 0) diff = -diff;\n    printf(\"%lld\\n\", diff);\n    return 0;\n}",
        "cpp": "#include <iostream>\n#include <cmath>\n\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        int mid = n / 2;\n        long long left = 0, right = 0;\n        for (int i = 0; i < n; ++i) {\n            int weight;\n            cin >> weight;\n            if (i < mid) {\n                left += weight;\n            } else {\n                right += weight;\n            }\n        }\n        cout << abs(left - right) << endl;\n    }\n    return 0;\n}"
      },
      "language": "python",
      "problemLocked": false,
      "problemLockHash": "",
      "testsLocked": false,
      "testLockHash": "",
      "tests": [
        {
          "input": "4\n10 20 30 40",
          "expected": "40",
          "studentDefined": false
        },
        {
          "input": "5\n5 5 5 5 5",
          "expected": "5",
          "studentDefined": false
        },
        {
          "input": "2\n10 10",
          "expected": "0",
          "studentDefined": false
        },
        {
          "input": "1\n50",
          "expected": "50",
          "studentDefined": false
        }
      ],
      "customFonts": []
    },
    {
      "id": "Q-MV2B6HWY-AGMO",
      "title": "Question 20: Fire Drill Last Group Size",
      "problemHtml": "<h2>Problem Statement</h2>\n<p>A fire drill divides <code>N</code> people into groups of size <code>G</code>. If <code>N</code> is not a multiple of <code>G</code>, the last group contains the leftover people. If <code>N</code> is a multiple of <code>G</code>, the last group contains <code>G</code> people. Your task is to find and return an integer value representing the size of the last group.</p>\n<p><b>Note:</b> If <code>N</code> is a perfect multiple of <code>G</code>, the last group contains exactly <code>G</code> people.</p>\n<p><b>Input Specification:</b><br>\nLine 1: An integer <code>N</code>, representing the total number of people.<br>\nLine 2: An integer <code>G</code>, representing the group size.\n</p>\n<p><b>Output Specification:</b><br>\nPrint an integer value representing the size of the last group.\n</p>\n<h3>Example 1:</h3>\n<p>\n<b>Input:</b><br>\n<pre>10\n3</pre>\n<b>Output:</b><br>\n<pre>1</pre>\n<b>Explanation:</b><br>\nDividing 10 people into groups of 3 gives [3][3][3][1]: three complete groups and 1 leftover person.<br>\n10 % 3 = 1 -> Last group has 1 person.\n</p>\n<h3>Example 2:</h3>\n<p>\n<b>Input:</b><br>\n<pre>12\n4</pre>\n<b>Output:</b><br>\n<pre>4</pre>\n<b>Explanation:</b><br>\n12 is a perfect multiple of 4: groups are [4][4][4] with no leftover.<br>\nLast group has G = 4 people.\n</p>",
      "code": "\ndef main():\n    lines = []\n    for _ in range(2):\n        try:\n            lines.append(input())\n        except EOFError:\n            break\n    tokens = \" \".join(lines).split()\n    if not tokens:\n        print(0)\n        return\n    n = int(tokens[0])\n    g = int(tokens[1])\n    rem = n % g\n    print(g if rem == 0 else rem)\n\nif __name__ == '__main__':\n    main()",
      "codes": {
        "python": "\ndef main():\n    lines = []\n    for _ in range(2):\n        try:\n            lines.append(input())\n        except EOFError:\n            break\n    tokens = \" \".join(lines).split()\n    if not tokens:\n        print(0)\n        return\n    n = int(tokens[0])\n    g = int(tokens[1])\n    rem = n % g\n    print(g if rem == 0 else rem)\n\nif __name__ == '__main__':\n    main()",
        "c": "#include <stdio.h>\n\nint main(void) {\n    long long n, g;\n    if (scanf(\"%lld %lld\", &n, &g) == 2) {\n        long long rem = n % g;\n        printf(\"%lld\\n\", (rem == 0) ? g : rem);\n    }\n    return 0;\n}",
        "cpp": "#include <iostream>\n\nusing namespace std;\n\nint main() {\n    long long n, g;\n    if (cin >> n >> g) {\n        long long rem = n % g;\n        cout << ((rem == 0) ? g : rem) << endl;\n    }\n    return 0;\n}"
      },
      "language": "python",
      "problemLocked": false,
      "problemLockHash": "",
      "testsLocked": false,
      "testLockHash": "",
      "tests": [
        {
          "input": "10\n3",
          "expected": "1",
          "studentDefined": false
        },
        {
          "input": "12\n4",
          "expected": "4",
          "studentDefined": false
        },
        {
          "input": "5\n5",
          "expected": "5",
          "studentDefined": false
        },
        {
          "input": "7\n4",
          "expected": "3",
          "studentDefined": false
        }
      ],
      "customFonts": []
    },
    {
      "id": "Q-MV2B7Z0S-PA3K",
      "title": "Question 21: Concert Row Filling",
      "problemHtml": "<h2>Problem Statement</h2>\n<p>A concert hall has <code>N</code> rows with given seat capacities. <code>K</code> attendees enter the hall and fill the rows in order, starting from row 1, then row 2, and so on, until all <code>K</code> attendees are seated, or all rows are filled. Calculate the 1-based index of the last row that received at least one attendee. Your task is to find and return an integer value representing the row number.</p>\n<p><b>Note:</b> If <code>K = 0</code>, return <code>0</code>. If <code>K</code> exceeds the total available capacity of all rows, return the index of the final row (<code>N</code>).</p>\n<p><b>Input Specification:</b><br>\nLine 1: An integer <code>K</code>, representing the number of attendees.<br>\nLine 2: <code>N</code> space-separated integers representing the seat capacity of each row <code>S</code>.<br>\nLine 3: An integer <code>N</code>, representing the number of rows.\n</p>\n<p><b>Output Specification:</b><br>\nPrint an integer value representing the 1-based row number of the last row that received at least one attendee.\n</p>\n<h3>Example 1:</h3>\n<p>\n<b>Input:</b><br>\n<pre>7\n3 3 3 3\n4</pre>\n<b>Output:</b><br>\n<pre>3</pre>\n<b>Explanation:</b><br>\nRow 1 (capacity 3) seats 3 attendees; remaining = 4.<br>\nRow 2 (capacity 3) seats 3 attendees; remaining = 1.<br>\nRow 3 (capacity 3) seats the final 1 attendee; remaining = 0.<br>\nThe last row that received an attendee is Row 3.\n</p>\n<h3>Example 2:</h3>\n<p>\n<b>Input:</b><br>\n<pre>10\n2 2 2\n3</pre>\n<b>Output:</b><br>\n<pre>3</pre>\n<b>Explanation:</b><br>\nRows 1, 2, and 3 each seat 2 attendees (total capacity 6). All rows are full, so the last row is 3.\n</p>",
      "code": "\ndef main():\n    lines = []\n    for _ in range(3):\n        try:\n            lines.append(input())\n        except EOFError:\n            break\n    tokens = \" \".join(lines).split()\n    if not tokens:\n        print(0)\n        return\n    k = int(tokens[0])\n    n = int(tokens[-1])\n    s = list(map(int, tokens[1:-1]))\n    if k <= 0 or n == 0:\n        print(0)\n        return\n    rem = k\n    last_row = 0\n    for i in range(min(n, len(s))):\n        if rem > 0:\n            last_row = i + 1\n            rem -= s[i]\n        else:\n            break\n    print(last_row)\n\nif __name__ == '__main__':\n    main()",
      "codes": {
        "python": "\ndef main():\n    lines = []\n    for _ in range(3):\n        try:\n            lines.append(input())\n        except EOFError:\n            break\n    tokens = \" \".join(lines).split()\n    if not tokens:\n        print(0)\n        return\n    k = int(tokens[0])\n    n = int(tokens[-1])\n    s = list(map(int, tokens[1:-1]))\n    if k <= 0 or n == 0:\n        print(0)\n        return\n    rem = k\n    last_row = 0\n    for i in range(min(n, len(s))):\n        if rem > 0:\n            last_row = i + 1\n            rem -= s[i]\n        else:\n            break\n    print(last_row)\n\nif __name__ == '__main__':\n    main()",
        "c": "#include <stdio.h>\n#include <string.h>\n#include <stdlib.h>\n\nint main(void) {\n    int k;\n    if (scanf(\"%d\", &k) != 1) return 0;\n    while (getchar() != '\\n');\n    char line[10000];\n    if (!fgets(line, sizeof(line), stdin)) {\n        printf(\"0\\n\");\n        return 0;\n    }\n    int s[1000], count = 0;\n    char *tok = strtok(line, \" \\t\\r\\n\");\n    while (tok) {\n        s[count++] = atoi(tok);\n        tok = strtok(NULL, \" \\t\\r\\n\");\n    }\n    int n;\n    if (scanf(\"%d\", &n) != 1) n = 0;\n    if (k <= 0 || n == 0 || count == 0) {\n        printf(\"0\\n\");\n        return 0;\n    }\n    int rem = k, last_row = 0;\n    for (int i = 0; i < count && i < n; i++) {\n        if (rem > 0) {\n            last_row = i + 1;\n            rem -= s[i];\n        } else {\n            break;\n        }\n    }\n    printf(\"%d\\n\", last_row);\n    return 0;\n}\n",
        "cpp": "#include <iostream>\n#include <sstream>\n#include <vector>\n#include <string>\n\nusing namespace std;\n\nint main() {\n    int k;\n    if (!(cin >> k)) return 0;\n    string line;\n    while (line.empty()) {\n        if (!getline(cin, line)) {\n            cout << 0 << endl;\n            return 0;\n        }\n    }\n    stringstream ss(line);\n    vector<int> s;\n    int val;\n    while (ss >> val) s.push_back(val);\n    int n = 0;\n    cin >> n;\n    if (k <= 0 || n == 0 || s.empty()) {\n        cout << 0 << endl;\n        return 0;\n    }\n    int rem = k, last_row = 0;\n    for (int i = 0; i < (int)s.size() && i < n; ++i) {\n        if (rem > 0) {\n            last_row = i + 1;\n            rem -= s[i];\n        } else {\n            break;\n        }\n    }\n    cout << last_row << endl;\n    return 0;\n}\n"
      },
      "language": "python",
      "problemLocked": false,
      "problemLockHash": "",
      "testsLocked": false,
      "testLockHash": "",
      "tests": [
        {
          "input": "7\n3 3 3 3\n4",
          "expected": "3",
          "studentDefined": false
        },
        {
          "input": "10\n2 2 2\n3",
          "expected": "3",
          "studentDefined": false
        },
        {
          "input": "0\n5 5\n2",
          "expected": "0",
          "studentDefined": false
        },
        {
          "input": "2\n10 10\n2",
          "expected": "1",
          "studentDefined": false
        }
      ],
      "customFonts": []
    },
    {
      "id": "Q-MV2BAQII-QING",
      "title": "Question 22: Music Playlist Boost",
      "problemHtml": "<h2>Problem Statement</h2>\n<p>A music streaming service boosts the play count of songs in a playlist. The boosted score for the <code>i</code>-th song (0-indexed) is <code>plays[i] * (i + 1)</code>. Calculate the sum of the boosted scores for the first <code>K</code> songs. Your task is to find and return an integer value representing the total boosted score.</p>\n<p><b>Note:</b> If <code>K</code> exceeds <code>N</code>, use <code>N</code> instead.</p>\n<p><b>Input Specification:</b><br>\nLine 1: An integer <code>N</code>, representing the total number of songs.<br>\nLine 2: <code>N</code> space-separated integers representing the play counts <code>P</code>.<br>\nLine 3: An integer <code>K</code>, representing how many songs to boost.\n</p>\n<p><b>Output Specification:</b><br>\nPrint an integer value representing the total boosted score.\n</p>\n<h3>Example 1:</h3>\n<p>\n<b>Input:</b><br>\n<pre>4\n10 20 30 40\n3</pre>\n<b>Output:</b><br>\n<pre>140</pre>\n<b>Explanation:</b><br>\nBoost first K = 3 songs:<br>\nSong 0: 10 * (0 + 1) = 10.<br>\nSong 1: 20 * (1 + 1) = 40.<br>\nSong 2: 30 * (2 + 1) = 90.<br>\nTotal = 10 + 40 + 90 = 140.\n</p>\n<h3>Example 2:</h3>\n<p>\n<b>Input:</b><br>\n<pre>3\n5 5 5\n2</pre>\n<b>Output:</b><br>\n<pre>15</pre>\n<b>Explanation:</b><br>\nSong 0: 5 * 1 = 5.<br>\nSong 1: 5 * 2 = 10.<br>\nTotal = 5 + 10 = 15.\n</p>",
      "code": "\ndef main():\n    lines = []\n    for _ in range(3):\n        try:\n            lines.append(input())\n        except EOFError:\n            break\n    tokens = \" \".join(lines).split()\n    if not tokens:\n        print(0)\n        return\n    n = int(tokens[0])\n    p = list(map(int, tokens[1:1+n]))\n    k = int(tokens[1+n])\n    limit = min(k, n)\n    total = sum(p[i] * (i + 1) for i in range(limit))\n    print(total)\n\nif __name__ == '__main__':\n    main()",
      "codes": {
        "python": "\ndef main():\n    lines = []\n    for _ in range(3):\n        try:\n            lines.append(input())\n        except EOFError:\n            break\n    tokens = \" \".join(lines).split()\n    if not tokens:\n        print(0)\n        return\n    n = int(tokens[0])\n    p = list(map(int, tokens[1:1+n]))\n    k = int(tokens[1+n])\n    limit = min(k, n)\n    total = sum(p[i] * (i + 1) for i in range(limit))\n    print(total)\n\nif __name__ == '__main__':\n    main()",
        "c": "#include <stdio.h>\n\nint main(void) {\n    int n;\n    if (scanf(\"%d\", &n) != 1) return 0;\n    int p[10000];\n    for (int i = 0; i < n; i++) scanf(\"%d\", &p[i]);\n    int k;\n    scanf(\"%d\", &k);\n    int limit = (k < n) ? k : n;\n    long long total = 0;\n    for (int i = 0; i < limit; i++) {\n        total += (long long)p[i] * (i + 1);\n    }\n    printf(\"%lld\\n\", total);\n    return 0;\n}",
        "cpp": "#include <iostream>\n#include <vector>\n#include <algorithm>\n\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<int> p(n);\n        for (int i = 0; i < n; ++i) cin >> p[i];\n        int k;\n        cin >> k;\n        int limit = min(k, n);\n        long long total = 0;\n        for (int i = 0; i < limit; ++i) {\n            total += (long long)p[i] * (i + 1);\n        }\n        cout << total << endl;\n    }\n    return 0;\n}"
      },
      "language": "python",
      "problemLocked": false,
      "problemLockHash": "",
      "testsLocked": false,
      "testLockHash": "",
      "tests": [
        {
          "input": "4\n10 20 30 40\n3",
          "expected": "140",
          "studentDefined": false
        },
        {
          "input": "3\n5 5 5\n2",
          "expected": "15",
          "studentDefined": false
        },
        {
          "input": "2\n10 20\n5",
          "expected": "50",
          "studentDefined": false
        },
        {
          "input": "3\n10 20 30\n0",
          "expected": "0",
          "studentDefined": false
        }
      ],
      "customFonts": []
    },
    {
      "id": "Q-MV2BC2AP-O4X0",
      "title": "Question 23: Car Park Fee Sum",
      "problemHtml": "<h2>Problem Statement</h2>\n<p>A parking lot serves <code>N</code> cars. The parking duration of each car is given in an integer array <code>H</code>, where <code>H[i]</code> represents the number of hours the <code>i</code>-th car was parked. The first 2 hours are free, and each additional hour costs 3 units. Your task is to find and return an integer value representing the total parking fee collected.</p>\n<p><b>Note:</b> A car parked for 2 hours or less pays nothing.</p>\n<p><b>Input Specification:</b><br>\nLine 1: An integer <code>N</code>, representing the number of cars.<br>\nLine 2: <code>N</code> space-separated integers representing parking durations <code>H</code> in hours.\n</p>\n<p><b>Output Specification:</b><br>\nPrint an integer value representing the total parking fee collected.\n</p>\n<h3>Example 1:</h3>\n<p>\n<b>Input:</b><br>\n<pre>3\n1 4 5</pre>\n<b>Output:</b><br>\n<pre>15</pre>\n<b>Explanation:</b><br>\nCar 1 (1 hr): 1 <= 2 -> fee = 0.<br>\nCar 2 (4 hr): chargeable = 4 - 2 = 2 hrs -> fee = 2 * 3 = 6.<br>\nCar 3 (5 hr): chargeable = 5 - 2 = 3 hrs -> fee = 3 * 3 = 9.<br>\nTotal fee = 0 + 6 + 9 = 15.\n</p>\n<h3>Example 2:</h3>\n<p>\n<b>Input:</b><br>\n<pre>2\n2 10</pre>\n<b>Output:</b><br>\n<pre>24</pre>\n<b>Explanation:</b><br>\nCar 1 (2 hr): fee = 0.<br>\nCar 2 (10 hr): (10 - 2) * 3 = 24.<br>\nTotal fee = 0 + 24 = 24.\n</p>",
      "code": "\ndef main():\n    lines = []\n    for _ in range(2):\n        try:\n            lines.append(input())\n        except EOFError:\n            break\n    tokens = \" \".join(lines).split()\n    if not tokens:\n        print(0)\n        return\n    n = int(tokens[0])\n    h = list(map(int, tokens[1:1+n]))\n    total = sum(max(0, x - 2) * 3 for x in h)\n    print(total)\n\nif __name__ == '__main__':\n    main()",
      "codes": {
        "python": "\ndef main():\n    lines = []\n    for _ in range(2):\n        try:\n            lines.append(input())\n        except EOFError:\n            break\n    tokens = \" \".join(lines).split()\n    if not tokens:\n        print(0)\n        return\n    n = int(tokens[0])\n    h = list(map(int, tokens[1:1+n]))\n    total = sum(max(0, x - 2) * 3 for x in h)\n    print(total)\n\nif __name__ == '__main__':\n    main()",
        "c": "#include <stdio.h>\n\nint main(void) {\n    int n;\n    if (scanf(\"%d\", &n) != 1) return 0;\n    long long total = 0;\n    for (int i = 0; i < n; i++) {\n        int h;\n        scanf(\"%d\", &h);\n        if (h > 2) {\n            total += (long long)(h - 2) * 3;\n        }\n    }\n    printf(\"%lld\\n\", total);\n    return 0;\n}",
        "cpp": "#include <iostream>\n\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        long long total = 0;\n        for (int i = 0; i < n; ++i) {\n            int h;\n            cin >> h;\n            if (h > 2) {\n                total += (long long)(h - 2) * 3;\n            }\n        }\n        cout << total << endl;\n    }\n    return 0;\n}"
      },
      "language": "python",
      "problemLocked": false,
      "problemLockHash": "",
      "testsLocked": false,
      "testLockHash": "",
      "tests": [
        {
          "input": "3\n1 4 5",
          "expected": "15",
          "studentDefined": false
        },
        {
          "input": "2\n2 10",
          "expected": "24",
          "studentDefined": false
        },
        {
          "input": "3\n1 2 2",
          "expected": "0",
          "studentDefined": false
        },
        {
          "input": "1\n6",
          "expected": "12",
          "studentDefined": false
        }
      ],
      "customFonts": []
    },
    {
      "id": "Q-MV2BE3ON-8L4L",
      "title": "Question 24: Book Library Rank",
      "problemHtml": "<h2>Problem Statement</h2>\n<p>Given <code>N</code> book ratings and a target rating <code>T</code>, sort the ratings in descending order. Return the 1-based rank of the first occurrence of <code>T</code> in the sorted list. If <code>T</code> does not appear, return <code>0</code>. Your task is to find and return an integer value representing the rank of <code>T</code>.</p>\n<p><b>Note:</b> Ranks are 1-based. Duplicate ratings are counted individually, but the first occurrence wins.</p>\n<p><b>Input Specification:</b><br>\nLine 1: An integer <code>N</code>, representing the number of books.<br>\nLine 2: <code>N</code> space-separated integers representing the book ratings <code>R</code>.<br>\nLine 3: An integer <code>T</code>, representing the target rating.\n</p>\n<p><b>Output Specification:</b><br>\nPrint an integer value representing the rank of <code>T</code>, or <code>0</code> if not found.\n</p>\n<h3>Example 1:</h3>\n<p>\n<b>Input:</b><br>\n<pre>5\n4 7 2 9 7\n7</pre>\n<b>Output:</b><br>\n<pre>2</pre>\n<b>Explanation:</b><br>\nSorted descending = [9, 7, 7, 4, 2].<br>\nThe first occurrence of 7 is at rank 2.<br>\nResult = 2.\n</p>\n<h3>Example 2:</h3>\n<p>\n<b>Input:</b><br>\n<pre>3\n5 8 3\n6</pre>\n<b>Output:</b><br>\n<pre>0</pre>\n<b>Explanation:</b><br>\nSorted descending = [8, 5, 3]. Rating 6 is not in the list, so output is 0.\n</p>",
      "code": "\ndef main():\n    lines = []\n    for _ in range(3):\n        try:\n            lines.append(input())\n        except EOFError:\n            break\n    tokens = \" \".join(lines).split()\n    if not tokens:\n        print(0)\n        return\n    n = int(tokens[0])\n    r = list(map(int, tokens[1:1+n]))\n    t = int(tokens[1+n])\n    r_sorted = sorted(r, reverse=True)\n    try:\n        rank = r_sorted.index(t) + 1\n        print(rank)\n    except ValueError:\n        print(0)\n\nif __name__ == '__main__':\n    main()",
      "codes": {
        "python": "\ndef main():\n    lines = []\n    for _ in range(3):\n        try:\n            lines.append(input())\n        except EOFError:\n            break\n    tokens = \" \".join(lines).split()\n    if not tokens:\n        print(0)\n        return\n    n = int(tokens[0])\n    r = list(map(int, tokens[1:1+n]))\n    t = int(tokens[1+n])\n    r_sorted = sorted(r, reverse=True)\n    try:\n        rank = r_sorted.index(t) + 1\n        print(rank)\n    except ValueError:\n        print(0)\n\nif __name__ == '__main__':\n    main()",
        "c": "#include <stdio.h>\n#include <stdlib.h>\n\nint cmp_desc(const void *a, const void *b) {\n    return (*(int *)b - *(int *)a);\n}\n\nint main(void) {\n    int n;\n    if (scanf(\"%d\", &n) != 1) return 0;\n    int r[10000];\n    for (int i = 0; i < n; i++) scanf(\"%d\", &r[i]);\n    int t;\n    scanf(\"%d\", &t);\n    qsort(r, n, sizeof(int), cmp_desc);\n    int rank = 0;\n    for (int i = 0; i < n; i++) {\n        if (r[i] == t) {\n            rank = i + 1;\n            break;\n        }\n    }\n    printf(\"%d\\n\", rank);\n    return 0;\n}",
        "cpp": "#include <iostream>\n#include <vector>\n#include <algorithm>\n\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<int> r(n);\n        for (int i = 0; i < n; ++i) cin >> r[i];\n        int t;\n        cin >> t;\n        sort(r.begin(), r.end(), greater<int>());\n        int rank = 0;\n        for (int i = 0; i < n; ++i) {\n            if (r[i] == t) {\n                rank = i + 1;\n                break;\n            }\n        }\n        cout << rank << endl;\n    }\n    return 0;\n}"
      },
      "language": "python",
      "problemLocked": false,
      "problemLockHash": "",
      "testsLocked": false,
      "testLockHash": "",
      "tests": [
        {
          "input": "5\n4 7 2 9 7\n7",
          "expected": "2",
          "studentDefined": false
        },
        {
          "input": "3\n5 8 3\n6",
          "expected": "0",
          "studentDefined": false
        },
        {
          "input": "1\n10\n10",
          "expected": "1",
          "studentDefined": false
        },
        {
          "input": "4\n1 2 3 4\n1",
          "expected": "4",
          "studentDefined": false
        }
      ],
      "customFonts": []
    },
    {
      "id": "Q-MV2BFIJZ-UOXV",
      "title": "Question 25: Solar Panel Yield",
      "problemHtml": "<h2>Problem Statement</h2>\n<p><code>N</code> solar panels recorded sunlight hours. Each panel produces <code>hours * M</code> energy units. If the calculated energy for a panel exceeds 200 units, it is capped at 200 units. Your task is to find and return an integer value representing the total energy yield across all panels.</p>\n<p><b>Note:</b> Each panel's output is capped at 200 units (i.e. <code>min(hours * M, 200)</code>).</p>\n<p><b>Input Specification:</b><br>\nLine 1: An integer <code>N</code>, representing the number of panels.<br>\nLine 2: <code>N</code> space-separated integers representing sunlight hours <code>H</code> per panel.<br>\nLine 3: An integer <code>M</code>, representing the multiplier.\n</p>\n<p><b>Output Specification:</b><br>\nPrint an integer value representing the total energy yield across all panels.\n</p>\n<h3>Example 1:</h3>\n<p>\n<b>Input:</b><br>\n<pre>3\n10 30 5\n8</pre>\n<b>Output:</b><br>\n<pre>320</pre>\n<b>Explanation:</b><br>\nPanel 0: 10 * 8 = 80.<br>\nPanel 1: 30 * 8 = 240 -> capped at 200.<br>\nPanel 2: 5 * 8 = 40.<br>\nTotal yield = 80 + 200 + 40 = 320.\n</p>\n<h3>Example 2:</h3>\n<p>\n<b>Input:</b><br>\n<pre>2\n5 7\n3</pre>\n<b>Output:</b><br>\n<pre>36</pre>\n<b>Explanation:</b><br>\nPanel 0: 5 * 3 = 15.<br>\nPanel 1: 7 * 3 = 21.<br>\nTotal yield = 15 + 21 = 36.\n</p>",
      "code": "\ndef main():\n    lines = []\n    for _ in range(3):\n        try:\n            lines.append(input())\n        except EOFError:\n            break\n    tokens = \" \".join(lines).split()\n    if not tokens:\n        print(0)\n        return\n    n = int(tokens[0])\n    h = list(map(int, tokens[1:1+n]))\n    m = int(tokens[1+n])\n    total = sum(min(x * m, 200) for x in h)\n    print(total)\n\nif __name__ == '__main__':\n    main()",
      "codes": {
        "python": "\ndef main():\n    lines = []\n    for _ in range(3):\n        try:\n            lines.append(input())\n        except EOFError:\n            break\n    tokens = \" \".join(lines).split()\n    if not tokens:\n        print(0)\n        return\n    n = int(tokens[0])\n    h = list(map(int, tokens[1:1+n]))\n    m = int(tokens[1+n])\n    total = sum(min(x * m, 200) for x in h)\n    print(total)\n\nif __name__ == '__main__':\n    main()",
        "c": "#include <stdio.h>\n\nint main(void) {\n    int n;\n    if (scanf(\"%d\", &n) != 1) return 0;\n    int h[10000];\n    for (int i = 0; i < n; i++) scanf(\"%d\", &h[i]);\n    int m;\n    scanf(\"%d\", &m);\n    long long total = 0;\n    for (int i = 0; i < n; i++) {\n        long long yield_val = (long long)h[i] * m;\n        if (yield_val > 200) yield_val = 200;\n        total += yield_val;\n    }\n    printf(\"%lld\\n\", total);\n    return 0;\n}",
        "cpp": "#include <iostream>\n#include <vector>\n#include <algorithm>\n\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        vector<int> h(n);\n        for (int i = 0; i < n; ++i) cin >> h[i];\n        int m;\n        cin >> m;\n        long long total = 0;\n        for (int x : h) {\n            long long yield_val = (long long)x * m;\n            total += min(yield_val, 200LL);\n        }\n        cout << total << endl;\n    }\n    return 0;\n}"
      },
      "language": "python",
      "problemLocked": false,
      "problemLockHash": "",
      "testsLocked": false,
      "testLockHash": "",
      "tests": [
        {
          "input": "3\n10 30 5\n8",
          "expected": "320",
          "studentDefined": false
        },
        {
          "input": "2\n5 7\n3",
          "expected": "36",
          "studentDefined": false
        },
        {
          "input": "1\n100\n5",
          "expected": "200",
          "studentDefined": false
        },
        {
          "input": "2\n0 10\n10",
          "expected": "100",
          "studentDefined": false
        }
      ],
      "customFonts": []
    },
    {
      "id": "Q-MV2BI5DL-BFH5",
      "title": "Question 26: Cinema Snack Tip",
      "problemHtml": "<h2>Problem Statement</h2>\n<p>A cinema snack bar collects a tip equal to 15 percent of each bill amount, with the result rounded down to the nearest integer. Given <code>N</code> bills, calculate the total tips collected. Your task is to find and return an integer value representing the total tips collected.</p>\n<p><b>Note:</b> Use integer division while calculating the tip for each bill: <code>tip_i = (bill_i * 15) // 100</code>.</p>\n<p><b>Input Specification:</b><br>\nLine 1: An integer <code>N</code>, representing the number of bills.<br>\nLine 2: <code>N</code> space-separated integers representing the bill amounts <code>B</code>.\n</p>\n<p><b>Output Specification:</b><br>\nPrint an integer value representing the total tips collected.\n</p>\n<h3>Example 1:</h3>\n<p>\n<b>Input:</b><br>\n<pre>3\n100 200 50</pre>\n<b>Output:</b><br>\n<pre>52</pre>\n<b>Explanation:</b><br>\nBill 100 -> (100 * 15) // 100 = 15.<br>\nBill 200 -> (200 * 15) // 100 = 30.<br>\nBill 50 -> (50 * 15) // 100 = 7 (integer division).<br>\nTotal tip = 15 + 30 + 7 = 52.\n</p>\n<h3>Example 2:</h3>\n<p>\n<b>Input:</b><br>\n<pre>2\n80 120</pre>\n<b>Output:</b><br>\n<pre>30</pre>\n<b>Explanation:</b><br>\nBill 80 -> 12.<br>\nBill 120 -> 18.<br>\nTotal = 12 + 18 = 30.\n</p>",
      "code": "\ndef main():\n    lines = []\n    for _ in range(2):\n        try:\n            lines.append(input())\n        except EOFError:\n            break\n    tokens = \" \".join(lines).split()\n    if not tokens:\n        print(0)\n        return\n    n = int(tokens[0])\n    b = list(map(int, tokens[1:1+n]))\n    total = sum((x * 15) // 100 for x in b)\n    print(total)\n\nif __name__ == '__main__':\n    main()",
      "codes": {
        "python": "\ndef main():\n    lines = []\n    for _ in range(2):\n        try:\n            lines.append(input())\n        except EOFError:\n            break\n    tokens = \" \".join(lines).split()\n    if not tokens:\n        print(0)\n        return\n    n = int(tokens[0])\n    b = list(map(int, tokens[1:1+n]))\n    total = sum((x * 15) // 100 for x in b)\n    print(total)\n\nif __name__ == '__main__':\n    main()",
        "c": "#include <stdio.h>\n\nint main(void) {\n    int n;\n    if (scanf(\"%d\", &n) != 1) return 0;\n    long long total = 0;\n    for (int i = 0; i < n; i++) {\n        int bill;\n        scanf(\"%d\", &bill);\n        total += ((long long)bill * 15) / 100;\n    }\n    printf(\"%lld\\n\", total);\n    return 0;\n}",
        "cpp": "#include <iostream>\n\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        long long total = 0;\n        for (int i = 0; i < n; ++i) {\n            int bill;\n            cin >> bill;\n            total += ((long long)bill * 15) / 100;\n        }\n        cout << total << endl;\n    }\n    return 0;\n}"
      },
      "language": "python",
      "problemLocked": false,
      "problemLockHash": "",
      "testsLocked": false,
      "testLockHash": "",
      "tests": [
        {
          "input": "3\n100 200 50",
          "expected": "52",
          "studentDefined": false
        },
        {
          "input": "2\n80 120",
          "expected": "30",
          "studentDefined": false
        },
        {
          "input": "1\n5",
          "expected": "0",
          "studentDefined": false
        },
        {
          "input": "4\n10 20 30 40",
          "expected": "14",
          "studentDefined": false
        }
      ],
      "customFonts": []
    },
    {
      "id": "Q-MV2BJIHA-7JX6",
      "title": "Question 27: Museum Audio Skip",
      "problemHtml": "<h2>Problem Statement</h2>\n<p>A museum guide tag string <code>T</code> of length <code>N</code> contains lowercase tags. Compress the string by removing any tag character that is identical to the one immediately before it. Your task is to find and return an integer value representing the length of the resulting compressed string.</p>\n<p><b>Note:</b> Only immediate consecutive duplicates are removed. Non-adjacent repeats are kept.</p>\n<p><b>Input Specification:</b><br>\nLine 1: An integer <code>N</code>, representing the length of the tag string.<br>\nLine 2: A string <code>T</code> of lowercase tags.\n</p>\n<p><b>Output Specification:</b><br>\nPrint an integer value representing the length of the resulting compressed string.\n</p>\n<h3>Example 1:</h3>\n<p>\n<b>Input:</b><br>\n<pre>6\naabccc</pre>\n<b>Output:</b><br>\n<pre>3</pre>\n<b>Explanation:</b><br>\n'a' -> keep ('a').<br>\nNext 'a' matches previous -> drop.<br>\n'b' -> keep (\"ab\").<br>\n'c' -> keep (\"abc\").<br>\nNext 'c' -> drop.<br>\nNext 'c' -> drop.<br>\nCompressed string = \"abc\", length = 3.\n</p>\n<h3>Example 2:</h3>\n<p>\n<b>Input:</b><br>\n<pre>5\nabcba</pre>\n<b>Output:</b><br>\n<pre>5</pre>\n<b>Explanation:</b><br>\nNo adjacent duplicates were found. Compressed string remains \"abcba\", length = 5.\n</p>",
      "code": "\ndef main():\n    lines = []\n    for _ in range(2):\n        try:\n            lines.append(input())\n        except EOFError:\n            break\n    tokens = \" \".join(lines).split()\n    if not tokens:\n        print(0)\n        return\n    n = int(tokens[0])\n    t = tokens[1] if len(tokens) > 1 else \"\"\n    s = t[:n]\n    if not s:\n        print(0)\n        return\n    length = 1\n    for i in range(1, len(s)):\n        if s[i] != s[i-1]:\n            length += 1\n    print(length)\n\nif __name__ == '__main__':\n    main()",
      "codes": {
        "python": "\ndef main():\n    lines = []\n    for _ in range(2):\n        try:\n            lines.append(input())\n        except EOFError:\n            break\n    tokens = \" \".join(lines).split()\n    if not tokens:\n        print(0)\n        return\n    n = int(tokens[0])\n    t = tokens[1] if len(tokens) > 1 else \"\"\n    s = t[:n]\n    if not s:\n        print(0)\n        return\n    length = 1\n    for i in range(1, len(s)):\n        if s[i] != s[i-1]:\n            length += 1\n    print(length)\n\nif __name__ == '__main__':\n    main()",
        "c": "#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    int n;\n    char t[10000];\n    if (scanf(\"%d %s\", &n, t) == 2) {\n        if (n <= 0 || t[0] == '\\0') {\n            printf(\"0\\n\");\n            return 0;\n        }\n        int count = 1;\n        for (int i = 1; i < n && t[i] != '\\0'; i++) {\n            if (t[i] != t[i-1]) {\n                count++;\n            }\n        }\n        printf(\"%d\\n\", count);\n    }\n    return 0;\n}",
        "cpp": "#include <iostream>\n#include <string>\n\nusing namespace std;\n\nint main() {\n    int n;\n    string t;\n    if (cin >> n >> t) {\n        if (n <= 0 || t.empty()) {\n            cout << 0 << endl;\n            return 0;\n        }\n        int count = 1;\n        for (int i = 1; i < n && i < (int)t.length(); ++i) {\n            if (t[i] != t[i-1]) {\n                count++;\n            }\n        }\n        cout << count << endl;\n    }\n    return 0;\n}"
      },
      "language": "python",
      "problemLocked": false,
      "problemLockHash": "",
      "testsLocked": false,
      "testLockHash": "",
      "tests": [
        {
          "input": "6\naabccc",
          "expected": "3",
          "studentDefined": false
        },
        {
          "input": "5\nabcba",
          "expected": "5",
          "studentDefined": false
        },
        {
          "input": "4\naaaa",
          "expected": "1",
          "studentDefined": false
        },
        {
          "input": "1\nz",
          "expected": "1",
          "studentDefined": false
        }
      ],
      "customFonts": []
    },
    {
      "id": "Q-MV2BL0Y5-SLS0",
      "title": "Question 28: Airport Security Flow",
      "problemHtml": "<h2>Problem Statement</h2>\n<p>A single security lane serves <code>N</code> passengers with scan times stored in an integer array <code>S</code>. A running clock <code>C</code> starts at 0. For each passenger with scan time <code>t</code>:\n<ul>\n  <li>if <code>t > C</code>, reset <code>C</code> to <code>t</code>;</li>\n  <li>otherwise, increase <code>C</code> by <code>t</code> (<code>C += t</code>).</li>\n</ul>\nAfter each update, add <code>C</code> to the total cumulative wait. Your task is to find and return an integer value representing the total cumulative wait.</p>\n<p><b>Note:</b> The reset rule uses strict inequality (<code>t > C</code>).</p>\n<p><b>Input Specification:</b><br>\nLine 1: An integer <code>N</code>, representing the number of passengers.<br>\nLine 2: <code>N</code> space-separated integers representing scan times <code>S</code>.\n</p>\n<p><b>Output Specification:</b><br>\nPrint an integer value representing the total cumulative wait.\n</p>\n<h3>Example 1:</h3>\n<p>\n<b>Input:</b><br>\n<pre>3\n5 2 10</pre>\n<b>Output:</b><br>\n<pre>22</pre>\n<b>Explanation:</b><br>\nC = 0, total = 0.<br>\nPassenger 1 (t = 5): 5 > 0 -> C resets to 5; total += 5 -> total = 5.<br>\nPassenger 2 (t = 2): 2 <= 5 -> C += 2 = 7; total += 7 -> total = 12.<br>\nPassenger 3 (t = 10): 10 > 7 -> C resets to 10; total += 10 -> total = 22.<br>\nTotal cumulative wait = 22.\n</p>\n<h3>Example 2:</h3>\n<p>\n<b>Input:</b><br>\n<pre>4\n3 3 3 3</pre>\n<b>Output:</b><br>\n<pre>30</pre>\n<b>Explanation:</b><br>\nPassenger 1: C = 3, total = 3.<br>\nPassenger 2: C = 6, total = 9.<br>\nPassenger 3: C = 9, total = 18.<br>\nPassenger 4: C = 12, total = 30.<br>\nTotal cumulative wait = 30.\n</p>",
      "code": "\ndef main():\n    lines = []\n    for _ in range(2):\n        try:\n            lines.append(input())\n        except EOFError:\n            break\n    tokens = \" \".join(lines).split()\n    if not tokens:\n        print(0)\n        return\n    n = int(tokens[0])\n    s = list(map(int, tokens[1:1+n]))\n    c = 0\n    total = 0\n    for t in s:\n        if t > c:\n            c = t\n        else:\n            c += t\n        total += c\n    print(total)\n\nif __name__ == '__main__':\n    main()",
      "codes": {
        "python": "\ndef main():\n    lines = []\n    for _ in range(2):\n        try:\n            lines.append(input())\n        except EOFError:\n            break\n    tokens = \" \".join(lines).split()\n    if not tokens:\n        print(0)\n        return\n    n = int(tokens[0])\n    s = list(map(int, tokens[1:1+n]))\n    c = 0\n    total = 0\n    for t in s:\n        if t > c:\n            c = t\n        else:\n            c += t\n        total += c\n    print(total)\n\nif __name__ == '__main__':\n    main()",
        "c": "#include <stdio.h>\n\nint main(void) {\n    int n;\n    if (scanf(\"%d\", &n) != 1) return 0;\n    long long c = 0, total = 0;\n    for (int i = 0; i < n; i++) {\n        long long t;\n        scanf(\"%lld\", &t);\n        if (t > c) {\n            c = t;\n        } else {\n            c += t;\n        }\n        total += c;\n    }\n    printf(\"%lld\\n\", total);\n    return 0;\n}",
        "cpp": "#include <iostream>\n\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        long long c = 0, total = 0;\n        for (int i = 0; i < n; ++i) {\n            long long t;\n            cin >> t;\n            if (t > c) {\n                c = t;\n            } else {\n                c += t;\n            }\n            total += c;\n        }\n        cout << total << endl;\n    }\n    return 0;\n}"
      },
      "language": "python",
      "problemLocked": false,
      "problemLockHash": "",
      "testsLocked": false,
      "testLockHash": "",
      "tests": [
        {
          "input": "3\n5 2 10",
          "expected": "22",
          "studentDefined": false
        },
        {
          "input": "4\n3 3 3 3",
          "expected": "30",
          "studentDefined": false
        },
        {
          "input": "1\n5",
          "expected": "5",
          "studentDefined": false
        },
        {
          "input": "2\n10 1",
          "expected": "21",
          "studentDefined": false
        }
      ],
      "customFonts": []
    },
    {
      "id": "Q-MV2BMWJ4-3CZC",
      "title": "Question 29: Elevator Trip Distance",
      "problemHtml": "<h2>Problem Statement</h2>\n<p>An elevator starts at floor 0 and receives <code>N</code> floor requests in order. It travels to each requested floor one after another and finally returns to floor 0. Your task is to find and return an integer value representing the total distance traveled.</p>\n<p><b>Note:</b> All requested floors are non-negative integers. Requests are handled strictly in the given order.</p>\n<p><b>Input Specification:</b><br>\nLine 1: An integer <code>N</code>, representing the number of requests.<br>\nLine 2: <code>N</code> space-separated integers representing the requested floors <code>F</code> in order.\n</p>\n<p><b>Output Specification:</b><br>\nPrint an integer value representing the total distance traveled.\n</p>\n<h3>Example 1:</h3>\n<p>\n<b>Input:</b><br>\n<pre>3\n3 8 5</pre>\n<b>Output:</b><br>\n<pre>16</pre>\n<b>Explanation:</b><br>\nSegment 0 -> 3: |3 - 0| = 3.<br>\nSegment 3 -> 8: |8 - 3| = 5.<br>\nSegment 8 -> 5: |5 - 8| = 3.<br>\nSegment 5 -> 0: |0 - 5| = 5.<br>\nTotal distance = 3 + 5 + 3 + 5 = 16.\n</p>\n<h3>Example 2:</h3>\n<p>\n<b>Input:</b><br>\n<pre>4\n2 6 4 2</pre>\n<b>Output:</b><br>\n<pre>12</pre>\n<b>Explanation:</b><br>\n0 -> 2: 2.<br>\n2 -> 6: 4.<br>\n6 -> 4: 2.<br>\n4 -> 2: 2.<br>\n2 -> 0: 2.<br>\nTotal distance = 2 + 4 + 2 + 2 + 2 = 12.\n</p>",
      "code": "\ndef main():\n    lines = []\n    for _ in range(2):\n        try:\n            lines.append(input())\n        except EOFError:\n            break\n    tokens = \" \".join(lines).split()\n    if not tokens:\n        print(0)\n        return\n    n = int(tokens[0])\n    f = list(map(int, tokens[1:1+n]))\n    cur = 0\n    dist = 0\n    for target in f:\n        dist += abs(target - cur)\n        cur = target\n    dist += abs(0 - cur)\n    print(dist)\n\nif __name__ == '__main__':\n    main()",
      "codes": {
        "python": "\ndef main():\n    lines = []\n    for _ in range(2):\n        try:\n            lines.append(input())\n        except EOFError:\n            break\n    tokens = \" \".join(lines).split()\n    if not tokens:\n        print(0)\n        return\n    n = int(tokens[0])\n    f = list(map(int, tokens[1:1+n]))\n    cur = 0\n    dist = 0\n    for target in f:\n        dist += abs(target - cur)\n        cur = target\n    dist += abs(0 - cur)\n    print(dist)\n\nif __name__ == '__main__':\n    main()",
        "c": "#include <stdio.h>\n#include <stdlib.h>\n\nint main(void) {\n    int n;\n    if (scanf(\"%d\", &n) != 1) return 0;\n    long long dist = 0;\n    int cur = 0;\n    for (int i = 0; i < n; i++) {\n        int target;\n        scanf(\"%d\", &target);\n        dist += abs(target - cur);\n        cur = target;\n    }\n    dist += abs(0 - cur);\n    printf(\"%lld\\n\", dist);\n    return 0;\n}",
        "cpp": "#include <iostream>\n#include <cmath>\n\nusing namespace std;\n\nint main() {\n    int n;\n    if (cin >> n) {\n        long long dist = 0;\n        int cur = 0;\n        for (int i = 0; i < n; ++i) {\n            int target;\n            cin >> target;\n            dist += abs(target - cur);\n            cur = target;\n        }\n        dist += abs(0 - cur);\n        cout << dist << endl;\n    }\n    return 0;\n}"
      },
      "language": "python",
      "problemLocked": false,
      "problemLockHash": "",
      "testsLocked": false,
      "testLockHash": "",
      "tests": [
        {
          "input": "3\n3 8 5",
          "expected": "16",
          "studentDefined": false
        },
        {
          "input": "4\n2 6 4 2",
          "expected": "12",
          "studentDefined": false
        },
        {
          "input": "1\n10",
          "expected": "20",
          "studentDefined": false
        },
        {
          "input": "2\n0 0",
          "expected": "0",
          "studentDefined": false
        }
      ],
      "customFonts": []
    },
    {
      "id": "Q-MV2BOJTP-0QHC",
      "title": "Question 30: Treasure Map Scan",
      "problemHtml": "<h2>Problem Statement</h2>\n<p>An archeologist decodes a treasure map string <code>M</code> of length <code>N</code> containing uppercase symbols, digits, and lowercase letters. 'X' scores 10, 'O' scores 5, each digit ('0'-'9') contributes its numeric value, and all other characters score 0. Your task is to find and return an integer value representing the total treasure score.</p>\n<p><b>Note:</b> Only 'X', 'O', and digits '0'-'9' contribute. All other characters score 0.</p>\n<p><b>Input Specification:</b><br>\nLine 1: An integer <code>N</code>, representing the map length.<br>\nLine 2: A string <code>M</code> representing the encoded map.\n</p>\n<p><b>Output Specification:</b><br>\nPrint an integer value representing the total treasure score.\n</p>\n<h3>Example 1:</h3>\n<p>\n<b>Input:</b><br>\n<pre>5\nXO3aX</pre>\n<b>Output:</b><br>\n<pre>28</pre>\n<b>Explanation:</b><br>\n'X' -> 10.<br>\n'O' -> 5.<br>\n'3' -> 3.<br>\n'a' -> 0.<br>\n'X' -> 10.<br>\nTotal Treasure Score = 10 + 5 + 3 + 0 + 10 = 28.\n</p>\n<h3>Example 2:</h3>\n<p>\n<b>Input:</b><br>\n<pre>4\nOO5b</pre>\n<b>Output:</b><br>\n<pre>15</pre>\n<b>Explanation:</b><br>\n'O' (5) + 'O' (5) + '5' (5) + 'b' (0) = 15.\n</p>",
      "code": "\ndef main():\n    lines = []\n    for _ in range(2):\n        try:\n            lines.append(input())\n        except EOFError:\n            break\n    tokens = \" \".join(lines).split()\n    if not tokens:\n        print(0)\n        return\n    n = int(tokens[0])\n    m = tokens[1] if len(tokens) > 1 else \"\"\n    total = 0\n    for ch in m[:n]:\n        if ch == 'X':\n            total += 10\n        elif ch == 'O':\n            total += 5\n        elif ch.isdigit():\n            total += int(ch)\n    print(total)\n\nif __name__ == '__main__':\n    main()",
      "codes": {
        "python": "\ndef main():\n    lines = []\n    for _ in range(2):\n        try:\n            lines.append(input())\n        except EOFError:\n            break\n    tokens = \" \".join(lines).split()\n    if not tokens:\n        print(0)\n        return\n    n = int(tokens[0])\n    m = tokens[1] if len(tokens) > 1 else \"\"\n    total = 0\n    for ch in m[:n]:\n        if ch == 'X':\n            total += 10\n        elif ch == 'O':\n            total += 5\n        elif ch.isdigit():\n            total += int(ch)\n    print(total)\n\nif __name__ == '__main__':\n    main()",
        "c": "#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    int n;\n    char m[10000];\n    if (scanf(\"%d %s\", &n, m) == 2) {\n        long long total = 0;\n        for (int i = 0; i < n && m[i] != '\\0'; i++) {\n            if (m[i] == 'X') {\n                total += 10;\n            } else if (m[i] == 'O') {\n                total += 5;\n            } else if (m[i] >= '0' && m[i] <= '9') {\n                total += m[i] - '0';\n            }\n        }\n        printf(\"%lld\\n\", total);\n    }\n    return 0;\n}",
        "cpp": "#include <iostream>\n#include <string>\n\nusing namespace std;\n\nint main() {\n    int n;\n    string m;\n    if (cin >> n >> m) {\n        long long total = 0;\n        for (int i = 0; i < n && i < (int)m.length(); ++i) {\n            if (m[i] == 'X') {\n                total += 10;\n            } else if (m[i] == 'O') {\n                total += 5;\n            } else if (m[i] >= '0' && m[i] <= '9') {\n                total += m[i] - '0';\n            }\n        }\n        cout << total << endl;\n    }\n    return 0;\n}"
      },
      "language": "python",
      "problemLocked": false,
      "problemLockHash": "",
      "testsLocked": false,
      "testLockHash": "",
      "tests": [
        {
          "input": "5\nXO3aX",
          "expected": "28",
          "studentDefined": false
        },
        {
          "input": "4\nOO5b",
          "expected": "15",
          "studentDefined": false
        },
        {
          "input": "3\nabc",
          "expected": "0",
          "studentDefined": false
        },
        {
          "input": "4\nXXOO",
          "expected": "30",
          "studentDefined": false
        }
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
function remoteRun(language,source,stdin){
  return new Promise((resolve,reject)=>{
    if(typeof io!=='function') return reject(Error('Compiler connection library is unavailable.'));
    const sock=io(`https://repl-web.programiz.com/?sessionId=${rid()}&lang=${language}`,{transports:['websocket'],forceNew:true,reconnection:false});
    let raw='',done=false,inputSent=false,settle,hard,fallbackTimer;
    const finish=()=>{
      if(done)return;
      done=true;
      clearTimeout(settle);
      clearTimeout(hard);
      clearTimeout(fallbackTimer);
      sock.disconnect();
      const err=/error:|traceback|syntaxerror|runtimeerror|segmentation fault|invalid preprocessing directive|undefined reference/i.test(raw);
      resolve({ok:!err,output:err?'':removeEcho(raw,stdin),error:err?stripNoise(raw):''});
    };
    const fail=m=>{
      if(done)return;
      done=true;
      clearTimeout(settle);
      clearTimeout(hard);
      clearTimeout(fallbackTimer);
      sock.disconnect();
      reject(Error(m));
    };
    const sendInput=()=>{
      if(inputSent)return;
      inputSent=true;
      clearTimeout(fallbackTimer);
      if(String(stdin)!==''){
        const lines=String(stdin).replace(/\r\n?/g,'\n').split('\n');
        lines.forEach((x,i)=>setTimeout(()=>sock.emit('evaluate',{code:x}),i*160));
      }
    };
    sock.on('connect',()=>{
      sock.emit('run',{code:source});
      fallbackTimer=setTimeout(sendInput,language==='python'?800:2200);
    });
    sock.on('output',p=>{
      const text=packetText(p);
      raw+=text;
      if(!inputSent&&(/(\.(o|out)|>>>|\$)\s*$/.test(text)||text.length>0)){
        sendInput();
      }
      clearTimeout(settle);
      settle=setTimeout(finish,1500);
    });
    sock.on('error',p=>{
      raw+=packetText(p)||'Compiler error';
      clearTimeout(settle);
      settle=setTimeout(finish,700);
    });
    sock.on('connect_error',()=>fail('Unable to connect to compiler server.'));
    hard=setTimeout(()=>raw?finish():fail('Compiler server did not return output.'),20000);
  });
}
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
  zip.file('README.txt','Completed assessment submission. Share this ZIP and the exported HTML report with the question provider.');
  return zip.generateAsync({type:'blob',compression:'DEFLATE'});
}
async function downloadCompletedHtmlV18(base){
  download(new Blob([reportHtml17()],{type:'text/html;charset=utf-8'}),base+'-completed.html');
}
async function finishAssessmentV18(reason){
  if(autoExportStarted)return;autoExportStarted=true;clearInterval(timerHandle);saveCurrent();
  const base=safeName(state.setId||'assessment');let zipStarted=false,htmlStarted=false;
  try{download(await completedZipBlobV18(),base+'-completed.zip');zipStarted=true}catch(e){console.error(e)}
  try{await downloadCompletedHtmlV18(base);htmlStarted=true}catch(e){console.error(e)}
  clearExamSession();
  document.body.classList.add('submission-complete');
  const modal=$('timeoutModal');modal.querySelector('h2').textContent=reason==='timeout'?'Time is out':'Assessment finished';
  modal.querySelector('p').textContent='Please share the exported ZIP and HTML report with the question provider to evaluate';
  const button=modal.querySelector('button');button.textContent='Return to Import Screen';button.onclick=()=>location.reload();modal.classList.add('show');
  if(!zipStarted||!htmlStarted)toast('If a download was blocked, allow multiple downloads and use Finish Assessment again before closing this page.');
}
$('finishAssessment').onclick=()=>{if(confirm('Finish the assessment now and export the completed ZIP and HTML report?'))finishAssessmentV18('manual')};
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
async function startCandidateV19(){const n=examNowParts();candidateMeta={fullName:$('candidateName').value.trim(),rollNumber:$('candidateRoll').value.trim(),currentDate:n.date,currentHour:n.hour,currentMinute:n.minute,startTime:n.iso,ownerEmail:ownerConfig().email||'',submissionMinutes:ownerConfig().submissionMinutes||10};localStorage.setItem(EXAM_EVIDENCE_KEY,JSON.stringify(candidateMeta));$('candidateModal').classList.remove('show');await requestExamFullscreen();beginPersistentAssessment();startEvidenceCapture();alert(`After the exam, share the exported HTML report and ZIP with the exam owner within ${candidateMeta.submissionMinutes} minute(s) at ${candidateMeta.ownerEmail||'the email provided by the owner'}. Do not press Esc or close the exam. Ending early will finish the attempt.`)}
$('candidateStart').onclick=startCandidateV19;
const readyYesV19=$('readyYes');readyYesV19.onclick=()=>{$('readyModal').classList.remove('show');showCandidateGateV19()};
function blockCandidateClipboard(e){if(e.target&&e.target.closest&&(e.target.closest('.modal')||e.target.closest('.test-card.student-extra')))return;if(candidateRunning){e.preventDefault();toast('Copy, cut, and paste are disabled during the assessment')}}
['copy','cut','paste'].forEach(type=>document.addEventListener(type,blockCandidateClipboard,true));
document.addEventListener('contextmenu',e=>{if(e.target&&e.target.closest&&(e.target.closest('.modal')||e.target.closest('.test-card.student-extra')))return;if(candidateRunning){e.preventDefault();toast('Right-click is disabled during the assessment')}},true);
function instructionTextV19(reason,end){const c=candidateMeta||{};const owner=ownerConfig();const due=new Date(end.getTime()+(Number(c.submissionMinutes||owner.submissionMinutes||10)*60000));const startDisp=formatIstDateTime(c.startTime)||c.startTime||'',endDisp=formatIstDateTime(end),dueDisp=formatIstDateTime(due);return `ASSESSMENT SUBMISSION INSTRUCTIONS\n\nCandidate Full Name: ${c.fullName||''}\nRoll Number: ${c.rollNumber||''}\nCurrent Date: ${c.currentDate||formatIstDate(c.startTime)}\nCurrent Hour: ${c.currentHour||''}\nCurrent Minute: ${c.currentMinute||''}\nExam Start (IST): ${startDisp}\nExam End (IST): ${endDisp}\nFinish Reason: ${reason}\nTotal Questions: ${state.questions.length}\nOwner Email: ${c.ownerEmail||owner.email||''}\nSubmission Window: ${c.submissionMinutes||owner.submissionMinutes||10} minute(s)\nSubmit By (IST): ${dueDisp}\n\nShare both the completed ZIP and HTML report with the exam owner. Keep the original files unchanged. Camera images are assessment evidence for authorized review only. This application does not automatically determine cheating, identity, emotion, or gaze.`}
function reportHtmlV19(reason,end){const c=candidateMeta||{};const startDisp=formatIstDateTime(c.startTime)||esc(c.startTime||''),endDisp=formatIstDateTime(end),dateDisp=c.currentDate||formatIstDate(c.startTime)||formatIstDate(new Date()),timeDisp=c.currentHour&&c.currentMinute?(c.currentHour+':'+c.currentMinute+' IST'):formatIstTime(c.startTime)||formatIstTime(new Date());return `<!doctype html><html><head><meta charset="utf-8"><style>body{font-family:Arial,sans-serif;margin:24px;color:#102a43}h1{color:#073b88}.meta{border:1px solid #9fb3c8;padding:12px;background:#f4f7fb;border-radius:6px;margin-bottom:20px}.shot{page-break-inside:avoid;margin:12px 0}.shot img{width:100%;max-width:700px}.stamp{font-size:11px}</style></head><body><h1>Assessment Submission Report</h1><div class="meta"><b>Full Name:</b> ${esc(c.fullName||'')}<br><b>Roll Number:</b> ${esc(c.rollNumber||'')}<br><b>Current Date:</b> ${esc(dateDisp)}<br><b>Current Time:</b> ${esc(timeDisp)}<br><b>Exam Start (IST):</b> ${esc(startDisp)}<br><b>Exam End (IST):</b> ${esc(endDisp)}<br><b>Finish Reason:</b> ${esc(reason)}<br><b>Total Questions:</b> ${state.questions.length}</div>${state.questions.map((x,i)=>`<article><h2>Question ${i+1}</h2><div>${x.problemHtml||''}</div><h3>Candidate Code</h3><pre>${esc(x.code||'')}</pre></article>`).join('')}<h2>Camera Evidence</h2><div id="evidenceShots"></div></body></html>`}
function evidenceHtmlV20(end){const c=candidateMeta||{};return `<!doctype html><html><head><meta charset="utf-8"><title>Camera Evidence Report</title><style>body{font-family:Arial,sans-serif;margin:24px;color:#102a43}h1{color:#073b88}.meta{border:1px solid #9fb3c8;padding:12px;background:#f4f7fb;border-radius:6px;margin-bottom:20px}.shot{margin:20px 0;padding:15px;border:1px solid #bfd2eb;border-radius:8px;background:#fff;page-break-inside:avoid}.shot img{width:100%;max-width:640px;border-radius:5px;display:block;margin-bottom:10px}.stamp{font-size:12px;font-weight:bold;color:#607495}</style></head><body><h1>Camera Evidence Report</h1><div class="meta"><b>Full Name:</b> ${esc(c.fullName||'')}<br><b>Roll Number:</b> ${esc(c.rollNumber||'')}<br><b>Exam Start (IST):</b> ${esc(formatIstDateTime(c.startTime))}<br><b>Exam End (IST):</b> ${esc(formatIstDateTime(end))}</div><h2>Evidence Frames</h2><div id="evidenceShots">${evidenceFrames.map((f,i)=>`<div class="shot"><h3>Frame ${i+1}</h3><img src="${f.name}"><div class="stamp">${esc(f.stamp)}</div></div>`).join('')}</div></body></html>`}
function completedReportHtmlV19(reason,end){return reportHtmlV19(reason,end).replace('<div id="evidenceShots"></div>','<div id="evidenceShots"><p>Camera evidence screenshots are available in the accompanying <b>camera-evidence.html</b> file and in the completed ZIP.</p></div>')}
async function completedZipBlobV19(reason,end,reportHtml,onProgress){saveCurrent();const zip=new JSZip(),manifest={...state,questions:undefined,questionIds:state.questions.map(x=>x.id),candidate:candidateMeta,completedAt:end.toISOString(),finishReason:reason,submission:true};zip.file('assessment.json',JSON.stringify(manifest,null,2));state.questions.forEach((x,i)=>zip.file(`questions/${String(i+1).padStart(3,'0')}-${x.id}.json`,JSON.stringify(x,null,2)));for(const f of evidenceFrames)zip.file(f.name,f.blob);zip.file('camera-evidence.html',evidenceHtmlV20(end));zip.file('instruction.txt',instructionTextV19(reason,end)+'\nCamera Evidence: camera-evidence.html\n');zip.file('assessment-report.html',reportHtml);return zip.generateAsync({type:'blob',compression:'DEFLATE',compressionOptions:{level:1}},metadata=>{if(onProgress)onProgress(Math.round(metadata.percent))})}
async function finishAssessmentV19(reason){if(finishV19Running)return;finishV19Running=true;autoExportStarted=true;clearInterval(timerHandle);captureEvidenceFrame();await new Promise(r=>setTimeout(r,250));stopEvidenceCapture();saveCurrent();const end=new Date(),base=safeName((candidateMeta?.rollNumber||state.setId||'assessment')+'-'+(candidateMeta?.fullName||'candidate'));let reportHtml,zipBlob;const progressModal=document.createElement('div');progressModal.className='modal show';progressModal.style.zIndex='2147483647';progressModal.innerHTML=`<div class="setup-card" style="text-align:center;max-width:480px;padding:30px;"><h2 style="margin-top:0;color:var(--blue);">Creating Submission Package</h2><p style="margin:15px 0;font-weight:bold;line-height:1.5;color:var(--text);">Please wait for some minutes.<br>The process of ZIP and HTML report creation is under progress...</p><div style="background:var(--soft);border-radius:10px;height:20px;width:100%;overflow:hidden;margin:20px 0;border:1px solid var(--line);"><div id="exportProgressBar" style="background:var(--blue);width:0%;height:100%;transition:width 0.1s ease;"></div></div><div id="exportProgressPercent" style="font-size:18px;font-weight:bold;color:var(--text);">0%</div></div>`;document.body.appendChild(progressModal);try{reportHtml=completedReportHtmlV19(reason,end);download(new Blob([reportHtml],{type:'text/html;charset=utf-8'}),base+'-completed.html');const evidenceHtml=evidenceHtmlV20(end);download(new Blob([evidenceHtml],{type:'text/html;charset=utf-8'}),base+'-camera-evidence.html');zipBlob=await completedZipBlobV19(reason,end,reportHtml,percent=>{const bar=document.getElementById('exportProgressBar');const txt=document.getElementById('exportProgressPercent');if(bar)bar.style.width=percent+'%';if(txt)txt.textContent=percent+'%'});download(zipBlob,base+'-completed.zip');download(new Blob([instructionTextV19(reason,end)],{type:'text/plain;charset=utf-8'}),base+'-instruction.txt')}catch(e){console.error(e);toast('Export failed: '+e.message);finishV19Running=false;progressModal.remove();return}finally{progressModal.remove()}clearExamSession();localStorage.removeItem(EXAM_EVIDENCE_KEY);if(document.fullscreenElement)document.exitFullscreen().catch(()=>{});document.body.classList.add('submission-complete');const m=$('timeoutModal');m.querySelector('h2').textContent=reason==='timeout'?'Time is out':reason==='escape'?'Assessment ended by Esc':'Assessment finished';m.querySelector('p').textContent=`Share the exported HTML report and ZIP within ${candidateMeta?.submissionMinutes||ownerConfig().submissionMinutes||10} minute(s) to ${candidateMeta?.ownerEmail||ownerConfig().email||'the exam owner email'}.`;const b=m.querySelector('button');b.textContent='Return to Import Screen';b.onclick=()=>location.reload();m.classList.add('show')}
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
async function completedZipBlobV20(reason,end,reportHtml,onProgress){saveCurrent();const zip=new JSZip(),manifest={...state,questions:undefined,questionIds:state.questions.map(x=>x.id),candidate:candidateMeta,completedAt:end.toISOString(),finishReason:reason,submission:true,screenRecording:{file:'screen-recording/exam-screen.mp4',startedAt:screenRecordingStartedAt?.toISOString()||'',endedAt:end.toISOString()}};zip.file('assessment.json',JSON.stringify(manifest,null,2));state.questions.forEach((x,i)=>zip.file(`questions/${String(i+1).padStart(3,'0')}-${x.id}.json`,JSON.stringify(x,null,2)));for(const f of evidenceFrames)zip.file(f.name,f.blob);zip.file('camera-evidence.html',evidenceHtmlV20(end));zip.file('instruction.txt',instructionTextV19(reason,end)+'\nScreen Recording: screen-recording/exam-screen.mp4\nCamera Evidence: camera-evidence.html\n');zip.file('assessment-report.html',reportHtml);if(screenRecordingBlob?.size)zip.file('screen-recording/exam-screen.mp4',screenRecordingBlob);return zip.generateAsync({type:'blob',compression:'DEFLATE',compressionOptions:{level:1}},metadata=>{if(onProgress)onProgress(Math.round(metadata.percent))})}
completedZipBlobV19=completedZipBlobV20;
const finishBeforeV20=finishAssessmentV19;finishAssessmentV20=async function(reason){if(finishV20Running)return;finishV20Running=true;await stopScreenRecordingV20();finishV19Running=false;return finishBeforeV20(reason)};
finishAssessmentV19=finishAssessmentV20;finishAssessmentV18=finishAssessmentV20;finishLockedAssessment=()=>finishAssessmentV20('timeout');$('finishAssessment').onclick=()=>{if(!validCandidateMetaV191()||!candidateRunning)return toast('Start the assessment with candidate details, camera, and screen sharing before finishing');if(confirm('Finish now? This ends the attempt and exports the HTML report, ZIP, instruction file, camera evidence, and screen recording.'))finishAssessmentV20('manual')};



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
  candidateRunning = false;
  assessmentStarted = false;
  candidateSequentialMode = false;
  if (typeof setCandidateToolbarLocked === 'function') setCandidateToolbarLocked(false);
  document.body.classList.remove('candidate-running', 'timer-waiting', 'candidate-sequential-mode');

  try {
    let packet = null;
    try {
      packet = await loadSampleMockData();
    } catch (e) {}
    if (!packet && typeof SAMPLE_MOCK_DATA !== 'undefined' && SAMPLE_MOCK_DATA) {
      packet = JSON.parse(JSON.stringify(SAMPLE_MOCK_DATA));
    }
    if (packet) {
      await handleJsonImport(packet);
      toast('Mock test data loaded successfully!');
    } else {
      toast('Failed to load mock data');
    }
  } catch (err) {
    console.error('Mock data error:', err);
    try {
      if (typeof SAMPLE_MOCK_DATA !== 'undefined' && SAMPLE_MOCK_DATA) {
        await handleJsonImport(JSON.parse(JSON.stringify(SAMPLE_MOCK_DATA)));
        toast('Mock test data loaded successfully!');
      }
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








