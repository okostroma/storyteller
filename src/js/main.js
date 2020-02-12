// const slider = require('./slick/slick.min.js');
// import './jquery.min.js';
// const $ = require('jquery');
import $ from './jquery.min.js';
import './slick/slick.min.js';

//sliders
$('.articles-slider').slick({
    infinite      : true,
    slidesToShow  : 3,
    slidesToScroll: 1
});
$('.clients-slider').slick({
    infinite      : true,
    slidesToShow  : 6,
    slidesToScroll: 1
});
$('.portfolio-slider').slick({
    arrows        : false,
    infinite      : true,
    slidesToShow  : 3,
    slidesToScroll: 1,
    variableWidth : true,
    dots          : true
});
$('.next-posts').slick({
    infinite      : true,
    slidesToShow  : 3,
    slidesToScroll: 1
});
//effects
const $articles = $(".wr-services article");

let animated = false;

function lightSpeedIn(elements) {
    elements.each(function (i) {
        let el = $(this);
        setTimeout(function () {
            !el.hasClass("lightSpeedIn")
            && el.addClass('lightSpeedIn').css("opacity", 1)
            && setTimeout(function () {
                const $img = el.find('img');
                !$img.hasClass("swing") && $img.addClass('swing');
            }, 600);
        }, 400 * i)
    });
    animated = true;
    console.log('ready');
}

$(window).scroll(function () {
    !animated && $(this).scrollTop() > 900 && lightSpeedIn($articles);
});