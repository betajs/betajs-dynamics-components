
BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Testlist_clickitem", {

    template: BetaJS.Dynamics.Dynamic.Components.Templates.testlist_clickitem,

    initial: {

        attrs: {
            testmodel : {
                listitem : 'clickitem',
                listcollection : new BetaJS.Collections.Collection({objects: [
                    {title: "Item 1"},
                    {title: "Item 2"},
                    {title: "Item 3"},
                    {title: "Item 4"},
                    {title: "Item 5"}
                ]})
            }
        }

    }

}).register();
