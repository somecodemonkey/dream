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
            layer.fitToScape();
            this._dom.appendChild(layer.getCanvasDOM());
            // Remove this line later
//            this._dom.appendChild(layer.getHitCanvasDOM());
            this._layers.push(layer);
        }
    });

})();