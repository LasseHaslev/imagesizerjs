# @lassehaslev/imagesizerjs
> Automaticly ads ```-{width}x{height}-resize``` to image filename.

## Installation
Run ```npm install @lassehaslev/imagesizerjs --save``` in your project folder

## Usage
#### 1a) Import the script file
``` html
<script src="https://raw.githubusercontent.com/LasseHaslev/imagesizerjs/master/src/ImageSize.js"></script>
```

#### 1b) Or require as module
``` js
var ImageSize = require( '@lassehaslev/imagesizerjs' );
```

#### 2) Use the class
``` js
var imageSize = new ImageSize( document.querySelector( 'img' ), {
    steps: 200, // How many pixels before new image
} );
```


## Development
``` bash
# Clone package
git clone https://github.com/LasseHaslev/imagesizerjs

# install dependencies
npm install

# serve with hot reload at http://localhost:3000/
gulp watch

# build for production with minification
gulp --production
```

## License

MIT, dawg
