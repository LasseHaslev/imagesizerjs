import { ImageSizer } from '../../dist/ImageSizer';
var imageObjects = document.querySelectorAll( 'img[size-src]' );
for (var i = 0, len = imageObjects.length; i < len; i++) {
    var imageObject = imageObjects[i];
    var imageSize = new ImageSizer( imageObject, {
        width: 400,
        height: 400,
        resize: true,
        step: 100,
    } );
}

var imageSize = new ImageSizer( document.querySelector( '.img-background' ), {
    resize: true,
    step: 100,
    src: 'background-image',
    resizeType: 'contain',
} );
