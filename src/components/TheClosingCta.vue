<script setup>
import BaseButton from './BaseButton.vue'
import { audience } from '../composables/useAudience'
</script>

<template>
  <section class="closing">
    <div class="wrap reveal" v-reveal>
      <span class="eyebrow">Mulai Sekarang</span>
      <div class="wordmark">ADSCUP</div>
      <h2>Jadikan setiap cup kopi sebagai media promosi Anda.</h2>
      <p>Ajukan campaign pertama Anda, atau daftarkan cafe Anda hari ini.</p>
      <div class="closing-actions">
        <BaseButton variant="primary" href="#mulai" @click="audience = 'brand'">Daftarkan Iklanmu Sekarang</BaseButton>
      </div>
    </div>
  </section>
</template>

<style scoped>
.closing { text-align: center; border-top: 1px solid var(--line); }
.wordmark {
  font-size: clamp(3.6rem, 15vw, 10rem);
  font-weight: 800;
  color: var(--cherry);
  letter-spacing: -0.04em;
  line-height: 1;
  margin-bottom: 8px;
}
.closing h2 { font-size: clamp(1.9rem, 4.6vw, 2.7rem); margin-bottom: 16px; }
.closing p { color: var(--ink-soft); font-size: 1.05rem; max-width: 46ch; margin: 0 auto 32px; }
.closing-actions { display: flex; flex-wrap: wrap; justify-content: center; gap: 14px; }
</style>