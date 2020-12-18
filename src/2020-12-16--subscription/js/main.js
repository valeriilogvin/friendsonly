let $swipeBottomBlocks = document.querySelectorAll('.js_swipe_bottom');
let $overlay = document.querySelector('.js_overlay');
let myElement = document.querySelector('.js_swipe_bottom');

let $freeSubscribe = document.querySelector('.js_free_subscribe_block');
let $freeInputCard = $freeSubscribe.querySelector('.js_input_card');
let $freeInputCardIcon = $freeSubscribe.querySelector('.js_card_icon');
let $freeInputCardDate = $freeSubscribe.querySelector('.js_input_card_date');
let $freeInputCardCvv = $freeSubscribe.querySelector('.js_input_card_cvv');
let $freeInputBtnNext = $freeSubscribe.querySelector('.js_card_next_step');
let $freeInputInfo = $freeSubscribe.querySelector('.js_card_info');
let $freeBtnAddCard = $freeSubscribe.querySelector('.js_btn_add_card');

let $subscribe = document.querySelector('.js_free_subscribe_block');
let $inputCard = $subscribe.querySelector('.js_input_card');
let $inputCardIcon = $subscribe.querySelector('.js_card_icon');
let $inputCardDate = $subscribe.querySelector('.js_input_card_date');
let $inputCardCvv = $subscribe.querySelector('.js_input_card_cvv');
let $inputBtnNext = $subscribe.querySelector('.js_card_next_step');
let $inputInfo = $subscribe.querySelector('.js_card_info');
let $btnAddCard = $subscribe.querySelector('.js_btn_add_card');


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

$freeInputCard.oninput = function () {
    validatorCard($freeInputCard);
};

function validatorCard($input) {
    let cardNumber;
    let tempVal = $input.value.replace(/\D/g, '');

    cardNumber = (tempVal.slice(0,4).replace(/(.{4})/g, '$1 ') +
        tempVal.slice(4,8).replace(/(.{4})/g, '$1 ') +
        tempVal.slice(8,12).replace(/(.{4})/g, '$1 ') +
        tempVal.slice(12,16)).trim();

    $input.value = $input.value = cardNumber;

    let firstNum = +tempVal.slice(0, 1);

    if(firstNum === 2){
        $freeInputCardIcon.setAttribute('src', 'img/mir.svg')
    }else if(firstNum === 5){
        $freeInputCardIcon.setAttribute('src', 'img/mc.svg')
    }else if(firstNum === 4){
        $freeInputCardIcon.setAttribute('src', 'img/visa.svg')
    }else {
        $freeInputCardIcon.setAttribute('src', 'img/card.svg')

    }

    if($input.value.length === 19){
        $freeInputBtnNext.style = 'opacity: 1; visibility: visible';
        let lastNumbers = $input.value.slice(15,19);
        $freeInputInfo.innerText = "***" + lastNumbers;
        console.log(lastNumbers);
    }
}

function inputDate(){
    $freeInputBtnNext.style = 'opacity: 0; visibility: hidden';
    $freeInputCard.style.display = 'none';
    $freeInputInfo.style.display = 'block';
    $freeInputCardDate.style = 'opacity: 1; visibility: visible';
    $freeInputCardCvv.style = 'opacity: 1; visibility: visible';
    $freeInputCardDate.focus();
}

$freeInputCardDate.oninput = function () {
    validatorCardDate($freeInputCardDate);
};

function validatorCardDate($input) {
    let cardNumber;
    let tempVal = $input.value.replace(/\D/g, '');

    cardNumber = (tempVal.slice(0,2).replace(/(.{2})/g, '$1/') +
        tempVal.slice(2,4)).trim();

    $input.value = $input.value = cardNumber;

    if($input.value.length === 5){
        $freeInputCardCvv.focus();
    }
}

$freeInputCardCvv.oninput = function () {
    let dateLength = $freeInputCardDate.value.length,
        cvvLength = $freeInputCardCvv.value.length;
    if(dateLength === 5 && cvvLength === 3){
        $freeBtnAddCard.classList.remove('disabled')
    }
};

function addFreeCard() {
    let card = $freeInputCard.value,
        date = $freeInputCardDate.value,
        cvv = $freeInputCardCvv.value;

    alert("card:" + card + " date:" + date + " cvv:" + cvv);
}