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