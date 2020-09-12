//dynamic-adaptiv
// Dynamic Adapt v.1
// HTML data-da="where(uniq class name),position(digi),when(breakpoint)"
// e.x. data-da="item,2,992"
// Andrikanych Yevhen 2020
// https://www.youtube.com/c/freelancerlifestyle

"use strict";

(function () {
	let originalPositions = [];
	let daElements = document.querySelectorAll('[data-da]');
	let daElementsArray = [];
	let daMatchMedia = [];
	//Заполняем массивы
	if (daElements.length > 0) {
		let number = 0;
		for (let index = 0; index < daElements.length; index++) {
			const daElement = daElements[index];
			const daMove = daElement.getAttribute('data-da');
			if (daMove != '') {
				const daArray = daMove.split(',');
				const daPlace = daArray[1] ? daArray[1].trim() : 'last';
				const daBreakpoint = daArray[2] ? daArray[2].trim() : '767';
				const daType = daArray[3] === 'min' ? daArray[3].trim() : 'max';
				const daDestination = document.querySelector('.' + daArray[0].trim())
				if (daArray.length > 0 && daDestination) {
					daElement.setAttribute('data-da-index', number);
					//Заполняем массив первоначальных позиций
					originalPositions[number] = {
						"parent": daElement.parentNode,
						"index": indexInParent(daElement)
					};
					//Заполняем массив элементов 
					daElementsArray[number] = {
						"element": daElement,
						"destination": document.querySelector('.' + daArray[0].trim()),
						"place": daPlace,
						"breakpoint": daBreakpoint,
						"type": daType
					}
					number++;
				}
			}
		}
		dynamicAdaptSort(daElementsArray);

		//Создаем события в точке брейкпоинта
		for (let index = 0; index < daElementsArray.length; index++) {
			const el = daElementsArray[index];
			const daBreakpoint = el.breakpoint;
			const daType = el.type;

			daMatchMedia.push(window.matchMedia("(" + daType + "-width: " + daBreakpoint + "px)"));
			daMatchMedia[index].addListener(dynamicAdapt);
		}
	}
	//Основная функция
	function dynamicAdapt(e) {
		for (let index = 0; index < daElementsArray.length; index++) {
			const el = daElementsArray[index];
			const daElement = el.element;
			const daDestination = el.destination;
			const daPlace = el.place;
			const daBreakpoint = el.breakpoint;
			const daClassname = "_dynamic_adapt_" + daBreakpoint;

			if (daMatchMedia[index].matches) {
				//Перебрасываем элементы
				if (!daElement.classList.contains(daClassname)) {
					let actualIndex = indexOfElements(daDestination)[daPlace];
					if (daPlace === 'first') {
						actualIndex = indexOfElements(daDestination)[0];
					} else if (daPlace === 'last') {
						actualIndex = indexOfElements(daDestination)[indexOfElements(daDestination).length];
					}
					daDestination.insertBefore(daElement, daDestination.children[actualIndex]);
					daElement.classList.add(daClassname);
				}
			} else {
				//Возвращаем на место
				if (daElement.classList.contains(daClassname)) {
					dynamicAdaptBack(daElement);
					daElement.classList.remove(daClassname);
				}
			}
		}
		customAdapt();
	}

	//Вызов основной функции
	dynamicAdapt();

	//Функция возврата на место
	function dynamicAdaptBack(el) {
		const daIndex = el.getAttribute('data-da-index');
		const originalPlace = originalPositions[daIndex];
		const parentPlace = originalPlace['parent'];
		const indexPlace = originalPlace['index'];
		const actualIndex = indexOfElements(parentPlace, true)[indexPlace];
		parentPlace.insertBefore(el, parentPlace.children[actualIndex]);
	}
	//Функция получения индекса внутри родителя
	function indexInParent(el) {
		var children = Array.prototype.slice.call(el.parentNode.children);
		return children.indexOf(el);
	}
	//Функция получения массива индексов элементов внутри родителя 
	function indexOfElements(parent, back) {
		const children = parent.children;
		const childrenArray = [];
		for (let i = 0; i < children.length; i++) {
			const childrenElement = children[i];
			if (back) {
				childrenArray.push(i);
			} else {
				//Исключая перенесенный элемент
				if (childrenElement.getAttribute('data-da') == null) {
					childrenArray.push(i);
				}
			}
		}
		return childrenArray;
	}
	//Сортировка объекта
	function dynamicAdaptSort(arr) {
		arr.sort(function (a, b) {
			if (a.breakpoint > b.breakpoint) { return -1 } else { return 1 }
		});
		arr.sort(function (a, b) {
			if (a.place > b.place) { return 1 } else { return -1 }
		});
	}
	//Дополнительные сценарии адаптации
	function customAdapt() {
		//const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	}
}());

/*
let block = document.querySelector('.click');
block.addEventListener("click", function (e) {
	alert('Все ок ;)');
});
*/

/*
//Объявляем переменные
const parent_original = document.querySelector('.content__blocks_city');
const parent = document.querySelector('.content__column_river');
const item = document.querySelector('.content__block_item');
//Слушаем изменение размера экрана
window.addEventListener('resize', move);
//Функция
function move(){
	const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	if (viewport_width <= 992) {
		if (!item.classList.contains('done')) {
			parent.insertBefore(item, parent.children[2]);
			item.classList.add('done');
		}
	} else {
		if (item.classList.contains('done')) {
			parent_original.insertBefore(item, parent_original.children[2]);
			item.classList.remove('done');
		}
	}
}
//Вызываем функцию
move();
*/

// popup
'use strict';
		let doc = document,
			eventClick = "click",
			flag = 'false',
			speedHiddenScroll = +/\d+\.\d+/.exec(window.getComputedStyle(doc.querySelector('.out-popup')).getPropertyValue('transition-duration')) * 1000,
			lockElem = doc.querySelector('.fixed'),
			scrollWidth = window.innerWidth - doc.getElementsByTagName('html')[0].clientWidth;

		if (navigator.userAgent.indexOf("Mobile") !== -1 ||
			navigator.userAgent.indexOf("iPhone") !== -1 ||
			navigator.userAgent.indexOf("Android") !== -1 ||
			navigator.userAgent.indexOf("Windows Phone") !== -1) {
			eventClick = "touchstart";
		}

		function constr(arg1, arg2, arg3, arg4, arg5, arg6) {
			let flag2 = arg2
			if (flag2 === 'true') {
				doc.querySelector('div.' + arg1).classList.add('view__out'),
					doc.querySelector('div.' + arg1 + ' > .popup-window').classList.add('view__popup');
			} else {
				doc.querySelector('div.' + arg1).classList.remove('view__out'),
					doc.querySelector('div.' + arg1 + ' > .popup-window').classList.remove('view__popup');
			}
			setTimeout(() => {
				flag = arg3;
				lockElem.setAttribute('style', 'padding-right:' + arg4 + 'px');
				doc.body.setAttribute('style', 'padding-right:' + arg4 + 'px');
			}, arg6);
		}
		doc.onkeydown = (e) => {
			let closeEsc = doc.querySelector('.view__out');
			if (e.which == 27 && closeEsc) {
				constr(closeEsc.className.replace(/ .*/, ''), 'false', 'false', 0, 'auto', speedHiddenScroll);
			}
		}
		doc.body.addEventListener(eventClick, (e) => {
			let open = e.target.className.replace(/ .*/, ''),
				close = e.target.parentNode.parentNode.className.replace(/ .*/, ''),
				regex = /(?:Open)/gi;
			if (e.target.tagName.toLowerCase() === 'a' && open.match(regex) && flag === 'false') {
				e.preventDefault();
				constr(open, 'true', 'true', scrollWidth, 'hidden', 0);
			}
			if (open.match(regex) && flag === 'false') {
				constr(open, 'true', 'true', scrollWidth, 'hidden', 0);
			} else if (open.match(regex) && e.target.tagName.toLowerCase() === 'div') {
				constr(open, 'false', 'false', 0, 'auto', speedHiddenScroll);
			} else if (e.target.classList.contains('close')) {
				constr(close, 'false', 'false', 0, 'auto', speedHiddenScroll);
			} else if (open.match(regex) && flag === 'true') {
				let dooble = e.target.parentNode.parentNode.parentNode.className.replace(/ .*/, ''),
					doobleTarget = e.target.className.replace(/ .*/, '');
				constr(dooble, 'false', 'true', scrollWidth, 'hidden', 0);
				constr(doobleTarget, 'true', 'true', scrollWidth, 'hidden', 0);
			}
		});



// main swiper-slider

const slider = document.querySelector('.swiper-container');
const slidersItems = document.querySelectorAll('.slider-items__container');
const videoSlider = document.querySelector('.video-slider__content');

const mySwiper = new Swiper (slider , {

    slidesPerView: 1,         
    slidesPerGroup: 1,
    loop: true,
    lazy: true,
    speed: 800,
    autoplay: {
      delay: 2500,
    },

    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      type: 'bullets', 
      },

      navigation: {
        nextEl: '.main-slider__button-next',
        prevEl: '.main-slider__button-prev',
      },
     
      
});
//main swiper-slider

