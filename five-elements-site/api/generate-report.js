import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: "https://api.deepseek.com"
});

const systemPrompt = `你是一位资深民俗命理与八字分析师，擅长以专业但克制的方式做命盘解读。
你需要依据用户提供的结构化命盘资料，从四柱、日主旺衰、月令、藏干、十神、格局、大运、流年、下月运势等角度生成报告。
要求：
1. 使用简体中文。
2. 文案要像专业命理师逐盘推演，不要像模板拼接。
3. 不要恐吓用户，不要承诺必然发财、必然结婚、必然生病。
4. 事业、财富、感情、健康状态只做趋势和建议，不做绝对断言。
5. 过去关键节点要用“更容易出现”“可能对应”“适合回看”这类措辞。
6. 报告结构清晰，适合直接展示在测算网站。`;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "只支持 POST 请求" });
  }

  if (!process.env.DEEPSEEK_API_KEY) {
    return res.status(500).json({ error: "服务器还没有配置 DEEPSEEK_API_KEY" });
  }

  const {
    prompt,
    model = process.env.DEEPSEEK_MODEL || "deepseek-v4-flash"
  } = req.body || {};
  if (!prompt || typeof prompt !== "string") {
    return res.status(400).json({ error: "缺少命盘提示词" });
  }

  try {
    const request = {
      model,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt }
      ],
      temperature: 1.1,
      stream: false
    };

    if (model.includes("v4")) {
      request.thinking = { type: "disabled" };
    }

    const completion = await client.chat.completions.create(request);

    const report = completion.choices?.[0]?.message?.content?.trim();
    if (!report) {
      return res.status(502).json({ error: "DeepSeek 没有返回有效报告" });
    }

    return res.status(200).json({ report, model });
  } catch (error) {
    return res.status(500).json({
      error: error?.message || "DeepSeek 生成失败"
    });
  }
}
