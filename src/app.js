var imageObject = document.querySelector( 'img' );
// console.log(imageObject);
// import ImageSize from './ImageSize';
// var ImageSize = require( './ImageSize' );
var ImageSize = require( './ImageSize' );
console.log(ImageSize);

var imageSize = new ImageSize( imageObject, {
    width: 400,
    height: 400,
    resize: true,
    steps: 50,
} );
