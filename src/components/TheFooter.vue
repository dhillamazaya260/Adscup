<script setup></script>

<template>
  <footer id="kontak">
    <div class="wrap footer-grid">
      <div class="logo">Ads<span>Cup</span></div>
      <div class="footer-links">
        <a href="#layanan">Layanan</a>
        <a href="#cara-kerja">Cara kerja</a>
        <a href="#kenapa">Kenapa AdsCup</a>
        <a href="mailto:halo@adscup.id">halo@adscup.id</a>
      </div>
      <span class="footer-copy">© 2026 AdsCup — Media iklan cup kopi untuk brand dan cafe di seluruh Indonesia</span>
    </div>
  </footer>
</template>

<style scoped>
footer { padding: 36px 0; border-top: 1px solid var(--line); }
.logo { font-weight: 800; font-size: 1.3rem; }
.logo span { color: var(--cherry); }
.footer-grid { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 18px; align-items: center; }
.footer-links { display: flex; gap: 26px; font-size: 0.88rem; color: var(--ink-soft); flex-wrap: wrap; }
.footer-copy { font-size: 0.82rem; color: var(--ink-soft); }
</style>