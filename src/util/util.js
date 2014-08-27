(function () {

    var slice = Array.prototype.slice;

    var baseId = Date.now() || +new Date;

    function getId() {
        return ++baseId;
    }

    function extend(dest, src) {
        for (var key in src) {
            if (typeof (dest) == "function" && src.hasOwnProperty(key)) {
                dest.prototype[key] = src[key];
            } else if (src.hasOwnProperty(key)) {
                dest[key] = src[key];
            }
        }
        return dest;
    }

    function addProperties (dest, src) {
        for (var key in src) {
            dest[key] = src[key];
        }
    }

    function callSuper() {
        console.log(this);
        var fn = this.constructor.super,
            method = arguments[0];

        if (fn && fn.prototype[method]) {
            return fn.prototype[method].apply(this, slice.call(arguments, 1));
        }
    }

    function getColor() {
        return '#' + Math.floor(Math.random() * 16777215).toString(16);
    }

    Dream.util = {
        extend: extend,

        createCanvasElement: function () {
            return Dream.document.createElement('canvas');
        },

        createClass: function () {
            var props = slice.call(arguments, 0),
                parent, index = 0;

            var Class = function () {
                return this.initialize.apply(this, arguments);
            };

            if (typeof props[index] === 'function') {
                // subclass
                function emptyClass() {}

                parent = props[index];
                emptyClass.prototype = parent.prototype;
                emptyClass.prototype.superClass = parent;
                Class.prototype = new emptyClass();
                index++;
            }

            extend(Class, props[index]);

            if (!Class.prototype.initialize) {
                Class.prototype.initialize = function () {
                    /* You must override this function */
                };
            }
            Class.prototype.callSuper = callSuper;
            Class.prototype.constructor = Class;
            Class.super = parent;

            return Class;
        },

        addProperties: function (dest, src) {
            addProperties (dest, src)
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

        uid: function () {
            return getId();
        }
    };


})();