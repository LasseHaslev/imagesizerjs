class ImageSize {

    constructor( element, options ) {

        // Setup options
        this.options = {
            'srcAttribute' : 'size-src',
            'resizeAttribute' : 'resize',

            width: null,
            height: null,
            resize: false,
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
