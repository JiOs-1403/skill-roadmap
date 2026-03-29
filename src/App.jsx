import { useState } from "react";

const C = {
  accent: "#B8860B",
  accentL: "#FBF3DC",
  accentD: "#8B6408",
  bg: "#F9F8F5",
  card: "#FFFFFF",
  border: "#E8E4DC",
  text: "#1C1917",
  muted: "#78716C",
  success: "#16A34A",
};
const uid = () => Math.random().toString(36).slice(2, 9);
const pct = (sk) =>
  sk.milestones.length
    ? Math.round(
        (sk.milestones.filter((m) => m.done).length / sk.milestones.length) *
          100,
      )
    : 0;
const statusCol = (s) =>
  s === "Completed" ? C.success : s === "In Progress" ? C.accent : C.muted;

function Spinner({ s = 20 }) {
  return (
    <div
      style={{
        width: s,
        height: s,
        border: `3px solid ${C.accentL}`,
        borderTop: `3px solid ${C.accent}`,
        borderRadius: "50%",
        animation: "spin 0.8s linear infinite",
        flexShrink: 0,
      }}
    />
  );
}

function ProfileSetup({ onSave, existing }) {
  const [f, setF] = useState(
    existing || {
      name: "",
      age: "",
      location: "",
      field: "",
      experience: "Beginner",
      weeklyHours: "5",
      goals: "",
    },
  );
  const upd = (k, v) => setF((p) => ({ ...p, [k]: v }));
  const valid = f.name && f.age && f.field;
  const isEdit = !!existing;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: C.bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 480,
          background: C.card,
          borderRadius: 18,
          padding: 36,
          boxShadow: "0 4px 32px rgba(0,0,0,0.08)",
        }}
      >
        <div style={{ marginBottom: 28 }}>
          <div
            style={{
              width: 46,
              height: 46,
              background: C.accent,
              borderRadius: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 14,
              fontSize: 22,
            }}
          >
            🗺️
          </div>
          <h1
            style={{ margin: 0, fontSize: 21, fontWeight: 800, color: C.text }}
          >
            Skill Roadmap Tracker
          </h1>
          <p
            style={{
              margin: "6px 0 0",
              color: C.muted,
              fontSize: 13,
              lineHeight: 1.5,
            }}
          >
            {isEdit
              ? "Update your profile to refine AI personalisation."
              : "Tell us about yourself — the AI uses this to personalise your entire journey."}
          </p>
        </div>
        {[
          ["Your Name", "name", "text", "e.g. Tunde"],
          ["Age", "age", "number", "e.g. 22"],
          ["Location", "location", "text", "City, Country"],
          [
            "Field / Industry",
            "field",
            "text",
            "e.g. Software Engineering, Music, Finance",
          ],
          [
            "Weekly Learning Hours",
            "weeklyHours",
            "number",
            "Hours available per week",
          ],
        ].map(([label, key, type, ph]) => (
          <div key={key} style={{ marginBottom: 14 }}>
            <label
              style={{
                display: "block",
                fontSize: 12,
                fontWeight: 700,
                color: C.text,
                marginBottom: 5,
                textTransform: "uppercase",
                letterSpacing: 0.5,
              }}
            >
              {label}
            </label>
            <input
              type={type}
              value={f[key]}
              placeholder={ph}
              onChange={(e) => upd(key, e.target.value)}
              style={{
                width: "100%",
                padding: "10px 13px",
                borderRadius: 9,
                border: `1.5px solid ${C.border}`,
                fontSize: 14,
                color: C.text,
                background: C.bg,
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>
        ))}
        <div style={{ marginBottom: 14 }}>
          <label
            style={{
              display: "block",
              fontSize: 12,
              fontWeight: 700,
              color: C.text,
              marginBottom: 5,
              textTransform: "uppercase",
              letterSpacing: 0.5,
            }}
          >
            Experience Level
          </label>
          <div style={{ display: "flex", gap: 8 }}>
            {["Beginner", "Intermediate", "Advanced"].map((lv) => (
              <button
                key={lv}
                onClick={() => upd("experience", lv)}
                style={{
                  flex: 1,
                  padding: "9px 0",
                  borderRadius: 9,
                  border: `1.5px solid ${f.experience === lv ? C.accent : C.border}`,
                  background: f.experience === lv ? C.accentL : C.card,
                  color: f.experience === lv ? C.accentD : C.muted,
                  fontWeight: 700,
                  fontSize: 13,
                  cursor: "pointer",
                }}
              >
                {lv}
              </button>
            ))}
          </div>
        </div>
        <div style={{ marginBottom: 26 }}>
          <label
            style={{
              display: "block",
              fontSize: 12,
              fontWeight: 700,
              color: C.text,
              marginBottom: 5,
              textTransform: "uppercase",
              letterSpacing: 0.5,
            }}
          >
            Goals & Aspirations{" "}
            <span style={{ color: C.muted, textTransform: "none" }}>
              (optional)
            </span>
          </label>
          <textarea
            value={f.goals}
            onChange={(e) => upd("goals", e.target.value)}
            placeholder="e.g. Get a remote job, build a startup, master a craft..."
            rows={3}
            style={{
              width: "100%",
              padding: "10px 13px",
              borderRadius: 9,
              border: `1.5px solid ${C.border}`,
              fontSize: 14,
              color: C.text,
              background: C.bg,
              resize: "vertical",
              boxSizing: "border-box",
              fontFamily: "inherit",
            }}
          />
        </div>
        <button
          onClick={() => valid && onSave(f)}
          disabled={!valid}
          style={{
            width: "100%",
            padding: "13px 0",
            background: valid ? C.accent : C.border,
            color: "#fff",
            borderRadius: 11,
            fontWeight: 800,
            fontSize: 15,
            border: "none",
            cursor: valid ? "pointer" : "default",
          }}
        >
          {isEdit ? "Update Profile ✓" : "Start My Journey →"}
        </button>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } } * { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; } input:focus, textarea:focus { border-color: ${C.accent} !important; outline: none; }`}</style>
    </div>
  );
}

function SkillCard({ skill, onClick }) {
  const p = pct(skill);
  return (
    <div
      onClick={onClick}
      style={{
        background: C.card,
        border: `1.5px solid ${C.border}`,
        borderRadius: 14,
        padding: 20,
        cursor: "pointer",
        transition: "box-shadow 0.2s, border-color 0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.09)";
        e.currentTarget.style.borderColor = C.accent + "55";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.borderColor = C.border;
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 8,
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontSize: 10,
              fontWeight: 700,
              color: C.accent,
              textTransform: "uppercase",
              letterSpacing: 1.2,
              marginBottom: 4,
            }}
          >
            {skill.category || "Skill"}
          </div>
          <div
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: C.text,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {skill.title}
          </div>
        </div>
        <span
          style={{
            fontSize: 11,
            padding: "4px 10px",
            borderRadius: 20,
            background:
              skill.status === "Completed"
                ? "#DCFCE7"
                : skill.status === "In Progress"
                  ? C.accentL
                  : "#F3F4F6",
            color: statusCol(skill.status),
            fontWeight: 700,
            marginLeft: 10,
            flexShrink: 0,
          }}
        >
          {skill.status}
        </span>
      </div>
      {skill.description && (
        <p
          style={{
            fontSize: 13,
            color: C.muted,
            margin: "0 0 12px",
            lineHeight: 1.5,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {skill.description}
        </p>
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 12,
          color: C.muted,
          marginBottom: 7,
        }}
      >
        <span>
          {skill.milestones.filter((m) => m.done).length}/
          {skill.milestones.length} milestones
        </span>
        <span
          style={{ fontWeight: 800, color: p === 100 ? C.success : C.accent }}
        >
          {p}%
        </span>
      </div>
      <div style={{ height: 6, background: C.border, borderRadius: 99 }}>
        <div
          style={{
            height: "100%",
            width: `${p}%`,
            background: p === 100 ? C.success : C.accent,
            borderRadius: 99,
            transition: "width 0.5s",
          }}
        />
      </div>
    </div>
  );
}

function AddSkillModal({ onClose, onAdd, profile }) {
  const [form, setForm] = useState({
    title: "",
    category: "",
    description: "",
  });
  const [milestones, setMilestones] = useState([]);
  const [step, setStep] = useState(1);
  const [aiLoading, setAiLoading] = useState(false);
  const [newM, setNewM] = useState("");
  const upd = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const callAI = async (prompt) => {
    const res = await fetch("/api/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });
    const data = await res.json();
    return data.text || "";
  };

  const generateRoadmap = async () => {
    setAiLoading(true);
    const prompt = `You are an expert learning coach. Create a personalised learning roadmap for: "${form.title}"${form.category ? ` (${form.category})` : ""}.
