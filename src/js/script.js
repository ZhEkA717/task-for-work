const submit = document.querySelector('.submit-button');

// animation for button
const startAnimation = () => {
    const isAnimation = event.currentTarget.classList.contains(('animate__animated','animate__shakeX'));

    if (!isAnimation) 
        event.currentTarget.classList.add('animate__animated','animate__shakeX');
}

submit.addEventListener('click', (event) => {
    event.preventDefault();

    startAnimation();
});


// end button animation
submit.addEventListener('animationend', (event) => {
    event.currentTarget.classList.remove('animate__animated','animate__shakeX');
})


const formElements = document.querySelectorAll('.form-element');

// field animation with delay 250ms
formElements.forEach((item, i) => {
    setTimeout(() => {
        item.classList.add('animate__animated', 'animate__fadeInUp');
    }, i * 250);
})