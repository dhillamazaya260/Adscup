// Satu sumber data untuk pilihan yang ditawarkan AdsCup, dipakai bareng oleh
// TheServices.vue (showcase "Layanan Kami") dan TheApplyForm.vue (form pengajuan),
// biar daftar kota/rasa selalu konsisten di seluruh halaman.

export const cities = ['Jakarta', 'Bandung', 'Surabaya', 'Yogyakarta', 'Bali', 'Semarang', 'Kota lain']

export const venueTypes = ['Kampus', 'Perkantoran', 'Coworking space', 'Event komunitas', 'Cafe mitra']

export const flavors = [
  { name: 'Kopi Hitam', desc: 'Americano, murni tanpa gula' },
  { name: 'Kopi Susu Gula Aren', desc: 'Rasa favorit pasar lokal' },
  { name: 'Cappuccino', desc: 'Espresso dengan foam susu lembut' },
  { name: 'Caffe Latte', desc: 'Creamy, cocok untuk semua kalangan' },
  { name: 'Matcha Latte', desc: 'Opsi non-kopi yang tetap laris' },
  { name: 'Chocolate', desc: 'Opsi non-kopi untuk semua usia' }
]