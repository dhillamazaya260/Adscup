<script setup>
import { ref, computed } from 'vue'

const activeTab = ref('brand')

const stepsByTab = {
  brand: [
    { num: '01', title: 'Siapkan desain', desc: 'Unggah logo dan pesan promosi Anda, atau gunakan template yang telah kami sediakan.' },
    { num: '02', title: 'Tentukan target', desc: 'Pilih kota, radius, hingga cafe spesifik yang paling relevan dengan audiens Anda.' },
    { num: '03', title: 'Cetak dan distribusi', desc: 'Cup akan dikirim langsung ke cafe mitra dan siap digunakan oleh pelanggan mereka.' },
    { num: '04', title: 'Pantau hasil', desc: 'Jumlah pemindaian QR dan cup yang beredar dapat dipantau secara real-time melalui satu dashboard.' }
  ],
}

const activeSteps = computed(() => stepsByTab[activeTab.value])
</script>

<template>
  <section id="cara-kerja">
    <div class="wrap align-center">
      <div class="how-head reveal" v-reveal align="center">
        <span class="eyebrow">Cara Kerja</span>
        <h2>Proses yang mudah dari dua sisi.</h2>
      </div>

      <div class="tabs reveal" v-reveal role="tablist" align="center">
        <button
          class="tab-btn"
          :class="{ active: activeTab === 'brand' }"
          role="tab"
          :aria-selected="activeTab === 'brand'"
          @click="activeTab = 'brand'"
        >
          Saya mau pasang iklan
        </button>
      </div>

      <div class="steps-list reveal" v-reveal>
        <div class="step-row" v-for="step in activeSteps" :key="step.num">
          <span class="step-num">{{ step.num }}</span>
          <div>
            <h3>{{ step.title }}</h3>
            <p>{{ step.desc }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.how-head { max-width: 560px; margin: 0 auto 40px; text-align: center; }
.how-head h2 { font-size: clamp(1.9rem, 4.4vw, 2.7rem); margin-top: 6px; }

.tabs { display: flex; justify-content: center; gap: 32px; margin-bottom: 8px; border-bottom: 1px solid var(--line); }
.tab-btn { padding: 12px 0; font-weight: 700; font-size: 0.98rem; color: var(--ink-soft); border-bottom: 2px solid transparent; margin-bottom: -1px; }
.tab-btn.active { color: var(--ink); border-color: var(--cherry); }

.step-row { display: grid; grid-template-columns: 64px 1fr; gap: 26px; padding: 30px 0; border-bottom: 1px solid var(--line); align-items: start; }
.step-row:last-child { border-bottom: none; }
.step-num { font-size: 2rem; font-weight: 800; color: var(--cherry); line-height: 1; }
.step-row h3 { font-size: 1.15rem; margin-bottom: 6px; font-weight: 800; }
.step-row p { color: var(--ink-soft); font-size: 0.96rem; max-width: 54ch; }
@media (max-width: 560px) {
  .step-row { grid-template-columns: 1fr; gap: 8px; }
}
</style>