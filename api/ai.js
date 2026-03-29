/* eslint-disable no-undef */
export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    return res
      .status(200)
      .json({
        text: "ERROR: GROQ_API_KEY is not set in Vercel environment variables.",
      });
  }

  try {
    const { prompt } = req.body;

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [{ role: "user", content: prompt }],
          max_tokens: 1200,
        }),
      },
    );

    const data = await response.json();
    const text = data?.choices?.[0]?.message?.content || "";

    if (!text) {
      return res
        .status(200)
        .json({ text: `Groq error: ${JSON.stringify(data)}` });
    }

    res.status(200).json({ text });
  } catch (err) {
    res.status(200).json({ text: `Server error: ${err.message}` });
  }
}
