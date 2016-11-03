
Scoped.define("module:Eventitem", [
    "dynamics:Dynamic",
    "module:Templates",
	"base:Loggers.Logger"
], function (Dynamic, Templates, Logger, scoped) {

	var logger = Logger.global().tag("dynamic", "calendar");
	
    return Dynamic.extend({scoped : scoped}, {

        template: Templates.eventitem,

        attrs: {
            counter : 0,
            model : {
                value : 'Eventitem - Clicked '
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

            this.parent().on('archive', function () {
                logger.log('archived');
            }, this);

        }

    }).register();

});