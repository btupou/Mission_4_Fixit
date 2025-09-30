console.log('Fixit Form Connected ✅')

const fullName = document.getElementById('fullName')
const email = document.getElementById('email')
const phonenumber = document.getElementById('pnumber')
const password = document.getElementById('pword')
const terms = document.getElementById('terms')

const form = document.getElementById('createAccount')
const inputs = form.querySelectorAll('.form-input')

// validation functions
function validateName(name) {
  return name.trim().length >= 2 && /^[a-zA-Z\s]+$/.test(name)
}

function validateEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailPattern.test(email)
}

function validatePhone(phone) {
  const phonePattern = /^[\d\s\-\+\(\)]{10,}$/
  return phonePattern.test(phone)
}

// form inputs
fullName.addEventListener('input', (e) => {
  const value = e.target.value
  if (value === '') {
    clearError(fullName)
  } else if (validateName(value)) {
    showSuccess(fullName)
  } else {
    showError(
      fullName,
      'Name must be at least 2 characters and contain only letters',
    )
  }
})

email.addEventListener('input', (e) => {
  const value = e.target.value
  if (value === '') {
    clearError(email)
  } else if (validateEmail(value)) {
    showSuccess(email)
  } else {
    showError(email, 'Please enter a valid email address')
  }
})

phonenumber.addEventListener('input', (e) => {
  const value = e.target.value
  if (value === '') {
    clearError(phonenumber)
  } else if (validatePhone(value)) {
    showSuccess(phonenumber)
  } else {
    showError(phonenumber, 'Please enter a valid phone number')
  }
})

password.addEventListener('input', (e) => {
  const value = e.target.value
  if (value === '') {
    clearError(password)
  } else if (validatePassword(value)) {
    showSuccess(password)
  } else {
    showError(password, 'Password must be at least 8 characters long')
  }
})
