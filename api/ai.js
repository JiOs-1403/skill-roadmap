/* eslint-disable no-undef */
export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const apiKey = process.env.GEMINI_API_KEY;

  // Log whether the key exists (never log the actual key)
  console.log("API key present:", !!apiKey);

  if (!apiKey) {
    return res
      .status(200)
      .json({
        text: "ERROR: GEMINI_API_KEY is not set in Vercel environment variables.",
      });
  }

  try {
    const { prompt } = req.body;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      },
    );

    const data = await response.json();
    console.log("Gemini status:", response.status);
    console.log("Gemini response:", JSON.stringify(data).slice(0, 300));

    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    if (!text) {
      return res
        .status(200)
        .json({ text: `Gemini error: ${JSON.stringify(data)}` });
    }

    res.status(200).json({ text });
  } catch (err) {
    console.error("Handler error:", err.message);
    res.status(200).json({ text: `Server error: ${err.message}` });
  }
}
