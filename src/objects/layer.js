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

        _objects: [],

        name: "layer",

        //TODO caching

        initialize: function (options) {
            // extend options?
            this._setupCanvasDOM();
        },

        add: function (object) {
            this._objects.push(object);
        },

        getObjects: function () {
            return this._objects;
        },

        /**
         * Renders all objects on this layer
         */
        render: function () {
            var ctx = this._canvasContext;
            for (var i = 0; i < this._objects.length; i ++) {
                this._objects[i].render(ctx);
            }
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
        }
    })
})();