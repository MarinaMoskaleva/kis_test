import './index.css';

const buyButton = document.querySelector(".sticky-buy__button");
const fullBuyButton = document.querySelector(".buy__button");
const buyDetails = document.querySelector(".sticky-buy__info");

const fullBuyBlock = document.querySelector(".buy");
const stickyBuyBlock = document.querySelector(".sticky-buy");

const headerLine = document.querySelector(".header__line");

function windowScroll(e) {
    let scrolled = window.pageYOffset;
    if(scrolled > fullBuyBlock.offsetTop) {
        stickyBuyBlock.classList.add('sticky-buy_opened');
    } else {
        stickyBuyBlock.classList.remove('sticky-buy_opened');
    }
}

function hideSaveBlock() {
    const save = document.querySelector(".buy__save");
    save.setAttribute("style", "display: none");
}

function showSaveBlock() {
    const save = document.querySelector(".buy__save");
    save.setAttribute("style", "display: flex");
}

function fixFullBuyBlockDesc() {
    fullBuyBlock.classList.add('buy_fixed');
    document.addEventListener('wheel', headerMenuFixed);
    hideSaveBlock();
}

function unfixFullBuyBlockDesc() {
    fullBuyBlock.classList.remove('buy_fixed');
    document.removeEventListener('wheel', headerMenuFixed);
    showSaveBlock();
}

function windowScrollDesc(e) {
    let scrolled = window.pageYOffset;
    if(scrolled > fullBuyBlock.offsetTop) {
        fixFullBuyBlockDesc();
    } else {
        unfixFullBuyBlockDesc()
    }
}

function headerMenuFixed(e){
    if ((e.deltaY < 0) && (!headerLine.classList.contains('header__line_fixed'))){
        headerLine.classList.add('header__line_fixed');
    } else if ((e.deltaY > 0) && (headerLine.classList.contains('header__line_fixed'))){
        headerLine.classList.remove('header__line_fixed');
    }
}

function addToCart(evt) {
    evt.preventDefault();
    //this function adds to cart with the current settings (price, devices, length)
}

buyButton.addEventListener('click', addToCart);
fullBuyButton.addEventListener('click', addToCart);

function openFixedFullBuyBlock(){
    document.removeEventListener('scroll', windowScroll);
    stickyBuyBlock.classList.remove('sticky-buy_opened');
    fullBuyBlock.classList.add('buy_fixed');
    document.addEventListener('wheel', headerMenuFixed);
}

buyDetails.addEventListener('click', openFixedFullBuyBlock);

function isClickedOnBuySection(evtTarget){
    return [...evtTarget.classList].some(item => item.includes('buy'));
}

function isClickedOnFixedHeader(evtTarget){
    return [...evtTarget.classList].some(item => item.includes('header'));
}

function closeFixedFullBuyBlock(){
    fullBuyBlock.classList.remove('buy_fixed');
    document.addEventListener('scroll', windowScroll);
    document.removeEventListener('wheel', headerMenuFixed);
    headerLine.classList.remove('header__line_fixed');
}

document.addEventListener('click', (evt) => {
    if (!isClickedOnBuySection(evt.target) && !isClickedOnFixedHeader(evt.target) && fullBuyBlock.classList.contains('buy_fixed')){
        closeFixedFullBuyBlock();
    }
})

document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape'){
        closeFixedFullBuyBlock();
    }
})

if (document.documentElement.clientWidth > 1023) {
    document.addEventListener('scroll', windowScrollDesc);
}

if (document.documentElement.clientWidth < 1024) {
    document.addEventListener('scroll', windowScroll);
}