//slider-items
slidersItems.forEach((el) => {

	const slidersItems = new Swiper(el, {
		slidesPerView: 1,         
    slidesPerGroup: 1,
    spaceBetween: 1,
    loop: true,
    lazy: true,
    speed: 800,
    
    navigation: {
			nextEl: el.querySelector('.slider-items__button-next'),
			prevEl: el.querySelector('.slider-items__button-prev'),
    },

     breakpoints: {
        
        320: {
          slidesPerView: 1,
        },
       
        536: {
          slidesPerView: 2,
        },
      
        861: {
          slidesPerView: 3,
      },
        1115: {
          slidesPerView: 4,
      },
    }
	});
});

//slider-items

// video-slider
const sliderVideo = new Swiper (videoSlider , {

  slidesPerView: 1,         
  slidesPerGroup: 1,
  spaceBetween: 0,
  loop: true,
  lazy: true,
  observer: true,
  observeParents: true,
  speed: 800,
  preloadImages: true,
  
  // autoplay: {
  //   delay: 2500,
  // },

  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    type: 'bullets', 

    },

   
    breakpoints: {
      
      320: {
        slidesPerView: 1,   
        spaceBetween: 0,
        centeredSlides: true,
      },

      770: {
        slidesPerView: 2,   
        spaceBetween: 15,
      },

      905: {
        slidesPerView: 2,   
        spaceBetween: 30,
      },
    
      
  }

    
});

