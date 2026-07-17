<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import BaseButton from './BaseButton.vue'
import { audience } from '../composables/Useaudience'

const cupStates = [
  { fill: '#CC2B54', dark: '#9E1F40', label: 'IKLAN ANDA', tag: 'Brand kosmetik' },
  { fill: '#1A1512', dark: '#000000', label: 'BRAND ANDA', tag: 'Brand fashion' },
  { fill: '#2F5233', dark: '#1E3A22', label: 'PROMO ANDA', tag: 'Brand F&B' }
]
const cupIndex = ref(0)
const cupState = computed(() => cupStates[cupIndex.value])

let intervalId = null
const prefersReduced = typeof window !== 'undefined'
  ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
  : false
  
function startAutoplay() {
  if (prefersReduced) return
  stopAutoplay()
  intervalId = setInterval(() => {
    cupIndex.value = (cupIndex.value + 1) % cupStates.length
  }, 2600)
}

function stopAutoplay() {
  if (intervalId) {
    clearInterval(intervalId)
    intervalId = null
  }
}

function selectState(i) {
  cupIndex.value = i
  startAutoplay()
}

function cycleState() {
  cupIndex.value = (cupIndex.value + 1) % cupStates.length
  startAutoplay()
}

// --- interactive tilt: cup follows the pointer, like it's being held ---
const stageRef = ref(null)
const tiltX = ref(0)
const tiltY = ref(0)
const isHovering = ref(false)

function handlePointerMove(e) {
  if (prefersReduced || !stageRef.value) return
  const rect = stageRef.value.getBoundingClientRect()
  const px = (e.clientX - rect.left) / rect.width - 0.5
  const py = (e.clientY - rect.top) / rect.height - 0.5
  tiltY.value = px * 22
  tiltX.value = py * -16
}

function handlePointerEnter() {
  isHovering.value = true
}

function handlePointerLeave() {
  isHovering.value = false
  tiltX.value = 0
  tiltY.value = 0
}

onMounted(startAutoplay)
onUnmounted(stopAutoplay)
</script>