Profile: Age ${profile.age}, Location: ${profile.location}, Field: ${profile.field}, Experience: ${profile.experience}, Weekly hours: ${profile.weeklyHours}h/week.
Goals: ${profile.goals || "General improvement"}.
Tailor steps to their local context in ${profile.location}. Return ONLY a JSON array with 7-10 milestones: [{"title":"...","description":"..."}]. No markdown, no preamble, just the JSON array.`;
    try {
      const result = await callAI(prompt);
      const parsed = JSON.parse(result.replace(/```json|```/g, "").trim());
      setMilestones(
        parsed.map((m) => ({
          id: uid(),
          title: m.title,
          description: m.description || "",
          done: false,
        })),
      );
      setStep(2);
    } catch {
      setMilestones([
        {
          id: uid(),
          title: "Getting started",
          description: "Add your milestones below.",
          done: false,
        },
      ]);
      setStep(2);
    }
    setAiLoading(false);
  };

  const addM = () => {
    if (newM.trim()) {
      setMilestones((ms) => [
        ...ms,
        { id: uid(), title: newM.trim(), description: "", done: false },
      ]);
      setNewM("");
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.45)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 200,
        padding: 16,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 520,
          background: C.card,
          borderRadius: 18,
          padding: 28,
          maxHeight: "88vh",
          overflowY: "auto",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 22,
          }}
        >
          <h2
            style={{ margin: 0, fontSize: 17, fontWeight: 800, color: C.text }}
          >
            {step === 1 ? "Add New Skill" : `📋 Review Roadmap`}
          </h2>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              fontSize: 22,
              cursor: "pointer",
              color: C.muted,
            }}
          >
            ×
          </button>
        </div>
        {step === 1 && (
          <>
            {[
              ["Skill Title *", "title", "input", "e.g. Learn Python"],
              ["Category *", "category", "input", "e.g. Programming, Music"],
              [
                "Goal / Description",
                "description",
                "textarea",
                "What do you want to achieve?",
              ],
            ].map(([label, key, type, ph]) => (
              <div key={key} style={{ marginBottom: 14 }}>
                <label
                  style={{
                    display: "block",
                    fontSize: 12,
                    fontWeight: 700,
                    color: C.text,
                    marginBottom: 5,
                  }}
                >
                  {label}
                </label>
                {type === "textarea" ? (
                  <textarea
                    value={form[key]}
                    onChange={(e) => upd(key, e.target.value)}
                    placeholder={ph}
                    rows={2}
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      borderRadius: 9,
                      border: `1.5px solid ${C.border}`,
                      fontSize: 14,
                      resize: "none",
                      boxSizing: "border-box",
                      fontFamily: "inherit",
                    }}
                  />
                ) : (
                  <input
                    value={form[key]}
                    onChange={(e) => upd(key, e.target.value)}
                    placeholder={ph}
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      borderRadius: 9,
                      border: `1.5px solid ${C.border}`,
                      fontSize: 14,
                      boxSizing: "border-box",
                    }}
                  />
                )}
              </div>
            ))}
            <div style={{ display: "flex", gap: 10, marginTop: 22 }}>
              <button
                onClick={generateRoadmap}
                disabled={!form.title || !form.category || aiLoading}
                style={{
                  flex: 1,
                  padding: "12px 0",
                  background:
                    form.title && form.category ? C.accentL : "#F3F4F6",
                  color: C.accentD,
                  border: `1.5px solid ${form.title && form.category ? C.accent + "55" : C.border}`,
                  borderRadius: 10,
                  fontWeight: 700,
                  fontSize: 13,
                  cursor: form.title && form.category ? "pointer" : "default",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                }}
              >
                {aiLoading ? (
                  <>
                    <Spinner s={16} /> Generating...
                  </>
                ) : (
                  "🤖 AI Generate Roadmap"
                )}
              </button>
              <button
                onClick={() => {
                  if (form.title && form.category) setStep(2);
                }}
                disabled={!form.title || !form.category}
                style={{
                  padding: "12px 18px",
                  background: form.title && form.category ? C.accent : C.border,
                  color: "#fff",
                  borderRadius: 10,
                  fontWeight: 700,
                  fontSize: 13,
                  cursor: form.title && form.category ? "pointer" : "default",
                  border: "none",
                }}
              >
                Manual →
              </button>
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <div style={{ marginBottom: 14 }}>
              {milestones.map((m, i) => (
                <div
                  key={m.id}
                  style={{
                    display: "flex",
                    gap: 10,
                    alignItems: "flex-start",
                    marginBottom: 8,
                    padding: "10px 12px",
                    background: C.bg,
                    borderRadius: 9,
                    border: `1px solid ${C.border}`,
                  }}
                >
                  <div
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: "50%",
                      background: C.accentL,
                      color: C.accentD,
                      fontSize: 11,
                      fontWeight: 800,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      marginTop: 1,
                    }}
                  >
                    {i + 1}
                  </div>
                  <div style={{ flex: 1 }}>
                    <input
                      value={m.title}
                      onChange={(e) =>
                        setMilestones((ms) =>
                          ms.map((x) =>
                            x.id === m.id ? { ...x, title: e.target.value } : x,
                          ),
                        )
                      }
                      style={{
                        width: "100%",
                        fontWeight: 600,
                        fontSize: 13,
                        border: "none",
                        background: "transparent",
                        color: C.text,
                        outline: "none",
                        boxSizing: "border-box",
                      }}
                    />
                    {m.description && (
                      <div
                        style={{ fontSize: 12, color: C.muted, marginTop: 2 }}
                      >
                        {m.description}
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() =>
                      setMilestones((ms) => ms.filter((x) => x.id !== m.id))
                    }
                    style={{
                      background: "none",
                      border: "none",
                      color: C.muted,
                      cursor: "pointer",
                      fontSize: 16,
                      padding: 0,
                    }}
                  >
                    ×
                  </button>
                </div>
              ))}
              <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                <input
                  value={newM}
                  onChange={(e) => setNewM(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addM()}
                  placeholder="Add a milestone..."
                  style={{
                    flex: 1,
                    padding: "9px 12px",
                    borderRadius: 9,
                    border: `1.5px dashed ${C.border}`,
                    fontSize: 13,
                    background: C.bg,
                    boxSizing: "border-box",
                  }}
                />
                <button
                  onClick={addM}
                  style={{
                    padding: "9px 14px",
                    background: C.accentL,
                    border: "none",
                    borderRadius: 9,
                    color: C.accentD,
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  +
                </button>
              </div>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button
                onClick={() => setStep(1)}
                style={{
                  padding: "11px 16px",
                  background: C.bg,
                  border: `1.5px solid ${C.border}`,
                  borderRadius: 10,
                  fontWeight: 600,
                  fontSize: 13,
                  cursor: "pointer",
                  color: C.muted,
                }}
              >
                ← Back
              </button>
              <button
                onClick={() => {
                  if (form.title)
                    onAdd({
                      id: uid(),
                      ...form,
                      status: "Not Started",
                      milestones,
                      createdAt: new Date().toISOString(),
                    });
                }}
                style={{
                  flex: 1,
                  padding: "11px 0",
                  background: C.accent,
                  color: "#fff",
                  borderRadius: 10,
                  fontWeight: 800,
                  fontSize: 14,
                  cursor: "pointer",
                  border: "none",
                }}
              >
                Save Skill ✓
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function Dashboard({
  profile,
  skills,
  onSelectSkill,
  onAddSkill,
  onEditProfile,
}) {
  const [showAdd, setShowAdd] = useState(false);
  const [filter, setFilter] = useState("All");
  const filtered =
    filter === "All" ? skills : skills.filter((s) => s.status === filter);
  const overall = skills.length
    ? Math.round(skills.reduce((a, s) => a + pct(s), 0) / skills.length)
    : 0;

  return (
    <div style={{ minHeight: "100vh", background: C.bg }}>
      <div
        style={{
          background: C.card,
          borderBottom: `1px solid ${C.border}`,
          padding: "14px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 36,
              height: 36,
              background: C.accent,
              borderRadius: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
            }}
          >
            🗺️
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 800, color: C.text }}>
              Skill Roadmap
            </div>
            <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>
              Hey {profile.name} 👋
            </div>
          </div>
        </div>
        <button
          onClick={onEditProfile}
          style={{
            background: "none",
            border: `1.5px solid ${C.border}`,
            borderRadius: 8,
            padding: "7px 14px",
            fontSize: 12,
            color: C.muted,
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          ✏️ Edit Profile
        </button>
      </div>
      <div style={{ maxWidth: 780, margin: "0 auto", padding: "28px 20px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 12,
            marginBottom: 22,
          }}
        >
          {[
            ["Total Skills", skills.length],
            [
              "In Progress",
              skills.filter((s) => s.status === "In Progress").length,
            ],
            [
              "Completed",
              skills.filter((s) => s.status === "Completed").length,
            ],
            ["Avg Progress", `${overall}%`],
          ].map(([label, val]) => (
            <div
              key={label}
              style={{
                background: C.card,
                border: `1.5px solid ${C.border}`,
                borderRadius: 12,
                padding: "14px 16px",
              }}
            >
              <div style={{ fontSize: 20, fontWeight: 800, color: C.text }}>
                {val}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: C.muted,
                  fontWeight: 600,
                  marginTop: 2,
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>
        {skills.length > 0 && (
          <div
            style={{
              background: C.accentL,
              borderRadius: 12,
              padding: "14px 18px",
              marginBottom: 22,
              border: `1.5px solid ${C.accent}33`,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 7,
                fontSize: 13,
                fontWeight: 700,
                color: C.accentD,
              }}
            >
              <span>Overall Progress</span>
              <span>{overall}%</span>
            </div>
            <div style={{ height: 8, background: "#E8D9A0", borderRadius: 99 }}>
              <div
                style={{
                  height: "100%",
                  width: `${overall}%`,
                  background: C.accent,
                  borderRadius: 99,
                  transition: "width 0.5s",
                }}
              />
            </div>
          </div>
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
            flexWrap: "wrap",
            gap: 10,
          }}
        >
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {["All", "Not Started", "In Progress", "Completed"].map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                style={{
                  padding: "6px 13px",
                  borderRadius: 20,
                  border: `1.5px solid ${filter === s ? C.accent : C.border}`,
                  background: filter === s ? C.accentL : C.card,
                  color: filter === s ? C.accentD : C.muted,
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                {s}
              </button>
            ))}
          </div>
          <button
            onClick={() => setShowAdd(true)}
            style={{
              background: C.accent,
              color: "#fff",
              border: "none",
              borderRadius: 10,
              padding: "9px 18px",
              fontWeight: 800,
              fontSize: 13,
              cursor: "pointer",
            }}
          >
            + Add Skill
          </button>
        </div>
        {filtered.length === 0 ? (
          <div
            style={{ textAlign: "center", padding: "70px 0", color: C.muted }}
          >
            <div style={{ fontSize: 44, marginBottom: 12 }}>🌱</div>
            <div style={{ fontSize: 15, fontWeight: 700 }}>No skills yet</div>
            <div style={{ fontSize: 13, marginTop: 4 }}>
              Click "+ Add Skill" to begin your roadmap
            </div>
          </div>
        ) : (
          <div style={{ display: "grid", gap: 12 }}>
            {filtered.map((sk) => (
              <SkillCard
                key={sk.id}
                skill={sk}
                onClick={() => onSelectSkill(sk.id)}
              />
            ))}
          </div>
        )}
      </div>
      {showAdd && (
        <AddSkillModal
          onClose={() => setShowAdd(false)}
          onAdd={(sk) => {
            onAddSkill(sk);
            setShowAdd(false);
          }}
          profile={profile}
        />
      )}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } } * { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }`}</style>
    </div>
  );
}

