let clock = document.querySelector('.clock');
let strip = document.querySelector('.strip');
let hours = document.querySelector('.hours');
let minutes = document.querySelector('.minutes');
let seconds = document.querySelector('.seconds');
let spans = document.querySelectorAll('span');

function getTimeElement(timeType, value) {
    let type;
    if (timeType === 'h') type = hours;
    else if (timeType === 'm') type = minutes;
    else if (timeType === 's') type = seconds;    

    let elements = type.querySelectorAll('.strip');
    let fspan = Array.from(elements[0].querySelectorAll('span'));
    let sspan = Array.from(elements[1].querySelectorAll('span'));

    let firstElement = fspan.filter(e => e.innerText == value[0] )
    let secondElement = sspan.filter(e => e.innerText == value[1] )
    
    return [firstElement[0], secondElement[0]];
}

function updateUI(arr) {
    let ySpace = clock.clientHeight;

    arr.forEach((e, i) => {
        e.classList.add('active');    

        e.parentElement.style.transform = `translateY(${(ySpace /  2) - (e.parentElement.offsetTop + e.offsetTop + (e.clientHeight / 2))}px)`;
        
        let div = e.parentElement.querySelector('div');
        div.style.transform = `translateY(${e.offsetTop}px)`;

    });
}


function updateStrip() {

    time = new Date();
    h = time.getHours();
    m = time.getMinutes();
    s = time.getSeconds();

    spans.forEach(span => {
        span.classList.remove('active');
        // console.log("removed class", span.innerText);
    })

    // Format hours, minutes, and seconds in array format
    h = h < 10 ? [0, h] : [Math.floor(h / 10), h % 10];
    m = m < 10 ? [0, m] : [Math.floor(m / 10), m % 10];
    s = s < 10 ? [0, s] : [Math.floor(s / 10), s % 10];

    updateUI(getTimeElement("h", h))
    updateUI(getTimeElement("m", m))
    updateUI(getTimeElement("s", s))


}

updateStrip();
setInterval(updateStrip, 1000);