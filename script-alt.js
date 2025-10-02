console.log('Fixit Mission X Connected ✅')

const ctaButton = document.getElementById('circle-button')
const ctaPage = ctaButton.dataset.page

ctaButton?.addEventListener('click', (e) => {
  console.log('cta button clicked')

  window.location.href = ctaPage
})
