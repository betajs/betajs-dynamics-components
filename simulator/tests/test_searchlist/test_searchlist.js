Scoped.define("tests:Test_searchlist", [
    "dynamics:Dynamic"
], function(Dynamic, scoped) {

    return Dynamic.extend({
        scoped: scoped
    }, {

        templateUrl: "tests/test_searchlist/test_searchlist.html",

        attrs: {
            view: {
                placeholder: "Test Searchlist",
                listitem: 'swipecontainer',
                listinner: {
                    inner: 'selectableitem'
                }
            }
        },

        collections: {
            listcollection: [{
                    title: "Test searchlist Item 1"
                },
                {
                    title: "Test searchlist Item 2"
                },
                {
                    title: "Test searchlist Item 3"
                }
            ]
        }

    }).register();

});