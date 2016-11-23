
Scoped.define("module:Addtitle", [
    "dynamics:Dynamic",
    "module:Templates",
	"base:Loggers.Logger"
], function (Dynamic, Templates, Logger, scoped) {
	
	var logger = Logger.global().tag("dynamic", "list");

    return Dynamic.extend({scoped : scoped}, {

        template:Templates.addtitle,

        attrs: {
            model : {value: 'Title'}
        },

        functions : {

            clicktitle : function () {

                this.parent().call('togglelist');

            },
            addbutton : function () {

            	logger.log("You clicked the addbuton, no addbutton() function given");

            }

        }

    }).register();

});