<template>
  <section class="hero">
    <div class="wrap">
      <div class="hero-top">
        <span class="eyebrow">Media Iklan dengan cup kopi</span>
        <h1>Cup kopi pelanggan Anda. Media iklan Anda.</h1>
        <p class="hero-sub">Kami yang urus kopi, cup, dan distribusinya — Anda tinggal pilih rasa dan lokasinya.</p>
        <div class="hero-actions">
          <BaseButton variant="primary" href="#mulai" @click="audience = 'brand'">Saya mau pasang iklan</BaseButton>
        </div>
        <p class="hero-note">Pengajuan awal tanpa biaya, tim kami merespons dalam 1x24 jam kerja.</p>
      </div>

      <div class="hero-visual">
        <span class="hero-bg-word">UNSKIPPABLE</span>

        <div
          class="cup-stage"
          ref="stageRef"
          role="button"
          tabindex="0"
          :aria-label="`Cup kopi interaktif, contoh brand yang ditampilkan: ${cupState.tag}. Klik untuk beralih.`"
          @pointermove="handlePointerMove"
          @pointerenter="handlePointerEnter"
          @pointerleave="handlePointerLeave"
          @click="cycleState"
          @keyup.enter="cycleState"
          @keyup.space.prevent="cycleState"
        >
          <div
            class="cup-3d"
            :class="{ paused: isHovering }"
            :style="{ '--tx': tiltX + 'deg', '--ty': tiltY + 'deg' }"
          >
            <!-- steam -->
            <svg class="steam" viewBox="0 0 240 90" aria-hidden="true">
              <path class="steam-path s1" d="M96 80 C86 62 106 54 98 36 C90 18 108 12 102 -2" />
              <path class="steam-path s2" d="M124 80 C136 60 116 50 126 30 C136 10 118 6 128 -6" />
            </svg>

            <svg
              class="cup-svg"
              viewBox="0 0 240 320"
              role="img"
              aria-label="Ilustrasi realistis cup kopi kertas dengan tutup, area label iklan berganti warna"
            >
              <defs>
                <linearGradient id="paperGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stop-color="#e7e2da" />
                  <stop offset="14%" stop-color="#fefefe" />
                  <stop offset="42%" stop-color="#e4dfd7" />
                  <stop offset="58%" stop-color="#f6f4f0" />
                  <stop offset="82%" stop-color="#ffffff" />
                  <stop offset="100%" stop-color="#dcd7cf" />
                </linearGradient>
                <linearGradient id="lidGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stop-color="#d9d5cd" />
                  <stop offset="18%" stop-color="#ffffff" />
                  <stop offset="50%" stop-color="#efece6" />
                  <stop offset="80%" stop-color="#ffffff" />
                  <stop offset="100%" stop-color="#d2cec6" />
                </linearGradient>
                <linearGradient id="sheenGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stop-color="#000000" stop-opacity="0.22" />
                  <stop offset="18%" stop-color="#ffffff" stop-opacity="0.35" />
                  <stop offset="42%" stop-color="#000000" stop-opacity="0.12" />
                  <stop offset="62%" stop-color="#ffffff" stop-opacity="0.28" />
                  <stop offset="100%" stop-color="#000000" stop-opacity="0.2" />
                </linearGradient>
                <radialGradient id="shadowGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stop-color="#1A1512" stop-opacity="0.28" />
                  <stop offset="100%" stop-color="#1A1512" stop-opacity="0" />
                </radialGradient>
                <clipPath id="bandClip">
                  <path d="M71 138 L169 138 L160 222 L80 222 Z" />
                </clipPath>
              </defs>

              <!-- ground shadow -->
              <ellipse class="cup-shadow" cx="120" cy="300" rx="72" ry="12" fill="url(#shadowGrad)" />

              <!-- cup body -->
              <path
                class="cup-body"
                d="M64 86 L176 86 L154 274 Q153 279 148 279 L92 279 Q87 279 86 274 Z"
                fill="url(#paperGrad)"
                stroke="var(--ink)"
                stroke-width="1.5"
                stroke-linejoin="round"
              />
              <path
                d="M64 86 L176 86 L154 274 Q153 279 148 279 L92 279 Q87 279 86 274 Z"
                fill="url(#sheenGrad)"
                opacity="0.55"
              />

              <!-- ad label band: this is the actual demo, cup surface = ad space -->
              <g clip-path="url(#bandClip)">
                <rect class="cup-band" x="60" y="130" width="120" height="100" :fill="cupState.fill" />
                <rect class="band-shine" x="30" y="130" width="35" height="100" fill="#ffffff" opacity="0.3" />
              </g>
              <text
                :key="cupState.label"
                class="cup-label"
                x="120"
                y="185"
                text-anchor="middle"
                font-size="13"
                font-weight="800"
                letter-spacing="0.4"
                fill="#ffffff"
              >{{ cupState.label }}</text>

              <!-- top rim of cup, sits under the lid -->
              <path d="M64 86 Q120 96 176 86 L172 78 Q120 88 68 78 Z" fill="#efece6" stroke="var(--ink)" stroke-width="1.2" stroke-linejoin="round" />

              <!-- lid -->
              <g class="cup-lid">
                <path
                  d="M56 60 Q120 80 184 60 L178 76 Q120 92 62 76 Z"
                  fill="url(#lidGrad)"
                  stroke="var(--ink)"
                  stroke-width="1.5"
                  stroke-linejoin="round"
                />
                <path
                  d="M68 40 L64 62 Q120 74 176 62 L172 40 Q120 52 68 40 Z"
                  fill="url(#lidGrad)"
                  stroke="var(--ink)"
                  stroke-width="1.3"
                  stroke-linejoin="round"
                />
                <ellipse cx="120" cy="40" rx="52" ry="14" fill="url(#lidGrad)" stroke="var(--ink)" stroke-width="1.5" />
                <ellipse cx="97" cy="46" rx="9" ry="4.2" fill="var(--ink)" opacity="0.14" />
                <path d="M56 60 Q120 80 184 60" fill="none" stroke="var(--ink)" stroke-opacity="0.25" stroke-width="1" />
              </g>
            </svg>
          </div>
        </div>

        <div class="cup-dots" role="group" aria-label="Pilih contoh brand">
          <button
            v-for="(state, i) in cupStates"
            :key="state.label"
            type="button"
            class="cup-dot"
            :class="{ active: i === cupIndex }"
            :style="{ '--dot-color': state.fill }"
            :aria-label="`Tampilkan contoh: ${state.tag}`"
            :aria-pressed="i === cupIndex"
            @click="selectState(i)"
          ></button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero { padding: 36px 0 80px; }
.hero-top { max-width: 640px; margin: 0 auto 8px; text-align: center; }
.hero-top h1 { font-size: clamp(2.1rem, 4.6vw, 3.1rem); margin-bottom: 16px; }
.hero-sub { color: var(--ink-soft); font-size: 1.08rem; max-width: 48ch; margin: 0 auto 30px; }
.hero-actions { display: flex; flex-wrap: wrap; justify-content: center; gap: 14px; margin-bottom: 14px; }
.hero-note { text-align: center; font-size: 0.85rem; color: var(--ink-soft); }

.hero-visual {
  display: grid;
  grid-template-areas: 
    "visual"
    "controls";
  place-items: center;
  margin-top: 26px;
  gap: 24px; /* Memberi jarak konsisten antara cup dan dots */
  position: relative;
}

.hero-bg-word {
  grid-area: visual;
  font-size: clamp(3.6rem, 15vw, 9.5rem);
  font-weight: 800;
  color: var(--ink);
  white-space: nowrap;
  letter-spacing: -0.03em;
  line-height: 1;
  user-select: none;
}

