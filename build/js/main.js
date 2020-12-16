let sec = 15,
    time = document.querySelector('.js_time');

let timerId = setInterval(() => {
    time.innerText = sec;
    sec--;
}, 1000);

setTimeout(() => {
    clearInterval(timerId);
    alert('stop');
}, 15000);