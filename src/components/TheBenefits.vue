<script setup>
const benefits = [
  {
    tag: 'Perhatian konsumen',
    title: 'Tidak dapat dilewati',
    desc: 'Konsumen memegang cup Anda hampir satu jam — bandingkan dengan format iklan lain yang bertahan selama itu.'
  },
  {
    tag: 'Reachable audience',
    title: 'Anda menjangkau konsumen yang tepat',
    desc: 'Jangkau audiens dengan mudah--kopi diminum setiap hari oleh sebagian besar orang'
  },
  {
    tag: 'Data & pelaporan',
    title: 'Terukur, bukan estimasi',
    desc: 'Setiap cup dilengkapi kode QR. Anda mengetahui jumlah pemindaian secara pasti, bukan sekadar perkiraan jangkauan.'
  }
]
</script>

<template>
  <section class="band" id="kenapa">
    <div class="wrap align-center">
      <div class="band-head reveal" v-reveal align="center">
        <span class="side"></span>
        <h2>Mengapa Memilih AdsCup</h2>
        <span class="side"></span>
      </div>
      <div class="benefit-grid reveal" v-reveal align="center">
        <div class="benefit-card" v-for="b in benefits" :key="b.title">
          <span class="benefit-tag">{{ b.tag }}</span>
          <h3>{{ b.title }}</h3>
          <p>{{ b.desc }}</p>
          <a href="#" class="benefit-link">Pelajari lebih lanjut →</a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.band { background: var(--cherry); color: #fff; }

.band-head {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 16px;
  margin-bottom: 48px;
}
.band-head .side { font-size: 0.9rem; font-weight: 600; opacity: 0.75; white-space: nowrap; }
.band-head .side:last-child { text-align: right; }
.band-head h2 { font-size: clamp(2rem, 5vw, 3rem); text-align: center; color: #fff; }
@media (max-width: 640px) {
  .band-head .side { display: none; }
}

.benefit-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 20px; }
.benefit-card { background: var(--paper-alt); color: var(--ink); border-radius: 26px; padding: 32px 28px; }
.benefit-tag {
  display: inline-block;
  background: var(--cherry-tint);
  color: var(--cherry);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 5px 13px;
  border-radius: 999px;
  margin-bottom: 20px;
}
.benefit-card h3 { font-size: 1.3rem; margin-bottom: 10px; font-weight: 800; letter-spacing: -0.01em; }
.benefit-card p { color: var(--ink-soft); font-size: 0.94rem; margin-bottom: 20px; line-height: 1.5; }
.benefit-link { font-weight: 700; font-size: 0.88rem; color: var(--ink); border-bottom: 1.5px solid var(--ink); padding-bottom: 2px; }
</style>
