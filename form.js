console.log('Fixit Form Connected ✅')

const fullName = document.getElementById('fullName')
const email = document.getElementById('email')
const phonenumber = document.getElementById('pnumber')
const password = document.getElementById('pword')
const terms = document.getElementById('terms')

const form = document.getElementById('createAccount')
const inputs = form.querySelectorAll('.form-input')

// Validation functions
function validateName(name) {
  return name.trim().length >= 2 && /^[a-zA-Z\s]+$/.test(name.trim())
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email.trim())
}

function validatePhone(phone) {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
  return phoneRegex.test(phone.replace(/\s/g, ''))
}

function validatePassword(password) {
  return password.length >= 8
}

// Display validation messages
function showError(input, message) {
  clearError(input)
  input.classList.add('error')
  const errorDiv = document.createElement('div')
  errorDiv.className = 'error-message'
  errorDiv.textContent = message
  input.parentNode.appendChild(errorDiv)
}

function showSuccess(input) {
  clearError(input)
  input.classList.add('success')
}

function clearError(input) {
  input.classList.remove('error', 'success')
  const existingError = input.parentNode.querySelector('.error-message')
  if (existingError) {
    existingError.remove()
  }
}

// Real-time validation
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

// Form submission validation
form.addEventListener('submit', (e) => {
  e.preventDefault()

  let isValid = true

  // Validate all fields
  if (!validateName(fullName.value)) {
    showError(
      fullName,
      'Name must be at least 2 characters and contain only letters',
    )
    isValid = false
  }

  if (!validateEmail(email.value)) {
    showError(email, 'Please enter a valid email address')
    isValid = false
  }

  if (!validatePhone(phonenumber.value)) {
    showError(phonenumber, 'Please enter a valid phone number')
    isValid = false
  }

  if (!validatePassword(password.value)) {
    showError(password, 'Password must be at least 8 characters long')
    isValid = false
  }

  if (terms && !terms.checked) {
    showError(terms, 'You must agree to the terms and conditions')
    isValid = false
  }

  if (isValid) {
    console.log('Form is valid!')
    // Here you would typically submit the form data
    alert('Account created successfully!')
  } else {
    console.log('Form has validation errors')
  }
})

// Validate form completeness for enabling submit button
function checkFormCompleteness() {
  const allFieldsValid =
    validateName(fullName.value) &&
    validateEmail(email.value) &&
    validatePhone(phonenumber.value) &&
    validatePassword(password.value) &&
    (!terms || terms.checked)

  const submitButton = document.querySelector(
    'button[type="submit"], .pill-button',
  )
  if (submitButton) {
    submitButton.disabled = !allFieldsValid
    submitButton.style.opacity = allFieldsValid ? '1' : '0.5'
  }
}

// Check form completeness on input changes
inputs.forEach((input) => {
  input.addEventListener('input', checkFormCompleteness)
})

if (terms) {
  terms.addEventListener('change', checkFormCompleteness)
}

// Initial check
checkFormCompleteness()
