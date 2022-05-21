import './index.css';



const buyButton = document.querySelector(".sticky-buy__button");
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

function headerMenuFixed(e){
    if ((e.deltaY < 0) && (!headerLine.classList.contains('header__line_fixed'))){
        headerLine.classList.add('header__line_fixed');
    } else if ((e.deltaY > 0) && (headerLine.classList.contains('header__line_fixed'))){
        headerLine.classList.remove('header__line_fixed');
    }
}

document.addEventListener('scroll', windowScroll);

function addToCart(evt) {
    evt.preventDefault();
    //this function adds to cart with the current settings (price, devices, length)
}

buyButton.addEventListener('click', addToCart);

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

function closeFixedFullBuyBlock(){
    fullBuyBlock.classList.remove('buy_fixed');
    document.addEventListener('scroll', windowScroll);
    document.removeEventListener('wheel', headerMenuFixed);
    headerLine.classList.remove('header__line_fixed');
}

document.addEventListener('click', (evt) => {
    if (!isClickedOnBuySection(evt.target) && fullBuyBlock.classList.contains('buy_fixed')){
        closeFixedFullBuyBlock();
    }
})

document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape'){
        closeFixedFullBuyBlock();
    }
})

