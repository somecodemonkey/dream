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

        _objects: null,

        _colorMap: {},

        _scape: null,

        type: "layer",

        backgroundColor: '',

        initialize: function (options) {
            options = options || {};
            this._objects = [];

            this._setOptions(options);
            // extend options?
            this._setupCanvasDOM();

            this.id = this.id || Dream.util.uid();
        },

        add: function (object) {
            object.layer = this;
            this._objects.push(object);
        },

        getObjects: function () {
            return this._objects;
        },

        fitToScape: function () {
            if (!this._scape) {
                return
            }
            var scape = this._scape;
            this.setCanvasDimensions(scape.width, scape.height);
            this.setStyleDimensions(scape.width, scape.height);
        },

        /**
         * Renders all objects on this layer
         */
        render: function () {
            var ctx = this._canvasContext;
            for (var i = 0; i < this._objects.length; i ++) {
                console.log(this._objects[i]);
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

        setStyleCoords: function (left, top) {
            this._canvas.style.top = top + 'px';
            this._canvas.style.left = left + 'px';
        },

        getCanvasDOM: function () {
            return this._canvas;
        },

        getCanvasContext: function () {
            return this._canvasContext;
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