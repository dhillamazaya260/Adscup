<script setup>
import TheNavbar from './components/TheNavbar.vue'
import TheHero from './components/TheHero.vue'
import TheAbout from './components/TheAbout.vue'
import TheBenefits from './components/TheBenefits.vue'
import TheHowItWorks from './components/TheHowItWorks.vue'
import TheApplyForm from './components/TheApplyForm.vue'
import TheClosingCta from './components/TheClosingCta.vue'
import TheFooter from './components/TheFooter.vue'
</script>

<template>
  <TheNavbar />
  <main>
    <TheHero />
    <TheAbout />
    <TheBenefits />
    <TheHowItWorks />
    <TheApplyForm />
    <TheClosingCta />
  </main>
  <TheFooter />
</template>
