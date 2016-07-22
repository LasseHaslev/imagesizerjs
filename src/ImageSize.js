var ImageSize = function( element ) {
    // -- Create functions
    // Get image
    this.getImage = function() {
        this.getClosestWidth();
        this.displayImage();
    };

    // Get the closest width based on the steps available
    this.getClosestWidth = function() {

        // Check how many steps away we are
        var stepsOnTheWay = this.element.offsetWidth / this.options.steps;

        // Round up
        stepsOnTheWay = Math.ceil( stepsOnTheWay );

        // Calculate ratio to height
        var heightRatio = this.height / this.width;

        var newWidth = Math.round( this.options.steps * stepsOnTheWay );
        var newHeight = Math.round( newWidth * heightRatio );

        if ( newWidth > this.currentWidth ) {
            this.currentWidth = newWidth;
            this.currentHeight = newHeight;
        }

    };

    // Set the src attribute
    this.displayImage = function() {
        var newUrl = this.createImageUrl();
        this.element.setAttribute( 'src', newUrl );
    };

    // Create image url in Croppa format
    this.createImageUrl = function() {
        var regex = /^(.+)(\.[a-z]+)$/i;
        var self = this;
        var replacer = function( string, p1, p2 ) {

            var width = self.currentWidth ? self.currentWidth : '_';
            var height = self.currentHeight ? self.currentHeight : '_';

            var suffix = '-';
            var size = width + 'x' + height;

            var resize = self.resize ? '-resize' : '';

            return p1 + suffix + size + resize + p2;
        };
        return this.url.replace( regex, replacer );
    };

    // Set events
    this.setEvents  = function() {
        var self = this;
        var onEvent = function() {
            self.getImage();
        };

        window.addEventListener( 'resize', onEvent );

        // $(window).on('resize.fittext orientationchange.fittext', resizer);
    };

    // Utility method to extend defaults with user options
    this.extendDefaults = function(source, properties) {
        var property;
        for (property in properties) {
            if (properties.hasOwnProperty(property)) {
                source[property] = properties[property];
            }
        }
        return source;
    };


    // Setup options
    this.options = {
        'srcAttribute' : 'size-src',
        'keyAttribute' : 'key',
        'resizeAttribute' : 'resize',
        'steps' : 200,
    };

    // Create options by extending defaults with the passed in arugments
    if (arguments[1] && typeof arguments[1] === "object") {
        this.options = this.extendDefaults(this.options, arguments[1]);
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

    // Call functions
    this.getImage();

    // Set the events
    this.setEvents();

    return this;

};

// Export module or create new ImageSize
if (typeof module !== "undefined" && module !== null) {
    module.exports = ImageSize;
} else {
    window.ImageSize = ImageSize;
}
