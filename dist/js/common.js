
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
