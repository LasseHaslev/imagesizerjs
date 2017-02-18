class ImageSize {

    constructor( element, options ) {

        // Setup options
        this.options = {
            'srcAttribute' : 'size-src',
            'resizeAttribute' : 'resize',

            width: null,
            height: null,
            resize: false,

            src: 'src',

        };

        // Create options by extending defaults with the passed in arugments
        if (options && typeof options === "object") {
            this.options = this.extendDefaults(this.options, options);
        }

        // Set variables
        this.element = element;
        this.url = this.element.getAttribute( this.options.srcAttribute );
        this.width = parseInt( element.getAttribute( 'width' ) );
        this.height = parseInt( element.getAttribute( 'height' ) );

        this.resize = element.getAttribute( this.options.resizeAttribute );
        this.resize = this.resize == 'true' ? true : false;

        // The current width
        this.currentWidth = null;
        this.currentHeight = null;

        // Run functions
        this.init();
    }

    init() {
        this.changeImage({
            width: this.getWidth(),
            height: this.getHeight(),
            resize: this.getResize(),
        });
    }

    // Extends options
    extendDefaults(source, properties) {
        var property;
        for (property in properties) {
            if (properties.hasOwnProperty(property)) {
                source[property] = properties[property];
            }
        }
        return source;
    };

    /*
     * Change src
     */
    changeImage( options ) {
        var url = this.createResizeUrl( this.getSizeSrc(), options );
        switch (this.options.src) {
            case 'background-image':
                this.changeBackgroundImage( url );
                break;
            
            // Src like img src
            default:
                this.changeSrcImage( url );
        }
    }

    changeBackgroundImage( url ) {
        this.element.style.backgroundImage = 'url(' + url + ')';
    }

    changeSrcImage( url ) {
        this.element.setAttribute( 'src', url );
    }

    createResizeUrl( originalPath, options ) {

        var regex = /^(.+)(\.[a-z]+)$/i;
        var self = this;

        // Extends default options
        options = this.extendDefaults( {
            width: null,
            height: null,
            resize: false,
        }, options );

        // Return originalPath if none of width or height is set
        if ( !options.width && !options.height ) {
            return originalPath;
        }

        // Replacer logic
        var replacer = function( string, p1, p2 ) {

            var width = options.width ? options.width : '_';
            var height = options.height ? options.height : '_';

            var suffix = '-';
            var size = width + 'x' + height;

            var resize = options.resize ? '-resize' : '';

            return p1 + suffix + size + resize + p2;
        };
        return originalPath.replace( regex, replacer );

    }

    /*
     * Getters
     */
    getSizeSrc() {
        return this.element.getAttribute( this.options.srcAttribute );
    }

    getWidth() {
        return this.options.width ? this.options.width : this.element.getAttribute( 'width' );
    }

    getHeight() {
        return this.options.height ? this.options.height : this.element.getAttribute( 'height' );
    }

    getResize() {
        if ( this.options.resize ) {
            return this.options.resize;
        }

        var resize = this.element.getAttribute( this.options.resizeAttribute );
        return Boolean( resize == 'true' || resize == '1' );
    }

}

const aspectRegex = /^(\d+)[Xx](\d+)$/;
class ImageSizer extends ImageSize {

    constructor( element, options ) {

        super( element, options );

        this.options.step = 200;
        this.options.stepWidth = this.options.step;
        this.options.stepHeight = this.options.step;

        this.options.resizeType = 'normal'; // And contain

        this.currentWidth = 0;
        this.currentHeight = 0;

        this.aspect = element.getAttribute( 'aspect' );
        if (this.aspect) {
            if ( ! aspectRegex.test( this.aspect ) ) {
                throw 'The aspect field must be of format "{num}x{num}"';
            }
        }

        if (options && typeof options === "object") {
            this.options = this.extendDefaults(this.options, options);
        }

        this.sizerInit();

    }

    // Prevent image size init
    init() {
    }

    // Call our init
    sizerInit() {

        this.setWindowListener();

        // Run onceto set the image
        this.handleImage();

    }

    handleImage() {
        if ( this.options.resizeType == 'contain' ) {
            if ( this.getElementWidth() > this.getElementHeight() ) {
                this.resizeToWidth();
            }
            else {
                this.resizeToHeight();
            }
        }
        else {
            this.resizeToWidth();
        }
        // this.resizeToHeight();
    }

    /*
     * Different scales
     */
    resizeToWidth() {

        var width = this.getImageWidth();

        if ( width <= this.currentWidth ) {
            return;
        }

        this.changeImage({
            width: width,
            height: this.getAspectHeight( width ),
        });

        this.currentWidth = width;
    }
    resizeToHeight() {
        var height = this.getImageHeight();

        if ( height <= this.currentHeight ) {
            return;
        }

        this.changeImage({
            height: height,
        });

        this.currentHeight = height;
    }

    /*
     * Get aspect ratio of element
     */
    getAspectRatio() {
        var test = aspectRegex.exec(this.aspect);
        return {
            width: test[ 1 ],
            height: test[ 2 ],
        }
    }

    getAspectHeight( width ) {
        // Check if we have ratio
        var height = null;
        if (this.aspect) {
            // get ratio of height based on width
            var aspect = this.getAspectRatio();
            console.log(aspect);
            if ( aspect.width == aspect.height ) {
                var ratio = 1;
            }
            else {
                var ratio = aspect.height / aspect.width;
            }

            console.log(ratio);

            // calculate height of with based on ratio
            return Math.round( width * ratio );
        }
    }

    // Get element width
    getElementWidth() {
        return this.element.offsetWidth;
    }
    getElementHeight() {
        return this.element.offsetHeight;
    }

    // Get element width
    getImageWidth() {
        var stepsOnTheWay = Math.ceil( this.getElementWidth() / this.options.stepWidth );
        return this.options.stepWidth * stepsOnTheWay;
    }
    // Get element heightj
    getImageHeight() {
        var stepsOnTheWay = Math.ceil( this.getElementHeight() / this.options.stepHeight );
        return this.options.stepHeight * stepsOnTheWay;
    }

    // Set listener on window on sizechange( resize )
    setWindowListener() {
        var self = this;
        var onEvent = function() {
            self.handleImage();
        };

        window.addEventListener( 'resize', onEvent );
    }

    // set what mode we should have crop, resize, contain.

    // Check wich we should follow, left or right and use 100x_-resize on the property we should (Use number on the property we know);

}

// Export module or create new ImageSize
if (typeof module !== "undefined" && module !== null) {
    module.exports.default = ImageSize;
    module.exports.ImageSize = ImageSize;
    module.exports.ImageSizer = ImageSizer;
} else {
    window.ImageSize = ImageSize;
    window.ImageSizer = ImageSizer;
}

//# sourceMappingURL=ImageSizer.js.map
