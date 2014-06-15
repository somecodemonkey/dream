/*! dream - v0.0.0 - 2014-06-15
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
         *
         * @param dom
         * @param options
         */
        initialize: function (dom, options) {
            // TODO args error catching
            this._setDOM(dom);
            this._setDimensions(options);
            this._setOptions(options);
        },

        _setDimensions: function (options) {
            if (options && options.height && options.width) {
                this.width = options.width;
                this.height = options.height;
                this._setDOMStyle(this.width, this.height);
            } else {
                // scrollHeight vs clientHeight vs offsetHeight?
                this.width = this._dom.scrollWidth;
                this.height = this._dom.scrollHeight;
            }
        },

        _setDOMStyle: function (width, height) {
            this._dom.style.width = width + 'px';
            this._dom.style.height = height + 'px';
        },

        _setOptions: function (options) {
            Dream.util.extend(this, options);
        },

        _setDOM: function (dom) {
            this._dom = Dream.document.getElementById(dom);
        }
    });

})();