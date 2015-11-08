
BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Test_selectableitem", {

    template: BetaJS.Dynamics.Dynamic.Components.Templates.test_selectableitem,

    initial: {

        attrs: {
            testmodel : {
                listitem: 'swipecontainer',
                type: 'selectableitem',
                listcollection : new BetaJS.Collections.Collection({objects: [
                    {title: "Test - Selectableitem 1"},
                    {title: "Test - Selectableitem 2"},
                    {title: "Test - Selectableitem 3"}
                ]})
            }
        }

    }

}).register();
