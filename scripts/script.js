
/* script for banner elements */

let op = null;
let banner = document.getElementById("navigation");
let button = document.getElementById("nav-arrow");
let arrowActivated = false;

function rotateUp() {

    let degrees = 0;

    buttonTimer = setInterval(function () {

        if (degrees === 180){

            clearInterval(buttonTimer);
        }
        

        button.style.transform = "rotate(" + degrees + "deg)";
        degrees += 10;

    }, 10)
    
}

function rotateDown() {

    let degrees = 180;

    buttonTimer = setInterval(function () {

        if (degrees === 360){

            clearInterval(buttonTimer);
            degrees = 0;
        }
        
        button.style.transform = "rotate(" + degrees + "deg)";
        degrees += 10;

    }, 10)
    
}

function fadeIn () {

    op = 0.1;
    banner.style.display = "flex";
    arrowActivated = true;

    timer = setInterval(function () {
        
        if (op >= 1) {

            clearInterval(timer);

        }

        banner.style.opacity = op;
        banner.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.1;
    }, 10);

}

function fadeOut() {

    op = 1;
    arrowActivated = false;

    timer = setInterval(function () {
        
        if (op <= 0.1) {
            banner.style.display = "none";
            clearInterval(timer);
        }

        banner.style.opacity = op;
        banner.style.filter = "alpha(opacity" + op * 100 + ")";
        op -= op * 0.1;
    
    }, 10)

}

function bannerAnimation () {

    if (arrowActivated) {
        fadeOut();
        rotateDown();
    }

    else {
        fadeIn();
        rotateUp();
    }
}

button.onclick = bannerAnimation;

/* script for intro elements */

const animateIntro = () => {

    let numWords = 4;
    let word = null;
    words = [];

    for (let i = 1; i <= numWords; ++i) {

        word = document.getElementById("intro-" + i);

        words.push(word);
    }
    
    let i = 0;
    let timeDelay = 400;

    timer = setInterval(function () {
        
        
        if (i === 3){
            clearInterval(timer);
        }

        words[i].style.display = "inline-block";

        i++;

    }, timeDelay)

}

animateIntro();