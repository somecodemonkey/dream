(function () {
    Dream.Rect = Dream.util.createClass(Dream.Object, {

        width: 0,

        height: 0,

        top: 0,

        left:0,

        fill: 'white',

        initialize: function (options) {
            this.callSuper('initialize');
        },

        render: function (ctx) {
            /* Override this */
            ctx.save();
            context.rect(this.left, this.top, this.width, this.height);
            ctx.fillStyle = this.fill;
            context.fill();
            ctx.restore();
        }

    });
})();