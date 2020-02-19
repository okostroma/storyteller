//sliders
import $ from "./jquery.min";
import './slick/slick.min.js';

$('.articles').slick({
    infinite      : false,
    slidesToShow  : 3,
    slidesToScroll: 1,
    variableWidth : true,
    adaptiveHeight: true,
    responsive    : [
        {
            breakpoint: 1360,
            settings  : {
                arrows: false,
                dots  : true
            }
        },
        {
            breakpoint: 991,
            settings  : {
                arrows        : false,
                slidesToShow: 2,
                dots        : true
            }
        },
        {
            breakpoint: 680,
            settings  : {
                arrows        : false,
                slidesToShow  : 1,
                slidesToScroll: 1,
                centerMode    : true,
                dots          : true
            }
        }
    ]
});
$('.clients').slick({
    infinite      : true,
    slidesToShow  : 6,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 1000,
    variableWidth : true,
    responsive    : [
        {
            breakpoint: 1030,
            settings  : {
                slidesToShow: 4,
                slidesToScroll: 3,
                arrows      : false,
                dots        : true
            }
        },
        {
            breakpoint: 680,
            settings  : {
                arrows        : false,
                slidesToShow  : 3,
                slidesToScroll: 3,
                // centerMode    : true,
                dots          : true
            }
        },
        {
            breakpoint: 480,
            settings  : {
                arrows        : false,
                slidesToShow  : 2,
                slidesToScroll: 2,
                centerMode    : true,
                dots          : true
            }
        },
        {
            breakpoint: 375,
            settings  : {
                arrows        : false,
                slidesToShow  : 1,
                slidesToScroll: 1,
                centerMode    : true,
                dots          : true
            }
        }
    ]
});
$('.portfolio').slick({
    arrows        : false,
    infinite      : true,
    slidesToShow  : 3,
    slidesToScroll: 1,
    variableWidth : true,
    dots          : true,
    responsive    : [
        {
            breakpoint: 1310,
            settings  : {
                arrows: false,
                dots  : true
            }
        },
        {
            breakpoint: 991,
            settings  : {
                slidesToShow: 2,
                arrows      : false,
                dots        : true
            }
        },
        {
            breakpoint: 680,
            settings  : {
                arrows        : false,
                slidesToShow  : 1,
                slidesToScroll: 1,
                centerMode    : true,
                dots          : true
            }
        }
    ]
});
$('.next-posts').slick({
    infinite      : false,
    slidesToShow  : 3,
    slidesToScroll: 1,
    responsive    : [
        {
            breakpoint: 1310,
            settings  : {
                arrows: false,
                dots  : true
            }
        },
        {
            breakpoint: 991,
            settings  : {
                slidesToShow: 2,
                arrows      : false,
                dots        : true
            }
        },
        {
            breakpoint: 680,
            settings  : {
                arrows        : false,
                slidesToShow  : 1,
                slidesToScroll: 1,
                // centerMode    : true,
                dots          : true
            }
        }
    ]
});
