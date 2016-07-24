import { ImageSizer } from '../dist/ImageSize';
var imageObject = document.querySelector( 'img' );
var imageSize = new ImageSizer( imageObject, {
    width: 400,
    height: 400,
    resize: true,
    step: 100,
    src: 'background-image',
} );


// import ImageSize from '../dist/ImageSize';
var imageSize = new ImageSizer( document.querySelector( '.img-background' ), {
    width: 400,
    height: 400,
    resize: true,
    step: 100,
    src: 'background-image',
} );
