# 合同闪签助手 · 官网

合同闪签助手的产品官网（纯静态站，HTML/CSS/JS，无构建依赖）。

## 页面

| 页面 | 文件 |
|------|------|
| 首页 | `index.html` |
| 产品介绍 | `product.html` |
| 解决方案 | `solutions.html` |
| 套餐价格 | `pricing.html` |
| 常见问题 | `faq.html` |
| 购买意向 | `purchase.html` |
| 提交成功 | `thanks.html` |
| 隐私政策 / 服务条款 | `privacy.html` / `terms.html` |
| 404 | `404.html` |

## 本地预览

直接浏览器打开 `index.html`，或起本地静态服务：

```bash
python3 -m http.server 8000
# 访问 http://localhost:8000
```

## 部署

拷贝本目录全部内容到任意静态托管（腾讯云 CloudBase 静态托管 / COS / 阿里云 OSS 等），
绑定自定义域名 + SSL 即可上线。
