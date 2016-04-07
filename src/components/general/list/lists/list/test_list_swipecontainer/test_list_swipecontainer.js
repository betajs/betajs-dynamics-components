
Scoped.define("module:Test_list_swipecontainer", [
        "dynamics:Dynamic",
        "module:Templates",
        "base:Collections.Collection"
    ],[
        "module:List",
        "module:Swipecontainer",
        "module:Selectableitem"
    ], function (Dynamic, Templates, Collection, scoped) {

    return Dynamic.extend({scoped: scoped}, {

        template: Templates.test_list_swipecontainer,

        attrs: {
            model : {
                listcollection : Collection({objects: [
                    {value: "Item 1"},
                    {value: "Item 2"},
                    {value: "Item 3"},
                    {value: "Item 4"},
                    {value: "Item 5"}
                ]})
            },
            view_model : {
                listitem : 'swipecontainer',
                inner : 'selectableitem'
            }
        }

    }).register();

});