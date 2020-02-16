// const slider = require('./slick/slick.min.js');
// import './jquery.min.js';
// const $ = require('jquery');
import $ from './jquery.min.js';
import './slick/slick.min.js';

const responsive = [
    {
        breakpoint: 778,
        settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '40px',
            slidesToShow: 3
        }
    },
    {
        breakpoint: 480,
        settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '40px',
            slidesToShow: 1
        }
    }
];
//sliders
$('.articles').slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive
});
$('.clients').slick({
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    responsive
});
$('.portfolio').slick({
    arrows: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    variableWidth: true,
    dots: true,
    responsive
});
$('.next-posts').slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive
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

$(document).ready(function () {
    $(".nav-menu").on("click", "a", function (event) {
        event.preventDefault();
        let id = $(this).attr('href'),
            top = $(id).offset().top;

        let $el = $(id).find('.view-animate');
        const className = $el.length && $el.attr('class');
        const animateClass = className && className.substr(className.indexOf('#') + 1);

        console.log($el.length);

        animateClass && $el.removeClass(animateClass);//.css( "opacity", "0" );

        $('body,html').animate({scrollTop: top}, 1000, function () {
            $el.css("opacity", "1").addClass(animateClass);
        });
    });
});