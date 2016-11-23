
Scoped.define("module:Clickitem", [
    "dynamics:Dynamic",
    "module:Templates",
	"base:Loggers.Logger"
], function (Dynamic, Templates, Logger, scoped) {
	
	var logger = Logger.global().tag("dynamic", "list");
	
    return Dynamic.extend({scoped : scoped}, {

        template: Templates.clickitem,

        attrs: {
            model : {
                value : 'Clickitem - Value'
            }
        },

        functions : {
            click : function () {
            	logger.log('Click');
                //logger.log("You Clicked item : " + this.properties().getProp('model.value'));
                //logger.log(this.cid());
                //this.trigger('event', this.cid());
            }
        },

        create : function () {
            this.on("event", function (cid) {
            	logger.log('event from item: ' + cid);
            }, this);
        }

    }).register();

});