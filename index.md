---
layout: home

hero:
  name: Harvey's Blog
  text: Used for personal learning
  tagline: Vimer, DevLife, CodeNerd, TechLover, PixelPusher
  image:
    src: /vitepress-logo-large.webp
    alt: VitePress
  actions:
    - theme: brand
      text: Backend
      link: /docs/SpringBoot/Basic
    - theme: alt
      text: Frontend
      link: /docs/Vue/Basic

features:
  - icon: 
      src: /feature1.png
    title: Java
    link: /docs/Java/Basic
    details: A rookie learning Java for two and a half years
  - icon: 
      src: feature2.png
    title: Web
    link: /docs/Vue/Basic
    details: A rookie learning Web for two and a half years
  - icon: 
      src: feature3.png
    title: Linux
    link: docs/Linux/Basic
    details: A rookie learning Linux for two and a half years
  - icon:
      src: feature4.png
    title: Algorithm
    link: docs/Algorithm/Sort
    details: A rookie learning Algorithm for two and a half years
---

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #bd34fe 30%, #41d1ff);

  --vp-home-hero-image-background-image: linear-gradient(-45deg, #bd34fe 50%, #47caff 50%);
  --vp-home-hero-image-filter: blur(44px);
}

@media (min-width: 640px) {
  :root {
    --vp-home-hero-image-filter: blur(56px);
  }
}

@media (min-width: 960px) {
  :root {
    --vp-home-hero-image-filter: blur(68px);
  }
}
</style>

