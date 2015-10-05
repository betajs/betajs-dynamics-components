
BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Testlist_listcollection", {

    template: BetaJS.Dynamics.Dynamic.Components.Templates.testlist_listcollection,

    initial: {

        collections : {
            listcollection : [
                {title: "Item 1"},
                {title: "Item 2"},
                {title: "Item 3"},
                {title: "Item 4"},
                {title: "Item 5"}
            ]
        }

    }

}).register();
