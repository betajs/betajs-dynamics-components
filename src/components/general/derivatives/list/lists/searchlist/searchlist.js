
BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Searchlist", {

    template: BetaJS.Dynamics.Components.Templates.searchlist,

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
