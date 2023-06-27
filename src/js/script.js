const submit = document.querySelector('.submit-button');

submit.addEventListener('click', (event) => {
    event.preventDefault();

    const isAnimation = event.currentTarget.classList.contains('animation');

    if (!isAnimation) {
        event.currentTarget.classList.add('animation');

           setTimeout(() => {
               event.currentTarget.className = 'submit-button';
           }, 500);
    }
});

submit.addEventListener('animationend', (event) => {
    event.currentTarget.classList.remove('animation');
})


const formElements = document.querySelectorAll('.form-element');

formElements.forEach((item, i) => {
    setTimeout(() => {
        item.classList.add('animate__animated', 'animate__fadeInUp');
    }, i * 250);
})