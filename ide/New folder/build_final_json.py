import json
from q_1_10 import get_questions_1_to_10
from q_11_20 import get_questions_11_to_20
from q_21_30 import get_questions_21_to_30

# Load original metadata from SET-MV29WLF3-all-questions.json
with open('SET-MV29WLF3-all-questions.json', 'r', encoding='utf-8') as f:
    orig_data = json.load(f)

# Combine questions
all_raw_qs = get_questions_1_to_10() + get_questions_11_to_20() + get_questions_21_to_30()

formatted_questions = []
for q in all_raw_qs:
    formatted_questions.append({
        "id": q["id"],
        "title": q["title"],
        "problemHtml": q["problemHtml"],
        "code": q["py"],
        "codes": {
            "python": q["py"],
            "c": q["c"],
            "cpp": q["cpp"]
        },
        "language": "python",
        "problemLocked": False,
        "problemLockHash": "",
        "testsLocked": False,
        "testLockHash": "",
        "tests": [
            {
                "input": t["input"],
                "expected": t["expected"],
                "studentDefined": False
            } for t in q["tests"]
        ],
        "customFonts": []
    })

final_data = {
    "format": orig_data.get("format", "python-assessment-set"),
    "version": orig_data.get("version", 3),
    "setId": orig_data.get("setId", "SET-MV29WLF3"),
    "title": "Programming Assessment (C, C++, Python)",
    "timerMinutes": orig_data.get("timerMinutes", 60),
    "timerLocked": orig_data.get("timerLocked", False),
    "timerLockHash": orig_data.get("timerLockHash", ""),
    "customInputLocked": orig_data.get("customInputLocked", False),
    "customInputChecked": orig_data.get("customInputChecked", False),
    "customInputLockHash": orig_data.get("customInputLockHash", ""),
    "ownerConfig": orig_data.get("ownerConfig", {
        "email": "",
        "submissionMinutes": 10
    }),
    "language": "python",
    "packageSecurity": orig_data.get("packageSecurity", {
        "protected": False,
        "deleteQuestionsAllowed": True
    }),
    "totalQuestions": len(formatted_questions),
    "exportedAt": "2026-10-20T10:30:00.000Z",
    "questions": formatted_questions
}

with open('final.json', 'w', encoding='utf-8') as f:
    json.dump(final_data, f, indent=2, ensure_ascii=False)

print(f"Successfully generated final.json with {len(formatted_questions)} questions!")
