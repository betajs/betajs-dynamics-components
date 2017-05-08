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