console.log("все врубилось")
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


////slideer
var multiItemSlider = (function () {
    return function (selector, config) {
    var
        _mainElement = document.querySelector(selector), // основный элемент блока
        _sliderWrapper = _mainElement.querySelector('.thumbs'), // обертка для .slider-item
        _sliderItems = _mainElement.querySelectorAll('.show-image'), // элементы (.slider-item)
        _sliderControls = _mainElement.querySelectorAll('.slider__control'), // элементы управления
        _sliderControlTop = _mainElement.querySelector('.slider__control_top'), // кнопка "TOP"
        _sliderControlBottom = _mainElement.querySelector('.slider__control_bottom'), // кнопка "BOTTOM"
        _wrapperHeight = parseFloat(getComputedStyle(_sliderWrapper).height), // ширина обёртки
        _itemHeight = parseFloat(getComputedStyle(_sliderItems[0]).height), // ширина одного элемента    
        _positionTopItem = 0, // позиция левого активного элемента
        _transform = 0, // значение транфсофрмации .slider_wrapper
        _step = _itemHeight / _wrapperHeight * 100 +4, // величина шага (для трансформации)
        _items = []; // массив элементов
    // наполнение массива _items

    _sliderItems.forEach(function (item, index) {
        _items.push({ item: item, position: index, transform: 0 });
    });

    var position = {
        getMin: 0,
        getMax: _items.length - 1,
    }

    var _transformItem = function (direction) {
        if (direction === 'bottom') {
        if ((_positionTopItem + _wrapperHeight / _itemHeight - 1) >= position.getMax) {
            return;
        }
        if (!_sliderControlTop.classList.contains('slider__control_show')) {
            _sliderControlTop.classList.add('slider__control_show');
        }
        if (_sliderControlBottom.classList.contains('slider__control_show') && (_positionTopItem + _wrapperHeight / _itemHeight) >= position.getMax) {
            _sliderControlBottom.classList.remove('slider__control_show');
        }
        _positionTopItem++;
        _transform -= _step;
        }
        if (direction === 'top') {
        if (_positionTopItem <= position.getMin) {
            return;
        }
        if (!_sliderControlBottom.classList.contains('slider__control_show')) {
            _sliderControlBottom.classList.add('slider__control_show');
        }
        if (_sliderControlTop.classList.contains('slider__control_show') && _positionTopItem - 1 <= position.getMin) {
            _sliderControlTop.classList.remove('slider__control_show');
        }
        _positionTopItem--;
        _transform += _step;
        }
        _sliderWrapper.style.transform = 'translateY(' + _transform + '%)';
    }

    // обработчик события click для кнопок "назад" и "вперед"
    var _controlClick = function (e) {
        var direction = this.classList.contains('slider__control_bottom') ? 'bottom' : 'top';
        e.preventDefault();
        _transformItem(direction);
    };

    var _setUpListeners = function () {
        // добавление к кнопкам "назад" и "вперед" обрботчика _controlClick для событя click
        _sliderControls.forEach(function (item) {
        item.addEventListener('click', _controlClick);
        });
    }

    // инициализация
    _setUpListeners();

    return {
        right: function () { // метод bottom
        _transformItem('bottom');
        },
        left: function () { // метод top
        _transformItem('top');
        }
    }

    }
}());

var slider = multiItemSlider('.galery')
