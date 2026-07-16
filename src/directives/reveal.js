// v-reveal: scroll-triggered fade/rise-in.
// Pair with the static `.reveal` class (see assets/main.css) on the same
// element so the opacity:0 starting state applies immediately with no
// JS delay. This directive only takes care of *when* to add `.is-visible`.
export const reveal = {
  mounted(el) {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReduced || !('IntersectionObserver' in window)) {
      el.classList.add('is-visible')
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 }
    )

    observer.observe(el)
  }
}
