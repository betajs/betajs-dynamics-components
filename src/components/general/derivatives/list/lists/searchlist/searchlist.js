
BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Searchlist", {

    template: BetaJS.Dynamics.Components.Templates.searchlist,

    attrs: {
        searchvalue : "",
        showsearch : true,
        view : {
            placeholder : "Search for",
            listitem : "clickitem"
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
