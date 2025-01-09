import {getAllSidebar} from '../utils/auto-sidebar.js'
import {withMermaid} from 'vitepress-plugin-mermaid'

export default withMermaid({
  base: '/blog/',
  head: [
    [
      'link',
      {
        rel: 'icon',
        href: '/blog/vitepress-logo-mini.svg'
      }
    ],
    [
      'apple-touch-icon',
      {
        rel: 'icon',
        href: '/blog/vitepress-logo-mini.svg'
      }
    ],
    [
      'mask-icon',
      {
        rel: 'icon',
        href: '/blog/vitepress-logo-mini.svg'
      }
    ]
  ],
  title: 'Harvey\'s Blog',
  description: 'Be a programming master',
  cleanUrls: true,
  srcDir: './',
  markdown: {
    attrs: {
      disable: true
    },
    linkify: false,
    image: {
      lazyLoading: true
    }
  },
  srcExclude: [
    './docs/Draft',
    './docs/.DS_Store',
    './docs/.obsidian',
    './docs/.idea',
    './docs/.vscode'
  ],
  themeConfig: {
    outline: [1, 6],
    logo: '/vitepress-logo-mini.svg',
    nav: [
      {text: 'Home', link: '/'},
      {text: 'Java', link: '/docs/java/basic'},
      {text: 'JVM', link: '/docs/jvm/basic'},
      {text: 'JUC', link: '/docs/juc/basic'},
      {text: 'SpringBoot', link: '/docs/springboot/basic'},
      {text: 'Distributed', link: '/docs/distributed/basic'},
      {text: 'MySQL', link: '/docs/mysql/basic'},
      {text: 'Redis', link: '/docs/redis/basic'}
    ],
    sidebar: getAllSidebar(),
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/HarveySuen0803'
      }
    ],
    search: {
      provider: 'local'
    }
  },
  // your existing vitepress config...
  // optionally, you can pass MermaidConfig
  mermaid: {
    // refer https://mermaid.js.org/config/setup/modules/mermaidAPI.html#mermaidapi-configuration-defaults for options
  },
  // optionally set additional config for plugin itself with MermaidPluginConfig
  mermaidPlugin: {
    class: 'mermaid my-class' // set additional css classes for parent container
  }
})
