
//dynamic-adaptiv
import {dynAdp} from './dynAdp';

dynAdp ()

// popup
import {popup} from './popup';

popup ()

//swiper

import {swiper} from './swiper';

swiper ()


//anchor


import {anchor} from './anchor';

anchor ();






// webp-css
$(document).ready(function () {

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

            if ($(this).hasClass('active')) {
                $('.catalog-item').removeClass('active');
            }

            else {
                $('.catalog-item').removeClass('active');
                $(this).addClass('active');
            }

        });
    });

    function checkWidth() {
        let windowWidth = $('body').innerWidth(),
            elem = $('.catalog-menu');
        if (windowWidth >= 1215) {
            elem.addClass('active');
        }
        else {
            elem.removeClass('active');
        }
    };

    checkWidth();

    $(window).resize(function () {
        let windowWidth = $('body').innerWidth();
        if (windowWidth < 1200) {
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

