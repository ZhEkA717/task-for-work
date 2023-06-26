const submit = document.querySelector('.submit-button');

submit.addEventListener('click', (event) => {
    event.preventDefault();

    const isAnimation = event.currentTarget.classList.contains('animation');
    console.log(isAnimation);

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