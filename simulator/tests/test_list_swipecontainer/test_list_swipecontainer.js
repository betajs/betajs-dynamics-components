Scoped.define("tests:Test_list_swipecontainer", [
    "dynamics:Dynamic",
    "base:Collections.Collection"
], [
    "module:List",
    "module:Swipeclickcontainer",
    "module:Selectableitem"
], function(Dynamic, Collection, scoped) {

    return Dynamic.extend({
        scoped: scoped
    }, {

        templateUrl: "tests/test_list_swipecontainer/test_list_swipecontainer.html",

        attrs: {
            model: {
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
            },
            view_model: {
                listitem: 'swipeclickcontainer',
                inner: 'selectableitem'
            }
        }

    }).register();

});