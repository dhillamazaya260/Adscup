import { ref } from 'vue'

// Dipakai bareng oleh TheHero, TheHowItWorks, TheApplyForm, dan TheClosingCta,
// supaya tombol CTA di section manapun bisa langsung membuka tab yang sesuai
// (brand/cafe) di form pengajuan #mulai. Cukup satu nilai reaktif, jadi tidak
// perlu tambah dependency store (Pinia dkk) hanya untuk ini.
export const audience = ref('brand') // 'brand' | 'cafe'