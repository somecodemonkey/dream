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