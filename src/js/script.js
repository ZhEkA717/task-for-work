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

firstName.addEventListener('input', validateInput);
lastName.addEventListener('input', validateInput);
firstName.addEventListener('blur', validateInput);
lastName.addEventListener('blur', validateInput);
password.addEventListener('blur', (event) => addPasswordError(event.target));
confirmPassword.addEventListener('blur', (event) => addPasswordError(event.target));

function validateInput(event) {
    const el = event.target;
    addRequiredError(el);
    
    el.value.length > 25
        ? el.value = el.value.slice(0,25)
        : el.value = el.value;
}

email.addEventListener('input', (event) => {
    const el = event.target;
    addEmailError(el);
})

function addRequiredError(el) {
    el.value
        ?  el.style.borderBottom = '1px solid #F2F2F2'
        :  el.style.borderBottom = '2px solid #ff0000';
}

function addEmailError(el) {
    if (emailIsValid(el)) {
        el.style.borderBottom = '1px solid #F2F2F2';
        shape.style.display = 'block';
    } else {
        el.style.borderBottom = '2px solid #ff0000';
        shape.style.display = 'none';
    }
}

function addPasswordError(el) {
    passwordIsValid(el)
    ?  el.style.borderBottom = '1px solid #F2F2F2'
    :  el.style.borderBottom = '2px solid #ff0000';
}

password.addEventListener('input', (event) => {
    addPasswordError(event.target);
})
confirmPassword.addEventListener('input', (event) => {
    addPasswordError(event.target);
})

function emailIsValid(el) {
    return el.value.toLowerCase()
    .match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}

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

function isEquallyPasswords() {
    const password = document.querySelector('.password');
    const confirmPassword = document.querySelector('.confirm-password');

    return password.value === confirmPassword.value;
}

function resetToErrorPassword(el) {
    el.value = '';
    el.style.borderBottom = '2px solid #ff0000';
}

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
const startAnimation = (event) => {
    const isAnimation = event.target.classList.contains(('animate__animated','animate__shakeX'));

    if (!isAnimation) 
        event.target.classList.add('animate__animated','animate__shakeX');
}

submit.addEventListener('click', (event) => {
    event.preventDefault();
   isValidForm() ? saveUser() : startAnimation(event);
});


// end button animation
submit.addEventListener('animationend', (event) => {
    event.target.classList.remove('animate__animated','animate__shakeX');
})


const formElements = document.querySelectorAll('.form-element');

// field animation with delay 250ms
formElements.forEach((item, i) => {
    setTimeout(() => {
        item.style.opacity = 1;
        item.classList.add('animate__animated', 'animate__fadeInUp');
    }, i * 250);
})


let isLoading = false;

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
            title: 'add new user',
        })
      }).then(res => {
        isGetRequest();

        if (res.status === 201) registeredSuccessful();
      })

}
// show loading progress-ber and disabled button 
function isWaitRequest() {
    submit.disabled = true;
    progressBar.style.display = 'block';
}
// hide loading progress-ber and enabled button
function isGetRequest() {
    submit.disabled = false;
    progressBar.style.display = 'none';
}
// show successfully message and hide form 
function registeredSuccessful() {
    mainForm.style.display = 'none';
    successMsg.style.display = 'block';
}