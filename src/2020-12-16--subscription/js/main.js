let $swipeBottomBlocks = document.querySelectorAll('.js_swipe_bottom'),
    $overlay = document.querySelector('.js_overlay'),

    $freeSubscribe = document.querySelector('.js_free_subscribe_block'),
    $freeSubscribeCard = $freeSubscribe.querySelector('.js_input_card'),
    $freeSubscribeDate = $freeSubscribe.querySelector('.js_input_card_date'),
    $freeSubscribeSvv = $freeSubscribe.querySelector('.js_input_card_cvv'),

    $subscribe = document.querySelector('.js_subscribe_block'),
    $subscribeCard = $subscribe.querySelector('.js_input_card'),
    $subscribeDate = $subscribe.querySelector('.js_input_card_date'),
    $subscribeSvv = $subscribe.querySelector('.js_input_card_cvv');

$overlay.addEventListener('click', ()=> {
    for( let elem of $swipeBottomBlocks) elem.classList.remove('active');
});

function openFreeSubscribe(){
    inputtingValues($freeSubscribe)
}

function openSubscribe(){
    inputtingValues($subscribe)
}

function inputtingValues($parentSelector) {

    $parentSelector.classList.add('active');

    let $inputCard = $parentSelector.querySelector('.js_input_card');
    let $inputCardIcon = $parentSelector.querySelector('.js_card_icon');
    let $inputCardDate = $parentSelector.querySelector('.js_input_card_date');
    let $inputCardCvv = $parentSelector.querySelector('.js_input_card_cvv');
    let $inputBtnNext = $parentSelector.querySelector('.js_card_next_step');
    let $inputInfo = $parentSelector.querySelector('.js_card_info');
    let $btnAddCard = $parentSelector.querySelector('.js_btn_add_card');

    $inputCard.oninput = function () {
        validatorCard($inputCard);
    };

    function validatorCard($input) {
        let cardNumber;
        let tempVal = $input.value.replace(/\D/g, ''),
            inputLength = $input.value.length;

        cardNumber = (tempVal.slice(0,4).replace(/(.{4})/g, '$1 ') +
            tempVal.slice(4,8).replace(/(.{4})/g, '$1 ') +
            tempVal.slice(8,12).replace(/(.{4})/g, '$1 ') +
            tempVal.slice(12,16)).trim();

        $input.value = cardNumber;

        let firstNum = +tempVal.slice(0, 1);

        if(inputLength < 14){
            $inputCardIcon.setAttribute('src', 'img/card.svg');
            $inputBtnNext.style = 'opacity: 0; visibility: hidden';

        } else{
            $inputBtnNext.style = 'opacity: 1; visibility: visible';
            let lastNumbers = $input.value.slice(-4);
            $inputInfo.innerText = "***" + lastNumbers;

            if(firstNum === 2){
                $inputCardIcon.setAttribute('src', 'img/mir.svg')
            }else if(firstNum === 5){
                $inputCardIcon.setAttribute('src', 'img/mc.svg')
            }else if(firstNum === 4){
                $inputCardIcon.setAttribute('src', 'img/visa.svg')
            }
        }
        if(inputLength === 19){
            $inputBtnNext.style = 'opacity: 0; visibility: hidden';
            $inputCard.style.display = 'none';
            $inputInfo.style.display = 'block';
            $inputCardDate.style = 'opacity: 1; visibility: visible';
            $inputCardCvv.style = 'opacity: 1; visibility: visible';
            $inputCardDate.focus();
        }
    }

    $inputCardDate.oninput = function () {
        validatorCardDate($inputCardDate);
        let dateLength = $inputCardDate.value.length,
            cvvLength = $inputCardCvv.value.length;

        if(dateLength === 5 && cvvLength === 3){
            $btnAddCard.classList.remove('disabled')
        }
    };

    $inputCardCvv.oninput = function () {
        let dateLength = $inputCardDate.value.length,
            cvvLength = $inputCardCvv.value.length;
        if(dateLength >= 5 && cvvLength >= 3){
            $btnAddCard.classList.remove('disabled')
        } else {
            $btnAddCard.classList.add('disabled')
        }

        $inputCardCvv.value = $inputCardCvv.value.replace(/\D/g, '');
    };

    function validatorCardDate($input) {
        let cardNumber;
        let tempVal = $input.value.replace(/\D/g, '');

        cardNumber = (tempVal.slice(0,2).replace(/(.{2})/g, '$1/') +
            tempVal.slice(2,4)).trim();

        $input.value = cardNumber;

        if($input.value.length === 5){
            $inputCardCvv.focus();
        }
    }

    $inputInfo.addEventListener('click', () => {
        $inputBtnNext.style = 'opacity: 1; visibility: visible';
        $inputCard.style.display = 'block';
        $inputInfo.style.display = 'none';
        $inputCardDate.style = 'opacity: 0; visibility: hidden';
        $inputCardCvv.style = 'opacity: 0; visibility: hidden';
        $inputCard.focus();
    });

    $inputBtnNext.addEventListener('click', () => {
        $inputBtnNext.style = 'opacity: 0; visibility: hidden';
        $inputCard.style.display = 'none';
        $inputInfo.style.display = 'block';
        $inputCardDate.style = 'opacity: 1; visibility: visible';
        $inputCardCvv.style = 'opacity: 1; visibility: visible';
        $inputCardDate.focus();
    });
}

function addFreeCard() {
    let card = $freeSubscribeCard.value,
        date = $freeSubscribeDate.value,
        cvv = $freeSubscribeSvv.value;

    alert("addFreeCard(); card:" + card + " date:" + date + " cvv:" + cvv);
}

function addCard() {
    let card = $subscribeCard.value,
        date = $subscribeDate.value,
        cvv = $subscribeSvv.value;

    alert("addCard(); card:" + card + " date:" + date + " cvv:" + cvv);
}

// Swipe Down
for(let block of $swipeBottomBlocks) {
    block.addEventListener("touchstart", startTouch, false);
    block.addEventListener("touchmove", moveTouch, false);
}

let initialY = null;

function startTouch(e) {
    initialY = e.touches[0].clientY;
}

function moveTouch(e) {

    if (initialY === null) {
        return;
    }

    let currentY = e.touches[0].clientY;

    let diffY = initialY - currentY;

    if (diffY > 0) {
        // swiped up
        // console.log("swiped up");
    } else {
        // swiped down
        for(let block of $swipeBottomBlocks) {
            if(block.classList.contains('active')){
                block.classList.remove('active');
            }
        }
        // console.log("swiped down");
    }

    initialY = null;

    e.preventDefault();
}

// function to fix mobile-browser height
(function init100vh(){
    function setHeight() {
        var vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    setHeight();
    window.addEventListener('resize', setHeight);
})();