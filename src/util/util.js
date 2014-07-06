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

    function callSuper (parent) {
        return function () {
            var method = arguments[0];
            if (method) {
                parent.prototype[method].apply(this, slice.call(arguments, 1));
            }
        };
    }

    Dream.util = {
        extend: extend,

        createCanvasElement: function () {
            return Dream.document.createElement('canvas');
        },

        createClass: function () {

            var props = slice.call(arguments, 0),
                parent, index = 0;

            var newClass = function (){
                this.initialize.apply(this, arguments);
            };

            newClass.prototype.initialize = function () {
                /* You must override this function */
            };

            newClass.prototype.constructor = newClass;

            if (typeof props[index] === 'function') {
                // subclass
                parent = props[index];
                extend(newClass, parent);
                newClass.prototype.callSuper = callSuper(parent);
                index++;
            }

            extend(newClass, props[index]);

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
        }
    };


})();