<script setup>
import { cities, flavors } from '../data/offerings'
</script>

<template>
  <section id="layanan">
    <div class="wrap">
      <div class="services-head reveal" v-reveal align="center">
        <span class="eyebrow">Layanan Kami</span>
        <h2>Tiga hal yang kami urus, biar Anda tinggal pilih.</h2>
        <p>Setiap campaign AdsCup mencakup packaging, kopi, dan distribusi — brand cukup menentukan rasa dan lokasinya.</p>
      </div>

      <div class="service-grid">
        <article class="service-card reveal" v-reveal>
          <h3>Packaging</h3>
          <p>
            Desain cup mengikuti identitas brand Anda — logo, warna, dan pesan campaign dicetak penuh
            di badan cup, bukan sekadar stiker tempel. Tim kami bantu proses desainnya dari nol.
          </p>
        </article>

        <article class="service-card reveal" v-reveal>
          <h3>Kopi</h3>
          <p>Kopinya kami yang sediakan. Pilih rasa yang paling cocok dengan audiens campaign Anda:</p>
          <div class="chip-list">
            <span class="chip-static" v-for="f in flavors" :key="f.name" :title="f.desc">{{ f.name }}</span>
          </div>
        </article>

        <article class="service-card reveal" v-reveal>
          <h3>Distribusi</h3>
          <p>Cup didistribusikan lewat jaringan cafe mitra kami. Tentukan kotanya, sisanya kami yang urus:</p>
          <div class="chip-list">
            <span class="chip-static" v-for="c in cities" :key="c">{{ c }}</span>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.services-head { max-width: 560px; margin: 0 auto 44px; text-align: center; }
.services-head h2 { font-size: clamp(1.9rem, 4.4vw, 2.7rem); margin: 6px 0 12px; }
.services-head p { color: var(--ink-soft); font-size: 1.05rem; }

.service-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 20px; }
.service-card {
  border: 1.5px solid var(--line);
  border-radius: 24px;
  padding: 32px 28px;
  background: var(--paper-alt);
}
.service-card h3 { font-size: 1.25rem; margin-bottom: 12px; font-weight: 800; letter-spacing: -0.01em; }
.service-card > p { color: var(--ink-soft); font-size: 0.96rem; line-height: 1.55; margin-bottom: 18px; }
.service-card:last-child > p { margin-bottom: 18px; }

.chip-list { display: flex; flex-wrap: wrap; gap: 8px; }
.chip-static {
  padding: 6px 14px;
  border-radius: 999px;
  border: 1px solid var(--line);
  background: var(--paper);
  color: var(--ink-soft);
  font-size: 0.82rem;
  font-weight: 600;
}
</style>