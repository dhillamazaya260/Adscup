<script setup>
import { reactive, ref } from 'vue'

const cities = ['Jakarta', 'Bandung', 'Surabaya', 'Yogyakarta', 'Bali', 'Semarang', 'Kota lain']

/* ---------------- Brand form ---------------- */
const brandForm = reactive({
  businessName: '',
  contactName: '',
  email: '',
  city: cities[0],
  cupEstimate: '',
  distributionPreference: '',
  message: ''
})
const formError = ref('')
const formSubmitted = ref(false)

function submitForm() {
  if (!brandForm.businessName.trim() || !brandForm.contactName.trim()) {
    formError.value = 'Nama brand dan nama kontak wajib diisi.'
    return
  }
  if (!/^\S+@\S+\.\S+$/.test(brandForm.email)) {
    formError.value = 'Format email belum valid.'
    return
  }
  formError.value = ''
  formSubmitted.value = true
}
function editForm() {
  formSubmitted.value = false
}
</script>

<template>
  <section class="apply" id="mulai">
    <div class="wrap">
      <div class="apply-head reveal" v-reveal>
        <span class="eyebrow">Ajukan Sekarang</span>
        <h2>Lengkapi formulir untuk mendaftar.</h2>
        <p>
          Anda tidak perlu memikirkan kopi, cup, maupun distribusi — semua kami yang siapkan.
          Ini pengajuan awal, tim AdsCup akan menghubungi Anda untuk membahas detail campaign dan biayanya.
        </p>
      </div>

      <div class="panel reveal" v-reveal>
        <form class="apply-card" v-if="!formSubmitted" @submit.prevent="submitForm">
          <div class="field">
            <label class="field">
              <span>Nama brand</span>
              <input v-model="brandForm.businessName" type="text" placeholder="Contoh: Glowlab Skincare" />
            </label>
          </div>

          <div class="field-row">
            <label class="field">
              <span>Email</span>
              <input v-model="brandForm.email" type="email" placeholder="nama@brand.com" />
            </label>
            <label class="field">
              <span>Nama kontak</span>
              <input v-model="brandForm.contactName" type="text" placeholder="Nama lengkap Anda" />
            </label>
          </div>

          <label class="field">
            <span>Perkiraan jumlah cup (opsional)</span>
            <input v-model="brandForm.cupEstimate" type="text" placeholder="Contoh: 2.000 cup / bulan" />
          </label>

          <label class="field">
            <span>Titik distribusi yang diinginkan (opsional)</span>
            <input v-model="brandForm.distributionPreference" type="text" placeholder="Contoh: area perkantoran, kampus, coworking space, event komunitas" />
          </label>

          <label class="field">
            <span>Deskripsi campaign (opsional)</span>
            <textarea v-model="brandForm.message" rows="3" placeholder="Produk yang dipromosikan, target audiens, preferensi jenis kopi, dan detail lain yang relevan."></textarea>
          </label>

          <p class="form-error" v-if="formError">{{ formError }}</p>
          <button type="submit" class="submit-btn">Ajukan campaign →</button>
        </form>

        <div class="apply-card success-card" v-else>
          <span class="success-badge">Pengajuan terkirim</span>
          <h3>Terima kasih, {{ brandForm.contactName }}.</h3>
          <p>
            Pengajuan campaign untuk <strong>{{ brandForm.businessName }}</strong> telah kami terima. Tim AdsCup
            akan menghubungi Anda melalui <strong>{{ brandForm.email }}</strong> dalam waktu 1x24 jam kerja untuk
            membahas kebutuhan kopi, desain cup, titik distribusi, dan biaya campaign.
          </p>
          <button type="button" class="link-btn" @click="editForm">← Ajukan kembali / ubah data</button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.apply { background: var(--paper-alt); border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); }
.apply-head { max-width: 560px; margin: 0 auto 32px; text-align: center; }
.apply-head h2 { font-size: clamp(1.9rem, 4.4vw, 2.7rem); margin: 6px 0 12px; }
.apply-head p { color: var(--ink-soft); font-size: 1rem; }

.apply-card {
  max-width: 620px;
  margin: 0 auto;
  background: var(--paper);
  border: 1px solid var(--line);
  border-radius: 24px;
  padding: 34px 32px;
}

.field { display: flex; flex-direction: column; gap: 6px; margin-bottom: 18px; font-size: 0.88rem; font-weight: 600; }
.field span { color: var(--ink-soft); font-weight: 600; }
.field input,
.field select,
.field textarea {
  border: 1.5px solid var(--line);
  border-radius: 12px;
  padding: 11px 14px;
  font: inherit;
  font-weight: 500;
  background: #fff;
  color: var(--ink);
  resize: vertical;
}
.field input:focus,
.field select:focus,
.field textarea:focus { outline: 2px solid var(--cherry); outline-offset: 1px; }

.field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
@media (max-width: 560px) { .field-row { grid-template-columns: 1fr; } }

.form-error { color: var(--cherry); font-size: 0.85rem; font-weight: 600; margin-bottom: 14px; }

.submit-btn {
  width: 100%;
  background: var(--ink);
  color: #fff;
  font-weight: 700;
  padding: 14px 20px;
  border-radius: 999px;
  transition: background 0.2s ease, transform 0.15s ease;
}
.submit-btn:hover { background: var(--cherry-dark); transform: translateY(-1px); }

.link-btn { display: inline-block; margin-top: 14px; font-weight: 700; font-size: 0.85rem; color: var(--ink-soft); border-bottom: 1.5px solid transparent; transition: color 0.2s ease, border-color 0.2s ease; }
.link-btn:hover { color: var(--cherry); border-color: var(--cherry); }

.success-badge {
  display: inline-block;
  background: var(--cherry-tint);
  color: var(--cherry);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  padding: 5px 13px;
  border-radius: 999px;
  margin-bottom: 14px;
}
.success-card h3 { font-size: 1.35rem; margin-bottom: 12px; }
.success-card p { color: var(--ink-soft); font-size: 0.96rem; line-height: 1.55; }
</style>
