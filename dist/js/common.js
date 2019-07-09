//galery
document.querySelectorAll(".show-image").forEach((el,i) => {
    el.onmousedown = function(event){
        event.preventDefault();
        var mainImage = i; 
        document.querySelectorAll('.images > img').forEach(el =>{
            el.classList.remove('active');
        })
        document.querySelectorAll('.images > img')[mainImage].className += ' active'; 
    };
});


var slider = multiItemSlider('.galery')


//horisontal slider for recomended
var sliderVertical = multiItemSliderHorisontal('.slider')

///change color label
document.querySelectorAll(".color__radio_input-block").forEach(el=>{
    el.onmousedown = function(event){
        let newColorValue = this.firstElementChild.id;
        document.querySelector(".color__value").innerHTML = newColorValue;
    }
})

///change size label
document.querySelectorAll(".size__radio_input-block").forEach(el=>{
    el.onmousedown = function(event){
        let newColorValue = this.firstElementChild.id;
        document.querySelector(".size__value").innerHTML = newColorValue;
    }
})

//  change quantity
//up
let quantity = parseInt(document.querySelector(".quantity__number").innerHTML,10);
let priceArr = document.querySelector(".price__actual").innerHTML.split("");
priceArr.splice(0,1);
//let price = ;
document.querySelector(".quantity__summ").innerHTML = `$${priceArr.join('')*quantity}.00`;

document.querySelector(".arrow.arrow-up").onmousedown = function(){
    if(quantity < 99){
        quantity++;
        document.querySelector(".quantity__number").innerHTML = quantity;
        document.querySelector(".quantity__summ").innerHTML = `$${priceArr.join('')*quantity}.00`;
    }
}

//down
document.querySelector(".arrow.arrow-down").onmousedown = function(){
    if(quantity > 1){
        quantity--;
        document.querySelector(".quantity__number").innerHTML = quantity;
        document.querySelector(".quantity__summ").innerHTML = `$${priceArr.join('')*quantity}.00`;
    }
}


//ADD TO CART
let timer;
function addToCart(){
    document.querySelector(".hint").className += ' show';
    timer = setTimeout(()=>{
        document.querySelector(".hint").classList.remove('show');
        clearTimeout(timer);
    },4000)
}

function addToWishlist(){
    alert("ADD TO WISHLIST");
}

function addToGiftregistry(){
    alert("ADD TO GIFTREGISTRY");
}