function SkillDetail({ skill, profile, onBack, onUpdate, onDelete }) {
  const [activeAI, setActiveAI] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiText, setAiText] = useState("");
  const [newM, setNewM] = useState("");
  const [showNewM, setShowNewM] = useState(false);
  const p = pct(skill);

  const callAI = async (prompt) => {
    setAiLoading(true);
    setAiText("");
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      setAiText(data.text || data.error || "No response. Please try again.");
    } catch {
      setAiText("Could not reach AI. Check your connection and try again.");
    }
    setAiLoading(false);
  };

  const ctx = `User: ${profile.name}, Age ${profile.age}, Location: ${profile.location}, Field: ${profile.field}, Experience: ${profile.experience}, ${profile.weeklyHours}h/week available. Goals: ${profile.goals || "general improvement"}.
Skill: "${skill.title}" (${skill.category}). Progress: ${p}%. Milestones: ${skill.milestones.map((m) => `${m.done ? "✓" : "○"} ${m.title}`).join(" | ")}.`;

  const prompts = {
    suggestions: `You are an expert learning coach with knowledge of African tech ecosystems. ${ctx}\nAnalyse the roadmap and suggest 4-5 specific improvements or resources. Tailor advice to ${profile.location} — mention locally accessible platforms, free tools, and practical workarounds. Be direct and actionable.`,
    planner: `You are an expert learning planner. ${ctx}\nCreate a personalised 4-week study plan given ${profile.weeklyHours}h/week. Format clearly as Week 1, Week 2, etc. Be specific about what to do each week. Be realistic for someone in ${profile.location}.`,
    insight: `You are a career analyst with knowledge of Nigerian, African, and global economies. ${ctx}\nProvide peer benchmarking: Where does a ${profile.age}-year-old in ${profile.location} with ${profile.experience} experience in ${profile.field} stand — locally in Nigeria, across Africa, and globally — if they master "${skill.title}"? Include: percentile context, local salary range, global positioning, and what doors this opens. Be honest and motivating.`,
    tips: `You are an elite learning strategist coaching African professionals to global competitiveness. ${ctx}\nGive 3 unconventional high-leverage tips for learning "${skill.title}" that most people in ${profile.location} overlook. Focus on free/affordable resources in Nigeria and what separates the top 10% of learners.`,
  };

  const runAI = (type) => {
    setActiveAI(type);
    callAI(prompts[type]);
  };

  const toggleM = (id) => {
    const updated = {
      ...skill,
      milestones: skill.milestones.map((m) =>
        m.id === id ? { ...m, done: !m.done } : m,
      ),
    };
    const allDone = updated.milestones.every((m) => m.done);
    const anyDone = updated.milestones.some((m) => m.done);
    updated.status = allDone
      ? "Completed"
      : anyDone
        ? "In Progress"
        : "Not Started";
    onUpdate(updated);
  };

  const addM = () => {
    if (newM.trim()) {
      onUpdate({
        ...skill,
        milestones: [
          ...skill.milestones,
          { id: uid(), title: newM.trim(), description: "", done: false },
        ],
      });
      setNewM("");
      setShowNewM(false);
    }
  };

  const aiButtons = [
    ["suggestions", "💡 Smart Suggestions"],
    ["planner", "📅 Weekly Planner"],
    ["insight", "🌍 World Standing"],
    ["tips", "⚡ Pro Tips"],
  ];

  return (
    <div style={{ minHeight: "100vh", background: C.bg }}>
      <div
        style={{
          background: C.card,
          borderBottom: `1px solid ${C.border}`,
          padding: "14px 20px",
          display: "flex",
          alignItems: "center",
          gap: 12,
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <button
          onClick={onBack}
          style={{
            background: "none",
            border: `1.5px solid ${C.border}`,
            borderRadius: 8,
            padding: "7px 13px",
            fontSize: 12,
            color: C.muted,
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          ← Back
        </button>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontSize: 10,
              fontWeight: 700,
              color: C.accent,
              textTransform: "uppercase",
              letterSpacing: 1.2,
            }}
          >
            {skill.category}
          </div>
          <div
            style={{
              fontSize: 16,
              fontWeight: 800,
              color: C.text,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {skill.title}
          </div>
        </div>
        <button
          onClick={() => {
            if (window.confirm(`Delete "${skill.title}"?`)) onDelete(skill.id);
          }}
          style={{
            background: "none",
            border: `1.5px solid #fecaca`,
            borderRadius: 8,
            padding: "7px 12px",
            fontSize: 12,
            color: "#DC2626",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          🗑 Delete
        </button>
      </div>
      <div style={{ maxWidth: 680, margin: "0 auto", padding: "24px 20px" }}>
        <div
          style={{
            background: C.card,
            border: `1.5px solid ${C.border}`,
            borderRadius: 14,
            padding: 20,
            marginBottom: 16,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.text }}>
                Progress
              </div>
              <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>
                {skill.milestones.filter((m) => m.done).length} of{" "}
                {skill.milestones.length} milestones ·{" "}
                <span
                  style={{ color: statusCol(skill.status), fontWeight: 700 }}
                >
                  {skill.status}
                </span>
              </div>
            </div>
            <div
              style={{
                fontSize: 28,
                fontWeight: 900,
                color: p === 100 ? C.success : C.accent,
              }}
            >
              {p}%
            </div>
          </div>
          <div style={{ height: 10, background: C.border, borderRadius: 99 }}>
            <div
              style={{
                height: "100%",
                width: `${p}%`,
                background:
                  p === 100
                    ? C.success
                    : `linear-gradient(90deg, ${C.accentD}, ${C.accent})`,
                borderRadius: 99,
                transition: "width 0.5s",
              }}
            />
          </div>
        </div>
        <div
          style={{
            background: C.card,
            border: `1.5px solid ${C.border}`,
            borderRadius: 14,
            padding: 20,
            marginBottom: 16,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <h3
              style={{
                margin: 0,
                fontSize: 14,
                fontWeight: 800,
                color: C.text,
              }}
            >
              Milestones
            </h3>
            <button
              onClick={() => setShowNewM(!showNewM)}
              style={{
                background: C.accentL,
                border: "none",
                borderRadius: 8,
                padding: "6px 13px",
                fontSize: 12,
                fontWeight: 700,
                color: C.accentD,
                cursor: "pointer",
              }}
            >
              + Add
            </button>
          </div>
          {showNewM && (
            <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
              <input
                value={newM}
                onChange={(e) => setNewM(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addM()}
                autoFocus
                placeholder="Milestone title..."
                style={{
                  flex: 1,
                  padding: "9px 12px",
                  borderRadius: 9,
                  border: `1.5px solid ${C.accent}`,
                  fontSize: 13,
                  boxSizing: "border-box",
                }}
              />
              <button
                onClick={addM}
                style={{
                  padding: "9px 14px",
                  background: C.accent,
                  border: "none",
                  borderRadius: 9,
                  color: "#fff",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Add
              </button>
              <button
                onClick={() => {
                  setShowNewM(false);
                  setNewM("");
                }}
                style={{
                  padding: "9px 12px",
                  background: C.bg,
                  border: `1px solid ${C.border}`,
                  borderRadius: 9,
                  cursor: "pointer",
                  color: C.muted,
                }}
              >
                ✕
              </button>
            </div>
          )}
          {skill.milestones.length === 0 && (
            <div
              style={{
                textAlign: "center",
                color: C.muted,
                fontSize: 13,
                padding: "20px 0",
              }}
            >
              No milestones yet.
            </div>
          )}
          {skill.milestones.map((m, i) => (
            <div
              key={m.id}
              onClick={() => toggleM(m.id)}
              style={{
                display: "flex",
                gap: 12,
                alignItems: "flex-start",
                padding: "11px 0",
                borderBottom:
                  i < skill.milestones.length - 1
                    ? `1px solid ${C.border}`
                    : "none",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: "50%",
                  border: `2px solid ${m.done ? C.success : C.border}`,
                  background: m.done ? C.success : "transparent",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  marginTop: 1,
                  transition: "all 0.2s",
                }}
              >
                {m.done && (
                  <span
                    style={{ color: "#fff", fontSize: 11, fontWeight: 800 }}
                  >
                    ✓
                  </span>
                )}
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: m.done ? C.muted : C.text,
                    textDecoration: m.done ? "line-through" : "none",
                  }}
                >
                  {m.title}
                </div>
                {m.description && (
                  <div style={{ fontSize: 12, color: C.muted, marginTop: 3 }}>
                    {m.description}
                  </div>
                )}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: C.muted,
                  fontWeight: 700,
                  flexShrink: 0,
                  marginTop: 3,
                }}
              >
                #{i + 1}
              </div>
            </div>
          ))}
        </div>
        <div
          style={{
            background: C.card,
            border: `1.5px solid ${C.border}`,
            borderRadius: 14,
            padding: 20,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 14,
            }}
          >
            <div
              style={{
                width: 30,
                height: 30,
                background: C.accentL,
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 15,
              }}
            >
              🤖
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 800, color: C.text }}>
                AI Assistant{" "}
                <span
                  style={{
                    fontSize: 11,
                    color: C.success,
                    fontWeight: 700,
                    marginLeft: 4,
                  }}
                >
                  ✦ Free
                </span>
              </div>
              <div style={{ fontSize: 11, color: C.muted }}>
                Personalised to {profile.name}, {profile.age},{" "}
                {profile.location}
              </div>
            </div>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 8,
              marginBottom: 16,
            }}
          >
            {aiButtons.map(([key, label]) => (
              <button
                key={key}
                onClick={() => runAI(key)}
                disabled={aiLoading}
                style={{
                  padding: "10px 12px",
                  borderRadius: 9,
                  border: `1.5px solid ${activeAI === key ? C.accent : C.border}`,
                  background: activeAI === key ? C.accentL : C.bg,
                  color: activeAI === key ? C.accentD : C.muted,
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: aiLoading ? "default" : "pointer",
                  textAlign: "left",
                }}
              >
                {label}
              </button>
            ))}
          </div>
          {aiLoading && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "16px 12px",
                background: C.accentL,
                borderRadius: 10,
                color: C.accentD,
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              <Spinner s={18} /> Generating personalised insights...
            </div>
          )}
          {!aiLoading && aiText && (
            <div
              style={{
                background: C.accentL,
                borderRadius: 10,
                padding: "16px 18px",
                border: `1px solid ${C.accent}33`,
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  color: C.accentD,
                  marginBottom: 10,
                  textTransform: "uppercase",
                  letterSpacing: 1,
                }}
              >
                {aiButtons.find(([k]) => k === activeAI)?.[1]}
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: C.text,
                  lineHeight: 1.75,
                  whiteSpace: "pre-wrap",
                }}
              >
                {aiText}
              </div>
            </div>
          )}
          {!aiLoading && !aiText && (
            <div
              style={{
                fontSize: 13,
                color: C.muted,
                textAlign: "center",
                padding: "10px 0",
              }}
            >
              Select an option above for AI insights tailored to you.
            </div>
          )}
        </div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } } * { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }`}</style>
    </div>
  );
}

export default function App() {
  const [profile, setProfile] = useState(() => {
    try {
      const p = localStorage.getItem("srm-profile");
      return p ? JSON.parse(p) : null;
    } catch {
      return null;
    }
  });
  const [skills, setSkills] = useState(() => {
    try {
      const s = localStorage.getItem("srm-skills");
      return s ? JSON.parse(s) : [];
    } catch {
      return [];
    }
  });
  const [view, setView] = useState(() => {
    try {
      return localStorage.getItem("srm-profile") ? "dashboard" : "profile";
    } catch {
      return "profile";
    }
  });
  const [selectedId, setSelectedId] = useState(null);

  const saveProfile = (p) => {
    setProfile(p);
    localStorage.setItem("srm-profile", JSON.stringify(p));
    setView("dashboard");
  };
  const saveSkills = (s) => {
    setSkills(s);
    localStorage.setItem("srm-skills", JSON.stringify(s));
  };

  if (view === "profile")
    return <ProfileSetup onSave={saveProfile} existing={profile} />;

  const sel = skills.find((s) => s.id === selectedId);
  if (view === "skill" && sel)
    return (
      <SkillDetail
        skill={sel}
        profile={profile}
        onBack={() => setView("dashboard")}
        onUpdate={(sk) =>
          saveSkills(skills.map((s) => (s.id === sk.id ? sk : s)))
        }
        onDelete={(id) => {
          saveSkills(skills.filter((s) => s.id !== id));
          setView("dashboard");
        }}
      />
    );

  return (
    <Dashboard
      profile={profile}
      skills={skills}
      onSelectSkill={(id) => {
        setSelectedId(id);
        setView("skill");
      }}
      onAddSkill={(sk) => saveSkills([...skills, sk])}
      onEditProfile={() => setView("profile")}
    />
  );
}
