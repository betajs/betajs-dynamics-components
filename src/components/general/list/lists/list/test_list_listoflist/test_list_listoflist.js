

Scoped.define("tests:Test_list_listoflist", [
    "dynamics:Dynamic",
    "module:Templates"
], [
    "module:List"
], function (Dynamic, Templates, scoped) {

    return Dynamic.extend({scoped : scoped}, {

        template: Templates.test_list_listoflist,

        collections : {
            listcollection : [
                {listcollection : new BetaJS.Collections.Collection({objects: [
                    {value : "Test - list of list - Item 1"},
                    {value : "Test - list of list - Item 2"}
                ]})},
                {listcollection : new BetaJS.Collections.Collection({objects: [
                    {value : "Test - list of list - Item 1"},
                    {value : "Test - list of list - Item 2"}
                ]})}
            ]
        }

    }).register();

});