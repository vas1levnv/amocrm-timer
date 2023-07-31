const inputEl = document.querySelector('input');
const buttonEl = document.querySelector('button');
const timerEl = document.querySelector('span');

let countDownDate

// Напишите реализацию createTimerAnimator
// который будет анимировать timerEl
const createTimerAnimator = () => {
    return (seconds) => {
        let x = setInterval(function () {
            let now = new Date().getTime();
            let distance = countDownDate - now + 1000;
            let hoursTimer = checkTime(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
            let minutesTimer = checkTime(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
            let secondsTimer = checkTime(Math.floor((distance % (1000 * 60)) / 1000));

            function checkTime(time) {
                if (time < 10) {
                    time = `0${time}`
                }
                return time
            }


            timerEl.innerHTML = hoursTimer + ":"
                + minutesTimer + ":" + secondsTimer

            if (distance < 1) {
                clearInterval(x);
                timerEl.innerHTML = "<span style='color: red'>Таймер!!!!</span>";
                buttonEl.disabled = false
                inputEl.disabled = false
            }
        }, 100);


    };
};

const animateTimer = createTimerAnimator();


function validate(evt) {
    var theEvent = evt || window.event;

    if (theEvent.type === 'paste') {
        key = event.clipboardData.getData('text/plain');
    } else {
        var key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode(key);
    }
    var regex = /[0-9]|\./;
    if (!regex.test(key)) {
        theEvent.returnValue = false;
        if (theEvent.preventDefault) theEvent.preventDefault();
    }
}

buttonEl.addEventListener('click', () => {
    const seconds = Number(inputEl.value);
    animateTimer(seconds);
    buttonEl.disabled = true
    inputEl.disabled = true


    countDownDate = new Date().getTime() + ((seconds) * 1000);
});
