(function () {
    /**
     * Dream Layer
     * @type {*}
     */
    Dream.Layer = Dream.util.createClass({

        /**
         * Cache flag
         */
        _dirty: false,

        _canvas: null,

        name: "layer",

        //TODO caching

        initialize: function (options) {
            // extend options?
            this._setupCanvasDOM();
        },

        _setupCanvasDOM: function () {
            this._canvas = Dream.util.createCanvasElement();
            this._canvas.id = this.name;
            this._canvasContext = this._canvas.getContext('2d');
            // TODO set id for canvas as well
            this._canvas.style.position = "absolute";
        },

        _setOptions: function (options) {
            Dream.util.extend(this, options);
        },

        setCanvasDimensions: function (width, height) {
            this._canvas.width = width;
            this._canvas.height = height;
        },

        setStyleDimensions: function (width, height) {
            this._canvas.style.width = width + 'px';
            this._canvas.style.height = height + 'px';
        },

        getCanvasDOM: function () {
            return this._canvas;
        },

        getCanvasContext: function () {
            return this._canvasContext;
        }

    })
})();