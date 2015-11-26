
BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Test_list_listoflist", {

    template: BetaJS.Dynamics.Components.Templates.test_list_listoflist,

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
