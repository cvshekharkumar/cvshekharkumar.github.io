# -*- coding: utf-8 -*-

def get_questions_21_to_30():
    qs = []

    # -------------------------------------------------------------------------
    # Q21: Concert Row Filling
    # -------------------------------------------------------------------------
    q21_html = """<h2>Problem Statement</h2>
<p>A concert hall has <code>N</code> rows with given seat capacities. <code>K</code> attendees enter the hall and fill the rows in order, starting from row 1, then row 2, and so on, until all <code>K</code> attendees are seated, or all rows are filled. Calculate the 1-based index of the last row that received at least one attendee. Your task is to find and return an integer value representing the row number.</p>
<p><b>Note:</b> If <code>K = 0</code>, return <code>0</code>. If <code>K</code> exceeds the total available capacity of all rows, return the index of the final row (<code>N</code>).</p>
<p><b>Input Specification:</b><br>
Line 1: An integer <code>K</code>, representing the number of attendees.<br>
Line 2: <code>N</code> space-separated integers representing the seat capacity of each row <code>S</code>.<br>
Line 3: An integer <code>N</code>, representing the number of rows.
</p>
<p><b>Output Specification:</b><br>
Print an integer value representing the 1-based row number of the last row that received at least one attendee.
</p>
<h3>Example 1:</h3>
<p>
<b>Input:</b><br>
<pre>7
3 3 3 3
4</pre>
<b>Output:</b><br>
<pre>3</pre>
<b>Explanation:</b><br>
Row 1 (capacity 3) seats 3 attendees; remaining = 4.<br>
Row 2 (capacity 3) seats 3 attendees; remaining = 1.<br>
Row 3 (capacity 3) seats the final 1 attendee; remaining = 0.<br>
The last row that received an attendee is Row 3.
</p>
<h3>Example 2:</h3>
<p>
<b>Input:</b><br>
<pre>10
2 2 2
3</pre>
<b>Output:</b><br>
<pre>3</pre>
<b>Explanation:</b><br>
Rows 1, 2, and 3 each seat 2 attendees (total capacity 6). All rows are full, so the last row is 3.
</p>"""

    q21_py = """import sys

def main():
    tokens = sys.stdin.read().split()
    if not tokens:
        print(0)
        return
    k = int(tokens[0])
    n = int(tokens[-1])
    s = list(map(int, tokens[1:-1]))
    if k <= 0 or n == 0:
        print(0)
        return
    rem = k
    last_row = 0
    for i in range(min(n, len(s))):
        if rem > 0:
            last_row = i + 1
            rem -= s[i]
        else:
            break
    print(last_row)

if __name__ == '__main__':
    main()"""

    q21_c = """#include <stdio.h>

int main(void) {
    int k;
    if (scanf("%d", &k) != 1) return 0;
    int s[10000], count = 0, val;
    while (scanf("%d", &val) == 1) {
        s[count++] = val;
    }
    if (count == 0) {
        printf("0\\n");
        return 0;
    }
    int n = s[--count];
    if (k <= 0 || n == 0) {
        printf("0\\n");
        return 0;
    }
    int rem = k, last_row = 0;
    for (int i = 0; i < count && i < n; i++) {
        if (rem > 0) {
            last_row = i + 1;
            rem -= s[i];
        } else {
            break;
        }
    }
    printf("%d\\n", last_row);
    return 0;
}"""

    q21_cpp = """#include <iostream>
#include <vector>

using namespace std;

int main() {
    int k;
    if (!(cin >> k)) return 0;
    vector<int> all;
    int val;
    while (cin >> val) {
        all.push_back(val);
    }
    if (all.empty()) {
        cout << 0 << endl;
        return 0;
    }
    int n = all.back();
    all.pop_back();
    if (k <= 0 || n == 0) {
        cout << 0 << endl;
        return 0;
    }
    int rem = k, last_row = 0;
    for (int i = 0; i < (int)all.size() && i < n; ++i) {
        if (rem > 0) {
            last_row = i + 1;
            rem -= all[i];
        } else {
            break;
        }
    }
    cout << last_row << endl;
    return 0;
}"""

    q21_tests = [
        {"input": "7\n3 3 3 3\n4", "expected": "3"},
        {"input": "10\n2 2 2\n3", "expected": "3"},
        {"input": "0\n5 5\n2", "expected": "0"},
        {"input": "2\n10 10\n2", "expected": "1"}
    ]

    qs.append({
        "id": "Q-MV2B7Z0S-PA3K",
        "title": "Question 21: Concert Row Filling",
        "problemHtml": q21_html,
        "py": q21_py,
        "c": q21_c,
        "cpp": q21_cpp,
        "tests": q21_tests
    })

    # -------------------------------------------------------------------------
    # Q22: Music Playlist Boost
    # -------------------------------------------------------------------------
    q22_html = """<h2>Problem Statement</h2>
<p>A music streaming service boosts the play count of songs in a playlist. The boosted score for the <code>i</code>-th song (0-indexed) is <code>plays[i] * (i + 1)</code>. Calculate the sum of the boosted scores for the first <code>K</code> songs. Your task is to find and return an integer value representing the total boosted score.</p>
<p><b>Note:</b> If <code>K</code> exceeds <code>N</code>, use <code>N</code> instead.</p>
<p><b>Input Specification:</b><br>
Line 1: An integer <code>N</code>, representing the total number of songs.<br>
Line 2: <code>N</code> space-separated integers representing the play counts <code>P</code>.<br>
Line 3: An integer <code>K</code>, representing how many songs to boost.
</p>
<p><b>Output Specification:</b><br>
Print an integer value representing the total boosted score.
</p>
<h3>Example 1:</h3>
<p>
<b>Input:</b><br>
<pre>4
10 20 30 40
3</pre>
<b>Output:</b><br>
<pre>140</pre>
<b>Explanation:</b><br>
Boost first K = 3 songs:<br>
Song 0: 10 * (0 + 1) = 10.<br>
Song 1: 20 * (1 + 1) = 40.<br>
Song 2: 30 * (2 + 1) = 90.<br>
Total = 10 + 40 + 90 = 140.
</p>
<h3>Example 2:</h3>
<p>
<b>Input:</b><br>
<pre>3
5 5 5
2</pre>
<b>Output:</b><br>
<pre>15</pre>
<b>Explanation:</b><br>
Song 0: 5 * 1 = 5.<br>
Song 1: 5 * 2 = 10.<br>
Total = 5 + 10 = 15.
</p>"""

    q22_py = """import sys

def main():
    tokens = sys.stdin.read().split()
    if not tokens:
        print(0)
        return
    n = int(tokens[0])
    p = list(map(int, tokens[1:1+n]))
    k = int(tokens[1+n])
    limit = min(k, n)
    total = sum(p[i] * (i + 1) for i in range(limit))
    print(total)

if __name__ == '__main__':
    main()"""

    q22_c = """#include <stdio.h>

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int p[10000];
    for (int i = 0; i < n; i++) scanf("%d", &p[i]);
    int k;
    scanf("%d", &k);
    int limit = (k < n) ? k : n;
    long long total = 0;
    for (int i = 0; i < limit; i++) {
        total += (long long)p[i] * (i + 1);
    }
    printf("%lld\\n", total);
    return 0;
}"""

    q22_cpp = """#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

int main() {
    int n;
    if (cin >> n) {
        vector<int> p(n);
        for (int i = 0; i < n; ++i) cin >> p[i];
        int k;
        cin >> k;
        int limit = min(k, n);
        long long total = 0;
        for (int i = 0; i < limit; ++i) {
            total += (long long)p[i] * (i + 1);
        }
        cout << total << endl;
    }
    return 0;
}"""

    q22_tests = [
        {"input": "4\n10 20 30 40\n3", "expected": "140"},
        {"input": "3\n5 5 5\n2", "expected": "15"},
        {"input": "2\n10 20\n5", "expected": "50"},
        {"input": "3\n10 20 30\n0", "expected": "0"}
    ]

    qs.append({
        "id": "Q-MV2BAQII-QING",
        "title": "Question 22: Music Playlist Boost",
        "problemHtml": q22_html,
        "py": q22_py,
        "c": q22_c,
        "cpp": q22_cpp,
        "tests": q22_tests
    })

    # -------------------------------------------------------------------------
    # Q23: Car Park Fee Sum
    # -------------------------------------------------------------------------
    q23_html = """<h2>Problem Statement</h2>
<p>A parking lot serves <code>N</code> cars. The parking duration of each car is given in an integer array <code>H</code>, where <code>H[i]</code> represents the number of hours the <code>i</code>-th car was parked. The first 2 hours are free, and each additional hour costs 3 units. Your task is to find and return an integer value representing the total parking fee collected.</p>
<p><b>Note:</b> A car parked for 2 hours or less pays nothing.</p>
<p><b>Input Specification:</b><br>
Line 1: An integer <code>N</code>, representing the number of cars.<br>
Line 2: <code>N</code> space-separated integers representing parking durations <code>H</code> in hours.
</p>
<p><b>Output Specification:</b><br>
Print an integer value representing the total parking fee collected.
</p>
<h3>Example 1:</h3>
<p>
<b>Input:</b><br>
<pre>3
1 4 5</pre>
<b>Output:</b><br>
<pre>15</pre>
<b>Explanation:</b><br>
Car 1 (1 hr): 1 <= 2 -> fee = 0.<br>
Car 2 (4 hr): chargeable = 4 - 2 = 2 hrs -> fee = 2 * 3 = 6.<br>
Car 3 (5 hr): chargeable = 5 - 2 = 3 hrs -> fee = 3 * 3 = 9.<br>
Total fee = 0 + 6 + 9 = 15.
</p>
<h3>Example 2:</h3>
<p>
<b>Input:</b><br>
<pre>2
2 10</pre>
<b>Output:</b><br>
<pre>24</pre>
<b>Explanation:</b><br>
Car 1 (2 hr): fee = 0.<br>
Car 2 (10 hr): (10 - 2) * 3 = 24.<br>
Total fee = 0 + 24 = 24.
</p>"""

    q23_py = """import sys

def main():
    tokens = sys.stdin.read().split()
    if not tokens:
        print(0)
        return
    n = int(tokens[0])
    h = list(map(int, tokens[1:1+n]))
    total = sum(max(0, x - 2) * 3 for x in h)
    print(total)

if __name__ == '__main__':
    main()"""

    q23_c = """#include <stdio.h>

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    long long total = 0;
    for (int i = 0; i < n; i++) {
        int h;
        scanf("%d", &h);
        if (h > 2) {
            total += (long long)(h - 2) * 3;
        }
    }
    printf("%lld\\n", total);
    return 0;
}"""

    q23_cpp = """#include <iostream>

using namespace std;

int main() {
    int n;
    if (cin >> n) {
        long long total = 0;
        for (int i = 0; i < n; ++i) {
            int h;
            cin >> h;
            if (h > 2) {
                total += (long long)(h - 2) * 3;
            }
        }
        cout << total << endl;
    }
    return 0;
}"""

    q23_tests = [
        {"input": "3\n1 4 5", "expected": "15"},
        {"input": "2\n2 10", "expected": "24"},
        {"input": "3\n1 2 2", "expected": "0"},
        {"input": "1\n6", "expected": "12"}
    ]

    qs.append({
        "id": "Q-MV2BC2AP-O4X0",
        "title": "Question 23: Car Park Fee Sum",
        "problemHtml": q23_html,
        "py": q23_py,
        "c": q23_c,
        "cpp": q23_cpp,
        "tests": q23_tests
    })

    # -------------------------------------------------------------------------
    # Q24: Book Library Rank
    # -------------------------------------------------------------------------
    q24_html = """<h2>Problem Statement</h2>
<p>Given <code>N</code> book ratings and a target rating <code>T</code>, sort the ratings in descending order. Return the 1-based rank of the first occurrence of <code>T</code> in the sorted list. If <code>T</code> does not appear, return <code>0</code>. Your task is to find and return an integer value representing the rank of <code>T</code>.</p>
<p><b>Note:</b> Ranks are 1-based. Duplicate ratings are counted individually, but the first occurrence wins.</p>
<p><b>Input Specification:</b><br>
Line 1: An integer <code>N</code>, representing the number of books.<br>
Line 2: <code>N</code> space-separated integers representing the book ratings <code>R</code>.<br>
Line 3: An integer <code>T</code>, representing the target rating.
</p>
<p><b>Output Specification:</b><br>
Print an integer value representing the rank of <code>T</code>, or <code>0</code> if not found.
</p>
<h3>Example 1:</h3>
<p>
<b>Input:</b><br>
<pre>5
4 7 2 9 7
7</pre>
<b>Output:</b><br>
<pre>2</pre>
<b>Explanation:</b><br>
Sorted descending = [9, 7, 7, 4, 2].<br>
The first occurrence of 7 is at rank 2.<br>
Result = 2.
</p>
<h3>Example 2:</h3>
<p>
<b>Input:</b><br>
<pre>3
5 8 3
6</pre>
<b>Output:</b><br>
<pre>0</pre>
<b>Explanation:</b><br>
Sorted descending = [8, 5, 3]. Rating 6 is not in the list, so output is 0.
</p>"""

    q24_py = """import sys

def main():
    tokens = sys.stdin.read().split()
    if not tokens:
        print(0)
        return
    n = int(tokens[0])
    r = list(map(int, tokens[1:1+n]))
    t = int(tokens[1+n])
    r_sorted = sorted(r, reverse=True)
    try:
        rank = r_sorted.index(t) + 1
        print(rank)
    except ValueError:
        print(0)

if __name__ == '__main__':
    main()"""

    q24_c = """#include <stdio.h>
#include <stdlib.h>

int cmp_desc(const void *a, const void *b) {
    return (*(int *)b - *(int *)a);
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int r[10000];
    for (int i = 0; i < n; i++) scanf("%d", &r[i]);
    int t;
    scanf("%d", &t);
    qsort(r, n, sizeof(int), cmp_desc);
    int rank = 0;
    for (int i = 0; i < n; i++) {
        if (r[i] == t) {
            rank = i + 1;
            break;
        }
    }
    printf("%d\\n", rank);
    return 0;
}"""

    q24_cpp = """#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

int main() {
    int n;
    if (cin >> n) {
        vector<int> r(n);
        for (int i = 0; i < n; ++i) cin >> r[i];
        int t;
        cin >> t;
        sort(r.begin(), r.end(), greater<int>());
        int rank = 0;
        for (int i = 0; i < n; ++i) {
            if (r[i] == t) {
                rank = i + 1;
                break;
            }
        }
        cout << rank << endl;
    }
    return 0;
}"""

    q24_tests = [
        {"input": "5\n4 7 2 9 7\n7", "expected": "2"},
        {"input": "3\n5 8 3\n6", "expected": "0"},
        {"input": "1\n10\n10", "expected": "1"},
        {"input": "4\n1 2 3 4\n1", "expected": "4"}
    ]

    qs.append({
        "id": "Q-MV2BE3ON-8L4L",
        "title": "Question 24: Book Library Rank",
        "problemHtml": q24_html,
        "py": q24_py,
        "c": q24_c,
        "cpp": q24_cpp,
        "tests": q24_tests
    })

    # -------------------------------------------------------------------------
    # Q25: Solar Panel Yield
    # -------------------------------------------------------------------------
    q25_html = """<h2>Problem Statement</h2>
<p><code>N</code> solar panels recorded sunlight hours. Each panel produces <code>hours * M</code> energy units. If the calculated energy for a panel exceeds 200 units, it is capped at 200 units. Your task is to find and return an integer value representing the total energy yield across all panels.</p>
<p><b>Note:</b> Each panel's output is capped at 200 units (i.e. <code>min(hours * M, 200)</code>).</p>
<p><b>Input Specification:</b><br>
Line 1: An integer <code>N</code>, representing the number of panels.<br>
Line 2: <code>N</code> space-separated integers representing sunlight hours <code>H</code> per panel.<br>
Line 3: An integer <code>M</code>, representing the multiplier.
</p>
<p><b>Output Specification:</b><br>
Print an integer value representing the total energy yield across all panels.
</p>
<h3>Example 1:</h3>
<p>
<b>Input:</b><br>
<pre>3
10 30 5
8</pre>
<b>Output:</b><br>
<pre>320</pre>
<b>Explanation:</b><br>
Panel 0: 10 * 8 = 80.<br>
Panel 1: 30 * 8 = 240 -> capped at 200.<br>
Panel 2: 5 * 8 = 40.<br>
Total yield = 80 + 200 + 40 = 320.
</p>
<h3>Example 2:</h3>
<p>
<b>Input:</b><br>
<pre>2
5 7
3</pre>
<b>Output:</b><br>
<pre>36</pre>
<b>Explanation:</b><br>
Panel 0: 5 * 3 = 15.<br>
Panel 1: 7 * 3 = 21.<br>
Total yield = 15 + 21 = 36.
</p>"""

    q25_py = """import sys

def main():
    tokens = sys.stdin.read().split()
    if not tokens:
        print(0)
        return
    n = int(tokens[0])
    h = list(map(int, tokens[1:1+n]))
    m = int(tokens[1+n])
    total = sum(min(x * m, 200) for x in h)
    print(total)

if __name__ == '__main__':
    main()"""

    q25_c = """#include <stdio.h>

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int h[10000];
    for (int i = 0; i < n; i++) scanf("%d", &h[i]);
    int m;
    scanf("%d", &m);
    long long total = 0;
    for (int i = 0; i < n; i++) {
        long long yield_val = (long long)h[i] * m;
        if (yield_val > 200) yield_val = 200;
        total += yield_val;
    }
    printf("%lld\\n", total);
    return 0;
}"""

    q25_cpp = """#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

int main() {
    int n;
    if (cin >> n) {
        vector<int> h(n);
        for (int i = 0; i < n; ++i) cin >> h[i];
        int m;
        cin >> m;
        long long total = 0;
        for (int x : h) {
            long long yield_val = (long long)x * m;
            total += min(yield_val, 200LL);
        }
        cout << total << endl;
    }
    return 0;
}"""

    q25_tests = [
        {"input": "3\n10 30 5\n8", "expected": "320"},
        {"input": "2\n5 7\n3", "expected": "36"},
        {"input": "1\n100\n5", "expected": "200"},
        {"input": "2\n0 10\n10", "expected": "100"}
    ]

    qs.append({
        "id": "Q-MV2BFIJZ-UOXV",
        "title": "Question 25: Solar Panel Yield",
        "problemHtml": q25_html,
        "py": q25_py,
        "c": q25_c,
        "cpp": q25_cpp,
        "tests": q25_tests
    })

    # -------------------------------------------------------------------------
    # Q26: Cinema Snack Tip
    # -------------------------------------------------------------------------
    q26_html = """<h2>Problem Statement</h2>
<p>A cinema snack bar collects a tip equal to 15 percent of each bill amount, with the result rounded down to the nearest integer. Given <code>N</code> bills, calculate the total tips collected. Your task is to find and return an integer value representing the total tips collected.</p>
<p><b>Note:</b> Use integer division while calculating the tip for each bill: <code>tip_i = (bill_i * 15) // 100</code>.</p>
<p><b>Input Specification:</b><br>
Line 1: An integer <code>N</code>, representing the number of bills.<br>
Line 2: <code>N</code> space-separated integers representing the bill amounts <code>B</code>.
</p>
<p><b>Output Specification:</b><br>
Print an integer value representing the total tips collected.
</p>
<h3>Example 1:</h3>
<p>
<b>Input:</b><br>
<pre>3
100 200 50</pre>
<b>Output:</b><br>
<pre>52</pre>
<b>Explanation:</b><br>
Bill 100 -> (100 * 15) // 100 = 15.<br>
Bill 200 -> (200 * 15) // 100 = 30.<br>
Bill 50 -> (50 * 15) // 100 = 7 (integer division).<br>
Total tip = 15 + 30 + 7 = 52.
</p>
<h3>Example 2:</h3>
<p>
<b>Input:</b><br>
<pre>2
80 120</pre>
<b>Output:</b><br>
<pre>30</pre>
<b>Explanation:</b><br>
Bill 80 -> 12.<br>
Bill 120 -> 18.<br>
Total = 12 + 18 = 30.
</p>"""

    q26_py = """import sys

def main():
    tokens = sys.stdin.read().split()
    if not tokens:
        print(0)
        return
    n = int(tokens[0])
    b = list(map(int, tokens[1:1+n]))
    total = sum((x * 15) // 100 for x in b)
    print(total)

if __name__ == '__main__':
    main()"""

    q26_c = """#include <stdio.h>

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    long long total = 0;
    for (int i = 0; i < n; i++) {
        int bill;
        scanf("%d", &bill);
        total += ((long long)bill * 15) / 100;
    }
    printf("%lld\\n", total);
    return 0;
}"""

    q26_cpp = """#include <iostream>

using namespace std;

int main() {
    int n;
    if (cin >> n) {
        long long total = 0;
        for (int i = 0; i < n; ++i) {
            int bill;
            cin >> bill;
            total += ((long long)bill * 15) / 100;
        }
        cout << total << endl;
    }
    return 0;
}"""

    q26_tests = [
        {"input": "3\n100 200 50", "expected": "52"},
        {"input": "2\n80 120", "expected": "30"},
        {"input": "1\n5", "expected": "0"},
        {"input": "4\n10 20 30 40", "expected": "14"}
    ]

    qs.append({
        "id": "Q-MV2BI5DL-BFH5",
        "title": "Question 26: Cinema Snack Tip",
        "problemHtml": q26_html,
        "py": q26_py,
        "c": q26_c,
        "cpp": q26_cpp,
        "tests": q26_tests
    })

    # -------------------------------------------------------------------------
    # Q27: Museum Audio Skip
    # -------------------------------------------------------------------------
    q27_html = """<h2>Problem Statement</h2>
<p>A museum guide tag string <code>T</code> of length <code>N</code> contains lowercase tags. Compress the string by removing any tag character that is identical to the one immediately before it. Your task is to find and return an integer value representing the length of the resulting compressed string.</p>
<p><b>Note:</b> Only immediate consecutive duplicates are removed. Non-adjacent repeats are kept.</p>
<p><b>Input Specification:</b><br>
Line 1: An integer <code>N</code>, representing the length of the tag string.<br>
Line 2: A string <code>T</code> of lowercase tags.
</p>
<p><b>Output Specification:</b><br>
Print an integer value representing the length of the resulting compressed string.
</p>
<h3>Example 1:</h3>
<p>
<b>Input:</b><br>
<pre>6
aabccc</pre>
<b>Output:</b><br>
<pre>3</pre>
<b>Explanation:</b><br>
'a' -> keep ('a').<br>
Next 'a' matches previous -> drop.<br>
'b' -> keep ("ab").<br>
'c' -> keep ("abc").<br>
Next 'c' -> drop.<br>
Next 'c' -> drop.<br>
Compressed string = "abc", length = 3.
</p>
<h3>Example 2:</h3>
<p>
<b>Input:</b><br>
<pre>5
abcba</pre>
<b>Output:</b><br>
<pre>5</pre>
<b>Explanation:</b><br>
No adjacent duplicates were found. Compressed string remains "abcba", length = 5.
</p>"""

    q27_py = """import sys

def main():
    tokens = sys.stdin.read().split()
    if not tokens:
        print(0)
        return
    n = int(tokens[0])
    t = tokens[1] if len(tokens) > 1 else ""
    s = t[:n]
    if not s:
        print(0)
        return
    length = 1
    for i in range(1, len(s)):
        if s[i] != s[i-1]:
            length += 1
    print(length)

if __name__ == '__main__':
    main()"""

    q27_c = """#include <stdio.h>
#include <string.h>

int main(void) {
    int n;
    char t[10000];
    if (scanf("%d %s", &n, t) == 2) {
        if (n <= 0 || t[0] == '\\0') {
            printf("0\\n");
            return 0;
        }
        int count = 1;
        for (int i = 1; i < n && t[i] != '\\0'; i++) {
            if (t[i] != t[i-1]) {
                count++;
            }
        }
        printf("%d\\n", count);
    }
    return 0;
}"""

    q27_cpp = """#include <iostream>
#include <string>

using namespace std;

int main() {
    int n;
    string t;
    if (cin >> n >> t) {
        if (n <= 0 || t.empty()) {
            cout << 0 << endl;
            return 0;
        }
        int count = 1;
        for (int i = 1; i < n && i < (int)t.length(); ++i) {
            if (t[i] != t[i-1]) {
                count++;
            }
        }
        cout << count << endl;
    }
    return 0;
}"""

    q27_tests = [
        {"input": "6\naabccc", "expected": "3"},
        {"input": "5\nabcba", "expected": "5"},
        {"input": "4\naaaa", "expected": "1"},
        {"input": "1\nz", "expected": "1"}
    ]

    qs.append({
        "id": "Q-MV2BJIHA-7JX6",
        "title": "Question 27: Museum Audio Skip",
        "problemHtml": q27_html,
        "py": q27_py,
        "c": q27_c,
        "cpp": q27_cpp,
        "tests": q27_tests
    })

    # -------------------------------------------------------------------------
    # Q28: Airport Security Flow
    # -------------------------------------------------------------------------
    q28_html = """<h2>Problem Statement</h2>
<p>A single security lane serves <code>N</code> passengers with scan times stored in an integer array <code>S</code>. A running clock <code>C</code> starts at 0. For each passenger with scan time <code>t</code>:
<ul>
  <li>if <code>t > C</code>, reset <code>C</code> to <code>t</code>;</li>
  <li>otherwise, increase <code>C</code> by <code>t</code> (<code>C += t</code>).</li>
</ul>
After each update, add <code>C</code> to the total cumulative wait. Your task is to find and return an integer value representing the total cumulative wait.</p>
<p><b>Note:</b> The reset rule uses strict inequality (<code>t > C</code>).</p>
<p><b>Input Specification:</b><br>
Line 1: An integer <code>N</code>, representing the number of passengers.<br>
Line 2: <code>N</code> space-separated integers representing scan times <code>S</code>.
</p>
<p><b>Output Specification:</b><br>
Print an integer value representing the total cumulative wait.
</p>
<h3>Example 1:</h3>
<p>
<b>Input:</b><br>
<pre>3
5 2 10</pre>
<b>Output:</b><br>
<pre>22</pre>
<b>Explanation:</b><br>
C = 0, total = 0.<br>
Passenger 1 (t = 5): 5 > 0 -> C resets to 5; total += 5 -> total = 5.<br>
Passenger 2 (t = 2): 2 <= 5 -> C += 2 = 7; total += 7 -> total = 12.<br>
Passenger 3 (t = 10): 10 > 7 -> C resets to 10; total += 10 -> total = 22.<br>
Total cumulative wait = 22.
</p>
<h3>Example 2:</h3>
<p>
<b>Input:</b><br>
<pre>4
3 3 3 3</pre>
<b>Output:</b><br>
<pre>30</pre>
<b>Explanation:</b><br>
Passenger 1: C = 3, total = 3.<br>
Passenger 2: C = 6, total = 9.<br>
Passenger 3: C = 9, total = 18.<br>
Passenger 4: C = 12, total = 30.<br>
Total cumulative wait = 30.
</p>"""

    q28_py = """import sys

def main():
    tokens = sys.stdin.read().split()
    if not tokens:
        print(0)
        return
    n = int(tokens[0])
    s = list(map(int, tokens[1:1+n]))
    c = 0
    total = 0
    for t in s:
        if t > c:
            c = t
        else:
            c += t
        total += c
    print(total)

if __name__ == '__main__':
    main()"""

    q28_c = """#include <stdio.h>

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    long long c = 0, total = 0;
    for (int i = 0; i < n; i++) {
        long long t;
        scanf("%lld", &t);
        if (t > c) {
            c = t;
        } else {
            c += t;
        }
        total += c;
    }
    printf("%lld\\n", total);
    return 0;
}"""

    q28_cpp = """#include <iostream>

using namespace std;

int main() {
    int n;
    if (cin >> n) {
        long long c = 0, total = 0;
        for (int i = 0; i < n; ++i) {
            long long t;
            cin >> t;
            if (t > c) {
                c = t;
            } else {
                c += t;
            }
            total += c;
        }
        cout << total << endl;
    }
    return 0;
}"""

    q28_tests = [
        {"input": "3\n5 2 10", "expected": "22"},
        {"input": "4\n3 3 3 3", "expected": "30"},
        {"input": "1\n5", "expected": "5"},
        {"input": "2\n10 1", "expected": "21"}
    ]

    qs.append({
        "id": "Q-MV2BL0Y5-SLS0",
        "title": "Question 28: Airport Security Flow",
        "problemHtml": q28_html,
        "py": q28_py,
        "c": q28_c,
        "cpp": q28_cpp,
        "tests": q28_tests
    })

    # -------------------------------------------------------------------------
    # Q29: Elevator Trip Distance
    # -------------------------------------------------------------------------
    q29_html = """<h2>Problem Statement</h2>
<p>An elevator starts at floor 0 and receives <code>N</code> floor requests in order. It travels to each requested floor one after another and finally returns to floor 0. Your task is to find and return an integer value representing the total distance traveled.</p>
<p><b>Note:</b> All requested floors are non-negative integers. Requests are handled strictly in the given order.</p>
<p><b>Input Specification:</b><br>
Line 1: An integer <code>N</code>, representing the number of requests.<br>
Line 2: <code>N</code> space-separated integers representing the requested floors <code>F</code> in order.
</p>
<p><b>Output Specification:</b><br>
Print an integer value representing the total distance traveled.
</p>
<h3>Example 1:</h3>
<p>
<b>Input:</b><br>
<pre>3
3 8 5</pre>
<b>Output:</b><br>
<pre>16</pre>
<b>Explanation:</b><br>
Segment 0 -> 3: |3 - 0| = 3.<br>
Segment 3 -> 8: |8 - 3| = 5.<br>
Segment 8 -> 5: |5 - 8| = 3.<br>
Segment 5 -> 0: |0 - 5| = 5.<br>
Total distance = 3 + 5 + 3 + 5 = 16.
</p>
<h3>Example 2:</h3>
<p>
<b>Input:</b><br>
<pre>4
2 6 4 2</pre>
<b>Output:</b><br>
<pre>12</pre>
<b>Explanation:</b><br>
0 -> 2: 2.<br>
2 -> 6: 4.<br>
6 -> 4: 2.<br>
4 -> 2: 2.<br>
2 -> 0: 2.<br>
Total distance = 2 + 4 + 2 + 2 + 2 = 12.
</p>"""

    q29_py = """import sys

def main():
    tokens = sys.stdin.read().split()
    if not tokens:
        print(0)
        return
    n = int(tokens[0])
    f = list(map(int, tokens[1:1+n]))
    cur = 0
    dist = 0
    for target in f:
        dist += abs(target - cur)
        cur = target
    dist += abs(0 - cur)
    print(dist)

if __name__ == '__main__':
    main()"""

    q29_c = """#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    long long dist = 0;
    int cur = 0;
    for (int i = 0; i < n; i++) {
        int target;
        scanf("%d", &target);
        dist += abs(target - cur);
        cur = target;
    }
    dist += abs(0 - cur);
    printf("%lld\\n", dist);
    return 0;
}"""

    q29_cpp = """#include <iostream>
#include <cmath>

using namespace std;

int main() {
    int n;
    if (cin >> n) {
        long long dist = 0;
        int cur = 0;
        for (int i = 0; i < n; ++i) {
            int target;
            cin >> target;
            dist += abs(target - cur);
            cur = target;
        }
        dist += abs(0 - cur);
        cout << dist << endl;
    }
    return 0;
}"""

    q29_tests = [
        {"input": "3\n3 8 5", "expected": "16"},
        {"input": "4\n2 6 4 2", "expected": "12"},
        {"input": "1\n10", "expected": "20"},
        {"input": "2\n0 0", "expected": "0"}
    ]

    qs.append({
        "id": "Q-MV2BMWJ4-3CZC",
        "title": "Question 29: Elevator Trip Distance",
        "problemHtml": q29_html,
        "py": q29_py,
        "c": q29_c,
        "cpp": q29_cpp,
        "tests": q29_tests
    })

    # -------------------------------------------------------------------------
    # Q30: Treasure Map Scan
    # -------------------------------------------------------------------------
    q30_html = """<h2>Problem Statement</h2>
<p>An archeologist decodes a treasure map string <code>M</code> of length <code>N</code> containing uppercase symbols, digits, and lowercase letters. 'X' scores 10, 'O' scores 5, each digit ('0'-'9') contributes its numeric value, and all other characters score 0. Your task is to find and return an integer value representing the total treasure score.</p>
<p><b>Note:</b> Only 'X', 'O', and digits '0'-'9' contribute. All other characters score 0.</p>
<p><b>Input Specification:</b><br>
Line 1: An integer <code>N</code>, representing the map length.<br>
Line 2: A string <code>M</code> representing the encoded map.
</p>
<p><b>Output Specification:</b><br>
Print an integer value representing the total treasure score.
</p>
<h3>Example 1:</h3>
<p>
<b>Input:</b><br>
<pre>5
XO3aX</pre>
<b>Output:</b><br>
<pre>28</pre>
<b>Explanation:</b><br>
'X' -> 10.<br>
'O' -> 5.<br>
'3' -> 3.<br>
'a' -> 0.<br>
'X' -> 10.<br>
Total Treasure Score = 10 + 5 + 3 + 0 + 10 = 28.
</p>
<h3>Example 2:</h3>
<p>
<b>Input:</b><br>
<pre>4
OO5b</pre>
<b>Output:</b><br>
<pre>15</pre>
<b>Explanation:</b><br>
'O' (5) + 'O' (5) + '5' (5) + 'b' (0) = 15.
</p>"""

    q30_py = """import sys

def main():
    tokens = sys.stdin.read().split()
    if not tokens:
        print(0)
        return
    n = int(tokens[0])
    m = tokens[1] if len(tokens) > 1 else ""
    total = 0
    for ch in m[:n]:
        if ch == 'X':
            total += 10
        elif ch == 'O':
            total += 5
        elif ch.isdigit():
            total += int(ch)
    print(total)

if __name__ == '__main__':
    main()"""

    q30_c = """#include <stdio.h>
#include <string.h>

int main(void) {
    int n;
    char m[10000];
    if (scanf("%d %s", &n, m) == 2) {
        long long total = 0;
        for (int i = 0; i < n && m[i] != '\\0'; i++) {
            if (m[i] == 'X') {
                total += 10;
            } else if (m[i] == 'O') {
                total += 5;
            } else if (m[i] >= '0' && m[i] <= '9') {
                total += m[i] - '0';
            }
        }
        printf("%lld\\n", total);
    }
    return 0;
}"""

    q30_cpp = """#include <iostream>
#include <string>

using namespace std;

int main() {
    int n;
    string m;
    if (cin >> n >> m) {
        long long total = 0;
        for (int i = 0; i < n && i < (int)m.length(); ++i) {
            if (m[i] == 'X') {
                total += 10;
            } else if (m[i] == 'O') {
                total += 5;
            } else if (m[i] >= '0' && m[i] <= '9') {
                total += m[i] - '0';
            }
        }
        cout << total << endl;
    }
    return 0;
}"""

    q30_tests = [
        {"input": "5\nXO3aX", "expected": "28"},
        {"input": "4\nOO5b", "expected": "15"},
        {"input": "3\nabc", "expected": "0"},
        {"input": "4\nXXOO", "expected": "30"}
    ]

    qs.append({
        "id": "Q-MV2BOJTP-0QHC",
        "title": "Question 30: Treasure Map Scan",
        "problemHtml": q30_html,
        "py": q30_py,
        "c": q30_c,
        "cpp": q30_cpp,
        "tests": q30_tests
    })

    return qs
