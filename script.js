console.log('Fixit Mission 4 Connected ✅')

// Make Back and Next buttons clickable
document.getElementById('back-button')?.addEventListener('click', () => {
  console.log('Back button clicked')
})

const backButton = document.getElementById('back-button')
const nextButton = document.getElementById('next-button')

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
  } else {
    console.log('⚠️ No page selected!')
    alert('Please select an option first!')
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
