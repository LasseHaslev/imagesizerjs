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
            if ( aspect.width == aspect.height ) {
                var ratio = 1;
            }
            else {
                var ratio = aspect.height / aspect.width;
            }

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
