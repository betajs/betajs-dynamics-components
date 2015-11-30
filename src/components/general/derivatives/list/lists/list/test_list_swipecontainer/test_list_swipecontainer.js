
BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Test_list_swipecontainer", {

    template: BetaJS.Dynamics.Components.Templates.test_list_swipecontainer,

    attrs: {
        testmodel : {
            listitem : 'swipecontainer',
            type : 'clickitem',
            listcollection : new BetaJS.Collections.Collection({objects: [
                {value: "Item 1"},
                {value: "Item 2"},
                {value: "Item 3"},
                {value: "Item 4"},
                {value: "Item 5"}
            ]})
        }
    }

}).register();
