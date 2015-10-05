
BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Testtitledlist", {

    template : BetaJS.Dynamics.Dynamic.Components.Templates.testtitledlist,

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
                type : 'clickitem',
                listcollection : new BetaJS.Collections.Collection({objects: [
                    {title: "Testtitledlist Item 1"},
                    {title: "Testtitledlist Item 2"},
                    {title: "Testtitledlist Item 3"}
                ]})
            }
        }

    }

}).register();
