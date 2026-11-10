# -*- coding: utf-8 -*-

def get_questions_11_to_20():
    qs = []

    # -------------------------------------------------------------------------
    # Q11: Gearbox Resonance Score
    # -------------------------------------------------------------------------
    q11_html = """<h2>Problem Statement</h2>
<p>A test rig spins a gearbox for <code>N</code> cycles. Each cycle's resonance is determined by the binary representation of its cycle number. For each cycle number <code>K</code> (1 &le; K &le; N), the resonance equals:
<ul>
  <li>the number of trailing zero bits in <code>K</code>, plus</li>
  <li>the number of set bits (1-bits) in <code>K</code>.</li>
</ul>
Your task is to find and return an integer value representing the total resonance summed over all <code>N</code> cycles.</p>
<p><b>Note:</b> The trailing zero bits and set bits are computed using the binary representation of <code>K</code>.</p>
<p><b>Input Specification:</b><br>
A single integer <code>N</code>, representing the number of cycles.
</p>
<p><b>Output Specification:</b><br>
Print an integer value representing the total resonance summed over all <code>N</code> cycles.
</p>
<h3>Example 1:</h3>
<p>
<b>Input:</b><br>
<pre>9</pre>
<b>Output:</b><br>
<pre>22</pre>
<b>Explanation:</b><br>
K=1 (1): trailing 0, set 1 -> 1.<br>
K=2 (10): trailing 1, set 1 -> 2.<br>
K=3 (11): trailing 0, set 2 -> 2.<br>
K=4 (100): trailing 2, set 1 -> 3.<br>
K=5 (101): trailing 0, set 2 -> 2.<br>
K=6 (110): trailing 1, set 2 -> 3.<br>
K=7 (111): trailing 0, set 3 -> 3.<br>
K=8 (1000): trailing 3, set 1 -> 4.<br>
K=9 (1001): trailing 0, set 2 -> 2.<br>
Total = 1 + 2 + 2 + 3 + 2 + 3 + 3 + 4 + 2 = 22.
</p>
<h3>Example 2:</h3>
<p>
<b>Input:</b><br>
<pre>12</pre>
<b>Output:</b><br>
<pre>32</pre>
<b>Explanation:</b><br>
Summing resonance for K = 1 to 12 gives 32.
</p>"""

    q11_py = """import sys

def main():
    tokens = sys.stdin.read().split()
    if not tokens:
        print(0)
        return
    n = int(tokens[0])
    total = 0
    for k in range(1, n + 1):
        tz = (k & -k).bit_length() - 1
        sb = bin(k).count('1')
        total += tz + sb
    print(total)

if __name__ == '__main__':
    main()"""

    q11_c = """#include <stdio.h>

int main(void) {
    int n;
    if (scanf("%d", &n) == 1) {
        long long total = 0;
        for (int k = 1; k <= n; k++) {
            int tz = __builtin_ctz(k);
            int sb = __builtin_popcount(k);
            total += tz + sb;
        }
        printf("%lld\\n", total);
    }
    return 0;
}"""

    q11_cpp = """#include <iostream>

using namespace std;

int main() {
    int n;
    if (cin >> n) {
        long long total = 0;
        for (int k = 1; k <= n; ++k) {
            int tz = 0;
            int temp = k;
            while ((temp & 1) == 0) {
                tz++;
                temp >>= 1;
            }
            int sb = 0;
            temp = k;
            while (temp > 0) {
                if (temp & 1) sb++;
                temp >>= 1;
            }
            total += tz + sb;
        }
        cout << total << endl;
    }
    return 0;
}"""

    q11_tests = [
        {"input": "9", "expected": "22"},
        {"input": "12", "expected": "32"},
        {"input": "1", "expected": "1"},
        {"input": "4", "expected": "8"}
    ]

    qs.append({
        "id": "Q-MV2ANLQ1-9QP2",
        "title": "Question 11: Gearbox Resonance Score",
        "problemHtml": q11_html,
        "py": q11_py,
        "c": q11_c,
        "cpp": q11_cpp,
        "tests": q11_tests
    })

    # -------------------------------------------------------------------------
    # Q12: Beacon Brightest-Digit Tally
    # -------------------------------------------------------------------------
    q12_html = """<h2>Problem Statement</h2>
<p>A network powers beacons with sequential IDs from 1 to <code>N</code>. Each beacon shines as bright as the largest decimal digit of its ID. Beacon <code>i</code> (for <code>i</code> from 1 to <code>N</code>) shines with a brightness equal to the largest decimal digit of <code>i</code>. Your task is to find and return an integer value representing the total brightness summed over all beacon IDs.</p>
<p><b>Note:</b> Brightness of an ID is its maximum decimal digit.</p>
<p><b>Input Specification:</b><br>
A single integer value <code>N</code>, representing the number of beacons.
</p>
<p><b>Output Specification:</b><br>
Print an integer value representing the total brightness summed over all beacon IDs.
</p>
<h3>Example 1:</h3>
<p>
<b>Input:</b><br>
<pre>6</pre>
<b>Output:</b><br>
<pre>21</pre>
<b>Explanation:</b><br>
Beacons 1 to 6 have brightest digits 1, 2, 3, 4, 5, 6.<br>
Total = 1 + 2 + 3 + 4 + 5 + 6 = 21.
</p>
<h3>Example 2:</h3>
<p>
<b>Input:</b><br>
<pre>11</pre>
<b>Output:</b><br>
<pre>47</pre>
<b>Explanation:</b><br>
Beacons 1..9 sum to 45. Beacon 10 has max digit 1, Beacon 11 has max digit 1.<br>
Total = 45 + 1 + 1 = 47.
</p>"""

    q12_py = """import sys

def main():
    tokens = sys.stdin.read().split()
    if not tokens:
        print(0)
        return
    n = int(tokens[0])
    total = sum(max(int(d) for d in str(i)) for i in range(1, n + 1))
    print(total)

if __name__ == '__main__':
    main()"""

    q12_c = """#include <stdio.h>

int max_digit(int x) {
    int m = 0;
    while (x > 0) {
        int d = x % 10;
        if (d > m) m = d;
        x /= 10;
    }
    return m;
}

int main(void) {
    int n;
    if (scanf("%d", &n) == 1) {
        long long total = 0;
        for (int i = 1; i <= n; i++) {
            total += max_digit(i);
        }
        printf("%lld\\n", total);
    }
    return 0;
}"""

    q12_cpp = """#include <iostream>

using namespace std;

int maxDigit(int x) {
    int m = 0;
    while (x > 0) {
        int d = x % 10;
        if (d > m) m = d;
        x /= 10;
    }
    return m;
}

int main() {
    int n;
    if (cin >> n) {
        long long total = 0;
        for (int i = 1; i <= n; ++i) {
            total += maxDigit(i);
        }
        cout << total << endl;
    }
    return 0;
}"""

    q12_tests = [
        {"input": "6", "expected": "21"},
        {"input": "11", "expected": "47"},
        {"input": "1", "expected": "1"},
        {"input": "15", "expected": "61"}
    ]

    qs.append({
        "id": "Q-MV2AQX74-GQKW",
        "title": "Question 12: Beacon Brightest-Digit Tally",
        "problemHtml": q12_html,
        "py": q12_py,
        "c": q12_c,
        "cpp": q12_cpp,
        "tests": q12_tests
    })

    # -------------------------------------------------------------------------
    # Q13: Drum Roll Intensity
    # -------------------------------------------------------------------------
    q13_html = """<h2>Problem Statement</h2>
<p>A drummer strikes pads, and repeated hits on the same pad form a roll whose loudness grows with each consecutive strike. You are given an integer <code>N</code> and a string <code>S</code> of pad letters (loudness: a = 1, b = 2, ..., z = 26). Within a run of the same pad, the multiplier grows:
<ul>
  <li>The 1st consecutive hit counts at 1x</li>
  <li>The 2nd consecutive hit counts at 2x</li>
  <li>The 3rd consecutive hit counts at 3x, and so on.</li>
</ul>
Changing pads resets the multiplier back to 1. Your task is to find and return an integer value representing the total intensity of the whole performance.</p>
<p><b>Note:</b> The run multiplier starts at 1 for the first hit and resets to 1 whenever the pad changes.</p>
<p><b>Input Specification:</b><br>
Line 1: An integer value <code>N</code>, representing the number of hits.<br>
Line 2: A string <code>S</code> representing the pad letters.
</p>
<p><b>Output Specification:</b><br>
Print an integer value representing the total intensity of the whole performance.
</p>
<h3>Example 1:</h3>
<p>
<b>Input:</b><br>
<pre>3
cat</pre>
<b>Output:</b><br>
<pre>24</pre>
<b>Explanation:</b><br>
Pad 'c' (3) * 1 = 3.<br>
Pad 'a' (1) * 1 = 1.<br>
Pad 't' (20) * 1 = 20.<br>
Total = 3 + 1 + 20 = 24.
</p>
<h3>Example 2:</h3>
<p>
<b>Input:</b><br>
<pre>4
bell</pre>
<b>Output:</b><br>
<pre>43</pre>
<b>Explanation:</b><br>
'b' (2) * 1 = 2.<br>
'e' (5) * 1 = 5.<br>
'l' (12) * 1 = 12.<br>
'l' (12) * 2 = 24.<br>
Total = 2 + 5 + 12 + 24 = 43.
</p>"""

    q13_py = """import sys

def main():
    tokens = sys.stdin.read().split()
    if not tokens:
        print(0)
        return
    n = int(tokens[0])
    s = tokens[1] if len(tokens) > 1 else ""
    total = 0
    cur_run = 0
    prev_ch = None
    for ch in s[:n]:
        val = ord(ch) - ord('a') + 1
        if ch == prev_ch:
            cur_run += 1
        else:
            cur_run = 1
            prev_ch = ch
        total += val * cur_run
    print(total)

if __name__ == '__main__':
    main()"""

    q13_c = """#include <stdio.h>
#include <string.h>

int main(void) {
    int n;
    char s[10000];
    if (scanf("%d %s", &n, s) == 2) {
        long long total = 0;
        int cur_run = 0;
        char prev = '\\0';
        for (int i = 0; i < n && s[i] != '\\0'; i++) {
            int val = s[i] - 'a' + 1;
            if (s[i] == prev) {
                cur_run++;
            } else {
                cur_run = 1;
                prev = s[i];
            }
            total += (long long)val * cur_run;
        }
        printf("%lld\\n", total);
    }
    return 0;
}"""

    q13_cpp = """#include <iostream>
#include <string>

using namespace std;

int main() {
    int n;
    string s;
    if (cin >> n >> s) {
        long long total = 0;
        int cur_run = 0;
        char prev = '\\0';
        for (int i = 0; i < n && i < (int)s.length(); ++i) {
            int val = s[i] - 'a' + 1;
            if (s[i] == prev) {
                cur_run++;
            } else {
                cur_run = 1;
                prev = s[i];
            }
            total += (long long)val * cur_run;
        }
        cout << total << endl;
    }
    return 0;
}"""

    q13_tests = [
        {"input": "3\ncat", "expected": "24"},
        {"input": "4\nbell", "expected": "43"},
        {"input": "3\naaa", "expected": "6"},
        {"input": "1\nz", "expected": "26"}
    ]

    qs.append({
        "id": "Q-MV2AT84Q-SWQR",
        "title": "Question 13: Drum Roll Intensity",
        "problemHtml": q13_html,
        "py": q13_py,
        "c": q13_c,
        "cpp": q13_cpp,
        "tests": q13_tests
    })

    # -------------------------------------------------------------------------
    # Q14: Cafe Menu Score
    # -------------------------------------------------------------------------
    q14_html = """<h2>Problem Statement</h2>
<p>A cafe menu string <code>S</code> contains lowercase letters where a = 1, b = 2, ..., z = 26. Each vowel (a, e, i, o, u) scores 3 times its alphabet value, while each consonant scores 1 time its alphabet value. For each character in <code>S</code>, calculate its score and return an integer value representing the total menu score.</p>
<p><b>Note:</b> Only 'a', 'e', 'i', 'o', 'u' are treated as vowels.</p>
<p><b>Input Specification:</b><br>
Line 1: An integer <code>N</code>, representing the length of the menu string.<br>
Line 2: A string <code>S</code> of lowercase menu characters.
</p>
<p><b>Output Specification:</b><br>
Print an integer value representing the total menu score.
</p>
<h3>Example 1:</h3>
<p>
<b>Input:</b><br>
<pre>4
cafe</pre>
<b>Output:</b><br>
<pre>27</pre>
<b>Explanation:</b><br>
'c' is consonant: 3 * 1 = 3.<br>
'a' is vowel: 1 * 3 = 3.<br>
'f' is consonant: 6 * 1 = 6.<br>
'e' is vowel: 5 * 3 = 15.<br>
Total = 3 + 3 + 6 + 15 = 27.
</p>
<h3>Example 2:</h3>
<p>
<b>Input:</b><br>
<pre>3
bee</pre>
<b>Output:</b><br>
<pre>32</pre>
<b>Explanation:</b><br>
'b' (2) + 'e' (15) + 'e' (15) = 32.
</p>"""

    q14_py = """import sys

def main():
    tokens = sys.stdin.read().split()
    if not tokens:
        print(0)
        return
    n = int(tokens[0])
    s = tokens[1] if len(tokens) > 1 else ""
    vowels = set("aeiou")
    total = 0
    for ch in s[:n]:
        val = ord(ch) - ord('a') + 1
        if ch in vowels:
            total += val * 3
        else:
            total += val * 1
    print(total)

if __name__ == '__main__':
    main()"""

    q14_c = """#include <stdio.h>
#include <string.h>

int is_vowel(char c) {
    return c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u';
}

int main(void) {
    int n;
    char s[10000];
    if (scanf("%d %s", &n, s) == 2) {
        long long total = 0;
        for (int i = 0; i < n && s[i] != '\\0'; i++) {
            int val = s[i] - 'a' + 1;
            if (is_vowel(s[i])) {
                total += val * 3;
            } else {
                total += val;
            }
        }
        printf("%lld\\n", total);
    }
    return 0;
}"""

    q14_cpp = """#include <iostream>
#include <string>

using namespace std;

bool isVowel(char c) {
    return c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u';
}

int main() {
    int n;
    string s;
    if (cin >> n >> s) {
        long long total = 0;
        for (int i = 0; i < n && i < (int)s.length(); ++i) {
            int val = s[i] - 'a' + 1;
            if (isVowel(s[i])) {
                total += val * 3;
            } else {
                total += val;
            }
        }
        cout << total << endl;
    }
    return 0;
}"""

    q14_tests = [
        {"input": "4\ncafe", "expected": "27"},
        {"input": "3\nbee", "expected": "32"},
        {"input": "1\na", "expected": "3"},
        {"input": "2\nhi", "expected": "35"}
    ]

    qs.append({
        "id": "Q-MV2AW6TB-O2D0",
        "title": "Question 14: Cafe Menu Score",
        "problemHtml": q14_html,
        "py": q14_py,
        "c": q14_c,
        "cpp": q14_cpp,
        "tests": q14_tests
    })

    # -------------------------------------------------------------------------
    # Q15: Marathon Bib Prime Sum
    # -------------------------------------------------------------------------
    q15_html = """<h2>Problem Statement</h2>
<p>A marathon organizer lists <code>N</code> bib numbers in the order runners cross the finish line. Calculate the sum of bib numbers at prime 0-based indices (2, 3, 5, 7, 11, ...) in the array. Your task is to find and return an integer value representing the prime-index sum.</p>
<p><b>Note:</b> 0 and 1 are not prime numbers. Primes considered are 2, 3, 5, 7, 11, 13, and so on.</p>
<p><b>Input Specification:</b><br>
Line 1: An integer <code>N</code>, representing the number of finishers.<br>
Line 2: <code>N</code> space-separated integers representing the bib numbers <code>B</code>.
</p>
<p><b>Output Specification:</b><br>
Print an integer value representing the prime-index sum.
</p>
<h3>Example 1:</h3>
<p>
<b>Input:</b><br>
<pre>6
10 20 30 40 50 60</pre>
<b>Output:</b><br>
<pre>130</pre>
<b>Explanation:</b><br>
Prime indices in range 0..5 are 2, 3, 5.<br>
B[2] = 30, B[3] = 40, B[5] = 60.<br>
Sum = 30 + 40 + 60 = 130.
</p>
<h3>Example 2:</h3>
<p>
<b>Input:</b><br>
<pre>4
7 7 7 7</pre>
<b>Output:</b><br>
<pre>14</pre>
<b>Explanation:</b><br>
Prime indices in range 0..3 are 2 and 3.<br>
B[2] = 7, B[3] = 7 -> Sum = 7 + 7 = 14.
</p>"""

    q15_py = """import sys

def is_prime(x):
    if x < 2:
        return False
    d = 2
    while d * d <= x:
        if x % d == 0:
            return False
        d += 1
    return True

def main():
    tokens = sys.stdin.read().split()
    if not tokens:
        print(0)
        return
    n = int(tokens[0])
    b = list(map(int, tokens[1:1+n]))
    total = sum(b[i] for i in range(len(b)) if is_prime(i))
    print(total)

if __name__ == '__main__':
    main()"""

    q15_c = """#include <stdio.h>
#include <stdbool.h>

bool is_prime(int x) {
    if (x < 2) return false;
    for (int d = 2; (long long)d * d <= x; d++) {
        if (x % d == 0) return false;
    }
    return true;
}

int main(void) {
    int n;
    if (scanf("%d", &n) == 1) {
        long long total = 0;
        for (int i = 0; i < n; i++) {
            int bib;
            scanf("%d", &bib);
            if (is_prime(i)) {
                total += bib;
            }
        }
        printf("%lld\\n", total);
    }
    return 0;
}"""

    q15_cpp = """#include <iostream>

using namespace std;

bool isPrime(int x) {
    if (x < 2) return false;
    for (long long d = 2; d * d <= x; ++d) {
        if (x % d == 0) return false;
    }
    return true;
}

int main() {
    int n;
    if (cin >> n) {
        long long total = 0;
        for (int i = 0; i < n; ++i) {
            int bib;
            cin >> bib;
            if (isPrime(i)) {
                total += bib;
            }
        }
        cout << total << endl;
    }
    return 0;
}"""

    q15_tests = [
        {"input": "6\n10 20 30 40 50 60", "expected": "130"},
        {"input": "4\n7 7 7 7", "expected": "14"},
        {"input": "2\n100 200", "expected": "0"},
        {"input": "3\n5 10 15", "expected": "15"}
    ]

    qs.append({
        "id": "Q-MV2AXJTV-PJC2",
        "title": "Question 15: Marathon Bib Prime Sum",
        "problemHtml": q15_html,
        "py": q15_py,
        "c": q15_c,
        "cpp": q15_cpp,
        "tests": q15_tests
    })

    # -------------------------------------------------------------------------
    # Q16: Diver Oxygen Check
    # -------------------------------------------------------------------------
    q16_html = """<h2>Problem Statement</h2>
<p>A diver takes <code>N</code> depth readings during descent. Given a target safe depth <code>D</code>, each reading <code>r</code> contributes <code>D - |r - D|</code> to the total reward. Readings equal to <code>D</code> give the maximum reward <code>D</code>, and readings that deviate more than <code>D</code> contribute a negative amount. Your task is to find and return an integer value representing the total reward across all readings.</p>
<p><b>Note:</b> The contribution for a reading <code>r</code> is <code>D - |r - D|</code>. It can be negative when <code>|r - D| > D</code>.</p>
<p><b>Input Specification:</b><br>
Line 1: An integer <code>N</code>, representing the number of readings.<br>
Line 2: <code>N</code> space-separated integers representing depth readings <code>R</code>.<br>
Line 3: An integer <code>D</code>, representing the target depth.
</p>
<p><b>Output Specification:</b><br>
Print an integer value representing the total reward across all readings.
</p>
<h3>Example 1:</h3>
<p>
<b>Input:</b><br>
<pre>3
10 12 14
12</pre>
<b>Output:</b><br>
<pre>32</pre>
<b>Explanation:</b><br>
Reading 10: 12 - |10 - 12| = 10.<br>
Reading 12: 12 - |12 - 12| = 12.<br>
Reading 14: 12 - |14 - 12| = 10.<br>
Total reward = 10 + 12 + 10 = 32.
</p>
<h3>Example 2:</h3>
<p>
<b>Input:</b><br>
<pre>2
5 20
10</pre>
<b>Output:</b><br>
<pre>5</pre>
<b>Explanation:</b><br>
Reading 5: 10 - |5 - 10| = 5.<br>
Reading 20: 10 - |20 - 10| = 0.<br>
Total reward = 5 + 0 = 5.
</p>"""

    q16_py = """import sys

def main():
    tokens = sys.stdin.read().split()
    if not tokens:
        print(0)
        return
    n = int(tokens[0])
    r = list(map(int, tokens[1:1+n]))
    d = int(tokens[1+n])
    total = sum(d - abs(x - d) for x in r)
    print(total)

if __name__ == '__main__':
    main()"""

    q16_c = """#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int r[10000];
    for (int i = 0; i < n; i++) scanf("%d", &r[i]);
    int d;
    scanf("%d", &d);
    long long total = 0;
    for (int i = 0; i < n; i++) {
        total += d - abs(r[i] - d);
    }
    printf("%lld\\n", total);
    return 0;
}"""

    q16_cpp = """#include <iostream>
#include <vector>
#include <cmath>

using namespace std;

int main() {
    int n;
    if (cin >> n) {
        vector<int> r(n);
        for (int i = 0; i < n; ++i) cin >> r[i];
        int d;
        cin >> d;
        long long total = 0;
        for (int x : r) {
            total += d - abs(x - d);
        }
        cout << total << endl;
    }
    return 0;
}"""

    q16_tests = [
        {"input": "3\n10 12 14\n12", "expected": "32"},
        {"input": "2\n5 20\n10", "expected": "5"},
        {"input": "1\n50\n10", "expected": "-30"},
        {"input": "2\n15 15\n15", "expected": "30"}
    ]

    qs.append({
        "id": "Q-MV2AZ7FP-A5ZH",
        "title": "Question 16: Diver Oxygen Check",
        "problemHtml": q16_html,
        "py": q16_py,
        "c": q16_c,
        "cpp": q16_cpp,
        "tests": q16_tests
    })

    # -------------------------------------------------------------------------
    # Q17: Email Spam Flag
    # -------------------------------------------------------------------------
    q17_html = """<h2>Problem Statement</h2>
<p>Given a message string <code>S</code> and a forbidden single-character letter <code>L</code>, scan the first <code>N</code> characters of <code>S</code>. For every 0-based index <code>i</code> where <code>S[i]</code> equals <code>L</code>, add <code>(i + 1)</code> to the running spam score. Your task is to find and return an integer value representing the total spam score.</p>
<p><b>Note:</b> Only the first <code>N</code> characters of <code>S</code> are inspected.</p>
<p><b>Input Specification:</b><br>
Line 1: An integer <code>N</code>, representing the prefix length to inspect.<br>
Line 2: A string <code>S</code> representing the message.<br>
Line 3: A single-character string <code>L</code> representing the forbidden letter.
</p>
<p><b>Output Specification:</b><br>
Print an integer value representing the total spam score.
</p>
<h3>Example 1:</h3>
<p>
<b>Input:</b><br>
<pre>5
abacada
a</pre>
<b>Output:</b><br>
<pre>9</pre>
<b>Explanation:</b><br>
Prefix of length 5 is "abaca".<br>
Index 0 ('a'): +1.<br>
Index 2 ('a'): +3.<br>
Index 4 ('a'): +5.<br>
Total = 1 + 3 + 5 = 9.
</p>
<h3>Example 2:</h3>
<p>
<b>Input:</b><br>
<pre>4
banana
n</pre>
<b>Output:</b><br>
<pre>3</pre>
<b>Explanation:</b><br>
Prefix of length 4 is "bana".<br>
Index 2 ('n'): +3.<br>
Total = 3.
</p>"""

    q17_py = """import sys

def main():
    tokens = sys.stdin.read().split()
    if len(tokens) < 3:
        print(0)
        return
    n = int(tokens[0])
    s = tokens[1]
    l = tokens[2]
    total = 0
    target = l[0]
    for i in range(min(n, len(s))):
        if s[i] == target:
            total += i + 1
    print(total)

if __name__ == '__main__':
    main()"""

    q17_c = """#include <stdio.h>
#include <string.h>

int main(void) {
    int n;
    char s[10000], l[100];
    if (scanf("%d %s %s", &n, s, l) == 3) {
        long long total = 0;
        char target = l[0];
        int len = strlen(s);
        for (int i = 0; i < n && i < len; i++) {
            if (s[i] == target) {
                total += i + 1;
            }
        }
        printf("%lld\\n", total);
    }
    return 0;
}"""

    q17_cpp = """#include <iostream>
#include <string>

using namespace std;

int main() {
    int n;
    string s, l;
    if (cin >> n >> s >> l) {
        long long total = 0;
        char target = l[0];
        for (int i = 0; i < n && i < (int)s.length(); ++i) {
            if (s[i] == target) {
                total += i + 1;
            }
        }
        cout << total << endl;
    }
    return 0;
}"""

    q17_tests = [
        {"input": "5\nabacada\na", "expected": "9"},
        {"input": "4\nbanana\nn", "expected": "3"},
        {"input": "3\nxyz\na", "expected": "0"},
        {"input": "3\naaa\na", "expected": "6"}
    ]

    qs.append({
        "id": "Q-MV2B1DAA-KI88",
        "title": "Question 17: Email Spam Flag",
        "problemHtml": q17_html,
        "py": q17_py,
        "c": q17_c,
        "cpp": q17_cpp,
        "tests": q17_tests
    })

    # -------------------------------------------------------------------------
    # Q18: Robot Charge Deltas
    # -------------------------------------------------------------------------
    q18_html = """<h2>Problem Statement</h2>
<p>A robot records its battery level across multiple steps in an integer array <code>B</code>, where <code>B[i]</code> represents the battery level recorded at step <code>i</code>. A boost is registered at index <code>i</code> (<code>i &ge; 1</code>) if the difference <code>B[i] - B[i - 1]</code> is strictly greater than the threshold <code>D</code>. Your task is to find and return an integer value representing the total number of boosts registered.</p>
<p><b>Note:</b> Only differences strictly greater than <code>D</code> are considered boosts. Index 0 cannot be a boost since it has no previous battery level for comparison.</p>
<p><b>Input Specification:</b><br>
Line 1: An integer <code>D</code>, representing the boost delta threshold.<br>
Line 2: Space-separated integers representing the battery readings <code>B</code>.
</p>
<p><b>Output Specification:</b><br>
Print an integer value representing the total number of boosts registered.
</p>
<h3>Example 1:</h3>
<p>
<b>Input:</b><br>
<pre>3
10 15 14 25</pre>
<b>Output:</b><br>
<pre>2</pre>
<b>Explanation:</b><br>
B[1] - B[0] = 15 - 10 = 5 > 3 -> Boost registered.<br>
B[2] - B[1] = 14 - 15 = -1 <= 3 -> No boost.<br>
B[3] - B[2] = 25 - 14 = 11 > 3 -> Boost registered.<br>
Total boosts = 2.
</p>
<h3>Example 2:</h3>
<p>
<b>Input:</b><br>
<pre>5
20 22 28 29</pre>
<b>Output:</b><br>
<pre>1</pre>
<b>Explanation:</b><br>
22 - 20 = 2 <= 5.<br>
28 - 22 = 6 > 5 -> Boost registered.<br>
29 - 28 = 1 <= 5.<br>
Total boosts = 1.
</p>"""

    q18_py = """import sys

def main():
    tokens = sys.stdin.read().split()
    if len(tokens) < 2:
        print(0)
        return
    d = int(tokens[0])
    b = list(map(int, tokens[1:]))
    boosts = 0
    for i in range(1, len(b)):
        if b[i] - b[i-1] > d:
            boosts += 1
    print(boosts)

if __name__ == '__main__':
    main()"""

    q18_c = """#include <stdio.h>

int main(void) {
    int d;
    if (scanf("%d", &d) != 1) return 0;
    int prev;
    if (scanf("%d", &prev) != 1) {
        printf("0\\n");
        return 0;
    }
    int curr, boosts = 0;
    while (scanf("%d", &curr) == 1) {
        if (curr - prev > d) {
            boosts++;
        }
        prev = curr;
    }
    printf("%d\\n", boosts);
    return 0;
}"""

    q18_cpp = """#include <iostream>

using namespace std;

int main() {
    int d;
    if (!(cin >> d)) return 0;
    int prev;
    if (!(cin >> prev)) {
        cout << 0 << endl;
        return 0;
    }
    int curr, boosts = 0;
    while (cin >> curr) {
        if (curr - prev > d) {
            boosts++;
        }
        prev = curr;
    }
    cout << boosts << endl;
    return 0;
}"""

    q18_tests = [
        {"input": "3\n10 15 14 25", "expected": "2"},
        {"input": "5\n20 22 28 29", "expected": "1"},
        {"input": "10\n1 2 3", "expected": "0"},
        {"input": "2\n10 20 30", "expected": "2"}
    ]

    qs.append({
        "id": "Q-MV2B30ZG-SF1Q",
        "title": "Question 18: Robot Charge Deltas",
        "problemHtml": q18_html,
        "py": q18_py,
        "c": q18_c,
        "cpp": q18_cpp,
        "tests": q18_tests
    })

    # -------------------------------------------------------------------------
    # Q19: Ferry Load Balance
    # -------------------------------------------------------------------------
    q19_html = """<h2>Problem Statement</h2>
<p>A ferry loads <code>N</code> cars in the order they arrive. The first <code>N / 2</code> cars (using integer division) are placed on the left side, and the remaining cars are placed on the right side. Your task is to find and return an integer value representing the absolute difference between the left and right total weights.</p>
<p><b>Note:</b> <code>N / 2</code> uses integer division, so the right side will have one more car when <code>N</code> is odd.</p>
<p><b>Input Specification:</b><br>
Line 1: An integer <code>N</code>, representing the number of cars.<br>
Line 2: <code>N</code> space-separated integers representing the car weights <code>W</code> in arrival order.
</p>
<p><b>Output Specification:</b><br>
Print an integer value representing the absolute difference between the left and right total weights.
</p>
<h3>Example 1:</h3>
<p>
<b>Input:</b><br>
<pre>4
10 20 30 40</pre>
<b>Output:</b><br>
<pre>40</pre>
<b>Explanation:</b><br>
Split point = 4 // 2 = 2.<br>
Left side = [10, 20], sum = 30.<br>
Right side = [30, 40], sum = 70.<br>
Absolute difference = |30 - 70| = 40.
</p>
<h3>Example 2:</h3>
<p>
<b>Input:</b><br>
<pre>5
5 5 5 5 5</pre>
<b>Output:</b><br>
<pre>5</pre>
<b>Explanation:</b><br>
Split point = 5 // 2 = 2.<br>
Left side = [5, 5], sum = 10.<br>
Right side = [5, 5, 5], sum = 15.<br>
Absolute difference = |10 - 15| = 5.
</p>"""

    q19_py = """import sys

def main():
    tokens = sys.stdin.read().split()
    if not tokens:
        print(0)
        return
    n = int(tokens[0])
    w = list(map(int, tokens[1:1+n]))
    mid = n // 2
    left = sum(w[:mid])
    right = sum(w[mid:])
    print(abs(left - right))

if __name__ == '__main__':
    main()"""

    q19_c = """#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int mid = n / 2;
    long long left = 0, right = 0;
    for (int i = 0; i < n; i++) {
        int weight;
        scanf("%d", &weight);
        if (i < mid) {
            left += weight;
        } else {
            right += weight;
        }
    }
    long long diff = left - right;
    if (diff < 0) diff = -diff;
    printf("%lld\\n", diff);
    return 0;
}"""

    q19_cpp = """#include <iostream>
#include <cmath>

using namespace std;

int main() {
    int n;
    if (cin >> n) {
        int mid = n / 2;
        long long left = 0, right = 0;
        for (int i = 0; i < n; ++i) {
            int weight;
            cin >> weight;
            if (i < mid) {
                left += weight;
            } else {
                right += weight;
            }
        }
        cout << abs(left - right) << endl;
    }
    return 0;
}"""

    q19_tests = [
        {"input": "4\n10 20 30 40", "expected": "40"},
        {"input": "5\n5 5 5 5 5", "expected": "5"},
        {"input": "2\n10 10", "expected": "0"},
        {"input": "1\n50", "expected": "50"}
    ]

    qs.append({
        "id": "Q-MV2B4HT3-DUBS",
        "title": "Question 19: Ferry Load Balance",
        "problemHtml": q19_html,
        "py": q19_py,
        "c": q19_c,
        "cpp": q19_cpp,
        "tests": q19_tests
    })

    # -------------------------------------------------------------------------
    # Q20: Fire Drill Last Group Size
    # -------------------------------------------------------------------------
    q20_html = """<h2>Problem Statement</h2>
<p>A fire drill divides <code>N</code> people into groups of size <code>G</code>. If <code>N</code> is not a multiple of <code>G</code>, the last group contains the leftover people. If <code>N</code> is a multiple of <code>G</code>, the last group contains <code>G</code> people. Your task is to find and return an integer value representing the size of the last group.</p>
<p><b>Note:</b> If <code>N</code> is a perfect multiple of <code>G</code>, the last group contains exactly <code>G</code> people.</p>
<p><b>Input Specification:</b><br>
Line 1: An integer <code>N</code>, representing the total number of people.<br>
Line 2: An integer <code>G</code>, representing the group size.
</p>
<p><b>Output Specification:</b><br>
Print an integer value representing the size of the last group.
</p>
<h3>Example 1:</h3>
<p>
<b>Input:</b><br>
<pre>10
3</pre>
<b>Output:</b><br>
<pre>1</pre>
<b>Explanation:</b><br>
Dividing 10 people into groups of 3 gives [3][3][3][1]: three complete groups and 1 leftover person.<br>
10 % 3 = 1 -> Last group has 1 person.
</p>
<h3>Example 2:</h3>
<p>
<b>Input:</b><br>
<pre>12
4</pre>
<b>Output:</b><br>
<pre>4</pre>
<b>Explanation:</b><br>
12 is a perfect multiple of 4: groups are [4][4][4] with no leftover.<br>
Last group has G = 4 people.
</p>"""

    q20_py = """import sys

def main():
    tokens = sys.stdin.read().split()
    if not tokens:
        print(0)
        return
    n = int(tokens[0])
    g = int(tokens[1])
    rem = n % g
    print(g if rem == 0 else rem)

if __name__ == '__main__':
    main()"""

    q20_c = """#include <stdio.h>

int main(void) {
    long long n, g;
    if (scanf("%lld %lld", &n, &g) == 2) {
        long long rem = n % g;
        printf("%lld\\n", (rem == 0) ? g : rem);
    }
    return 0;
}"""

    q20_cpp = """#include <iostream>

using namespace std;

int main() {
    long long n, g;
    if (cin >> n >> g) {
        long long rem = n % g;
        cout << ((rem == 0) ? g : rem) << endl;
    }
    return 0;
}"""

    q20_tests = [
        {"input": "10\n3", "expected": "1"},
        {"input": "12\n4", "expected": "4"},
        {"input": "5\n5", "expected": "5"},
        {"input": "7\n4", "expected": "3"}
    ]

    qs.append({
        "id": "Q-MV2B6HWY-AGMO",
        "title": "Question 20: Fire Drill Last Group Size",
        "problemHtml": q20_html,
        "py": q20_py,
        "c": q20_c,
        "cpp": q20_cpp,
        "tests": q20_tests
    })

    return qs
