/*! dream - v0.0.0 - 2014-06-28
* Copyright (c) 2014 Darby Perez; Licensed  */
var Dream = Dream || {};

// TODO check node support?
Dream.document = document;
Dream.window = window;
(function () {

    var slice = Array.prototype.slice;

    function extend (dest, src) {
        for (var key in src) {
            if (typeof (dest) == "function" && src.hasOwnProperty(key)) {
                dest.prototype[key] = src[key];
            } else if (src.hasOwnProperty(key)) {
                dest[key] = src[key];
            }
        }
        return dest;
    }

    function subClass () {};

    Dream.util = {
        extend: extend,

        createCanvasElement: function () {
            return Dream.document.createElement('canvas');
        },

        createClass: function () {
            var props = slice.call(arguments, 0);

            if (typeof props[0] === 'function') {
                // subclass
            }

            var newClass = function (){
                this.initialize.apply(this, arguments);
            };

            newClass.prototype.initialize = function () {
                /* You must override this function */
            };

            newClass.prototype.constructor = newClass;

            extend(newClass, props[0]);

            return newClass;
        },

        addEvent: function (dom, event, func) {
            if (Dream.window.addEventListener) {
                dom.addEventListener(event, func, false);
            } else {
                // TODO legacy mapping for events
                dom.attachEvent(event, func, false);
            }
        },

        getCoords: function (object, event) {
            var top = object.top,
                left = object.left;

            if (object instanceof Element && object.nodeType) {
                top = object.offsetTop;
                left = object.offsetLeft;
            }

            return {
                x: event.x - left,
                y: event.y - top
            };
        },

        subClass: function () {

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
(function () {


    var baseId = Date.now() || +new Date;

    function getId () {
        return ++baseId;
    }

    /**
     * Base help
     * @type {*}
     */
    Dream.Object = Dream.util.createClass({

        width: 0,

        height: 0,

        initialize: function (options) {

            this.id = getId();
        }

    });

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

        width: 0,

        height: 0,

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

            this._initListeners();
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
(function () {

    var PREFIX = '_';

    var MOUSEDOWN = 'mousedown',
        MOUSEUP = 'mouseup',
        MOUSEOVER = 'mouseover',
        MOUSEOUT = 'mouseout',
        MOUSEMOVE = 'mousemove';


    var EVENTS = [MOUSEDOWN, MOUSEUP, MOUSEOVER, MOUSEOUT, MOUSEMOVE],
        EVENTSLENGTH = EVENTS.length;

    Dream.util.extend(Dream.Scape, {

        _initListeners: function () {
            for(var i = 0; i < EVENTSLENGTH; i++) {
                Dream.util.addEvent(this._dom, EVENTS[i], this[PREFIX + EVENTS[i]]);
            }
        },

        _mousedown: function (e) {
            var coords = Dream.util.getCoords(this, e);
            console.log('mousedown', coords);
        },

        _mouseup: function (e) {
            var coords = Dream.util.getCoords(this, e);
            console.log('mouseup', coords);
        },

        _mouseover: function (e) {
            var coords = Dream.util.getCoords(this, e);
            console.log('mouseover', coords);
        },

        _mouseout: function (e) {
            var coords = Dream.util.getCoords(this, e);
            console.log('mouseleave', coords);
        },

        _mousemove: function (e) {
//            console.log('mousemove', e);
        }

    })

})();