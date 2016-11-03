
Scoped.define("tests:Test_addtitle", [
    "dynamics:Dynamic",
    "module:Templates",
	"base:Loggers.Logger"
], [
    "module:Addtitle"
], function (Dynamic, Templates, Logger, scoped) {
	
	var logger = Logger.global().tag("dynamic", "list");

    return Dynamic.extend({scoped : scoped}, {

        template : Templates.test_addtitle,

        initial : {

            attrs : {
                testmodel : {
                    title : 'Test - Addtitle',
                    titlefunc : 'showlist',
                    addfunc : 'additem',
                    add_func : function () {
                        logger.log('This is the add_func');
                    }
                }
            },

            functions : {
                additem : function () {
                    this.get('testmodel').add_func.call(this, null);
                    logger.log("Add Item to List");
                },
                showlist : function () {
                	logger.log("You clicked the title");
                }
            }

        }

    }).register();

});