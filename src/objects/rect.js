(function () {
    Dream.Rect = Dream.util.createClass(Dream.Object, {

        width: 0,

        height: 0,

        initialize: function (options) {
            this.callSuper('initialize');
        },

        render: function (ctx) {
            /* Override this */
        }

    });
})();