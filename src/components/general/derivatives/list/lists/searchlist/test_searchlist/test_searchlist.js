
BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Test_searchlist", {

    template : BetaJS.Dynamics.Components.Templates.test_searchlist,

    initial : {

        attrs : {
            model : {
                placeholder : "Test Searchlist",
                listitem : 'swipecontainer',
                type : 'selectableitem',
                listcollection : new BetaJS.Collections.Collection({objects: [
                    {title: "Test searchlist Item 1"},
                    {title: "Test searchlist Item 2"},
                    {title: "Test searchlist Item 3"}
                ]})
            }
        }

    }

}).register();
