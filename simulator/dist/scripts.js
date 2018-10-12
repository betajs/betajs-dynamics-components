/*!
betajs-dynamics-components - v0.1.67 - 2018-10-11
Copyright (c) Victor Lingenthal,Oliver Friedmann
Apache-2.0 Software License.
*/
Scoped.define("tests:Test_clickitem", [
    "dynamics:Dynamic"
],[
    "module:Clickitem"
], function(Dynamic, scoped) {

    return Dynamic.extend({
        scoped: scoped
    }, {

        templateUrl: "tests/test_clickitem/test_clickitem.html",

        attrs: {

        }

    }).register();

});
Scoped.define("tests:Test_list_clickitem", [
    "dynamics:Dynamic",
    "base:Collections.Collection"
], [
    "module:List"
], function(Dynamic, Collection, scoped) {

    return Dynamic.extend({
        scoped: scoped
    }, {

        templateUrl: "tests/test_list_clickitem/test_list_clickitem.html",

        attrs: {
            testmodel: {
                listitem: 'clickitem',
                listcollection: new Collection({
                    objects: [{
                            value: "Item 1"
                        },
                        {
                            value: "Item 2"
                        },
                        {
                            value: "Item 3"
                        },
                        {
                            value: "Item 4"
                        },
                        {
                            value: "Item 5"
                        }
                    ]
                })
            }
        }

    }).register();

});
Scoped.define("tests:Test_list_listcollection", [
    "dynamics:Dynamic"
], [
    "module:List"
], function(Dynamic, scoped) {

    return Dynamic.extend({
        scoped: scoped
    }, {

        templateUrl: "tests/test_list_listcollection/test_list_listcollection.html",

        collections: {
            listcollection: [{
                    value: "Test - List - listollection - Item 1"
                },
                {
                    value: "Test - List - listollection - Item 2"
                },
                {
                    value: "Test - List - listollection - Item 3"
                },
                {
                    value: "Test - List - listollection - Item 4"
                }
            ]
        }

    }).register();

});
Scoped.define("tests:Test_list_listoflist", [
    "dynamics:Dynamic",
    "base:Collections.Collection"
], [
    "module:List"
], function(Dynamic, Collection, scoped) {

    return Dynamic.extend({
        scoped: scoped
    }, {

        templateUrl: "tests/test_list_listoflist/test_list_listoflist.html",

        collections: {
            listcollection: [{
                    listcollection: new Collection({
                        objects: [{
                                value: "Test - list of list - Item 1"
                            },
                            {
                                value: "Test - list of list - Item 2"
                            }
                        ]
                    })
                },
                {
                    listcollection: new Collection({
                        objects: [{
                                value: "Test - list of list - Item 1"
                            },
                            {
                                value: "Test - list of list - Item 2"
                            }
                        ]
                    })
                }
            ]
        }

    }).register();

});
Scoped.define("tests:Test_list_loadmore", [
    "dynamics:Dynamic",
    "base:Collections.Collection"
], [
    "module:List",
    "module:Loading"
], function(Dynamic, Collection, scoped) {

    return Dynamic.extend({
        scoped: scoped
    }, {

        templateUrl: "tests/test_list_loadmore/test_list_loadmore.html",

        attrs: {
            view: {
                listend: {
                    item: 'loadmore',
                    value: 'Test Value'
                }
            }
        },

        collections: {
            listcollection: [{
                    value: "Test - List - Loadmore - Item 1"
                },
                {
                    value: "Test - List - Loadmore - Item 2"
                },
                {
                    value: "Test - List - Loadmore - Item 3"
                },
                {
                    value: "Test - List - Loadmore - Item 4"
                }
            ]
        },

        create: function() {
            var collection = new Collection({
                objects: [{
                    value: "Test - List - Loadmore - Item 0"
                }]
            });
            for (var i = 1; i < 15; i++) {
                collection.add({
                    value: "Test - List - Loadmore - Item " + i
                });
            }
            this.set('listcollection', collection);
        }

    }).register();

});
Scoped.define("module:Test_list_pushfunc", [
    "dynamics:Dynamic",
    "base:Collections.Collection",
    "base:Loggers.Logger"
], [
    "module:Titledlist",
    "module:Clickitem"
], function(Dynamic, Collection, Logger, scoped) {

    var logger = Logger.global().tag("dynamic", "list");

    return Dynamic.extend({
        scoped: scoped
    }, {

        templateUrl: "tests/test_list_pushfunc/test_list_pushfunc.html",

        attrs: {
            testmodel: {
                model: {
                    listitem: 'clickitem'
                },
                functions: {
                    testfunc: function(argument) {
                        logger.log('This is a testfunction');
                        logger.log('This is the argument : ' + argument);
                        logger.log(this.get('listcollection'));
                        this.get('listcollection').add({
                            value: argument
                        });
                    }
                },
                listcollection: new Collection({
                    objects: [{
                            value: "Item 1"
                        },
                        {
                            value: "Item 2"
                        },
                        {
                            value: "Item 3"
                        },
                        {
                            value: "Item 4"
                        },
                        {
                            value: "Item 5"
                        }
                    ]
                })
            }
        },

        functions: {
            test: function(argument) {
                argument = argument ? argument : "no arg given";
                this.scope('>').get('model').functions.testfunc.call(this.scope('>'), argument);
            }
        }

    }).register();

});
Scoped.define("tests:Test_list_removepromise", [
    "dynamics:Dynamic",
    "base:Collections.Collection",
    "base:Promise"
], [
    "module:List"
], function(Dynamic, Collection, Promise, scoped) {

    return Dynamic.extend({
        scoped: scoped
    }, {

        templateUrl: "tests/test_list_removepromise/test_list_removepromise.html",

        attrs: {
            view : {
                repeatoptions : {
                    onremove: function (item, element) {

                        console.log('onremove is called');

                        var promise = Promise.create();

                        var fadetime = 1000;
                        Object.assign(element.style, {
                            "-webkit-transition": "opacity " + fadetime + "ms linear",
                            opacity: 0
                        });
                        setTimeout(function () {
                           promise.asyncSuccess(true);
                        }, fadetime+1);

                        return promise;
                    }
                }
            },
            testmodel: {
                listitem: 'clickitem',
                listcollection: new Collection({
                    objects: [{
                            value: "Item 1",
                            callbacks : {
                                click : function () {
                                    this.parent().parent().execute('remove',this);
                                }
                            }
                        },
                        {
                            value: "Item 2",
                            callbacks : {
                                click : function () {
                                    this.parent().parent().execute('remove',this);
                                }
                            }
                        },
                        {
                            value: "Item 3",
                            callbacks : {
                                click : function () {
                                    this.parent().parent().execute('remove',this);
                                }
                            }
                        }
                    ]
                })
            }
        },

        functions: {
            remove: function (self) {
                console.log('Callback arrives');
                self.parent().get('listcollection').remove(self.get('model'));
            }
        }

    }).register();

});
Scoped.define("tests:Test_searchlist", [
    "dynamics:Dynamic"
],[
    "module:Searchlist",
    "module:Clickitem"
], function(Dynamic, scoped) {

    return Dynamic.extend({
        scoped: scoped
    }, {

        templateUrl: "tests/test_searchlist/test_searchlist.html",

        attrs: {
            view: {
                placeholder: "Search this List",
                listitem: 'clickitem',
                listinner: {
                    inner: 'selectableitem'
                }
            }
        },

        collections: {
            listcollection: [{
                    value: "Test searchlist Item 1"
                },
                {
                    value: "Test searchlist Item 2"
                },
                {
                    value: "Test searchlist Item 3"
                }
            ]
        }

    }).register();

});
Scoped.define("module:Test_selectableitem", [
    "dynamics:Dynamic"
], [
    "module:List"
], function(Dynamic, scoped) {

    Dynamic.extend({
        scoped: scoped
    }, {

        templateUrl: "tests/test_selectableitem/test_selectableitem.html",

        attrs: {
            model: {
                value: 'Selectableitem - Value'
            }
        },

        collections: {
            listcollection: [{
                    value: 'Item 1'
                },
                {
                    value: 'Item 2'
                },
                {
                    value: 'Item 3'
                }
            ]
        },

        create: function() {}

    }).register();
});
Scoped.define("module:Test_titledlist", [
    "dynamics:Dynamic",
    "base:Loggers.Logger"
],[
    "module:Titledlist"
], function(Dynamic, Logger, scoped) {

    var logger = Logger.global().tag("dynamic", "list");

    return Dynamic.extend({
        scoped: scoped
    }, {

        templateUrl: "tests/test_titledlist/test_titledlist.html",

        attrs: {
            view: {
                titleitem: 'addtitle',
                listitem: 'clickitem'
            },
            model: {
                title_model: {
                    value: 'Titledlist - Testtitle'
                },
                title_callbacks: {
                    addbutton: function() {
                        logger.log('This comes from the Test Titledlist : ');
                        this.scope('<').call('additem', {
                            value: "Testtitledlist Item New"
                        });
                    }
                    //clicktitle : function () {
                    //    logger.log('This comes from the Test Titledlist : ');
                    //    this.scope('<').call('togglelist');
                    //}
                }
            }
        },

        collections: {
            listcollection: [{
                    value: "Testtitledlist Item 1"
                },
                {
                    value: "Testtitledlist Item 2"
                },
                {
                    value: "Testtitledlist Item 3"
                }
            ]
        }

    }).register();

});