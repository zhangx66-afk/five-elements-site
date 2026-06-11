import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: "https://api.deepseek.com"
});

const systemPrompt = `你是一位资深民俗命理与盲派八字分析师，擅长以象法、宫位、十神组合、干支作用、大运流年应期来做命盘解读。
你需要依据用户提供的结构化命盘资料，从四柱宫位、日主旺衰、月令、藏干、十神、格局、刑冲合害、穿害破合、大运、流年、流月等角度生成报告。
盲派取象要求：
1. 年柱看祖上、早年环境、外部背景；月柱看父母、成长条件、事业平台；日支看婚恋伴侣与内在关系模式；时柱看子女、晚景、长期成果与个人追求。
2. 十神不要只解释性格，要落到具体生活象：印看学习、贵人、证书、母系支持；财看钱、资源、现实压力、男命伴侣；官杀看规则、职位、压力、女命伴侣；食伤看表达、作品、口才、自由度；比劫看朋友、竞争、合伙、同辈。
3. 大运流年要讲“应期”，重点看哪一步大运、哪几年更容易应在事业、钱、感情、家宅、迁移、健康状态上。
4. 过去节点要用于验证命盘，不要泛泛而谈，要结合年龄阶段说可能发生的具体类型事件。
要求：
1. 使用简体中文。
2. 文案要像专业命理师逐盘推演，不要像模板拼接。
3. 要有盲派“断事感”，但必须使用“容易、可能、倾向、适合回看”这类克制表达。
4. 不要恐吓用户，不要承诺必然发财、必然结婚、必然生病。
5. 事业、财富、感情、健康状态只做趋势和建议，不做绝对断言。
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
