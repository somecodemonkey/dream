(function () {

    /**
     * Base help
     * @type {*}
     */
    Dream.Object = Dream.util.createClass({

        _events: true,

        _hitColor: '',

        type: "object",

        width: 0,

        height: 0,

        top: 0,

        left: 0,

        fill: '',

        initialize: function (options) {
            this._setOptions(options || {});

            this.id = this.id || Dream.util.uid();
        },

        _setOptions: function (options) {
            Dream.util.addProperties(this, options);
        },

        render: function (ctx) {
            /* Override this */
        }

    });

})();