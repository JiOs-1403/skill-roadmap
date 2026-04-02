import { useState } from "react";

const C = {
  bg: "#0A0805",
  bg2: "#0F0C07",
  card: "#141108",
  cardHover: "#1A1610",
  glass: "rgba(255,255,255,0.03)",
  border: "#2A2010",
  borderGlow: "#C9920A44",
  accent: "#C9920A",
  accentL: "#C9920A18",
  accentD: "#7C5104",
  grad: "linear-gradient(135deg, #7C5104 0%, #C9920A 50%, #F5C842 100%)",
  gradDeep:
    "linear-gradient(135deg, #1A0E00 0%, #3D2200 40%, #7C5104 80%, #C9920A 100%)",
  gradText: "linear-gradient(135deg, #E6A817 0%, #F5C842 60%, #FDE68A 100%)",
  gradBar: "linear-gradient(90deg, #7C5104, #C9920A, #F5C842)",
  gradGlow: "linear-gradient(135deg, #C9920A22 0%, #F5C84211 100%)",
  text: "#F2EDE4",
  textDim: "#A89880",
  muted: "#6B5C48",
  success: "#22C55E",
  successBg: "#052010",
  glow: "0 0 20px rgba(201,146,10,0.3)",
  glowSm: "0 0 12px rgba(201,146,10,0.2)",
};

const uid = () => Math.random().toString(36).slice(2, 9);
const pct = (sk) =>
  sk.milestones.length
    ? Math.round(
        (sk.milestones.filter((m) => m.done).length / sk.milestones.length) *
          100,
      )
    : 0;

const statusStyle = (s) =>
  s === "Completed"
    ? { bg: C.successBg, color: C.success, border: "#052010" }
    : s === "In Progress"
      ? { bg: C.accentL, color: "#F5C842", border: C.borderGlow }
      : { bg: "#1A1610", color: C.muted, border: C.border };

function Spinner({ s = 20 }) {
  return (
    <div
      style={{
        width: s,
        height: s,
        border: `2px solid ${C.border}`,
        borderTop: `2px solid ${C.accent}`,
        borderRadius: "50%",
        animation: "spin 0.7s linear infinite",
        flexShrink: 0,
      }}
    />
  );
}

function GradText({ children, style = {} }) {
  return (
    <span
      style={{
        background: C.gradText,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        ...style,
      }}
    >
      {children}
    </span>
  );
}

function Card({
  children,
  style = {},
  glow = false,
  onClick,
  onMouseEnter,
  onMouseLeave,
}) {
  return (
    <div
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        background: C.card,
        border: `1px solid ${C.border}`,
        borderRadius: 18,
        boxShadow: glow
          ? `0 4px 32px rgba(201,146,10,0.12), inset 0 1px 0 rgba(255,255,255,0.04)`
          : `inset 0 1px 0 rgba(255,255,255,0.04)`,
        transition: "all 0.2s",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function GlowBtn({
  children,
  onClick,
  disabled,
  style = {},
  variant = "primary",
}) {
  const base =
    variant === "primary"
      ? {
          background: C.grad,
          color: "#0A0805",
          boxShadow: disabled ? "none" : C.glow,
        }
      : variant === "ghost"
        ? {
            background: C.accentL,
            color: "#F5C842",
            border: `1px solid ${C.borderGlow}`,
          }
        : {
            background: C.card,
            color: C.textDim,
            border: `1px solid ${C.border}`,
          };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        border: "none",
        borderRadius: 12,
        fontWeight: 800,
        cursor: disabled ? "default" : "pointer",
        fontSize: 14,
        transition: "all 0.2s",
        opacity: disabled ? 0.4 : 1,
        ...base,
        ...style,
      }}
    >
      {children}
    </button>
  );
}

