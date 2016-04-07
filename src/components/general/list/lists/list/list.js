
Scoped.define("module:List", [
    "dynamics:Dynamic",
    "module:Templates"
], function (Dynamic, Templates, scoped) {

    return Dynamic.extend({scoped: scoped}, {

        template: Templates.list,

        attrs: {
            listitem: "clickitem",
            model: false,
            view : {
                listend : false
            }
        },

        collections: {
            listcollection: [
                {value: "List - Item 1"},
                {value: "List - Item 2"},
                {value: "List - Item 3"}
            ]
        }

    }).register();

});