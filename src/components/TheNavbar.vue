<script setup>
import BaseButton from './BaseButton.vue'
</script>

<template>
  <header class="site-header">
    <div class="wrap nav">
      <div class="logo">Ads<span>Cup</span></div>
      <nav class="nav-links">
        <a href="#cara-kerja">Cara kerja</a>
        <a href="#kenapa">Kenapa AdsCup</a>
        <a href="#kontak">Kontak</a>
      </nav>
      <BaseButton variant="nav" href="#mulai">Mulai ↗</BaseButton>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 40;
  background: rgba(253, 251, 248, 0.9);
  backdrop-filter: blur(8px);
}
.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 22px 24px;
}
.logo { font-weight: 800; font-size: 1.3rem; }
.logo span { color: var(--cherry); }
.nav-links { display: flex; align-items: center; gap: 36px; font-size: 0.95rem; font-weight: 600; }
.nav-links a { opacity: 0.7; transition: opacity 0.2s; }
.nav-links a:hover { opacity: 1; }

@media (max-width: 760px) {
  .nav-links { display: none; }
}
</style>
