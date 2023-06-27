const submit = document.querySelector('.submit-button');
const progressBar = document.querySelector('.progress-bar');

// animation for button
const startAnimation = (event) => {
    const isAnimation = event.target.classList.contains(('animate__animated','animate__shakeX'));

    if (!isAnimation) 
        event.target.classList.add('animate__animated','animate__shakeX');
}

submit.addEventListener('click', (event) => {
    event.preventDefault();

    // startAnimation(event);

    saveUser();

});


// end button animation
submit.addEventListener('animationend', (event) => {
    event.target.classList.remove('animate__animated','animate__shakeX');
})


const formElements = document.querySelectorAll('.form-element');

// field animation with delay 250ms
formElements.forEach((item, i) => {
    setTimeout(() => {
        item.classList.add('animate__animated', 'animate__fadeInUp');
    }, i * 250);
})


let isLoading = false;

function saveUser() {
    isWaitRequest();

    fetch('https://jsonplaceholder.typicode.com/todos', {
        method: "post",
        body: JSON.stringify({
            completed:  false,
            title: 'is okey',
        })
      }).then(res => {
        isGetRequest();

        if (res.status === 201) 
            console.log('Thank you! You registered!')
      })

}

function isWaitRequest() {
    submit.disabled = true;
    progressBar.style.display = 'block';
}

function isGetRequest() {
    submit.disabled = false;
    progressBar.style.display = 'none';
}
