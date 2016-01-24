
Scoped.define("module:Eventitem", [
    "dynamics:Dynamic",
    "module:Templates"
], function (Dynamic, Templates, scoped) {

    return Dynamic.extend({scoped : scoped}, {

        template: Templates.eventitem,

        attrs: {
            counter : 0,
            model : {
                value : 'Evenitem - Clicked '
            }
        },

        functions : {
            click : function () {
                this.trigger('event', this.cid());
            }
        },

        create : function () {
            this.on("event", function (cid) {
                this.set('counter',this.get('counter') + 1);
            }, this);
        }

    }).register();

});