/*! dream - v0.0.0 - 2014-06-27
* Copyright (c) 2014 Darby Perez; Licensed  */
var Dream = Dream || {};

// TODO check node support?
Dream.document = document;
Dream.window = window;
(function () {

    var slice = Array.prototype.slice;

    Dream.util = {
        extend: function (dest, src) {
            for (var key in src) {
                if (typeof (dest) == "function" && src.hasOwnProperty(key)) {
                    dest.prototype[key] = src[key];
                } else if (src.hasOwnProperty(key)) {
                    dest[key] = src[key];
                }
            }
            return dest;
        },
        createCanvasElement: function () {
            return Dream.document.createElement('canvas');
        },

        createClass: function () {
            var props = slice.call(arguments, 0);
            var newClass = function (){
                this.initialize.apply(this, arguments);
            };

            newClass.prototype.initialize = function () {
                /* You must override this function */
            };

            newClass.prototype.constructor = newClass;

            Dream.util.extend(newClass, props[0]);
            return newClass;
        }
    };


})();
(function () {
    Dream.Canvas = Dream.util.createClass({

        _height: 0,

        _width: 0,

        _canvas: null,

        _canvasContext: null,

        initialize: function (options) {
            this._setupCanvas(options);
        },

        _setupCanvas: function (options) {
            this._canvas = Dream.util.createCanvasElement();
            this._canvasContext = this._canvas.getContext('2d');
        }

    })
})();
(function () {
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
            this._canvas.id = name;
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
(function () {

    /**
     * The canvas
     */

    Dream.Scape = Dream.util.createClass({

        /**
         * Array containing all the layers for this scape
         */
        _layers: [],

        /**
         * Flag to determine whether this scape has events
         */
        _events: true,

        /**
         * Dom element to contain the scape
         */
        _dom: null,

        /**
         * Type string for serialization
         */
        type: "scape",

        /**
         *
         * @param dom
         * @param options
         */
        initialize: function (dom, options) {
            // TODO args error catching
            this._setDOM(dom);
            this.setDimensions(options);
            this._setOptions(options);
        },

        setDimensions: function (options) {
            if (options && options.height && options.width) {
                this.width = options.width;
                this.height = options.height;
                this._setDOMStyle(this.width, this.height);
            } else {
                // scrollHeight vs clientHeight vs offsetHeight?
                // IE 9+
                this.width = this._dom.scrollWidth;
                this.height = this._dom.scrollHeight;
            }
        },

        _setDOMStyle: function (width, height) {
            this._dom.style.width = width + 'px';
            this._dom.style.height = height + 'px';
            this._dom.style.position = "relative";
        },

        _setOptions: function (options) {
            Dream.util.extend(this, options);
        },

        _setDOM: function (dom) {
            this._dom = Dream.document.getElementById(dom);
        },

        fitToScape: function (layer) {
            layer.setCanvasDimensions(this.width, this.height);
            layer.setStyleDimensions(this.width, this.height);
        },

        addLayer: function (layer) {
            this.fitToScape(layer);
            this._dom.appendChild(layer.getCanvasDOM());
            this._layers.push(layer);
        }
    });

})();