var imageObject = document.querySelector( 'img' );
// console.log(imageObject);
// import ImageSize from './ImageSize';
// var ImageSize = require( './ImageSize' );
// var ImageSize = require( '../dist/ImageSize' );


import { ImageSizer } from '../dist/ImageSize';
var imageSize = new ImageSizer( imageObject, {
    width: 400,
    height: 400,
    resize: true,
    step: 100,
} );


// import ImageSize from '../dist/ImageSize';
// var imageSize = new ImageSize( imageObject, {
    // width: 400,
    // height: 400,
    // // resize: true,
// } );






// var backgroundSize = new ImageSize( document.querySelector( '.img-background' ), {
    // field: 'background-image',
// } );
