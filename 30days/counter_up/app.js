var fb = document.querySelector('.facebook h2')
var yt = document.querySelector('.youtube h2')
var tt = document.querySelector('.tiktok h2')

function count(el, to){
    var count = 0;
    var time = 250;
    var step = to / time

    let counting = setInterval(() => {
        count += step
        if(count > to) {
            clearInterval(counting)
            el.innerText = to
        }else {
            el.innerText = Math.round(count)
        }
    }, 1);
}

count(fb, 3300)
count(yt, 1000)
count(tt, 9900)

// ----- Cach nang cao hon ----
// var listCounter = document.querySelectorAll('.counter')

// function count(el) {
//     var numberEl = el.querySelector('.number')
//     var to = parseInt(numberEl.innerText)
//     var count = 0;
//     var time = 144;
//     var step = to / time

//     let counting = setInterval(() => {
//         count += step
//         if(count > to) {
//             clearInterval(counting)
//             el.innerText = to
//         }else {
//             el.innerText = Math.round(count)
//         }
//     }, 1)
// }

// listCounter.forEach(item => {
//     count(item)
// })