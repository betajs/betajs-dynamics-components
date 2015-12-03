
BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Test_searchlist", {

    template : BetaJS.Dynamics.Components.Templates.test_searchlist,

    attrs : {
        view : {
            placeholder : "Test Searchlist",
            listitem : 'swipecontainer',
            listinner : {
                inner : 'selectableitem'
            }
        }
    },

    collections : {
        listcollection : [
            {title: "Test searchlist Item 1"},
            {title: "Test searchlist Item 2"},
            {title: "Test searchlist Item 3"}
        ]
    }

}).register();
