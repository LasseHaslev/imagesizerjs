var imageObject = document.querySelector( 'img' );
console.log(imageObject);
var ImageSize = require( './ImageSize' );
console.log(ImageSize);

var imageSize = new ImageSize( imageObject, {
    width: 400,
    height: 400,
    resize: true,
    steps: 50,
} );
