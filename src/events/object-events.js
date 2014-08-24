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