//sliders
import $ from "./jquery.min";
import './slick/slick.min.js';
const defSettings = {
    infinite      : true,
    slidesToShow  : 3,
    slidesToScroll: 1,
    variableWidth : true,
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
};
function createSlick(selector, settings, respSettings) {

    const newSettings = Object.assign({}, defSettings);
    settings && Object.keys(settings).forEach(prop => {
        newSettings[prop] = settings[prop];
    });
    console.log(newSettings.responsive);
    settings.responsive && (newSettings.responsive = newSettings.responsive
            .map(el => {
                let respSettingsEl = settings.responsive.find(resp_el => resp_el.breakpoint === el.breakpoint);
                respSettingsEl && Object.keys(respSettingsEl).forEach(prop => {
                    el.settings[prop] = respSettingsEl[prop];
                });
                return el;
            })
    );

    return $(selector).slick(newSettings);
}
/*
let res = [
    ['.articles', {
        infinite      : false,
    }],
    ['.clients', {
        slidesToShow: 6,
        responsive : [{
            breakpoint: 991,
            settings  : {
                slidesToShow  : 3
            }
        }]
    }],
    ['.portfolio', {
        arrows: false,
        dots  : true,
    }],
    '.next-posts',
].map(el => createSlick.apply(null, !Array.isArray(el) ? [el] : el));
// console.log(res);*/
const sliders = [];
$('.articles').slick({
    infinite      : false,
    slidesToShow  : 3,
    slidesToScroll: 1,
    variableWidth : true,
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
    slidesToScroll: 5,
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
    infinite      : true,
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


export default sliders;
