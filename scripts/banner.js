let op = null;
let banner = document.getElementById("navigation");
let button = document.getElementById("nav-arrow");
let arrowActivated = false;

function rotateUp() {

    let degrees = 270;

    buttonTimer = setInterval(function () {

        if (degrees === 90){

            clearInterval(buttonTimer);
        }
        
        if (degrees === 360){

            degrees = 0;
        }

        button.style.transform = "rotate(" + degrees + "deg)";
        degrees += 10;

    }, 10)
    
}

function rotateDown() {

    let degrees = 90;

    buttonTimer = setInterval(function () {

        if (degrees === 270){

            clearInterval(buttonTimer);
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
