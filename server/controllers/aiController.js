import "dotenv/config";

export const chatWithOpenAI = async (req, res) => {
  try {
    const rawKey = process.env.OPENAI_API_KEY;
    const apiKey = (rawKey || "").trim();
    if (!apiKey) {
      return res.status(500).json({
        success: false,
        message: "Missing OPENAI_API_KEY (set in server/.env and restart)",
      });
    }
    if (!apiKey.startsWith("sk-")) {
      return res.status(401).json({
        success: false,
        message:
          "OPENAI_API_KEY format looks wrong. It should start with 'sk-'. Copy a valid key from your OpenAI dashboard.",
      });
    }

    if (typeof fetch === "undefined") {
      return res.status(500).json({
        success: false,
        message:
          "fetch is not available. Use Node.js 18+ or add a fetch polyfill (e.g., node-fetch).",
      });
    }

    const { messages, model = "gpt-3.5-turbo" } = req.body || {};
    if (!Array.isArray(messages) || messages.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "messages array is required" });
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      let errText = await response.text();
      try {
        const j = JSON.parse(errText);
        errText = j?.error?.message || errText;
      } catch (_) {}
      return res
        .status(response.status)
        .json({ success: false, message: errText });
    }

    const data = await response.json();
    const assistantMessage = data?.choices?.[0]?.message;
    return res.json({ success: true, message: assistantMessage });
  } catch (error) {
    console.error("OpenAI chat error:", error);
    return res
      .status(500)
      .json({ success: false, message: String(error?.message || error) });
  }
};
