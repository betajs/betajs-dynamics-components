
BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Test_titledlist_swipe", {

    template : BetaJS.Dynamics.Components.Templates.test_titledlist_swipe,

    attrs : {
        model : {
            titleitem : 'addtitle',
            titleitem_model : {
                title : 'Titledlist - Testtitle',
                titlefunc : 'togglelist',
                addfunc : 'additem'
            },
            listitem: 'swipecontainer',
            type: 'clickitem'
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
