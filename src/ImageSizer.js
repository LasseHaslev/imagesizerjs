class ImageSizer extends ImageSize {

    constructor( element, options ) {

        super( element, options );

        this.options.step = 200;
        this.options.stepWidth = this.options.step;
        this.options.stepHeight = this.options.step;


        this.options.type = 'resize';

        this.currentWidth = 0;
        this.currentHeight = 0;

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
        this.resizeToWidth();
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
