
Scoped.define("module:Test_titledlist", [
    "dynamics:Dynamic",
	"base:Loggers.Logger"
],function (Dynamic, Logger, scoped) {
	
	var logger = Logger.global().tag("dynamic", "list");

    return Dynamic.extend({scoped: scoped}, {

        template: "<%= template(filepathnoext + '.html') %>",

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