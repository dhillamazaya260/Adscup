import { reactive, ref, computed, onMounted, onUnmounted } from 'vue'
import { loadApplication } from '../utils/applicationStorage'

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v))
}

/**
 * Simulasi data campaign secara "live". State di bawah ini sengaja dibuat di
 * module scope (bukan di dalam useLiveCampaignData) supaya jadi satu sumber
 * data yang sama dipakai bersama, dan angkanya tetap bertambah walau
 * pengguna keluar-masuk halaman dashboard dalam satu sesi browser — mirip
 * data live sungguhan, bukan reset ke nol tiap kali dibuka.
 *
 * Catatan: ini adalah pratinjau dengan data simulasi (belum ada backend).
 * Struktur reactive-nya sudah dibuat supaya gampang diganti jadi fetch API
 * / WebSocket sungguhan nanti — tinggal isi `cafes` dari response server
 * dan panggil pushFeedEvent() saat ada event baru masuk.
 */
const cafes = reactive([
  { name: 'Kopi Senja', city: 'Jakarta', cups: 2140, scans: 4360 },
  { name: 'Ruang Seduh', city: 'Jakarta', cups: 1860, scans: 3780 },
  { name: 'Kedai Kopi Dago', city: 'Bandung', cups: 1580, scans: 3210 },
  { name: 'Seduh Pagi', city: 'Bandung', cups: 1340, scans: 2690 },
  { name: 'Kopi Rungkut', city: 'Surabaya', cups: 1520, scans: 3080 },
  { name: 'Kopi Kaliurang', city: 'Yogyakarta', cups: 1260, scans: 2540 },
  { name: 'Kopi Pandanaran', city: 'Semarang', cups: 1120, scans: 2260 },
  { name: 'Kedai Sanur', city: 'Bali', cups: 940, scans: 1870 }
])

// jendela bergulir untuk grafik "20 menit terakhir" (nilai terbaru di ujung array)
const WINDOW_SIZE = 20
function seedWindow() {
  const arr = []
  let v = randInt(16, 24)
  for (let i = 0; i < WINDOW_SIZE; i++) {
    v = clamp(v + randInt(-4, 5), 4, 48)
    arr.push(v)
  }
  return arr
}
const scanWindow = ref(seedWindow())

// feed aktivitas real-time, terbaru di paling atas
const feed = ref([])
let feedIdCounter = 0
function pushFeedEvent(cafe) {
  feedIdCounter += 1
  feed.value.unshift({ id: feedIdCounter, cafe: cafe.name, city: cafe.city, at: Date.now() })
  if (feed.value.length > 7) feed.value.pop()
}
for (let i = 0; i < 5; i++) {
  pushFeedEvent(cafes[randInt(0, cafes.length - 1)])
}

function tick() {
  // grafik pemindaian bergerak tiap tick, nilai baru masih berdekatan
  // dengan nilai sebelumnya (random walk) supaya bentuk grafiknya organik
  const lastVal = scanWindow.value[scanWindow.value.length - 1]
  const nextVal = clamp(lastVal + randInt(-5, 6), 4, 48)
  scanWindow.value = [...scanWindow.value.slice(1), nextVal]

  // satu cafe terpilih acak dapat scan baru + event di live feed
  const cafe = cafes[randInt(0, cafes.length - 1)]
  cafe.scans += randInt(1, 5)
  pushFeedEvent(cafe)

  // sesekali ada cup baru yang mulai beredar di cafe tsb
  if (Math.random() < 0.35) {
    cafe.cups += randInt(2, 9)
  }
}

const totalScans = computed(() => cafes.reduce((sum, c) => sum + c.scans, 0))
const totalCups = computed(() => cafes.reduce((sum, c) => sum + c.cups, 0))
const activeCafes = computed(() => cafes.length)

const sortedDistribution = computed(() => {
  const map = new Map()
  for (const c of cafes) {
    map.set(c.city, (map.get(c.city) || 0) + c.cups)
  }
  return [...map.entries()]
    .map(([name, cups]) => ({ name, cups }))
    .sort((a, b) => b.cups - a.cups)
})
const citiesReached = computed(() => sortedDistribution.value.length)
const maxCityCups = computed(() => sortedDistribution.value[0]?.cups || 1)
const topCafes = computed(() => [...cafes].sort((a, b) => b.scans - a.scans).slice(0, 5))

export function useLiveCampaignData() {
  const application = loadApplication()
  const brandName = application?.businessName || 'Brand Anda'
  const contactName = application?.contactName || ''

  // dipakai untuk badge "+N sejak dashboard dibuka" — snapshot per kunjungan
  const initialCups = totalCups.value
  const initialScans = totalScans.value
  const cupsDelta = computed(() => totalCups.value - initialCups)
  const scansDelta = computed(() => totalScans.value - initialScans)

  const now = ref(Date.now())
  let mainInterval = null
  let clockInterval = null

  onMounted(() => {
    mainInterval = setInterval(tick, 2600)
    clockInterval = setInterval(() => {
      now.value = Date.now()
    }, 1000)
  })
  onUnmounted(() => {
    clearInterval(mainInterval)
    clearInterval(clockInterval)
  })

  return {
    brandName,
    contactName,
    totalCups,
    totalScans,
    activeCafes,
    citiesReached,
    cupsDelta,
    scansDelta,
    scanWindow,
    feed,
    now,
    sortedDistribution,
    maxCityCups,
    topCafes
  }
}