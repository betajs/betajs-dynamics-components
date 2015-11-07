
BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Test_selectableitem_new", {

    template: BetaJS.Dynamics.Dynamic.Components.Templates.test_selectableitem_new,

    initial: {

        attrs: {
            model : {
                listitem : 'selectableitem_new',
                listcollection : new BetaJS.Collections.Collection({objects: [
                    {title: "Test - Selectableitem_new 1"},
                    {title: "Test - Selectableitem_new 2"},
                    {title: "Test - Selectableitem_new 3"}
                ]})
            }
        }

    }

}).register();
