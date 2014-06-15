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