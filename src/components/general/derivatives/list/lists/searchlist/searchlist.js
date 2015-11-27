
BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Searchlist", {

    template: BetaJS.Dynamics.Components.Templates.searchlist,

    attrs: {
        placeholder : "Search for",
        searchvalue : "",
        listitem : "clickitem",
        showsearch : true
    },

    collections : {
        listcollection : [
            {title: "Item 1"},
            {title: "Item 2"},
            {title: "Item 3"}
        ]
    }

}).register();