// ── Profile Setup ─────────────────────────────────────────────────────────────
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

  const inputStyle = {
    width: "100%",
    padding: "11px 14px",
    borderRadius: 11,
    border: `1px solid ${C.border}`,
    fontSize: 14,
    color: C.text,
    background: C.bg2,
    outline: "none",
    boxSizing: "border-box",
    transition: "border 0.2s",
  };

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
      {/* Background glow */}
      <div
        style={{
          position: "fixed",
          top: "-20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: 600,
          height: 400,
          background:
            "radial-gradient(ellipse, rgba(201,146,10,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          width: "100%",
          maxWidth: 480,
          position: "relative",
          zIndex: 1,
        }}
      >
        <Card
          glow
          style={{
            padding: "40px 36px",
            boxShadow:
              "0 24px 80px rgba(0,0,0,0.6), 0 0 40px rgba(201,146,10,0.08)",
          }}
        >
          {/* Logo */}
          <div style={{ marginBottom: 32 }}>
            <div
              style={{
                width: 56,
                height: 56,
                background: C.grad,
                borderRadius: 16,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 26,
                boxShadow: C.glow,
                marginBottom: 18,
              }}
            >
              🗺️
            </div>
            <h1 style={{ fontSize: 24, fontWeight: 900, marginBottom: 6 }}>
              <GradText>Skill Roadmap Tracker</GradText>
            </h1>
            <p style={{ color: C.muted, fontSize: 13, lineHeight: 1.6 }}>
              {isEdit
                ? "Update your profile to refine AI personalisation."
                : "Your personal AI-powered journey starts here."}
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
              "Hours per week",
            ],
          ].map(([label, key, type, ph]) => (
            <div key={key} style={{ marginBottom: 14 }}>
              <label
                style={{
                  display: "block",
                  fontSize: 11,
                  fontWeight: 700,
                  color: C.textDim,
                  marginBottom: 6,
                  textTransform: "uppercase",
                  letterSpacing: 0.8,
                }}
              >
                {label}
              </label>
              <input
                type={type}
                value={f[key]}
                placeholder={ph}
                onChange={(e) => upd(key, e.target.value)}
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = C.accent)}
                onBlur={(e) => (e.target.style.borderColor = C.border)}
              />
            </div>
          ))}

          <div style={{ marginBottom: 14 }}>
            <label
              style={{
                display: "block",
                fontSize: 11,
                fontWeight: 700,
                color: C.textDim,
                marginBottom: 6,
                textTransform: "uppercase",
                letterSpacing: 0.8,
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
                    borderRadius: 10,
                    border: `1px solid ${f.experience === lv ? C.accent : C.border}`,
                    background: f.experience === lv ? C.accentL : C.bg2,
                    color: f.experience === lv ? "#F5C842" : C.muted,
                    fontWeight: 700,
                    fontSize: 12,
                    cursor: "pointer",
                    transition: "all 0.15s",
                    boxShadow: f.experience === lv ? C.glowSm : "none",
                  }}
                >
                  {lv}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 28 }}>
            <label
              style={{
                display: "block",
                fontSize: 11,
                fontWeight: 700,
                color: C.textDim,
                marginBottom: 6,
                textTransform: "uppercase",
                letterSpacing: 0.8,
              }}
            >
              Goals{" "}
              <span
                style={{
                  color: C.muted,
                  textTransform: "none",
                  letterSpacing: 0,
                  fontWeight: 500,
                }}
              >
                (optional)
              </span>
            </label>
            <textarea
              value={f.goals}
              onChange={(e) => upd("goals", e.target.value)}
              placeholder="e.g. Get a remote job, build a startup, master a craft..."
              rows={3}
              style={{ ...inputStyle, resize: "vertical" }}
              onFocus={(e) => (e.target.style.borderColor = C.accent)}
              onBlur={(e) => (e.target.style.borderColor = C.border)}
            />
          </div>

          <GlowBtn
            onClick={() => valid && onSave(f)}
            disabled={!valid}
            style={{
              width: "100%",
              padding: "14px 0",
              fontSize: 15,
              borderRadius: 13,
            }}
          >
            {isEdit ? "Update Profile ✓" : "Start My Journey →"}
          </GlowBtn>
        </Card>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

