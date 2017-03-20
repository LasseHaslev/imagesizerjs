var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ImageSize = function () {
    function ImageSize(element, options) {
        _classCallCheck(this, ImageSize);

        // Setup options
        this.options = {
            'srcAttribute': 'size-src',
            'resizeAttribute': 'resize',

            width: null,
            height: null,
            resize: false,

            src: 'src'

        };

        // Create options by extending defaults with the passed in arugments
        if (options && (typeof options === 'undefined' ? 'undefined' : _typeof(options)) === "object") {
            this.options = this.extendDefaults(this.options, options);
        }

        // Set variables
        this.element = element;
        this.url = this.element.getAttribute(this.options.srcAttribute);
        this.width = parseInt(element.getAttribute('width'));
        this.height = parseInt(element.getAttribute('height'));

        this.resize = element.getAttribute(this.options.resizeAttribute);
        this.resize = this.resize == 'true' ? true : false;

        // The current width
        this.currentWidth = null;
        this.currentHeight = null;

        // Run functions
        this.init();
    }

    _createClass(ImageSize, [{
        key: 'init',
        value: function init() {
            this.changeImage({
                width: this.getWidth(),
                height: this.getHeight(),
                resize: this.getResize()
            });
        }

        // Extends options

    }, {
        key: 'extendDefaults',
        value: function extendDefaults(source, properties) {
            var property;
            for (property in properties) {
                if (properties.hasOwnProperty(property)) {
                    source[property] = properties[property];
                }
            }
            return source;
        }
    }, {
        key: 'changeImage',


        /*
         * Change src
         */
        value: function changeImage(options) {
            var url = this.createResizeUrl(this.getSizeSrc(), options);
            switch (this.options.src) {
                case 'background-image':
                    this.changeBackgroundImage(url);
                    break;

                // Src like img src
                default:
                    this.changeSrcImage(url);
            }
        }
    }, {
        key: 'changeBackgroundImage',
        value: function changeBackgroundImage(url) {
            this.element.style.backgroundImage = 'url(' + url + ')';
        }
    }, {
        key: 'changeSrcImage',
        value: function changeSrcImage(url) {
            this.element.setAttribute('src', url);
        }
    }, {
        key: 'createResizeUrl',
        value: function createResizeUrl(originalPath, options) {

            var regex = /^(.+)(\.[a-z]+)$/i;
            var self = this;

            // Extends default options
            options = this.extendDefaults({
                width: null,
                height: null,
                resize: false
            }, options);

            // Return originalPath if none of width or height is set
            if (!options.width && !options.height) {
                return originalPath;
            }

            // Replacer logic
            var replacer = function replacer(string, p1, p2) {

                var width = options.width ? options.width : '_';
                var height = options.height ? options.height : '_';

                var suffix = '-';
                var size = width + 'x' + height;

                var resize = options.resize ? '-resize' : '';

                return p1 + suffix + size + resize + p2;
            };
            return originalPath.replace(regex, replacer);
        }

        /*
         * Getters
         */

    }, {
        key: 'getSizeSrc',
        value: function getSizeSrc() {
            return this.element.getAttribute(this.options.srcAttribute);
        }
    }, {
        key: 'getWidth',
        value: function getWidth() {
            return this.options.width ? this.options.width : this.element.getAttribute('width');
        }
    }, {
        key: 'getHeight',
        value: function getHeight() {
            return this.options.height ? this.options.height : this.element.getAttribute('height');
        }
    }, {
        key: 'getResize',
        value: function getResize() {
            if (this.options.resize) {
                return this.options.resize;
            }

            var resize = this.element.getAttribute(this.options.resizeAttribute);
            return Boolean(resize == 'true' || resize == '1');
        }
    }]);

    return ImageSize;
}();

var aspectRegex = /^(\d+)[Xx](\d+)$/;

