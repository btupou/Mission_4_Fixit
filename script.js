console.log('Fixit Mission 4 Connected ✅')

// Make Back and Next buttons clickable
document.getElementById('backBtn')?.addEventListener('click', () => {
  console.log('Back button clicked')
})

const nextBtn = document.getElementById('nextBtn')
nextBtn?.addEventListener('click', (e) => {
  console.log('Next button clicked')
  // Prevent form submits if ever placed inside a <form>
  if (nextBtn.type === 'submit') e.preventDefault()
  // Reverse selected state: white/green <-> green/white
  nextBtn.classList.toggle('is-selected')
})

// Make the 6 cirle buttons clickable
document.querySelectorAll('.issue-btn').forEach((button) => {
  button.addEventListener('click', () => {
    // Remove "is-selected" from all buttons
    document
      .querySelectorAll('.issue-btn')
      .forEach((btn) => btn.classList.remove('is-selected'))
    // Add "is-selected" to the clicked one
    button.classList.add('is-selected')

    console.log('Issue chosen:', button.dataset.issue)
  })
})
