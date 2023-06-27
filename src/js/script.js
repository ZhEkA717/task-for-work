const submit = document.querySelector('.submit-button');
const progressBar = document.querySelector('.progress-bar');
const mainForm = document.querySelector('.main');
const successMsg = document.querySelector('.registered-success');
const shape = document.querySelector('.shape');

const firstName = document.querySelector('.firstName');
const lastName = document.querySelector('.lastName');
const email = document.querySelector('.email');
const password = document.querySelector('.password');
const confirmPassword = document.querySelector('.confirm-password');

const formElements = document.querySelectorAll('.form-element');
let isLoading = false;

firstName.addEventListener('input', validateInput);
lastName.addEventListener('input', validateInput);
email.addEventListener('input', (event) => addEmailError(event.target));
password.addEventListener('input', (event) => addPasswordError(event.target));
confirmPassword.addEventListener('input', (event) => addPasswordError(event.target));

firstName.addEventListener('blur', validateInput);
lastName.addEventListener('blur', validateInput);
password.addEventListener('blur', (event) => addPasswordError(event.target));
confirmPassword.addEventListener('blur', (event) => addPasswordError(event.target));

const stylesValid = {
    borderBottom: '1px solid #F2F2F2',
    color: '#111111',
    display: 'block'
}

const stylesInvalid = {
    borderBottom: '2px solid #ff0000',
    color: '#ff0000',
    display: 'none'
}


function validateInput(event) {
    addRequiredError(event.target);
}

// required field for type text, password
function addRequiredError(el) {
    el.value
        ?  el.style.borderBottom = stylesValid.borderBottom
        :  el.style.borderBottom = stylesInvalid.borderBottom;
}

function addEmailError(el) {
    if (emailIsValid(el)) {
        el.style.borderBottom = stylesValid.borderBottom;
        el.style.color = stylesValid.color;
        shape.style.display = stylesValid.display;
    } else {
        el.style.borderBottom = stylesInvalid.borderBottom;
        el.style.color = stylesInvalid.color;
        shape.style.display = stylesInvalid.display;
    }
}

function addPasswordError(el) {
    passwordIsValid(el)
    ?  el.style.borderBottom = stylesValid.borderBottom
    :  el.style.borderBottom = stylesInvalid.borderBottom;
}


// regular for mail validate
function emailIsValid(el) {
    return el.value.toLowerCase()
    .match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}

// validate password lenght > 8, upperCase, numbers 
function passwordIsValid(el) {
    const lengthPassword = el.value.length > 8;
    const mixtureLowerAndUpperLetter = /([a-z])/.test(el.value)
    && /([A-Z])/.test(el.value);
    const mixtureLettersAndNumbers = /[0-9]/.test(el.value)
    && /([a-z]|[A-Z])/.test(el.value);

    return el && 
    lengthPassword && 
    mixtureLettersAndNumbers &&
    mixtureLowerAndUpperLetter;
}

// compare passwords
function isEquallyPasswords() {
    const password = document.querySelector('.password');
    const confirmPassword = document.querySelector('.confirm-password');

    return password.value === confirmPassword.value;
}

// reset fields of password if passwords not equal
function resetToErrorPassword(el) {
    el.value = '';
    el.style.borderBottom = stylesInvalid.borderBottom;
}

// validate form by clicked button
function isValidForm() {
    const firstName = document.querySelector('.firstName');
    const lastName = document.querySelector('.lastName');
    const email = document.querySelector('.email');
    const password = document.querySelector('.password');
    const confirmPassword = document.querySelector('.confirm-password');

    addRequiredError(firstName);
    addRequiredError(lastName);
    addRequiredError(email);
    addRequiredError(password);
    addRequiredError(confirmPassword);

    addEmailError(email);

    addPasswordError(password);
    addPasswordError(confirmPassword);
    
    return firstName.value && lastName.value  && email.value &&
        password.value && confirmPassword.value && emailIsValid(email) &&
        passwordIsValid(password) && passwordIsValid(password);
}

// animation for button
function startAnimation (event) {
    const isAnimation = event.target.classList.contains(('animate__animated','animate__shakeX'));

    if (!isAnimation) 
        event.target.classList.add('animate__animated','animate__shakeX');
}

// save user or animate button
submit.addEventListener('click', (event) => {
    event.preventDefault();
   isValidForm() ? saveUser() : startAnimation(event);
});

// end button animation
submit.addEventListener('animationend', (event) => {
    event.target.classList.remove('animate__animated','animate__shakeX');
})

// field animation with delay 250ms
formElements.forEach((item, i) => {
    setTimeout(() => {
        item.style.opacity = 1;
        item.classList.add('animate__animated', 'animate__fadeInUp');
    }, i * 250);
})

// post fake request
function saveUser() {
    if (!isEquallyPasswords()) {
        resetToErrorPassword(password);
        resetToErrorPassword(confirmPassword);
        return alert('Error! Passwords are not equal...')
    }

    isWaitRequest();

    fetch('https://jsonplaceholder.typicode.com/todos', {
        method: "post",
        body: JSON.stringify({
            completed:  false,
            title: 'Add new user',
        })
      }).then(res => {
        isGetRequest();

        if (res.status === 201) registeredSuccessful();
      })

}

// show loading progress-ber and disabled button 
function isWaitRequest() {
    submit.disabled = true;
    progressBar.style.display = stylesValid.display;
}

// hide loading progress-ber and enabled button
function isGetRequest() {
    submit.disabled = false;
    progressBar.style.display = stylesInvalid.display;
}

// show successfully message and hide form 
function registeredSuccessful() {
    successMsg.style.display = stylesValid.display;
    mainForm.style.display = stylesInvalid.display;
}