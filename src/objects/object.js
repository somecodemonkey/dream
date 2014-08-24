(function () {


    var baseId = Date.now() || +new Date;

    function getId () {
        return ++baseId;
    }

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
            this.id = getId();

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