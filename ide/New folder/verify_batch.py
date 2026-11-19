import sys
import io
from q_1_10 import get_questions_1_to_10
from q_11_20 import get_questions_11_to_20
from q_21_30 import get_questions_21_to_30

qs = get_questions_1_to_10() + get_questions_11_to_20() + get_questions_21_to_30()
print(f"Loaded {len(qs)} total questions.")

assert len(qs) == 30, f"Expected 30 questions, got {len(qs)}"

ids = set()
for idx, q in enumerate(qs, start=1):
    assert q['id'] not in ids, f"Duplicate id: {q['id']}"
    ids.add(q['id'])
    print(f"Testing Q{idx}: {q['title']} ({q['id']})...")
    py_code = q['py']
    for t_idx, t in enumerate(q['tests']):
        inp = t['input']
        exp = t['expected'].strip()
        
        old_stdin = sys.stdin
        old_stdout = sys.stdout
        sys.stdin = io.StringIO(inp)
        sys.stdout = io.StringIO()
        try:
            globs = {'__name__': '__main__'}
            exec(py_code, globs)
            actual = sys.stdout.getvalue().strip()
            assert actual == exp, f"Failed on Q{idx} test {t_idx+1}: input={repr(inp)}, expected={repr(exp)}, got={repr(actual)}"
        finally:
            sys.stdin = old_stdin
            sys.stdout = old_stdout

print("\n" + "="*50)
print("SUCCESS: ALL 30 QUESTIONS & 120 TEST CASES PASSED!")
print("="*50)
