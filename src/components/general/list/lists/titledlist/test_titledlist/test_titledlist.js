
Scoped.define("module:Test_titledlist", [
    "dynamics:Dynamic",
    "module:Templates",
	"base:Loggers.Logger"
],function (Dynamic, Templates, Logger, scoped) {
	
	var logger = Logger.global().tag("dynamic", "list");

    return Dynamic.extend({scoped: scoped}, {

        template: Templates.test_titledlist,

        attrs : {
            view : {
                titleitem : 'addtitle',
                listitem : 'clickitem'
            },
            model : {
                title_model : {
                    value : 'Titledlist - Testtitle'
                },
                title_callbacks : {
                    addbutton : function () {
                    	logger.log('This comes from the Test Titledlist : ');
                        this.scope('<').call('additem', {value  : "Testtitledlist Item New"});
                    }
                    //clicktitle : function () {
                    //    logger.log('This comes from the Test Titledlist : ');
                    //    this.scope('<').call('togglelist');
                    //}
                }
            }
        },

        collections : {
            listcollection : [
                {value: "Testtitledlist Item 1"},
                {value: "Testtitledlist Item 2"},
                {value: "Testtitledlist Item 3"}
            ]
        }

    }).register();

});