.cup-stage {
  grid-area: visual;
  position: relative;
  z-index: 2;
  perspective: 900px;
  cursor: pointer;
  outline: none;
  touch-action: none;
}
.cup-stage:focus-visible .cup-3d {
  filter: drop-shadow(0 0 0 3px var(--cherry));
}

.cup-hint {
  position: absolute;
  top: -6px;
  left: 50%;
  transform: translate(-50%, -100%);
  background: var(--ink);
  color: #fff;
  font-size: 0.72rem;
  font-weight: 700;
  padding: 6px 12px;
  border-radius: 999px;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.25s ease, transform 0.25s ease;
  z-index: 5;
}
.cup-hint.show { opacity: 1; transform: translate(-50%, -130%); }

.cup-3d {
  transform-style: preserve-3d;
  transform: rotateX(var(--tx, 0deg)) rotateY(var(--ty, 0deg));
  transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
  animation: cup-float 4.5s ease-in-out infinite;
  will-change: transform;
}
.cup-3d.paused { animation-play-state: paused; }

.cup-svg { width: min(240px, 58vw); height: auto; position: relative; z-index: 2; }
.steam {
  width: min(240px, 58vw);
  height: auto;
  position: absolute;
  left: 0;
  top: -6%;
  z-index: 1;
  pointer-events: none;
}
.steam-path {
  fill: none;
  stroke: var(--ink-soft);
  stroke-width: 3.5;
  stroke-linecap: round;
  opacity: 0;
  animation: steam-rise 3.4s ease-in-out infinite;
}
.s2 { animation-delay: 1.1s; }

.cup-shadow { transform-origin: 120px 300px; animation: shadow-pulse 4.5s ease-in-out infinite; }
.cup-band { transition: fill 0.5s ease; }
.cup-label { transition: opacity 0.25s ease; animation: label-in 0.4s ease; }
.band-shine { animation: shine-sweep 3.6s ease-in-out infinite; }
.cup-lid { transform-origin: 120px 60px; animation: lid-wobble 4.5s ease-in-out infinite; }

.cup-dots {
  grid-area: controls;
  display: flex;
  gap: 10px;
  z-index: 3;
}
.cup-dot {
  width: 11px;
  height: 11px;
  border-radius: 999px;
  background: var(--dot-color);
  opacity: 0.35;
  border: 1.5px solid transparent;
  transition: opacity 0.2s ease, transform 0.2s ease, border-color 0.2s ease;
  cursor: pointer;
}
.cup-dot:hover { opacity: 0.7; transform: scale(1.15); }
.cup-dot.active { opacity: 1; transform: scale(1.25); border-color: var(--ink); }

@keyframes cup-float {
  0%, 100% { transform: rotateX(var(--tx, 0deg)) rotateY(var(--ty, 0deg)) translateY(0) rotateZ(-1.2deg); }
  50% { transform: rotateX(var(--tx, 0deg)) rotateY(var(--ty, 0deg)) translateY(-12px) rotateZ(1.2deg); }
}
@keyframes lid-wobble {
  0%, 100% { transform: rotate(0deg); }
  50% { transform: rotate(0.8deg); }
}
@keyframes shadow-pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(0.86); opacity: 0.7; }
}
@keyframes steam-rise {
  0% { opacity: 0; transform: translateY(6px) scaleY(0.9); }
  25% { opacity: 0.55; }
  70% { opacity: 0.35; }
  100% { opacity: 0; transform: translateY(-14px) scaleY(1.05); }
}
@keyframes shine-sweep {
  0% { transform: translateX(0) skewX(-18deg); }
  55%, 100% { transform: translateX(220px) skewX(-18deg); }
}
@keyframes label-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes rise {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes cup-in {
  from { opacity: 0; transform: translateY(10px) scale(0.95); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

.eyebrow, h1, .hero-sub, .hero-actions, .hero-note, .hero-bg-word {
  opacity: 0;
  animation: rise 0.8s cubic-bezier(0.16, 0.8, 0.3, 1) forwards;
}
.eyebrow { animation-delay: 0.05s; }
h1 { animation-delay: 0.15s; }
.hero-sub { animation-delay: 0.3s; }
.hero-actions { animation-delay: 0.42s; }
.hero-note { animation-delay: 0.5s; }
.hero-bg-word { animation-delay: 0.2s; }
.cup-stage {
  opacity: 0;
  animation: cup-in 0.9s cubic-bezier(0.16, 0.8, 0.3, 1) forwards;
  animation-delay: 0.4s;
}

@media (max-width: 640px) {
  .hero { padding: 24px 0 56px; }
  .cup-hint { display: none; }
  /* translateY dihapus total di sini karena grid sudah mengaturnya dengan aman */
}

@media (prefers-reduced-motion: reduce) {
  .cup-3d, .cup-shadow, .steam-path, .band-shine, .cup-lid {
    animation: none !important;
  }
}
</style>