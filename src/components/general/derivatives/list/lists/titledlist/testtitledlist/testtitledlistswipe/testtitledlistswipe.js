
BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Testtitledlistswipe", {

    template : BetaJS.Dynamics.Dynamic.Components.Templates.testtitledlistswipe,

    initial : {

        attrs : {
            model : {
                title : "Testtitle",
                titleitem : 'addtitle',
                titleitem_model : {
                    title : 'Titledlist - Testtitle',
                    titlefunc : 'togglelist',
                    addfunc : 'additem'
                },
                listitem: 'swipecontainer',
                type: 'selectableitem',
                listcollection : new BetaJS.Collections.Collection({objects: [
                    {title: "Testtitledlistswipe Item 1"},
                    {title: "Testtitledlistswipe Item 2"},
                    {title: "Testtitledlistswipe Item 3"}
                ]})
            }
        },

        create :  function () {

        }

    }

}).register();
