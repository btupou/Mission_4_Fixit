console.log('Fixit Mission 4 Connected ✅')

const backButton = document.getElementById('back-button')
const nextButton = document.getElementById('next-button')
const backPage = backButton.dataset.page

// Make Back and Next buttons clickable
document.getElementById('back-button')?.addEventListener('click', () => {
  console.log(backButton.dataset.page)
  console.log('Back button clicked')
  window.location.href = backPage
})

nextButton?.addEventListener('click', (e) => {
  console.log('Next button clicked')
  // Prevent form submits if ever placed inside a <form>
  if (nextButton.type === 'submit') e.preventDefault()
  // Reverse selected state: white/green <-> green/white
  nextButton.classList.toggle('is-selected')

  // ✅ Check if a page was selected
  if (selectedPage) {
    console.log('🚀 Navigating to:', selectedPage)
    window.location.href = selectedPage
  }
})

document.querySelectorAll('.circle-button').forEach((button) => {
  button.addEventListener('click', () => {
    // Remove "is-selected" from all buttons
    document
      .querySelectorAll('.circle-button')
      .forEach((btn) => btn.classList.remove('is-selected'))

    // Add "is-selected" to the clicked one
    button.classList.add('is-selected')

    selectedPage = button.dataset.page
    console.log('page selected:', selectedPage)

    // console.log('button chosen:', button.dataset.page)
  })
})
