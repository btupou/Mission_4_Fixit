console.log('Fixit Form Connected ✅')

// Make Back and Next buttons clickable
// document.getElementById('backBtn')?.addEventListener('click', () => {
//   console.log('Back button clicked')
// })

const fname = document.getElementById('fname')
const email = document.getElementById('email')
const phonenumber = document.getElementById('pnumber')
const password = document.getElementById('pword')

const form = document.getElementById('createAccount')
const inputs = form.querySelectorAll('.form-input')

fname.addEventListener('input', (e) => {
  console.log('full name clicked')
  // Prevent form submits if ever placed inside a <form>
  if (fname.type === 'submit') e.preventDefault()
  // Reverse selected state: white/green <-> green/white
  // nextBtn.classList.toggle('is-selected')
})

email.addEventListener('input', (e) => {
  console.log('email input received')
})

phonenumber.addEventListener('input', (e) => {
  console.log('phone number input')
  console.log(e.target.value)
})

password.addEventListener('input', (e) => {
  console.log('password input')
})

// inputs.addEventListener('click', (e) => {
//   console.log('inputs hit')
// })

// // Make the 6 cirle buttons clickable
// document.querySelectorAll('.issue-btn').forEach((button) => {
//   button.addEventListener('click', () => {
//     // Remove "is-selected" from all buttons
//     document
//       .querySelectorAll('.issue-btn')
//       .forEach((btn) => btn.classList.remove('is-selected'))
//     // Add "is-selected" to the clicked one
//     button.classList.add('is-selected')

//     console.log('Issue chosen:', button.dataset.issue)
//   })
// })
