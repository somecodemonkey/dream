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

        _hitCanvas: null,

        _objects: [],

        _colorMap: {},

        name: "layer",

        //TODO caching

        initialize: function (options) {
            // extend options?
            this._setupCanvasDOM();
            this._setupHitCanvas();
        },

        add: function (object) {
            object.layer = this;
            this._objects.push(object);
        },

        getObjects: function () {
            return this._objects;
        },

        /**
         * Renders all objects on this layer
         */
        render: function () {
            var ctx = this._canvasContext,
                hitctx = this._hitCanvasContext;
            for (var i = 0; i < this._objects.length; i ++) {
                this._objects[i].render(ctx);
//                this._objects[i].render(hitctx);
            }
        },

        setCanvasDimensions: function (width, height) {
            this._canvas.width = width;
            this._canvas.height = height;

            this._hitCanvas.width = width;
            this._hitCanvas.height = height;
        },

        setStyleDimensions: function (width, height) {
            this._canvas.style.width = width + 'px';
            this._canvas.style.height = height + 'px';
        },

        getCanvasDOM: function () {
            return this._canvas;
        },

        // temp
        getHitCanvasDOM: function () {
            return this._hitCanvas;
        },

        getCanvasContext: function () {
            return this._canvasContext;
        },

        getHitCanvasContext: function () {
            return this._hitCanvasContext;
        },

        colorMap: function () {
            return this._colorMap;
        },

        _setupCanvasDOM: function () {
            this._canvas = Dream.util.createCanvasElement();
            this._canvas.id = this.name;
            this._canvasContext = this._canvas.getContext('2d');
            // TODO set id for canvas as well
            this._canvas.style.position = "absolute";
        },

        _setupHitCanvas: function () {
            this._hitCanvas = Dream.util.createCanvasElement();
            this._hitCanvas.style.position = "relative";
            this._hitCanvasContext = this._hitCanvas.getContext('2d');
        },

        _setupObjectHit: function (object) {
            var color = Dream.util.getColor();

            while (this._colorMap[color]) {
                color = Dream.util.getColor();
            }

            object._hitColor = color;
            this._colorMap[color] = object;
        },

        _setOptions: function (options) {
            Dream.util.extend(this, options);
        }
    })
})();