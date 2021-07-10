
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

/* scroll animations */

//fade scroll elements out

let cards = document.querySelectorAll(".scroll-card");

cards.forEach(el => {
    el.style.opacity = 0;
})


const checkInView = (element, offset) => {

    let elPosTop = element.getBoundingClientRect().top;
    
    return elPosTop <= (window.innerHeight || document.documentElement.clientHeight) - offset;
}

const displayScroll = element => {

    element.classList.add("scrolled");
    element.classList.add("slide-right");
}

const removeScroll = element => {

    element.classList.remove("scrolled")
    element.classList.add("slide-left")
}

let offSet = 500;

const handleScroll = () => {

    cards.forEach(el => {

        if (checkInView(el, offSet)) {
            
            displayScroll(el);
        }

        else {

            removeScroll(el);
        }
    });

}

window.addEventListener('scroll', () => {
    handleScroll();
});


/* animation on scroll script */

//FIXME: needs to be able to transition between projects on show case.



const hideProjectTemplate = () => {

    let projectBoxes = document.querySelectorAll(".collect");
    
    projectBoxes.forEach(element => {

        element.style.display = "none";
        element.style.opacity = 0;
    });

}

hideProjectTemplate();


const checkBottom = () => {

    let projectContainer = document.querySelector(".project-box");
    
    let position = projectContainer.getBoundingClientRect().bottom;

    return position <= (window.innerHeight);
}

let stateOpacity = 0;
let state = 0;

const boundOpacity = opacityValue => {

    if (opacityValue > 1) {

        opacityValue = 1;
    }

    else if (opacityValue < 0){

        opacityValue = 0;
    }

    return opacityValue;

}


let inTransition = false;

//FIXME: need to create a stable function

const removeTags = page => {

    let pageStates = document.querySelectorAll(".page-" + page);

    let stateNum = 1;
    pageStates.forEach(el => {

        el.classList.remove("state-" + stateNum);
        el.style.opacity = 0;
        el.style.display = "none";

        if (stateNum === 1) {

            el.classList.remove("init-trans");
    
        }
        else if (stateNum === 4) {

            el.classList.remove("end-trans");
        
        }

        stateNum++;
    });

}

const addTags = page => {

    let pageStates = document.querySelectorAll(".page-" + page);
    let stateNum = 1;
    
    pageStates.forEach(el => {

        el.classList.add("state-" + stateNum);
        el.style.display = "block";
        if (stateNum === 1) {

            el.classList.add("init-trans");
        }

        else if (stateNum === 4) {

            el.classList.add("end-trans");
        }

        stateNum++;
    });
}

let initPage = 1;

const transitionStates = (numStates, amount) => {

    amount *= -1;

    if (initPage === 3) {

        amount *= -1;
    }
    
    let increment = amount * 0.003;
   
    stateOpacity += increment;

    stateOpacity = boundOpacity(stateOpacity);
    
    let collectedStates = [];
    let transState = 1;

    for (let i = 0; i < numStates; ++i) {

        collectedStates[i] = document.querySelector(".state-" + transState);
        transState++;

    }

    collectedStates.forEach(el => {
        el.style.opacity = stateOpacity;
    })

    transState = 1;

    if (window.getComputedStyle(collectedStates[numStates - 1]).opacity === "0" && amount < 0 && initPage < 3) {

        removeTags(initPage);
        addTags(++initPage);
        state = 1;
        inTransition = false;
    }

    if (window.getComputedStyle(collectedStates[0]).opacity === "1" && amount > 0) {
        state = 4;
        inTransition = false;
    }

}



const projectScrollAnimation = amount => {


    let stateElement = document.querySelector(".state-" + state);
    let increment = amount * 0.003;


    stateElement.style.display = "block";

    stateOpacity += increment;

    stateOpacity = boundOpacity(stateOpacity);

    stateElement.style.opacity = stateOpacity;

    if (window.getComputedStyle(stateElement).opacity === "0" && state !== 0) {
        stateOpacity = 1;
        state--;
    }

    else if (window.getComputedStyle(stateElement).opacity === "1" && state !== 4) {
        
        stateOpacity = 0;
        state ++;
    }

    let endTrans = document.querySelector(".end-trans");

    if (initPage >= 2) {

        let initTrans = document.querySelector(".init-trans");
        
        if (window.getComputedStyle(initTrans).opacity === "0" && amount < 0) {
            removeTags(initPage);
            addTags(--initPage);
            inTransition = true;
        }
    }

    if (window.getComputedStyle(endTrans).opacity === "1" && amount > 0) {

        inTransition = true;
    }

}

let scrollY = 0;
let scrollFlag = document.querySelector(".state-0");
let endScroll = document.querySelector(".end-animate");
let transitionNum = 4;
let documentBody = document.querySelector("body");

const animateProjects = event => {

    let scroll = event.deltaY;

    if (checkBottom()){

      
        documentBody.classList.add("stop-scrolling");
    
        if (inTransition) {


            transitionStates(transitionNum, scroll);
        }

        else {

            projectScrollAnimation(scroll);
            
            if (window.getComputedStyle(scrollFlag).opacity === '0') {

                documentBody.classList.remove("stop-scrolling");
                
            }
        }
    }
}

window.addEventListener('wheel', animateProjects);