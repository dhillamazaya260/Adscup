# AdsCup — Landing Page (Vue 3 + Vite)

## Menjalankan

```bash
npm install
npm run dev
```

Buka `http://localhost:5173`.

## Build produksi

```bash
npm run build
npm run preview
```

## Struktur

```
src/
├── App.vue                  # menyusun semua section
├── main.js                  # entry point, daftarin v-reveal directive
├── assets/main.css          # CSS variables (warna, dsb), reset, utility class .reveal
├── directives/reveal.js     # scroll-reveal via IntersectionObserver
└── components/
    ├── BaseButton.vue       # tombol pill (variant: primary | ghost | nav)
    ├── TheNavbar.vue
    ├── TheHero.vue          # headline + ilustrasi cup (label iklan auto-cycle)
    ├── TheAbout.vue
    ├── TheBenefits.vue      # band merah "Kenapa AdsCup"
    ├── TheHowItWorks.vue    # tab Brand/Cafe, reactive (bukan manipulasi DOM)
    ├── TheClosingCta.vue    # wordmark besar + CTA penutup
    └── TheFooter.vue
```

## Ganti warna brand

Semua warna ada di satu tempat: `src/assets/main.css`, di dalam `:root`.
Ubah `--cherry` buat ganti warna aksen utama.
