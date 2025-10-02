console.log('Fixit Form Connected ✅')

// this code lets the user know if the input in the current form is valid
// on clicking the register button it performs a validity check
// if the form is valid the user will be successfully registered

const fullName = document.getElementById('fullName')
const email = document.getElementById('email')
const phonenumber = document.getElementById('pnumber')
const password = document.getElementById('pword')
const terms = document.getElementById('terms')

const form = document.getElementById('createAccount')
const inputs = form.querySelectorAll('.form-input')

const submitForm = document.getElementById('submit-button')
const submitButton = submitForm.dataset.page

// validation functions
function validateName(name) {
  return name.trim().length >= 3
}

function validateEmail(email) {
  // /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailPattern.test(email)
}

function validatePhone(phone) {
  // https://stackoverflow.com/questions/9850428/regular-expression-to-validate-new-zealand-phone-numbers
  const phonePattern = /^[\d\s\-\+\(\)]{10,}$/
  return phonePattern.test(phone)
}

function validatePassword(password) {
  return password.trim().length >= 8
}

function showSuccess(input) {
  clearError(input)
  input.classList.add('success')
  console.log('Success for:', input.id)
  console.log(input.classList)
  // input.classList.remove('error')
}

function showError(input, message) {
  console.log('Error for:', input.id)

  let errorDivId

  if (input.id === 'fullName') {
    errorDivId = 'nameError'
  } else if (input.id === 'email') {
    errorDivId = 'emailError'
  } else if (input.id === 'pnumber') {
    errorDivId = 'phoneError'
  } else if (input.id === 'pword') {
    errorDivId = 'passwordError'
  }

  const errorDiv = document.getElementById(errorDivId)

  // input.classList.add('h2')

  // add styling to input border
  input.classList.add('error')
  input.classList.remove('success')

  // show the error message
  errorDiv.textContent = message
  errorDiv.classList.add('show')
}

function clearError(input) {
  let clearDivId
  console.log(input.id)

  if (input.id === 'fullName') {
    clearDivId = 'nameError'
  } else if (input.id === 'email') {
    clearDivId = 'emailError'
  } else if (input.id === 'pnumber') {
    clearDivId = 'phoneError'
  } else if (input.id === 'pword') {
    clearDivId = 'passwordError'
  }

  const clearDiv = document.getElementById(clearDivId)
  console.log(clearDiv)

  // remove error styling from input
  input.classList.remove('error')

  // clear the error message and hide the error div
  clearDiv.textContent = ''
  clearDiv.classList.remove('show')
}

// validate form
function validate(e) {
  let isValid = true

  const fullname1 = fullName.value
  const email1 = email.value
  const phonenumber1 = phonenumber.value
  const password1 = password.value

  // check if each part of the form is valid
  // if something is not valid the "is valid" check will fail
  if (!validateName(fullname1)) {
    isValid = false
  }
  if (!validateName(email1)) {
    isValid = false
  }
  if (!validateName(phonenumber1)) {
    isValid = false
  }
  if (!validateName(password1)) {
    isValid = false
  }

  // validity console logs
  console.log('is valid:', isValid)
  console.log(validateName(fullname1))
  console.log(validateEmail(email1))
  console.log(validatePhone(phonenumber1))
  console.log(validatePassword(password1))

  // console.log(submitButton)
  if (isValid) {
    window.location.href = submitButton
  }
}

// form input validity check
// if the input is empty "" the error and success is cleared
// input is not valid? show error
// input is valid! show success

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

// listen to submit form button
// run the validate function
submitForm.addEventListener('click', (e) => {
  validate()
})
