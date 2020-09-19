export function swiper() {

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
    // autoplay: {
    //   delay: 2500,
    // },

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

}



