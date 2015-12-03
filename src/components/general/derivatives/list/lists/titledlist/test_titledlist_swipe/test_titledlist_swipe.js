
BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Test_titledlist_swipe", {

    template : BetaJS.Dynamics.Components.Templates.test_titledlist_swipe,

    attrs : {
        push_attrs : {
            title_model : {
                value : 'Titledlist - Testtitle'
            },
            listitem: 'swipecontainer',
            inner: 'selectableitem'
        }
    },

    collections : {
        listcollection : [
            {value: "Test - Titledlist - Swipe - Item 1"},
            {value: "Test - Titledlist - Swipe - Item 2"},
            {value: "Test - Titledlist - Swipe - Item 3"}
        ]
    }

}).register();