// video-slider






// webp-css
$(document).ready(function() {

function testWebP(callback) {

    var webP = new Image();
    webP.onload = webP.onerror = function () {
        callback(webP.height == 2);
    };
    webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {

    if (support == true) {
        document.querySelector('body').classList.add('webp');
    } else {
        document.querySelector('body').classList.add('no-webp');
    }
});

// webp-css

//search
$(function () {
    $('.search-btn').on('click', function () {
        $(this).toggleClass('active');
        $('.catalog__title, .catalog-menu, .header__brg, .brg-menu').removeClass('active');
        $('.header-form').toggleClass('active');
    });
});

//search

// catalog
$(function () {
    $('.catalog__title').on('click', function () {
        $(this).toggleClass('active');
        $('.search-btn,.header-form').removeClass('active');
        $('.catalog-menu').toggleClass('active');
    });
});

$(function () {
    $('.catalog-item').on('click', function () {
        $('.catalog-item').removeClass('active');
        $(this).addClass('active');
    });
});


function checkWidth() {
    let windowWidth = $('body').innerWidth(),
        elem = $('.catalog-menu');
    if(windowWidth >= 1215){
        elem.addClass('active');
    }
    else{
        elem.removeClass('active');
    }
 };
  
    checkWidth();
  
$(window).resize(function(){
    let windowWidth = $('body').innerWidth();
    if(windowWidth < 1200) {
        return;
    } else {
        checkWidth();
    }
});
  


// catalog

//brg
$(function () {
    $('.header__brg').click(function () {
        $('.header__brg,.brg-menu').toggleClass('active');
        $('.search-btn,.header-form').removeClass('active');
        $('body').toggleClass('lock');
    });
});
    //brg


});