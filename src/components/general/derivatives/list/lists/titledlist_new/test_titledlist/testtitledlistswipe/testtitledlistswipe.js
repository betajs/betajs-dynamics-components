
BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Testtitledlistswipe", {

    template : BetaJS.Dynamics.Dynamic.Components.Templates.testtitledlistswipe,

    initial : {

        attrs : {
            model : {
                titleitem : 'addtitle',
                titleitem_model : {
                    title : 'Titledlist - Testtitle',
                    titlefunc : 'togglelist',
                    addfunc : 'additem'
                },
                listitem: 'swipecontainer',
                model : {
                    type: 'clickitem'
                },
                type: 'clickitem',
                listcollection : new BetaJS.Collections.Collection({objects: [
                    {title: "Test - Titledlist - Swipe - Item 1"},
                    {title: "Test - Titledlist - Swipe - Item 2"},
                    {title: "Test - Titledlist - Swipe - Item 3"}
                ]})
            }
        }

    }

}).register();
