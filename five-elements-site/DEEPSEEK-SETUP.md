# DeepSeek API 接入说明

这个网站已经预留了 DeepSeek 深度报告接口。

## 需要准备

1. 注册 DeepSeek 开放平台账号。
2. 创建 API Key。
3. 部署到 Vercel。
4. 在 Vercel 项目的 Environment Variables 里添加：

```text
DEEPSEEK_API_KEY=你的 DeepSeek API Key
DEEPSEEK_MODEL=deepseek-v4-flash
```

如果后期想做付费深度报告，可以把 `DEEPSEEK_MODEL` 改成更强的模型。

## 为什么不能直接在 HTML 里填 API Key

因为前端代码任何人都能看到，如果把 Key 写在网页里，别人可以直接盗用你的额度。
所以当前方案是：

```text
网页按钮 -> /api/generate-report -> DeepSeek -> 返回报告
```

API Key 只保存在服务器环境变量里。

## 当前按钮位置

用户生成八字报告后，会在“API 接入提示词”区域看到：

```text
生成 DeepSeek 深度报告
```

本地 `file://` 打开时不能真正调用后端接口；部署到 Vercel 后即可使用。
