
BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Testlist_listoflist", {

    template: BetaJS.Dynamics.Dynamic.Components.Templates.testlist_listoflist,

    initial: {

        collections : {
            listcollection : [
                {listcollection : new BetaJS.Collections.Collection({objects: [
                    {title : "Test - list of list - Item 1"},
                    {title : "Test - list of list - Item 2"}
                ]})},
                {listcollection : new BetaJS.Collections.Collection({objects: [
                    {title : "Test - list of list - Item 1"},
                    {title : "Test - list of list - Item 2"}
                ]})}
            ]
        }

    }

}).register();
