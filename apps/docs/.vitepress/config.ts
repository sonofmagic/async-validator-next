import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: 'async-validator-next',
  description: 'VitePress 文档站，涵盖 async-validator-next 的用法与可运行示例。',
  cleanUrls: true,
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/getting-started' },
      { text: '示例', link: '/guide/demos' },
      { text: 'API', link: '/guide/api-notes' },
    ],
    sidebar: {
      '/guide/': [
        {
          text: '指南',
          items: [
            { text: '快速开始', link: '/guide/getting-started' },
            { text: 'Schema 与选项', link: '/guide/schema-options' },
            { text: '自定义消息与类型', link: '/guide/messages-and-types' },
            { text: '可运行示例', link: '/guide/demos' },
            { text: 'API 速览', link: '/guide/api-notes' },
          ],
        },
      ],
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/sonofmagic/async-validator-next' },
    ],
  },
})
