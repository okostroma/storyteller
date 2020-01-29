// const slider = require('./slick/slick.min.js');
// import './jquery.min.js';
// const $ = require('jquery');
import $ from './jquery.min.js';
import './slick/slick.min.js';

$('.myslider').slick({
    infinite      : true,
    slidesToShow  : 3,
    slidesToScroll: 3
});