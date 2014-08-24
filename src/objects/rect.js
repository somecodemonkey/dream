(function () {
    Dream.Rect = Dream.util.createClass(Dream.Object, {

        type: 'dream-rect',

        initialize: function (options) {
            this.callSuper('initialize', options);
        },

        render: function (ctx) {
            /* Override this */
            ctx.save();
            ctx.translate(this.top, this.left);
            ctx.rect(0, 0, this.width, this.height);
            ctx.fillStyle = this.fill;
            ctx.fill();
            ctx.restore();
        }

    });
})();