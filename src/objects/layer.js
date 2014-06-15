(function () {
    Dream.Layer = Dream.util.createClass({

        /**
         * Cache flag
         */
        _dirty:  false,

        _canvas: null,

        name: "",

        //TODO caching

        initialize: function (options) {
            // extend options?
            this._setupCanvasDOM();
        },

        _setupCanvasDOM: function () {
            this._canvas = Dream.util.createCanvasElement();
            this._canvasContext = this._canvas.getContext('2d');
            // TODO set id for canvas as well
        },

        _setOptions: function (options) {
            Dream.util.extend(this, options);
        },

        setDimensions: function (width, height) {
            this._canvas.width  = width;
            this._canvas.height = height;
            this._canvas.style.width  = width + 'px';
            this._canvas.style.height = height + 'px';
            this._canvas.style.position = "absolute";
        },

        getCanvasDOM: function () {
            return this._canvas;
        },

        getCanvasContext: function () {
            return this._canvasContext;
        }

    })
})();