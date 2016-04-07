
Scoped.define("tests:Test_list_clickitem", [
    "dynamics:Dynamic",
    "module:Templates"
], function (Dynamic, Templates, scoped) {

    return Dynamic.extend({scoped : scoped}, {

        template: Templates.test_list_clickitem,

        attrs: {
            testmodel : {
                listitem : 'clickitem',
                listcollection : new BetaJS.Collections.Collection({objects: [
                    {value: "Item 1"},
                    {value: "Item 2"},
                    {value: "Item 3"},
                    {value: "Item 4"},
                    {value: "Item 5"}
                ]})
            }
        }

    }).register();

});