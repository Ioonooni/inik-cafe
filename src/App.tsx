cd /workspaces/inik-cafe && \
python3 - <<'PY'
from pathlib import Path

p = Path("src/App.tsx")
text = p.read_text()

old_state = """const DEFAULT_RUNTIME_STATE: RuntimeState = {
  stage: "Observer",
  intimacy_score: 0,
  points: 0,
  relationship_state: {},
  user_profile: {},
  user_facts: {},
  recent_messages: [],
};
"""

new_state = """const DEFAULT_RUNTIME_STATE: RuntimeState = {
  stage: "Observer",
  intimacy_score: 0,
  points: 0,
  relationship_state: {},
  user_profile: {},
  user_facts: {},
  recent_messages: [],
};

const API_BASE = (
  import.meta.env.VITE_API_BASE_URL || "https://inik-agent.onrender.com"
).replace(/\\/$/, "");
"""

if "const API_BASE =" not in text:
    text = text.replace(old_state, new_state)

text = text.replace(
    "const r = await fetch(`/api/state?user_id=${encodeURIComponent(userId)}`);",
    "const r = await fetch(`${API_BASE}/api/state?user_id=${encodeURIComponent(userId)}`);"
)

text = text.replace(
    "const r=await fetch('/api/chat',{method:'POST',headers:{'Content-Type':'application/json'},",
    "const r=await fetch(`${API_BASE}/api/chat`,{method:'POST',headers:{'Content-Type':'application/json'},"
)

p.write_text(text)
print("OK: App.tsx fixed")
PY
npm run build
