(function () {

    /**
     * Base help
     * @type {*}
     */
    Dream.Object = Dream.util.createClass({

        _events: true,

        _hitColor: '',

        width: 0,

        height: 0,

        top: 0,

        left: 0,

        fill: '',

        initialize: function (options) {
            this.id = Dream.util.uid();

            this._setOptions(options || {});
        },

        _setOptions: function (options) {
            Dream.util.extend(this, options);
        },

        render: function (ctx) {
            /* Override this */
        }

    });

})();