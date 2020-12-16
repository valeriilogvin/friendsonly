let $swipeBottomBlocks = document.querySelectorAll('.js_swipe_bottom');
let $freeSubscribe = document.querySelector('.js_free_subscribe_block');
let $overlay = document.querySelector('.js_overlay');
let myElement = document.querySelector('.js_swipe_bottom');

myElement.addEventListener("touchstart", startTouch, false);
myElement.addEventListener("touchmove", moveTouch, false);

// Swipe Up / Down / Left / Right
var initialX = null;
var initialY = null;

function startTouch(e) {
    initialX = e.touches[0].clientX;
    initialY = e.touches[0].clientY;
}

function moveTouch(e) {
    if (initialX === null) {
        return;
    }

    if (initialY === null) {
        return;
    }

    var currentX = e.touches[0].clientX;
    var currentY = e.touches[0].clientY;

    var diffX = initialX - currentX;
    var diffY = initialY - currentY;

    if (Math.abs(diffX) > Math.abs(diffY)) {
        // sliding horizontally
        if (diffX > 0) {
            // swiped left
            console.log("swiped left");
        } else {
            // swiped right
            console.log("swiped right");
        }
    } else {
        // sliding vertically
        if (diffY > 0) {
            // swiped up
            console.log("swiped up");
        } else {
            // swiped down
            myElement.classList.remove('active');
            console.log("swiped down");
        }
    }

    initialX = null;
    initialY = null;

    e.preventDefault();
}

$overlay.addEventListener('click', ()=> {
    for( let elem of $swipeBottomBlocks) elem.classList.remove('active');
});

function openFreeSubscribe(){
    $freeSubscribe.classList.add('active')
}