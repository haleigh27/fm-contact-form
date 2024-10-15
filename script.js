// General Elements
const formEl = document.querySelector('.contact-form');
const successEl = document.querySelector('.success');

// Input elements
const inputEls = {
  text: {
    firstName: document.getElementById('first-name'),
    lastName: document.getElementById('last-name'),
    message: document.getElementById('message'),
  },

  email: document.getElementById('email'),
  queryType: document.querySelectorAll('input[name="query-type"]'),
  consent: document.getElementById('consent'),
};
// ---------------------------------------------------------

// Form submission event listener
formEl.addEventListener('submit', function (e) {
  e.preventDefault();

  if (validateForm()) {
    successEl.classList.remove('hidden');
    successEl.removeAttribute('aria-hidden');

    formEl.reset();

    setTimeout(() => {
      successEl.classList.add('hidden');
      successEl.setAttribute('aria-hidden', 'true');
    }, 5000);
  }
});

// Form validation function
function validateForm() {
  const isTextValid = Object.values(inputEls.text).every(validateTextInput);
  const isEmailValid = validateEmail(inputEls.email);
  const isRadioValid = validateRadioButtons(inputEls.queryType, 'query-type');
  const isCheckboxValid = validateCheckbox(inputEls.consent);

  return isTextValid && isEmailValid && isRadioValid && isCheckboxValid;
}

// Error message toggle function
function toggleError(inputEl, errorMessage) {
  const errorEl = document.getElementById(`${inputEl.id}-error`);
  if (errorMessage) {
    errorEl.textContent = errorMessage;
    errorEl.classList.remove('hidden');
    errorEl.removeAttribute('aria-hidden');
    errorEl.setAttribute('aria-invalid', 'true');
  } else {
    errorEl.textContent = '';
    errorEl.classList.add('hidden');
    errorEl.setAttribute('aria-hidden', 'true');
    errorEl.removeAttribute('aria-invalid');
  }
}

// Input field validation functions
function validateTextInput(inputEl) {
  const isValid = inputEl.value.trim() !== '';
  toggleError(inputEl, isValid ? '' : 'This field is required');
  return isValid;
}

function validateEmail(inputEl) {
  const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  const isValid = emailPattern.test(inputEl.value);
  toggleError(inputEl, isValid ? '' : 'Please enter a valid email address');
  return isValid;
}

function validateRadioButtons(radioGroup, name) {
  const isValid = Array.from(radioGroup).some((radio) => radio.checked);
  toggleError({ id: name }, isValid ? '' : 'Please select a query type');
  return isValid;
}

function validateCheckbox(inputEl) {
  const isValid = inputEl.checked;
  toggleError(
    inputEl,
    isValid ? '' : 'To submit this form, please consent to being contacted',
  );
  return isValid;
}
