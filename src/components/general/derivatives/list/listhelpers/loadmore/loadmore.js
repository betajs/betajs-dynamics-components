
Scoped.define("module:Loadmore", [
    "dynamics:Dynamic",
    "module:Templates"
], function (Dynamic, Templates, scoped) {

    return Dynamic.extend({scoped: scoped}, {

        template: Templates.loadmore,

        attrs: {
            model: {
                doodad: "Placeholder"
            }
        },

        functions: {

            load_more: function () {
                this.chainedTrigger('loadmore');
            }

        }

    }).register();

});