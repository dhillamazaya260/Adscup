// Menyimpan data pengajuan brand (dari TheApplyForm) di localStorage,
// supaya halaman dashboard tahu brand mana yang sedang "login" tanpa backend.
// Gagal secara diam-diam kalau localStorage tidak tersedia (mode privat, dll).
const STORAGE_KEY = 'adscup:brand-application'

export function saveApplication(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch (err) {
    console.warn('Tidak bisa menyimpan data pengajuan ke localStorage:', err)
  }
}

export function loadApplication() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch (err) {
    return null
  }
}