// ── Skill Card ────────────────────────────────────────────────────────────────
function SkillCard({ skill, onClick }) {
  const p = pct(skill);
  const ss = statusStyle(skill.status);
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? C.cardHover : C.card,
        border: `1px solid ${hovered ? C.borderGlow : C.border}`,
        borderRadius: 18,
        padding: "20px 22px",
        cursor: "pointer",
        transition: "all 0.2s",
        boxShadow: hovered
          ? `0 8px 32px rgba(0,0,0,0.4), ${C.glowSm}`
          : "0 2px 12px rgba(0,0,0,0.3)",
        transform: hovered ? "translateY(-2px)" : "none",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 10,
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontSize: 10,
              fontWeight: 800,
              background: C.gradText,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textTransform: "uppercase",
              letterSpacing: 1.5,
              marginBottom: 5,
            }}
          >
            {skill.category || "Skill"}
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
        <span
          style={{
            fontSize: 11,
            padding: "4px 11px",
            borderRadius: 99,
            background: ss.bg,
            color: ss.color,
            fontWeight: 700,
            marginLeft: 12,
            flexShrink: 0,
            border: `1px solid ${ss.border}`,
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
            margin: "0 0 14px",
            lineHeight: 1.55,
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
          marginBottom: 8,
        }}
      >
        <span>
          {skill.milestones.filter((m) => m.done).length}/
          {skill.milestones.length} milestones
        </span>
        <span
          style={{ fontWeight: 800, color: p === 100 ? C.success : "#F5C842" }}
        >
          {p}%
        </span>
      </div>
      <div style={{ height: 5, background: C.border, borderRadius: 99 }}>
        <div
          style={{
            height: "100%",
            width: `${p}%`,
            background: p === 100 ? C.success : C.gradBar,
            borderRadius: 99,
            transition: "width 0.6s ease",
            boxShadow: p > 0 ? C.glowSm : "none",
          }}
        />
      </div>
    </div>
  );
}

