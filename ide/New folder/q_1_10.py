# -*- coding: utf-8 -*-

def get_questions_1_to_10():
    qs = []
    
    # -------------------------------------------------------------------------
    # Q1: Membership Spend Reward
    # -------------------------------------------------------------------------
    q1_html = """<h2>Problem Statement</h2>
<p>A store rewards purchases that meet a spend threshold, weighting each qualifying purchase by its 1-based position. A purchase at 1-based position <code>p</code> qualifies if its amount is at least <code>K</code>, and then earns <code>p</code> multiplied by its amount. Your task is to find and return an integer value representing the total reward over all qualifying purchases.</p>
<p><b>Note:</b> Purchases strictly below the threshold earn nothing.</p>
<p><b>Input Specification:</b><br>
Line 1: Space-separated integers representing the array <code>A</code> (purchase amounts).<br>
Line 2: An integer <code>K</code>, representing the spend threshold.
</p>
<p><b>Output Specification:</b><br>
Print an integer value representing the total reward over all qualifying purchases.
</p>
<h3>Example 1:</h3>
<p>
<b>Input:</b><br>
<pre>8 3 12 7
6</pre>
<b>Output:</b><br>
<pre>72</pre>
<b>Explanation:</b><br>
Position 1, amount 8 >= 6: add 1 * 8 = 8.<br>
Position 2, amount 3 < 6: skipped.<br>
Position 3, amount 12 >= 6: add 3 * 12 = 36.<br>
Position 4, amount 7 >= 6: add 4 * 7 = 28.<br>
Total reward = 8 + 36 + 28 = 72.
</p>
<h3>Example 2:</h3>
<p>
<b>Input:</b><br>
<pre>5 11 4 9 2 14
8</pre>
<b>Output:</b><br>
<pre>142</pre>
<b>Explanation:</b><br>
For K = 8: Position 2 (11 >= 8) -> 2 * 11 = 22; Position 4 (9 >= 8) -> 4 * 9 = 36; Position 6 (14 >= 8) -> 6 * 14 = 84.<br>
Total reward = 22 + 36 + 84 = 142.
</p>"""

    q1_py = """import sys

def main():
    tokens = sys.stdin.read().split()
    if not tokens:
        print(0)
        return
    k = int(tokens[-1])
    a = list(map(int, tokens[:-1]))
    total = 0
    for p, val in enumerate(a, start=1):
        if val >= k:
            total += p * val
    print(total)

if __name__ == '__main__':
    main()"""

    q1_c = """#include <stdio.h>

int main(void) {
    int a[10000];
    int n = 0, val;
    while (scanf("%d", &val) == 1) {
        a[n++] = val;
    }
    if (n < 2) {
        printf("0\\n");
        return 0;
    }
    int k = a[--n];
    long long total = 0;
    for (int i = 0; i < n; i++) {
        if (a[i] >= k) {
            total += (long long)(i + 1) * a[i];
        }
    }
    printf("%lld\\n", total);
    return 0;
}"""

    q1_cpp = """#include <iostream>
#include <vector>

using namespace std;

int main() {
    vector<int> all;
    int val;
    while (cin >> val) {
        all.push_back(val);
    }
    if (all.size() < 2) {
        cout << 0 << endl;
        return 0;
    }
    int k = all.back();
    all.pop_back();
    long long total = 0;
    for (size_t i = 0; i < all.size(); ++i) {
        if (all[i] >= k) {
            total += (long long)(i + 1) * all[i];
        }
    }
    cout << total << endl;
    return 0;
}"""

    q1_tests = [
        {"input": "8 3 12 7\n6", "expected": "72"},
        {"input": "5 11 4 9 2 14\n8", "expected": "142"},
        {"input": "2 3 4\n10", "expected": "0"},
        {"input": "10 20 30\n5", "expected": "140"}
    ]

    qs.append({
        "id": "Q-MV29WLF3-K20K",
        "title": "Question 1: Membership Spend Reward",
        "problemHtml": q1_html,
        "py": q1_py,
        "c": q1_c,
        "cpp": q1_cpp,
        "tests": q1_tests
    })

    # -------------------------------------------------------------------------
    # Q2: Cab Fare Prime Loyalty Bonus
    # -------------------------------------------------------------------------
    q2_html = """<h2>Problem Statement</h2>
<p>A rideshare app rewards the first few trips whose fare happens to be a prime number with a loyalty bonus. You are given an integer <code>K</code>, an integer <code>N</code>, and an integer array <code>A</code> of trip fares in order. The total is the sum of all fares plus, scanning in order, a bonus equal to the fare for each of the first <code>K</code> fares that are prime.</p>
<p><b>Note:</b> At most <code>K</code> bonuses are awarded, granted to the earliest qualifying prime fares. Fares 0 and 1 are not prime numbers.</p>
<p><b>Input Specification:</b><br>
Line 1: An integer value <code>K</code>, representing the bonus cap.<br>
Line 2: An integer value <code>N</code>, representing the number of trips.<br>
Line 3: <code>N</code> space-separated integers representing array <code>A</code> (the trip fares).
</p>
<p><b>Output Specification:</b><br>
Print an integer value representing the total amount (all fares plus up to <code>K</code> prime-fare bonuses).
</p>
<h3>Example 1:</h3>
<p>
<b>Input:</b><br>
<pre>2
3
4 7 13</pre>
<b>Output:</b><br>
<pre>44</pre>
<b>Explanation:</b><br>
Base total = 4 + 7 + 13 = 24.<br>
Scan fares in order with bonus cap K = 2:<br>
- 4 is not prime -> no bonus<br>
- 7 is prime and bonus slot 1/2 is free -> add bonus 7<br>
- 13 is prime and bonus slot 2/2 is free -> add bonus 13<br>
Total = 24 + 7 + 13 = 44.
</p>
<h3>Example 2:</h3>
<p>
<b>Input:</b><br>
<pre>2
4
3 5 8 7</pre>
<b>Output:</b><br>
<pre>31</pre>
<b>Explanation:</b><br>
Base total = 3 + 5 + 8 + 7 = 23.<br>
- 3 is prime (slot 1/2) -> add bonus 3<br>
- 5 is prime (slot 2/2) -> add bonus 5<br>
- 8 is not prime -> no bonus<br>
- 7 is prime, but cap K = 2 is reached -> no bonus<br>
Total = 23 + 3 + 5 = 31.
</p>"""

    q2_py = """import sys

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
    k = int(tokens[0])
    n = int(tokens[1])
    a = list(map(int, tokens[2:2+n]))
    total = sum(a)
    primes_found = 0
    for fare in a:
        if primes_found < k and is_prime(fare):
            total += fare
            primes_found += 1
    print(total)

if __name__ == '__main__':
    main()"""

    q2_c = """#include <stdio.h>
#include <stdbool.h>

bool is_prime(int x) {
    if (x < 2) return false;
    for (int d = 2; (long long)d * d <= x; d++) {
        if (x % d == 0) return false;
    }
    return true;
}

int main(void) {
    int k, n;
    if (scanf("%d %d", &k, &n) != 2) return 0;
    long long total = 0;
    int primes_found = 0;
    for (int i = 0; i < n; i++) {
        int fare;
        scanf("%d", &fare);
        total += fare;
        if (primes_found < k && is_prime(fare)) {
            total += fare;
            primes_found++;
        }
    }
    printf("%lld\\n", total);
    return 0;
}"""

    q2_cpp = """#include <iostream>
#include <vector>

using namespace std;

bool isPrime(int x) {
    if (x < 2) return false;
    for (long long d = 2; d * d <= x; ++d) {
        if (x % d == 0) return false;
    }
    return true;
}

int main() {
    int k, n;
    if (!(cin >> k >> n)) return 0;
    long long total = 0;
    int primes_found = 0;
    for (int i = 0; i < n; ++i) {
        int fare;
        cin >> fare;
        total += fare;
        if (primes_found < k && isPrime(fare)) {
            total += fare;
            primes_found++;
        }
    }
    cout << total << endl;
    return 0;
}"""

    q2_tests = [
        {"input": "2\n3\n4 7 13", "expected": "44"},
        {"input": "2\n4\n3 5 8 7", "expected": "31"},
        {"input": "0\n3\n2 3 5", "expected": "10"},
        {"input": "5\n4\n1 4 6 8", "expected": "19"}
    ]

    qs.append({
        "id": "Q-MV2A1Z7Z-5BVV",
        "title": "Question 2: Cab Fare Prime Loyalty Bonus",
        "problemHtml": q2_html,
        "py": q2_py,
        "c": q2_c,
        "cpp": q2_cpp,
        "tests": q2_tests
    })

    # -------------------------------------------------------------------------
    # Q3: Shipping-Label Shift
    # -------------------------------------------------------------------------
    q3_html = """<h2>Problem Statement</h2>
<p>A depot relabels shipping labels by shifting each lowercase letter forward in the alphabet according to its 0-based position in the string. You are given a string <code>S</code> of lowercase letters. Replace each character at position <code>i</code> (0-based) by shifting it forward by <code>i + 1</code> positions in the alphabet, wrapping around from 'z' back to 'a'. Your task is to find and return a string representing the relabeled string.</p>
<p><b>Note:</b> The character at 0-based position <code>i</code> is shifted forward by <code>i + 1</code> positions.</p>
<p><b>Input Specification:</b><br>
A single line containing the string <code>S</code> of lowercase label characters.
</p>
<p><b>Output Specification:</b><br>
Print a string representing the relabeled string.
</p>
<h3>Example 1:</h3>
<p>
<b>Input:</b><br>
<pre>cab</pre>
<b>Output:</b><br>
<pre>dce</pre>
<b>Explanation:</b><br>
Position 0: 'c' shifted by 1 -> 'd'.<br>
Position 1: 'a' shifted by 2 -> 'c'.<br>
Position 2: 'b' shifted by 3 -> 'e'.<br>
Result = "dce".
</p>
<h3>Example 2:</h3>
<p>
<b>Input:</b><br>
<pre>tide</pre>
<b>Output:</b><br>
<pre>ukgi</pre>
<b>Explanation:</b><br>
Position 0: 't' shifted by 1 -> 'u'.<br>
Position 1: 'i' shifted by 2 -> 'k'.<br>
Position 2: 'd' shifted by 3 -> 'g'.<br>
Position 3: 'e' shifted by 4 -> 'i'.<br>
Result = "ukgi".
</p>"""

    q3_py = """import sys

def main():
    s = sys.stdin.read().strip()
    if not s:
        print("")
        return
    res = []
    for i, ch in enumerate(s):
        base = ord(ch) - ord('a')
        shifted = (base + (i + 1)) % 26
        res.append(chr(ord('a') + shifted))
    print("".join(res))

if __name__ == '__main__':
    main()"""

    q3_c = """#include <stdio.h>
#include <string.h>

int main(void) {
    char s[10000];
    if (scanf("%s", s) == 1) {
        int len = strlen(s);
        for (int i = 0; i < len; i++) {
            int base = s[i] - 'a';
            int shifted = (base + (i + 1)) % 26;
            s[i] = (char)('a' + shifted);
        }
        printf("%s\\n", s);
    }
    return 0;
}"""

    q3_cpp = """#include <iostream>
#include <string>

using namespace std;

int main() {
    string s;
    if (cin >> s) {
        for (size_t i = 0; i < s.length(); ++i) {
            int base = s[i] - 'a';
            int shifted = (base + (int)(i + 1)) % 26;
            s[i] = (char)('a' + shifted);
        }
        cout << s << endl;
    }
    return 0;
}"""

    q3_tests = [
        {"input": "cab", "expected": "dce"},
        {"input": "tide", "expected": "ukgi"},
        {"input": "z", "expected": "a"},
        {"input": "xyz", "expected": "yac"}
    ]

    qs.append({
        "id": "Q-MV2A4G6A-LLTL",
        "title": "Question 3: Shipping-Label Shift",
        "problemHtml": q3_html,
        "py": q3_py,
        "c": q3_c,
        "cpp": q3_cpp,
        "tests": q3_tests
    })

    # -------------------------------------------------------------------------
    # Q4: SpectrumExpansionCipher
    # -------------------------------------------------------------------------
    q4_html = """<h2>Problem Statement</h2>
<p>A radio encoder shifts each character further along the alphabet as the set of distinct characters seen increases. You are given a string <code>S</code> of lowercase letters. Reading from left to right, each character is shifted forward by the number of distinct letters seen so far (including the current one), wrapping from 'z' back to 'a'. Your task is to find and return a string representing the encoded string.</p>
<p><b>Note:</b> The shift grows by one each time a brand-new letter first appears.</p>
<p><b>Input Specification:</b><br>
A single line containing the string <code>S</code> to encode.
</p>
<p><b>Output Specification:</b><br>
Print a string representing the encoded string.
</p>
<h3>Example 1:</h3>
<p>
<b>Input:</b><br>
<pre>gvmug</pre>
<b>Output:</b><br>
<pre>hxpyk</pre>
<b>Explanation:</b><br>
Position 1 ('g'): distinct seen so far = 1 -> 'g' + 1 = 'h'.<br>
Position 2 ('v'): distinct seen so far = 2 -> 'v' + 2 = 'x'.<br>
Position 3 ('m'): distinct seen so far = 3 -> 'm' + 3 = 'p'.<br>
Position 4 ('u'): distinct seen so far = 4 -> 'u' + 4 = 'y'.<br>
Position 5 ('g'): distinct seen so far = 4 -> 'g' + 4 = 'k'.<br>
Encoded string = "hxpyk".
</p>
<h3>Example 2:</h3>
<p>
<b>Input:</b><br>
<pre>haytjmv</pre>
<b>Output:</b><br>
<pre>icbxosc</pre>
<b>Explanation:</b><br>
S = "haytjmv":<br>
Position 1 ('h'): distinct = 1 -> 'i'.<br>
Position 2 ('a'): distinct = 2 -> 'c'.<br>
Position 3 ('y'): distinct = 3 -> 'b'.<br>
Position 4 ('t'): distinct = 4 -> 'x'.<br>
Position 5 ('j'): distinct = 5 -> 'o'.<br>
Position 6 ('m'): distinct = 6 -> 's'.<br>
Position 7 ('v'): distinct = 7 -> 'c'.<br>
Result = "icbxosc".
</p>"""

    q4_py = """import sys

def main():
    s = sys.stdin.read().strip()
    if not s:
        print("")
        return
    seen = set()
    res = []
    for ch in s:
        seen.add(ch)
        shift = len(seen)
        base = ord(ch) - ord('a')
        res.append(chr(ord('a') + (base + shift) % 26))
    print("".join(res))

if __name__ == '__main__':
    main()"""

    q4_c = """#include <stdio.h>
#include <string.h>

int main(void) {
    char s[10000];
    if (scanf("%s", s) == 1) {
        int seen[26] = {0};
        int distinct = 0;
        int len = strlen(s);
        for (int i = 0; i < len; i++) {
            int idx = s[i] - 'a';
            if (!seen[idx]) {
                seen[idx] = 1;
                distinct++;
            }
            int shifted = (idx + distinct) % 26;
            s[i] = (char)('a' + shifted);
        }
        printf("%s\\n", s);
    }
    return 0;
}"""

    q4_cpp = """#include <iostream>
#include <string>
#include <vector>

using namespace std;

int main() {
    string s;
    if (cin >> s) {
        vector<bool> seen(26, false);
        int distinct = 0;
        for (char &c : s) {
            int idx = c - 'a';
            if (!seen[idx]) {
                seen[idx] = true;
                distinct++;
            }
            c = (char)('a' + (idx + distinct) % 26);
        }
        cout << s << endl;
    }
    return 0;
}"""

    q4_tests = [
        {"input": "gvmug", "expected": "hxpyk"},
        {"input": "haytjmv", "expected": "icbxosc"},
        {"input": "aaaa", "expected": "bbbb"},
        {"input": "abc", "expected": "bdf"}
    ]

    qs.append({
        "id": "Q-MV2A65RR-NJTR",
        "title": "Question 4: SpectrumExpansionCipher",
        "problemHtml": q4_html,
        "py": q4_py,
        "c": q4_c,
        "cpp": q4_cpp,
        "tests": q4_tests
    })

    # -------------------------------------------------------------------------
    # Q5: Conveyor Surge Settling Score
    # -------------------------------------------------------------------------
    q5_html = """<h2>Problem Statement</h2>
<p>A conveyor belt of weighing stations suffers settling stress whenever a heavier station is immediately followed by a lighter one. You are given an integer <code>N</code> and an integer array <code>A</code> of station weights. For every adjacent pair where <code>A[i-1] > A[i]</code> (called a step-down), add <code>A[i-1] + A[i]</code> to the total. Adjacent pairs that rise or remain equal contribute 0. Your task is to find and return an integer value representing the total settling stress over every step-down.</p>
<p><b>Note:</b> Only strictly descending adjacent pairs contribute.</p>
<p><b>Input Specification:</b><br>
Line 1: An integer value <code>N</code>, representing the number of stations.<br>
Line 2: <code>N</code> space-separated integers representing the station weights <code>A</code>.
</p>
<p><b>Output Specification:</b><br>
Print an integer value representing the total settling stress over every step-down.
</p>
<h3>Example 1:</h3>
<p>
<b>Input:</b><br>
<pre>3
20 6 14</pre>
<b>Output:</b><br>
<pre>26</pre>
<b>Explanation:</b><br>
20 -> 6 is a step-down: add 20 + 6 = 26.<br>
6 -> 14 is not a step-down: skip.<br>
Total = 26.
</p>
<h3>Example 2:</h3>
<p>
<b>Input:</b><br>
<pre>4
18 3 14 6</pre>
<b>Output:</b><br>
<pre>41</pre>
<b>Explanation:</b><br>
18 -> 3 is a step-down: add 18 + 3 = 21.<br>
3 -> 14 is not a step-down: skip.<br>
14 -> 6 is a step-down: add 14 + 6 = 20.<br>
Total = 21 + 20 = 41.
</p>"""

    q5_py = """import sys

def main():
    tokens = sys.stdin.read().split()
    if not tokens:
        print(0)
        return
    n = int(tokens[0])
    a = list(map(int, tokens[1:1+n]))
    total = 0
    for i in range(1, len(a)):
        if a[i-1] > a[i]:
            total += a[i-1] + a[i]
    print(total)

if __name__ == '__main__':
    main()"""

    q5_c = """#include <stdio.h>

int main(void) {
    int n;
    if (scanf("%d", &n) != 1 || n <= 1) {
        printf("0\\n");
        return 0;
    }
    int prev;
    scanf("%d", &prev);
    long long total = 0;
    for (int i = 1; i < n; i++) {
        int curr;
        scanf("%d", &curr);
        if (prev > curr) {
            total += prev + curr;
        }
        prev = curr;
    }
    printf("%lld\\n", total);
    return 0;
}"""

    q5_cpp = """#include <iostream>
#include <vector>

using namespace std;

int main() {
    int n;
    if (!(cin >> n) || n <= 1) {
        cout << 0 << endl;
        return 0;
    }
    int prev;
    cin >> prev;
    long long total = 0;
    for (int i = 1; i < n; ++i) {
        int curr;
        cin >> curr;
        if (prev > curr) {
            total += prev + curr;
        }
        prev = curr;
    }
    cout << total << endl;
    return 0;
}"""

    q5_tests = [
        {"input": "3\n20 6 14", "expected": "26"},
        {"input": "4\n18 3 14 6", "expected": "41"},
        {"input": "3\n1 2 3", "expected": "0"},
        {"input": "3\n5 5 5", "expected": "0"}
    ]

    qs.append({
        "id": "Q-MV2A9HVX-9TV5",
        "title": "Question 5: Conveyor Surge Settling Score",
        "problemHtml": q5_html,
        "py": q5_py,
        "c": q5_c,
        "cpp": q5_cpp,
        "tests": q5_tests
    })

    # -------------------------------------------------------------------------
    # Q6: Signal Tower Fortification
    # -------------------------------------------------------------------------
    q6_html = """<h2>Problem Statement</h2>
<p>A communication grid strengthens each tower reading with the maximum signal seen up to that point. You are given an integer <code>N</code> and an integer array <code>A</code> representing tower readings. The fortified value at position <code>i</code> is calculated as <code>B[i] = A[i] + max(A[0..i])</code>. Your task is to find and return an integer array representing the fortified array <code>B</code>.</p>
<p><b>Note:</b> The running maximum never decreases as <code>i</code> grows.</p>
<p><b>Input Specification:</b><br>
Line 1: An integer value <code>N</code>, representing the number of towers.<br>
Line 2: <code>N</code> space-separated integers representing the readings <code>A</code>.
</p>
<p><b>Output Specification:</b><br>
Print space-separated integers representing the fortified array <code>B</code>.
</p>
<h3>Example 1:</h3>
<p>
<b>Input:</b><br>
<pre>5
7 3 5 9 2</pre>
<b>Output:</b><br>
<pre>14 10 12 18 11</pre>
<b>Explanation:</b><br>
Station 1 (7): peak = 7 -> 7 + 7 = 14.<br>
Station 2 (3): peak = 7 -> 3 + 7 = 10.<br>
Station 3 (5): peak = 7 -> 5 + 7 = 12.<br>
Station 4 (9): peak = 9 -> 9 + 9 = 18.<br>
Station 5 (2): peak = 9 -> 2 + 9 = 11.<br>
Fortified array = 14 10 12 18 11.
</p>
<h3>Example 2:</h3>
<p>
<b>Input:</b><br>
<pre>7
12 4 18 6 11 30 9</pre>
<b>Output:</b><br>
<pre>24 16 36 24 29 60 39</pre>
<b>Explanation:</b><br>
Resulting array = 24 16 36 24 29 60 39.
</p>"""

    q6_py = """import sys

def main():
    tokens = sys.stdin.read().split()
    if not tokens:
        return
    n = int(tokens[0])
    a = list(map(int, tokens[1:1+n]))
    if not a:
        return
    peak = a[0]
    b = []
    for x in a:
        if x > peak:
            peak = x
        b.append(str(x + peak))
    print(" ".join(b))

if __name__ == '__main__':
    main()"""

    q6_c = """#include <stdio.h>

int main(void) {
    int n;
    if (scanf("%d", &n) != 1 || n <= 0) return 0;
    int peak;
    scanf("%d", &peak);
    printf("%d", peak + peak);
    for (int i = 1; i < n; i++) {
        int x;
        scanf("%d", &x);
        if (x > peak) peak = x;
        printf(" %d", x + peak);
    }
    printf("\\n");
    return 0;
}"""

    q6_cpp = """#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

int main() {
    int n;
    if (!(cin >> n) || n <= 0) return 0;
    int peak;
    cin >> peak;
    cout << peak + peak;
    for (int i = 1; i < n; ++i) {
        int x;
        cin >> x;
        if (x > peak) peak = x;
        cout << " " << x + peak;
    }
    cout << endl;
    return 0;
}"""

    q6_tests = [
        {"input": "5\n7 3 5 9 2", "expected": "14 10 12 18 11"},
        {"input": "7\n12 4 18 6 11 30 9", "expected": "24 16 36 24 29 60 39"},
        {"input": "1\n5", "expected": "10"},
        {"input": "3\n10 5 20", "expected": "20 15 40"}
    ]

    qs.append({
        "id": "Q-MV2AC6AD-745X",
        "title": "Question 6: Signal Tower Fortification",
        "problemHtml": q6_html,
        "py": q6_py,
        "c": q6_c,
        "cpp": q6_cpp,
        "tests": q6_tests
    })

    # -------------------------------------------------------------------------
    # Q7: Clockwork Gear Mesh Load
    # -------------------------------------------------------------------------
    q7_html = """<h2>Problem Statement</h2>
<p>A clockwork train consists of <code>N</code> gears. Each gear contributes to the total mesh load based on its 1-based position. For the <code>i</code>-th gear (1 &le; i &le; N), its contribution is <code>min(i, K)</code>, where <code>K</code> is the maximum number of teeth that can engage per gear. Your task is to find and return an integer value representing the total mesh load summed over all gears.</p>
<p><b>Note:</b> Each gear contribution is capped at <code>K</code>.</p>
<p><b>Input Specification:</b><br>
Line 1: An integer value <code>N</code>, representing the number of gears.<br>
Line 2: An integer value <code>K</code>, representing the per-gear tooth cap.
</p>
<p><b>Output Specification:</b><br>
Print an integer value representing the total mesh load summed over all gears.
</p>
<h3>Example 1:</h3>
<p>
<b>Input:</b><br>
<pre>8
5</pre>
<b>Output:</b><br>
<pre>30</pre>
<b>Explanation:</b><br>
Gears 1 to 5 contribute 1 + 2 + 3 + 4 + 5 = 15.<br>
Gears 6 to 8 contribute 5 + 5 + 5 = 15.<br>
Total = 15 + 15 = 30.
</p>
<h3>Example 2:</h3>
<p>
<b>Input:</b><br>
<pre>9
3</pre>
<b>Output:</b><br>
<pre>24</pre>
<b>Explanation:</b><br>
Gears 1 to 3 contribute 1 + 2 + 3 = 6.<br>
Gears 4 to 9 (6 gears) contribute 6 * 3 = 18.<br>
Total = 6 + 18 = 24.
</p>"""

    q7_py = """import sys

def main():
    tokens = sys.stdin.read().split()
    if not tokens:
        print(0)
        return
    n = int(tokens[0])
    k = int(tokens[1])
    if n <= k:
        total = n * (n + 1) // 2
    else:
        total = k * (k + 1) // 2 + (n - k) * k
    print(total)

if __name__ == '__main__':
    main()"""

    q7_c = """#include <stdio.h>

int main(void) {
    long long n, k;
    if (scanf("%lld %lld", &n, &k) == 2) {
        long long total = 0;
        if (n <= k) {
            total = n * (n + 1) / 2;
        } else {
            total = k * (k + 1) / 2 + (n - k) * k;
        }
        printf("%lld\\n", total);
    }
    return 0;
}"""

    q7_cpp = """#include <iostream>

using namespace std;

int main() {
    long long n, k;
    if (cin >> n >> k) {
        long long total = 0;
        if (n <= k) {
            total = n * (n + 1) / 2;
        } else {
            total = k * (k + 1) / 2 + (n - k) * k;
        }
        cout << total << endl;
    }
    return 0;
}"""

    q7_tests = [
        {"input": "8\n5", "expected": "30"},
        {"input": "9\n3", "expected": "24"},
        {"input": "3\n5", "expected": "6"},
        {"input": "1\n1", "expected": "1"}
    ]

    qs.append({
        "id": "Q-MV2AF099-E160",
        "title": "Question 7: Clockwork Gear Mesh Load",
        "problemHtml": q7_html,
        "py": q7_py,
        "c": q7_c,
        "cpp": q7_cpp,
        "tests": q7_tests
    })

    # -------------------------------------------------------------------------
    # Q8: Microbe Colony Diversity Load
    # -------------------------------------------------------------------------
    q8_html = """<h2>Problem Statement</h2>
<p>A microbiology lab assigns each colony with a diversity load equal to its cell count multiplied by the number of distinct prime factors of that count. You are given an integer <code>N</code> and an integer array <code>A</code> of colony cell counts. Your task is to find and return an integer value representing the total diversity load over all colonies.</p>
<p><b>Note:</b> A prime number has exactly one distinct prime factor. The number 1 has 0 prime factors.</p>
<p><b>Input Specification:</b><br>
Line 1: An integer value <code>N</code>, representing the number of colonies.<br>
Line 2: <code>N</code> space-separated integers representing the cell counts <code>A</code>.
</p>
<p><b>Output Specification:</b><br>
Print an integer value representing the total diversity load over all colonies.
</p>
<h3>Example 1:</h3>
<p>
<b>Input:</b><br>
<pre>3
6 10 15</pre>
<b>Output:</b><br>
<pre>62</pre>
<b>Explanation:</b><br>
6 = 2 * 3 (2 distinct prime factors) -> contribution = 6 * 2 = 12.<br>
10 = 2 * 5 (2 distinct prime factors) -> contribution = 10 * 2 = 20.<br>
15 = 3 * 5 (2 distinct prime factors) -> contribution = 15 * 2 = 30.<br>
Total = 12 + 20 + 30 = 62.
</p>
<h3>Example 2:</h3>
<p>
<b>Input:</b><br>
<pre>4
12 30 7 20</pre>
<b>Output:</b><br>
<pre>161</pre>
<b>Explanation:</b><br>
12 = 2^2 * 3 (2 factors) -> 12 * 2 = 24.<br>
30 = 2 * 3 * 5 (3 factors) -> 30 * 3 = 90.<br>
7 = 7 (1 factor) -> 7 * 1 = 7.<br>
20 = 2^2 * 5 (2 factors) -> 20 * 2 = 40.<br>
Total = 24 + 90 + 7 + 40 = 161.
</p>"""

    q8_py = """import sys

def count_distinct_prime_factors(n):
    if n <= 1:
        return 0
    cnt = 0
    d = 2
    temp = n
    while d * d <= temp:
        if temp % d == 0:
            cnt += 1
            while temp % d == 0:
                temp //= d
        d += 1
    if temp > 1:
        cnt += 1
    return cnt

def main():
    tokens = sys.stdin.read().split()
    if not tokens:
        print(0)
        return
    n = int(tokens[0])
    a = list(map(int, tokens[1:1+n]))
    total = sum(x * count_distinct_prime_factors(x) for x in a)
    print(total)

if __name__ == '__main__':
    main()"""

    q8_c = """#include <stdio.h>

int count_distinct_prime_factors(int n) {
    if (n <= 1) return 0;
    int cnt = 0;
    int temp = n;
    for (int d = 2; (long long)d * d <= temp; d++) {
        if (temp % d == 0) {
            cnt++;
            while (temp % d == 0) {
                temp /= d;
            }
        }
    }
    if (temp > 1) cnt++;
    return cnt;
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    long long total = 0;
    for (int i = 0; i < n; i++) {
        int x;
        scanf("%d", &x);
        total += (long long)x * count_distinct_prime_factors(x);
    }
    printf("%lld\\n", total);
    return 0;
}"""

    q8_cpp = """#include <iostream>

using namespace std;

int countDistinctPrimeFactors(int n) {
    if (n <= 1) return 0;
    int cnt = 0;
    int temp = n;
    for (int d = 2; (long long)d * d <= temp; ++d) {
        if (temp % d == 0) {
            cnt++;
            while (temp % d == 0) {
                temp /= d;
            }
        }
    }
    if (temp > 1) cnt++;
    return cnt;
}

int main() {
    int n;
    if (!(cin >> n)) return 0;
    long long total = 0;
    for (int i = 0; i < n; ++i) {
        int x;
        cin >> x;
        total += (long long)x * countDistinctPrimeFactors(x);
    }
    cout << total << endl;
    return 0;
}"""

    q8_tests = [
        {"input": "3\n6 10 15", "expected": "62"},
        {"input": "4\n12 30 7 20", "expected": "161"},
        {"input": "1\n2", "expected": "2"},
        {"input": "2\n1 8", "expected": "8"}
    ]

    qs.append({
        "id": "Q-MV2AHD2H-S0M2",
        "title": "Question 8: Microbe Colony Diversity Load",
        "problemHtml": q8_html,
        "py": q8_py,
        "c": q8_c,
        "cpp": q8_cpp,
        "tests": q8_tests
    })

    # -------------------------------------------------------------------------
    # Q9: Carousel SensorPairing
    # -------------------------------------------------------------------------
    q9_html = """<h2>Problem Statement</h2>
<p>Sensors arranged around a circular carousel are each summed with the sensor located a fixed number of positions ahead <code>K</code>. Each position <code>i</code> (0-based) is paired with position <code>(i + K) mod N</code>, and the output stores the pairwise sum <code>B[i] = A[i] + A[(i + K) mod N]</code>. Your task is to find and return an integer array representing array <code>B</code>.</p>
<p><b>Note:</b> The ring wraps around, so indices taken are modulo <code>N</code>.</p>
<p><b>Input Specification:</b><br>
Line 1: Space-separated integers representing array <code>A</code> (sensor readings).<br>
Line 2: An integer <code>K</code>, representing the forward offset.
</p>
<p><b>Output Specification:</b><br>
Print space-separated integers representing the array <code>B</code>.
</p>
<h3>Example 1:</h3>
<p>
<b>Input:</b><br>
<pre>6 2 9 4
2</pre>
<b>Output:</b><br>
<pre>15 6 15 6</pre>
<b>Explanation:</b><br>
N = 4, K = 2:<br>
Sensor 0 (6) pairs with (0+2)%4 = 2 (9) -> 6 + 9 = 15.<br>
Sensor 1 (2) pairs with (1+2)%4 = 3 (4) -> 2 + 4 = 6.<br>
Sensor 2 (9) pairs with (2+2)%4 = 0 (6) -> 9 + 6 = 15.<br>
Sensor 3 (4) pairs with (3+2)%4 = 1 (2) -> 4 + 2 = 6.<br>
Result = 15 6 15 6.
</p>
<h3>Example 2:</h3>
<p>
<b>Input:</b><br>
<pre>5 3 8 1 7 2
3</pre>
<b>Output:</b><br>
<pre>6 10 10 6 10 10</pre>
<b>Explanation:</b><br>
Offset K = 3 on 6 sensors gives 6 10 10 6 10 10.
</p>"""

    q9_py = """import sys

def main():
    tokens = sys.stdin.read().split()
    if not tokens:
        return
    k = int(tokens[-1])
    a = list(map(int, tokens[:-1]))
    n = len(a)
    if n == 0:
        return
    b = [str(a[i] + a[(i + k) % n]) for i in range(n)]
    print(" ".join(b))

if __name__ == '__main__':
    main()"""

    q9_c = """#include <stdio.h>

int main(void) {
    int a[10000];
    int n = 0, val;
    while (scanf("%d", &val) == 1) {
        a[n++] = val;
    }
    if (n < 2) return 0;
    int k = a[--n];
    for (int i = 0; i < n; i++) {
        int pair_idx = (i + (k % n) + n) % n;
        printf("%d%c", a[i] + a[pair_idx], (i == n - 1) ? '\\n' : ' ');
    }
    return 0;
}"""

    q9_cpp = """#include <iostream>
#include <vector>

using namespace std;

int main() {
    vector<int> all;
    int val;
    while (cin >> val) {
        all.push_back(val);
    }
    if (all.size() < 2) return 0;
    int k = all.back();
    all.pop_back();
    int n = all.size();
    for (int i = 0; i < n; ++i) {
        int pair_idx = (i + (k % n) + n) % n;
        cout << all[i] + all[pair_idx] << (i == n - 1 ? "" : " ");
    }
    cout << endl;
    return 0;
}"""

    q9_tests = [
        {"input": "6 2 9 4\n2", "expected": "15 6 15 6"},
        {"input": "5 3 8 1 7 2\n3", "expected": "6 10 10 6 10 10"},
        {"input": "10 20\n1", "expected": "30 30"},
        {"input": "1 2 3\n0", "expected": "2 4 6"}
    ]

    qs.append({
        "id": "Q-MV2AIY7C-LAXZ",
        "title": "Question 9: Carousel SensorPairing",
        "problemHtml": q9_html,
        "py": q9_py,
        "c": q9_c,
        "cpp": q9_cpp,
        "tests": q9_tests
    })

    # -------------------------------------------------------------------------
    # Q10: Cross-Dock Pallet Match Load
    # -------------------------------------------------------------------------
    q10_html = """<h2>Problem Statement</h2>
<p>Two barcode scanners at a cross-dock log letters, and matching letters reinforce each other based on how often they appear on each side. You are given a string <code>A</code> and a string <code>B</code>. For every letter that appears in both strings, add the product of its count in <code>A</code>, its count in <code>B</code>, and its letter value (where a = 1, ..., z = 26). Your task is to find and return an integer value representing the total match load over all shared letters.</p>
<p><b>Note:</b> A letter contributes only if it appears in both strings.</p>
<p><b>Input Specification:</b><br>
Line 1: A string <code>A</code> from the first scanner.<br>
Line 2: A string <code>B</code> from the second scanner.
</p>
<p><b>Output Specification:</b><br>
Print an integer value representing the total match load over all shared letters.
</p>
<h3>Example 1:</h3>
<p>
<b>Input:</b><br>
<pre>cat
act</pre>
<b>Output:</b><br>
<pre>24</pre>
<b>Explanation:</b><br>
'a': countA = 1, countB = 1, val = 1 -> 1 * 1 * 1 = 1.<br>
'c': countA = 1, countB = 1, val = 3 -> 1 * 1 * 3 = 3.<br>
't': countA = 1, countB = 1, val = 20 -> 1 * 1 * 20 = 20.<br>
Total = 1 + 3 + 20 = 24.
</p>
<h3>Example 2:</h3>
<p>
<b>Input:</b><br>
<pre>moon
mood</pre>
<b>Output:</b><br>
<pre>73</pre>
<b>Explanation:</b><br>
'm': countA = 1, countB = 1, val = 13 -> 13.<br>
'o': countA = 2, countB = 2, val = 15 -> 2 * 2 * 15 = 60.<br>
'n' and 'd' are not shared.<br>
Total = 13 + 60 = 73.
</p>"""

    q10_py = """import sys
from collections import Counter

def main():
    tokens = sys.stdin.read().split()
    if len(tokens) < 2:
        print(0)
        return
    a, b = tokens[0], tokens[1]
    cA = Counter(a)
    cB = Counter(b)
    total = 0
    for ch in cA:
        if ch in cB and 'a' <= ch <= 'z':
            val = ord(ch) - ord('a') + 1
            total += cA[ch] * cB[ch] * val
    print(total)

if __name__ == '__main__':
    main()"""

    q10_c = """#include <stdio.h>
#include <string.h>

int main(void) {
    char a[10000], b[10000];
    if (scanf("%s %s", a, b) == 2) {
        int cntA[26] = {0}, cntB[26] = {0};
        int lenA = strlen(a), lenB = strlen(b);
        for (int i = 0; i < lenA; i++) if (a[i] >= 'a' && a[i] <= 'z') cntA[a[i] - 'a']++;
        for (int i = 0; i < lenB; i++) if (b[i] >= 'a' && b[i] <= 'z') cntB[b[i] - 'a']++;
        long long total = 0;
        for (int i = 0; i < 26; i++) {
            if (cntA[i] > 0 && cntB[i] > 0) {
                total += (long long)cntA[i] * cntB[i] * (i + 1);
            }
        }
        printf("%lld\\n", total);
    }
    return 0;
}"""

    q10_cpp = """#include <iostream>
#include <string>
#include <vector>

using namespace std;

int main() {
    string a, b;
    if (cin >> a >> b) {
        vector<int> cntA(26, 0), cntB(26, 0);
        for (char c : a) if (c >= 'a' && c <= 'z') cntA[c - 'a']++;
        for (char c : b) if (c >= 'a' && c <= 'z') cntB[c - 'a']++;
        long long total = 0;
        for (int i = 0; i < 26; ++i) {
            if (cntA[i] > 0 && cntB[i] > 0) {
                total += (long long)cntA[i] * cntB[i] * (i + 1);
            }
        }
        cout << total << endl;
    }
    return 0;
}"""

    q10_tests = [
        {"input": "cat\nact", "expected": "24"},
        {"input": "moon\nmood", "expected": "73"},
        {"input": "abc\ndef", "expected": "0"},
        {"input": "xyz\nxyz", "expected": "75"}
    ]

    qs.append({
        "id": "Q-MV2ALQWK-4IZ1",
        "title": "Question 10: Cross-Dock Pallet Match Load",
        "problemHtml": q10_html,
        "py": q10_py,
        "c": q10_c,
        "cpp": q10_cpp,
        "tests": q10_tests
    })

    return qs
