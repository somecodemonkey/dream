(function () {

    /**
     * Base help
     * @type {*}
     */
    Dream.Object = Dream.util.createClass({

        width: 0,

        height: 0,

        top: 0,

        left: 0,

        evented: true,

        fill: '',

        initialize: function (options) {
            this.id = Dream.util.uid();

            this.setOptions(options || {});
        },

        setOptions: function (options) {
            for (var key in options) {
                this[key] = options[key];
            }
        },

        render: function (ctx) {
            /* Override this */
        }

    });

})();