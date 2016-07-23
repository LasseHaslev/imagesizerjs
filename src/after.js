// Export module or create new ImageSize
if (typeof module !== "undefined" && module !== null) {
    module.exports.default = ImageSize;
    module.exports.ImageSize = ImageSize;
    module.exports.ImageSizer = ImageSizer;
} else {
    window.ImageSize = ImageSize;
    window.ImageSizer = ImageSizer;
}
