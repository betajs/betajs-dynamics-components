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