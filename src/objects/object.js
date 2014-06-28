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

        initialize: function (options) {

            this.id = getId();
        }

    });

})();