// ── Add Skill Modal ───────────────────────────────────────────────────────────
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
  const canAI = form.title && form.category;

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
    const prompt = `You are an expert learning coach. Create a personalised roadmap for: "${form.title}" (${form.category}).
Profile: Age ${profile.age}, ${profile.location}, ${profile.field}, ${profile.experience}, ${profile.weeklyHours}h/week. Goals: ${profile.goals || "general improvement"}.
Tailor to ${profile.location}. Return ONLY a JSON array, 7-10 items: [{"title":"...","description":"..."}]. No markdown.`;
    try {
      const r = await callAI(prompt);
      const parsed = JSON.parse(r.replace(/```json|```/g, "").trim());
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
        { id: uid(), title: "Getting started", description: "", done: false },
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

  const inputStyle = {
    width: "100%",
    padding: "11px 14px",
    borderRadius: 11,
    border: `1px solid ${C.border}`,
    fontSize: 14,
    color: C.text,
    background: C.bg,
    outline: "none",
    boxSizing: "border-box",
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.75)",
        backdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 200,
        padding: 16,
      }}
    >
      <Card
        glow
        style={{
          width: "100%",
          maxWidth: 520,
          padding: 28,
          maxHeight: "88vh",
          overflowY: "auto",
          boxShadow:
            "0 24px 80px rgba(0,0,0,0.7), 0 0 40px rgba(201,146,10,0.1)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 24,
          }}
        >
          <h2 style={{ fontSize: 18, fontWeight: 900 }}>
            {step === 1 ? (
              <GradText>Add New Skill</GradText>
            ) : (
              <GradText>Review Roadmap</GradText>
            )}
          </h2>
          <button
            onClick={onClose}
            style={{
              background: C.bg2,
              border: `1px solid ${C.border}`,
              width: 32,
              height: 32,
              borderRadius: 8,
              fontSize: 18,
              cursor: "pointer",
              color: C.muted,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ×
          </button>
        </div>

        {step === 1 && (
          <>
            {[
              [
                "Skill Title *",
                "title",
                "input",
                "e.g. Learn Python, Master Guitar",
              ],
              [
                "Category *",
                "category",
                "input",
                "e.g. Programming, Music, Design",
              ],
              [
                "Description",
                "description",
                "textarea",
                "What do you want to achieve?",
              ],
            ].map(([label, key, type, ph]) => (
              <div key={key} style={{ marginBottom: 14 }}>
                <label
                  style={{
                    display: "block",
                    fontSize: 11,
                    fontWeight: 700,
                    color: C.textDim,
                    marginBottom: 6,
                    textTransform: "uppercase",
                    letterSpacing: 0.8,
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
                    style={{ ...inputStyle, resize: "none" }}
                  />
                ) : (
                  <input
                    value={form[key]}
                    onChange={(e) => upd(key, e.target.value)}
                    placeholder={ph}
                    style={inputStyle}
                  />
                )}
              </div>
            ))}
            <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
              <button
                onClick={generateRoadmap}
                disabled={!canAI || aiLoading}
                style={{
                  flex: 1,
                  padding: "12px 0",
                  background: canAI ? C.accentL : C.bg2,
                  color: canAI ? "#F5C842" : C.muted,
                  border: `1px solid ${canAI ? C.borderGlow : C.border}`,
                  borderRadius: 12,
                  fontWeight: 700,
                  fontSize: 13,
                  cursor: canAI ? "pointer" : "default",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  boxShadow: canAI ? C.glowSm : "none",
                }}
              >
                {aiLoading ? (
                  <>
                    <Spinner s={15} /> Generating...
                  </>
                ) : (
                  "🤖 AI Generate"
                )}
              </button>
              <GlowBtn
                onClick={() => canAI && setStep(2)}
                disabled={!canAI}
                style={{ padding: "12px 20px" }}
              >
                Manual →
              </GlowBtn>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div style={{ marginBottom: 16 }}>
              {milestones.map((m, i) => (
                <div
                  key={m.id}
                  style={{
                    display: "flex",
                    gap: 10,
                    alignItems: "flex-start",
                    marginBottom: 8,
                    padding: "11px 13px",
                    background: C.bg,
                    borderRadius: 11,
                    border: `1px solid ${C.border}`,
                  }}
                >
                  <div
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: "50%",
                      background: C.grad,
                      color: "#0A0805",
                      fontSize: 11,
                      fontWeight: 900,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      marginTop: 1,
                      boxShadow: C.glowSm,
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
                        fontWeight: 700,
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
                        style={{
                          fontSize: 12,
                          color: C.muted,
                          marginTop: 3,
                          lineHeight: 1.4,
                        }}
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
                      fontSize: 18,
                      padding: 0,
                      lineHeight: 1,
                    }}
                  >
                    ×
                  </button>
                </div>
              ))}
              <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                <input
                  value={newM}
                  onChange={(e) => setNewM(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addM()}
                  placeholder="Add a milestone..."
                  style={{ ...inputStyle, borderStyle: "dashed" }}
                />
                <GlowBtn
                  onClick={addM}
                  style={{ padding: "11px 16px", flexShrink: 0 }}
                >
                  +
                </GlowBtn>
              </div>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <GlowBtn
                variant="outline"
                onClick={() => setStep(1)}
                style={{ padding: "12px 16px" }}
              >
                ← Back
              </GlowBtn>
              <GlowBtn
                onClick={() =>
                  form.title &&
                  onAdd({
                    id: uid(),
                    ...form,
                    status: "Not Started",
                    milestones,
                    createdAt: new Date().toISOString(),
                  })
                }
                style={{ flex: 1, padding: "12px 0", fontSize: 14 }}
              >
                Save Skill ✓
              </GlowBtn>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}

// ── Dashboard ─────────────────────────────────────────────────────────────────
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
      {/* Background ambient glow */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: 800,
          height: 300,
          background:
            "radial-gradient(ellipse, rgba(201,146,10,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Navbar */}
      <div
        style={{
          background: "rgba(10,8,5,0.85)",
          backdropFilter: "blur(20px)",
          borderBottom: `1px solid ${C.border}`,
          padding: "13px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
          <div
            style={{
              width: 38,
              height: 38,
              background: C.grad,
              borderRadius: 11,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 19,
              boxShadow: C.glowSm,
            }}
          >
            🗺️
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 900, color: C.text }}>
              Skill Roadmap
            </div>
            <div style={{ fontSize: 11, color: C.muted, marginTop: 1 }}>
              Hey {profile.name} 👋
            </div>
          </div>
        </div>
        <button
          onClick={onEditProfile}
          style={{
            background: C.accentL,
            border: `1px solid ${C.borderGlow}`,
            borderRadius: 9,
            padding: "7px 15px",
            fontSize: 12,
            color: "#F5C842",
            cursor: "pointer",
            fontWeight: 700,
          }}
        >
          ✏️ Edit Profile
        </button>
      </div>

      <div
        style={{
          maxWidth: 800,
          margin: "0 auto",
          padding: "28px 20px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 12,
            marginBottom: 20,
          }}
        >
          {[
            ["📚", "Total", skills.length],
            [
              "🔥",
              "Active",
              skills.filter((s) => s.status === "In Progress").length,
            ],
            [
              "✅",
              "Done",
              skills.filter((s) => s.status === "Completed").length,
            ],
            ["📈", "Avg", `${overall}%`],
          ].map(([icon, label, val]) => (
            <Card
              key={label}
              style={{ padding: "16px 18px", textAlign: "center" }}
            >
              <div style={{ fontSize: 20, marginBottom: 6 }}>{icon}</div>
              <div style={{ fontSize: 22, fontWeight: 900 }}>
                <GradText>{val}</GradText>
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: C.muted,
                  fontWeight: 600,
                  marginTop: 3,
                }}
              >
                {label}
              </div>
            </Card>
          ))}
        </div>

        {/* Overall progress */}
        {skills.length > 0 && (
          <Card glow style={{ padding: "18px 22px", marginBottom: 20 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <span style={{ fontSize: 13, fontWeight: 700, color: C.textDim }}>
                Overall Progress
              </span>
              <GradText style={{ fontSize: 15, fontWeight: 900 }}>
                {overall}%
              </GradText>
            </div>
            <div style={{ height: 8, background: C.border, borderRadius: 99 }}>
              <div
                style={{
                  height: "100%",
                  width: `${overall}%`,
                  background: C.gradBar,
                  borderRadius: 99,
                  transition: "width 0.7s ease",
                  boxShadow: overall > 0 ? C.glow : "none",
                }}
              />
            </div>
          </Card>
        )}

        {/* Filters + Add */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 18,
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
                  padding: "6px 14px",
                  borderRadius: 99,
                  border: `1px solid ${filter === s ? C.accent : C.border}`,
                  background: filter === s ? C.accentL : "transparent",
                  color: filter === s ? "#F5C842" : C.muted,
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: "pointer",
                  transition: "all 0.15s",
                  boxShadow: filter === s ? C.glowSm : "none",
                }}
              >
                {s}
              </button>
            ))}
          </div>
          <GlowBtn
            onClick={() => setShowAdd(true)}
            style={{ padding: "9px 20px" }}
          >
            + Add Skill
          </GlowBtn>
        </div>

        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <div style={{ fontSize: 52, marginBottom: 14 }}>🌱</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: C.text }}>
              No skills yet
            </div>
            <div style={{ fontSize: 13, color: C.muted, marginTop: 6 }}>
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
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

