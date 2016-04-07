
Scoped.define("module:Searchlist", [
    "dynamics:Dynamic",
    "module:Templates"
],[
    "module:List"
],function (Dynamic, Templates, scoped) {

    return Dynamic.extend({scoped: scoped}, {

        template: Templates.searchlist,

        attrs: {
            searchvalue : "",
            view : {
                placeholder : "Search for",
                listitem : "clickitem",
                showsearch : true
            }
        },

        collections : {
            listcollection : [
                {value: "Searchlist - Item 1"},
                {value: "Searchlist - Item 2"},
                {value: "Searchlist - Item 3"}
            ]
        }

    }).register();

});