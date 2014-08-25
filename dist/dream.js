/*! dream - v0.0.0 - 2014-08-24
* Copyright (c) 2014 Darby Perez; Licensed  */
var Dream = Dream || {};

// TODO check node support?
Dream.document = document;
Dream.window = window;
(function () {

    var slice = Array.prototype.slice;

    var baseId = Date.now() || +new Date;

    function getId () {
        return ++baseId;
    }

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

    function callSuper (parent) {
        return function () {
            var method = arguments[0];
            if (method) {
                parent.prototype[method].apply(this, slice.call(arguments, 1));
            }
        };
    }

    function getColor() {
        return '#'+Math.floor(Math.random()*16777215).toString(16);
    }

    function baseClass () {}

    Dream.util = {
        extend: extend,

        createCanvasElement: function () {
            return Dream.document.createElement('canvas');
        },

        createClass: function () {

            var props = slice.call(arguments, 0),
                parent, index = 0;

            var Class = function (){
                this.initialize.apply(this, arguments);
            };

            Class.prototype.initialize = function () {
                /* You must override this function */
            };

            Class.prototype.constructor = Class;

            if (typeof props[index] === 'function') {
                // subclass
                parent = props[index];
                baseClass.prototype = parent.prototype;
                baseClass.prototype.callSuper = callSuper(parent);

                Class.prototype = new baseClass();
                index++;
            }

            extend(Class, props[index]);
            return Class;
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

        getColor: function () {
            return getColor();
        },

        uid: function() {
            return getId();
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

        _hitCanvas: null,

        _objects: [],

        _colorMap: {},

        _scape: null,

        left: 0,

        top: 0,

        name: "layer",

        backgroundColor: '',

        initialize: function (options) {
            options = options || {};

            this._setOptions(options);
            // extend options?
            this._setupCanvasDOM();

            if (options.width && options.height) {
                this.setCanvasDimensions(options.width, options.height);
                this.setStyleDimensions(options.width, options.height);
            }

            if (options.top && options.left) {
                this.setStyleCoords(options.left, options.top);
            }

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
            this.left = 0;
            this.top = 0;
            this.setCanvasDimensions(scape.width, scape.height);
            this.setStyleDimensions(scape.width, scape.height);
            this.setStyleCoords(this.left, this.top);
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
(function () {

    /**
     * Base help
     * @type {*}
     */
    Dream.Object = Dream.util.createClass({

        _events: true,

        _hitColor: '',

        width: 0,

        height: 0,

        top: 0,

        left: 0,

        fill: '',

        initialize: function (options) {
            this.id = Dream.util.uid();

            this._setOptions(options || {});
        },

        _setOptions: function (options) {
            Dream.util.extend(this, options);
        },

        render: function (ctx) {
            /* Override this */
        }

    });

})();
(function () {
    Dream.Rect = Dream.util.createClass(Dream.Object, {

        type: 'dream-rect',

        initialize: function (options) {
            this.callSuper('initialize', options);
        },

        render: function (ctx) {
            /* Override this */
            ctx.save();
            ctx.translate(this.top, this.left);
            ctx.rect(0, 0, this.width, this.height);
            ctx.fillStyle = this.fill;
            ctx.fill();
            ctx.restore();
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

        /**
         *
         */
        width: 0,

        /**
         *
         */
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

        renderAll: function () {
            for (var i = 0; i < this._layers.length; i ++){
                this._layers[i].render();
            }
        },

        _setDOMStyle: function (width, height) {
            this._dom.style.width = width + 'px';
            this._dom.style.height = height + 'px';
            this._dom.style.position = "absolute";
        },

        _setOptions: function (options) {
            Dream.util.extend(this, options);
        },

        _setDOM: function (dom) {
            this._dom = Dream.document.getElementById(dom);
        },

        addLayer: function (layer) {
            layer._scape = this;
            this._dom.appendChild(layer.getCanvasDOM());
            // Remove this line later
//            this._dom.appendChild(layer.getHitCanvasDOM());
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

    Dream.util.extend(Dream.Object, {

        _eventHandlers: {},


        _initListeners: function () {

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