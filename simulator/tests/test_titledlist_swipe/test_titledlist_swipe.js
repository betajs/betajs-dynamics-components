Scoped.define("module:Test_titledlist_swipe", [
    "dynamics:Dynamic"
], [
    "module:Titledlist",
    "module:Selectableitem"
], function(Dynamic, scoped) {

    return Dynamic.extend({
        scoped: scoped
    }, {

        templateUrl: "tests/test_titledlist_swipe/test_titledlist_swipe.html",

        attrs: {
            push_attrs: {
                title_model: {
                    value: 'Titledlist - Testtitle'
                },
                listitem: 'swipeclickcontainer',
                inner: 'selectableitem'
            }
        },

        collections: {
            listcollection: [{
                    value: "Test - Titledlist - Swipe - Item 1"
                },
                {
                    value: "Test - Titledlist - Swipe - Item 2"
                },
                {
                    value: "Test - Titledlist - Swipe - Item 3"
                }
            ]
        }

    }).register();

});