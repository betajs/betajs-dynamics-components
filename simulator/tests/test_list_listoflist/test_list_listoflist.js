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