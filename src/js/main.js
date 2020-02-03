// const slider = require('./slick/slick.min.js');
// import './jquery.min.js';
// const $ = require('jquery');
import $ from './jquery.min.js';
import './slick/slick.min.js';

$('.articles-slider').slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1
});

$('.clients-slider').slick({
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1
});

$('.portfolio-slider').slick({
    arrows: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    variableWidth: true,
    dots: true
});