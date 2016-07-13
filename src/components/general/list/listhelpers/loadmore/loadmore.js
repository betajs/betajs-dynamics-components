
Scoped.define("module:Loadmore", [
    "dynamics:Dynamic",
    "module:Templates"
], function (Dynamic, Templates, scoped) {

    return Dynamic.extend({scoped: scoped}, {

        template: Templates.loadmore,

        attrs: {
            view: {
                value: "Placeholder"
            }
        },

        functions: {

            load_more: function () {
                this.chainedTrigger('loadmore', this);
            }

        }

    }).register();

});