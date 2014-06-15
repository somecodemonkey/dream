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