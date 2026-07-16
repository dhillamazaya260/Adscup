<script setup>
import BaseButton from './BaseButton.vue'
</script>

<template>
  <section class="about">
    <div class="wrap about-grid reveal" v-reveal>
      <div>
        <span class="eyebrow">Tentang AdsCup</span>
        <h2>Prinsip yang kami pegang.</h2>
      </div>
      <div>
        <p>
          Media terbaik bukan yang paling ramai bersuara, melainkan yang paling lama bertahan
          di tangan konsumen. Sebuah cup kopi menemani penggunanya lebih lama dibandingkan
          sebagian besar format iklan lain — dan momen itulah yang kami manfaatkan untuk brand Anda.
        </p>
        <BaseButton variant="ghost" href="#kenapa">Pelajari lebih lanjut →</BaseButton>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-grid { display: grid; grid-template-columns: 1fr; gap: 28px; }
@media (min-width: 760px) {
  .about-grid { grid-template-columns: 1fr 1.3fr; gap: 64px; }
}
.about-grid h2 { font-size: clamp(1.9rem, 4vw, 2.6rem); }
.about-grid p { color: var(--ink-soft); font-size: 1.08rem; margin-bottom: 26px; max-width: 56ch; }
</style>