var ImageSizer = function (_ImageSize) {
    _inherits(ImageSizer, _ImageSize);

    function ImageSizer(element, options) {
        _classCallCheck(this, ImageSizer);

        var _this = _possibleConstructorReturn(this, (ImageSizer.__proto__ || Object.getPrototypeOf(ImageSizer)).call(this, element, options));

        _this.options.step = 200;
        _this.options.stepWidth = _this.options.step;
        _this.options.stepHeight = _this.options.step;

        _this.options.resizeType = 'normal'; // And contain

        _this.currentWidth = 0;
        _this.currentHeight = 0;

        _this.aspect = element.getAttribute('aspect');
        if (_this.aspect) {
            if (!aspectRegex.test(_this.aspect)) {
                throw 'The aspect field must be of format "{num}x{num}"';
            }
        }

        if (options && (typeof options === 'undefined' ? 'undefined' : _typeof(options)) === "object") {
            _this.options = _this.extendDefaults(_this.options, options);
        }

        _this.sizerInit();

        return _this;
    }

    // Prevent image size init


    _createClass(ImageSizer, [{
        key: 'init',
        value: function init() {}

        // Call our init

    }, {
        key: 'sizerInit',
        value: function sizerInit() {

            this.setWindowListener();

            // Run onceto set the image
            this.handleImage();
        }
    }, {
        key: 'handleImage',
        value: function handleImage() {
            if (this.options.resizeType == 'contain') {
                if (this.getElementWidth() > this.getElementHeight()) {
                    this.resizeToWidth();
                } else {
                    this.resizeToHeight();
                }
            } else {
                this.resizeToWidth();
            }
            // this.resizeToHeight();
        }

        /*
         * Different scales
         */

    }, {
        key: 'resizeToWidth',
        value: function resizeToWidth() {

            var width = this.getImageWidth();

            if (width <= this.currentWidth) {
                return;
            }

            this.changeImage({
                width: width,
                height: this.getAspectHeight(width)
            });

            this.currentWidth = width;
        }
    }, {
        key: 'resizeToHeight',
        value: function resizeToHeight() {
            var height = this.getImageHeight();

            if (height <= this.currentHeight) {
                return;
            }

            this.changeImage({
                height: height
            });

            this.currentHeight = height;
        }

        /*
         * Get aspect ratio of element
         */

    }, {
        key: 'getAspectRatio',
        value: function getAspectRatio() {
            var test = aspectRegex.exec(this.aspect);
            return {
                width: test[1],
                height: test[2]
            };
        }
    }, {
        key: 'getAspectHeight',
        value: function getAspectHeight(width) {
            // Check if we have ratio
            var height = null;
            if (this.aspect) {
                // get ratio of height based on width
                var aspect = this.getAspectRatio();
                if (aspect.width == aspect.height) {
                    var ratio = 1;
                } else {
                    var ratio = aspect.height / aspect.width;
                }

                // calculate height of with based on ratio
                return Math.round(width * ratio);
            }
        }

        // Get element width

    }, {
        key: 'getElementWidth',
        value: function getElementWidth() {
            return this.element.offsetWidth;
        }
    }, {
        key: 'getElementHeight',
        value: function getElementHeight() {
            return this.element.offsetHeight;
        }

        // Get element width

    }, {
        key: 'getImageWidth',
        value: function getImageWidth() {
            var stepsOnTheWay = Math.ceil(this.getElementWidth() / this.options.stepWidth);
            return this.options.stepWidth * stepsOnTheWay;
        }
        // Get element heightj

    }, {
        key: 'getImageHeight',
        value: function getImageHeight() {
            var stepsOnTheWay = Math.ceil(this.getElementHeight() / this.options.stepHeight);
            return this.options.stepHeight * stepsOnTheWay;
        }

        // Set listener on window on sizechange( resize )

    }, {
        key: 'setWindowListener',
        value: function setWindowListener() {
            var self = this;
            var onEvent = function onEvent() {
                self.handleImage();
            };

            window.addEventListener('resize', onEvent);
        }

        // set what mode we should have crop, resize, contain.

        // Check wich we should follow, left or right and use 100x_-resize on the property we should (Use number on the property we know);

    }]);

    return ImageSizer;
}(ImageSize);

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