// ── Skill Detail ──────────────────────────────────────────────────────────────
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
      setAiText("Could not reach AI. Check your connection.");
    }
    setAiLoading(false);
  };

  const ctx = `User: ${profile.name}, Age ${profile.age}, ${profile.location}, ${profile.field}, ${profile.experience}, ${profile.weeklyHours}h/week. Goals: ${profile.goals || "general improvement"}. Skill: "${skill.title}" (${skill.category}). Progress: ${p}%. Milestones: ${skill.milestones.map((m) => `${m.done ? "✓" : "○"} ${m.title}`).join(" | ")}.`;

  const aiPrompts = {
    suggestions: `Expert learning coach. ${ctx}\nSuggest 4-5 specific improvements/resources. Tailor to ${profile.location} — mention locally accessible platforms and free tools.`,
    planner: `Expert learning planner. ${ctx}\nCreate a 4-week plan for ${profile.weeklyHours}h/week. Format: Week 1, Week 2, etc. Specific and realistic for ${profile.location}.`,
    insight: `Career analyst. ${ctx}\nPeer benchmarking: where does a ${profile.age}-year-old in ${profile.location} with ${profile.experience} in ${profile.field} stand locally, in Africa, and globally if they master "${skill.title}"? Include percentiles, salary range, doors opened. Be honest and motivating.`,
    tips: `Elite learning strategist for African professionals. ${ctx}\n3 unconventional high-leverage tips for "${skill.title}" most people in ${profile.location} overlook. Focus on free resources and top 10% habits.`,
  };

  const runAI = (type) => {
    setActiveAI(type);
    callAI(aiPrompts[type]);
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
    ["suggestions", "💡 Suggestions"],
    ["planner", "📅 Planner"],
    ["insight", "🌍 World Standing"],
    ["tips", "⚡ Pro Tips"],
  ];

  return (
    <div style={{ minHeight: "100vh", background: C.bg }}>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: 800,
          height: 300,
          background:
            "radial-gradient(ellipse, rgba(201,146,10,0.05) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Header */}
      <div
        style={{
          background: "rgba(10,8,5,0.85)",
          backdropFilter: "blur(20px)",
          borderBottom: `1px solid ${C.border}`,
          padding: "13px 20px",
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
            background: C.accentL,
            border: `1px solid ${C.borderGlow}`,
            borderRadius: 9,
            padding: "7px 14px",
            fontSize: 12,
            color: "#F5C842",
            cursor: "pointer",
            fontWeight: 700,
          }}
        >
          ← Back
        </button>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontSize: 10,
              fontWeight: 800,
              background: C.gradText,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textTransform: "uppercase",
              letterSpacing: 1.5,
            }}
          >
            {skill.category}
          </div>
          <div
            style={{
              fontSize: 16,
              fontWeight: 900,
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
            background: "rgba(239,68,68,0.1)",
            border: "1px solid rgba(239,68,68,0.2)",
            borderRadius: 9,
            padding: "7px 12px",
            fontSize: 12,
            color: "#F87171",
            cursor: "pointer",
            fontWeight: 700,
          }}
        >
          🗑 Delete
        </button>
      </div>

      <div
        style={{
          maxWidth: 680,
          margin: "0 auto",
          padding: "24px 20px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Progress card */}
        <Card glow style={{ padding: "22px 24px", marginBottom: 14 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 14,
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: C.text,
                  marginBottom: 4,
                }}
              >
                Progress
              </div>
              <div style={{ fontSize: 12, color: C.muted }}>
                {skill.milestones.filter((m) => m.done).length} of{" "}
                {skill.milestones.length} milestones ·{" "}
                <span
                  style={{
                    color:
                      skill.status === "Completed"
                        ? C.success
                        : skill.status === "In Progress"
                          ? "#F5C842"
                          : C.muted,
                    fontWeight: 700,
                  }}
                >
                  {skill.status}
                </span>
              </div>
            </div>
            <div style={{ fontSize: 36, fontWeight: 900, lineHeight: 1 }}>
              <GradText>{p}%</GradText>
            </div>
          </div>
          <div style={{ height: 10, background: C.border, borderRadius: 99 }}>
            <div
              style={{
                height: "100%",
                width: `${p}%`,
                background: p === 100 ? C.success : C.gradBar,
                borderRadius: 99,
                transition: "width 0.6s ease",
                boxShadow: p > 0 ? C.glow : "none",
              }}
            />
          </div>
        </Card>

        {/* Milestones */}
        <Card style={{ padding: "22px 24px", marginBottom: 14 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 18,
            }}
          >
            <h3 style={{ fontSize: 14, fontWeight: 800, color: C.text }}>
              Milestones
            </h3>
            <button
              onClick={() => setShowNewM(!showNewM)}
              style={{
                background: C.accentL,
                border: `1px solid ${C.borderGlow}`,
                borderRadius: 8,
                padding: "6px 14px",
                fontSize: 12,
                fontWeight: 700,
                color: "#F5C842",
                cursor: "pointer",
              }}
            >
              + Add
            </button>
          </div>
          {showNewM && (
            <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
              <input
                value={newM}
                onChange={(e) => setNewM(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addM()}
                autoFocus
                placeholder="Milestone title..."
                style={{
                  flex: 1,
                  padding: "10px 13px",
                  borderRadius: 10,
                  border: `1px solid ${C.accent}`,
                  fontSize: 13,
                  background: C.bg,
                  color: C.text,
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
              <GlowBtn
                onClick={addM}
                style={{ padding: "10px 16px", flexShrink: 0 }}
              >
                Add
              </GlowBtn>
              <button
                onClick={() => {
                  setShowNewM(false);
                  setNewM("");
                }}
                style={{
                  padding: "10px 13px",
                  background: C.bg2,
                  border: `1px solid ${C.border}`,
                  borderRadius: 10,
                  cursor: "pointer",
                  color: C.muted,
                  fontWeight: 700,
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
                padding: "24px 0",
              }}
            >
              No milestones yet. Add some above or use AI to generate a roadmap.
            </div>
          )}
          {skill.milestones.map((m, i) => (
            <div
              key={m.id}
              onClick={() => toggleM(m.id)}
              style={{
                display: "flex",
                gap: 13,
                alignItems: "flex-start",
                padding: "12px 0",
                borderBottom:
                  i < skill.milestones.length - 1
                    ? `1px solid ${C.border}`
                    : "none",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  border: `2px solid ${m.done ? C.success : C.border}`,
                  background: m.done ? C.success : "transparent",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  marginTop: 1,
                  transition: "all 0.2s",
                  boxShadow: m.done ? "0 0 10px rgba(34,197,94,0.4)" : "none",
                }}
              >
                {m.done && (
                  <span
                    style={{ color: "#0A0805", fontSize: 11, fontWeight: 900 }}
                  >
                    ✓
                  </span>
                )}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: m.done ? C.muted : C.text,
                    textDecoration: m.done ? "line-through" : "none",
                    transition: "all 0.2s",
                  }}
                >
                  {m.title}
                </div>
                {m.description && (
                  <div
                    style={{
                      fontSize: 12,
                      color: C.muted,
                      marginTop: 3,
                      lineHeight: 1.5,
                    }}
                  >
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
        </Card>

        {/* AI Panel */}
        <Card glow style={{ padding: "22px 24px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 18,
            }}
          >
            <div
              style={{
                width: 38,
                height: 38,
                background: C.grad,
                borderRadius: 11,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
                boxShadow: C.glow,
                flexShrink: 0,
              }}
            >
              🤖
            </div>
            <div>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 900,
                  color: C.text,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                AI Assistant
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 800,
                    color: C.success,
                    background: C.successBg,
                    border: `1px solid #052010`,
                    padding: "2px 8px",
                    borderRadius: 99,
                  }}
                >
                  ✦ FREE
                </span>
              </div>
              <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>
                Personalised · {profile.name}, {profile.age}, {profile.location}
              </div>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 8,
              marginBottom: 18,
            }}
          >
            {aiButtons.map(([key, label]) => (
              <button
                key={key}
                onClick={() => runAI(key)}
                disabled={aiLoading}
                style={{
                  padding: "11px 14px",
                  borderRadius: 11,
                  border: `1px solid ${activeAI === key ? C.accent : C.border}`,
                  background: activeAI === key ? C.accentL : C.bg2,
                  color: activeAI === key ? "#F5C842" : C.textDim,
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: aiLoading ? "default" : "pointer",
                  textAlign: "left",
                  transition: "all 0.15s",
                  boxShadow: activeAI === key ? C.glowSm : "none",
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
                gap: 12,
                padding: "18px 16px",
                background: C.accentL,
                borderRadius: 12,
                border: `1px solid ${C.borderGlow}`,
              }}
            >
              <Spinner s={18} />
              <span style={{ color: "#F5C842", fontSize: 13, fontWeight: 700 }}>
                Generating personalised insights...
              </span>
            </div>
          )}

          {!aiLoading && aiText && (
            <div
              style={{
                background: C.accentL,
                borderRadius: 13,
                padding: "18px 20px",
                border: `1px solid ${C.borderGlow}`,
                boxShadow: C.glowSm,
              }}
            >
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 900,
                  background: C.gradText,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  marginBottom: 12,
                  textTransform: "uppercase",
                  letterSpacing: 1.5,
                }}
              >
                {aiButtons.find(([k]) => k === activeAI)?.[1]}
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: C.textDim,
                  lineHeight: 1.85,
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
                padding: "8px 0",
              }}
            >
              Select an option above for AI insights tailored to you.
            </div>
          )}
        </Card>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

// ── Root ──────────────────────────────────────────────────────────────────────
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
