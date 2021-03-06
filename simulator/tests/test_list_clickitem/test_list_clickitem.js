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