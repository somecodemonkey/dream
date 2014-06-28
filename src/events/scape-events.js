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