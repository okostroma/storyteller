import $ from './jquery.min.js';
import "./sliders";
import * as Tabs from "./tabs";

function getNewIndex(currentIndex){
    !isNaN(currentIndex) && (currentIndex = Number(currentIndex));
    let step = 3,
        res = currentIndex+step;
    return res > 4 ? res-4 : res;
}
let partfolio_tabs = new Tabs.Create('.portfolio-sections li', (el, index)=>{
    document.querySelectorAll('.portfolio img').forEach(el=>{

        let src = el.getAttribute('src'),
            imageIndex = src.charAt(src.indexOf(".jpg")-1),
            newIndex = getNewIndex(imageIndex);

        el.setAttribute("src", src.replace(/image\d/, "image"+newIndex));
    });
    el.classList.add('active');

});

//animation effects
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