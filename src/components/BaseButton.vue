<script setup>
defineProps({
  variant: {
    type: String,
    default: 'primary', // 'primary' | 'ghost' | 'nav'
    validator: (v) => ['primary', 'ghost', 'nav'].includes(v)
  },
  href: {
    type: String,
    default: '#'
  }
})
</script>

<template>
  <a :href="href" class="btn" :class="`btn-${variant}`">
    <slot />
  </a>
</template>

<style scoped>
.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-weight: 700;
  font-size: 0.95rem;
  padding: 15px 28px;
  border-radius: 999px;
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.btn-primary { background: var(--cherry); color: #fff; }
.btn-primary:hover { background: var(--cherry-dark); transform: translateY(-2px); }

.btn-ghost { background: var(--paper-alt); color: var(--ink); border: 1.5px solid var(--line); }
.btn-ghost:hover { background: var(--cherry-tint); color: var(--cherry); border-color: var(--cherry); transform: translateY(-2px); }

.btn-nav { background: var(--cherry); color: #fff; font-size: 0.85rem; padding: 9px 16px; }
.btn-nav:hover { background: var(--cherry-dark); }
</style>
