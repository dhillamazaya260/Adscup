import { createRouter, createWebHistory } from 'vue-router'
import LandingView from '../views/LandingView.vue'
import DashboardView from '../views/DashboardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'landing', component: LandingView },
    { path: '/dashboard', name: 'dashboard', component: DashboardView }
  ],
  scrollBehavior(to) {
    // dukung anchor link di landing page (#mulai, #kenapa, dst) sekaligus
    // pindah rute biasa yang selalu mulai dari atas halaman
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  }
})

export default router