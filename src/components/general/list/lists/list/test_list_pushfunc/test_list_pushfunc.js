
Scoped.define("module:Test_list_pushfunc", [
    "dynamics:Dynamic",
    "base:Collections.Collection",
	"base:Loggers.Logger"
],[
    "module:Titledlist",
    "module:Clickitem"
], function (Dynamic, Collection, Logger, scoped) {

	var logger = Logger.global().tag("dynamic", "list");
	
    return Dynamic.extend({scoped : scoped}, {

        template: "<%= template(filepathnoext + '.html') %>",

        attrs: {
            testmodel : {
                model : {
                    listitem : 'clickitem'
                },
                functions : {
                    testfunc : function (argument) {
                        logger.log('This is a testfunction');
                        logger.log('This is the argument : ' + argument);
                        logger.log(this.get('listcollection'));
                        this.get('listcollection').add(
                            {value : argument}
                        );
                    }
                },
                listcollection : new Collection({objects: [
                    {value: "Item 1"},
                    {value: "Item 2"},
                    {value: "Item 3"},
                    {value: "Item 4"},
                    {value: "Item 5"}
                ]})
            }
        },

        functions : {
            test : function (argument) {
                argument = argument ? argument : "no arg given";
                this.scope('>').get('model').functions.testfunc.call(this.scope('>'), argument);
            }
        }

    }).register();

});