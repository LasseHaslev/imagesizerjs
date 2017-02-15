import { ImageSizer } from '../../dist/ImageSizer';
var imageObject = document.querySelector( 'img' );
var imageSize = new ImageSizer( imageObject, {
    width: 400,
    height: 400,
    resize: true,
    step: 100,
} );


// import ImageSize from '../dist/ImageSize';
var imageSize = new ImageSizer( document.querySelector( '.img-background' ), {
    resize: true,
    step: 100,
    src: 'background-image',
    resizeType: 'contain',
} );
