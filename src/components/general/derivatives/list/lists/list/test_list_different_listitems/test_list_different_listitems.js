
BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Test_list_different_listitems", {

    template: BetaJS.Dynamics.Dynamic.Components.Templates.test_list_different_listitems,
    
    attrs: {
        testmodel : {
            listitem : 'selectableitem'
        }
    },

    collections : {
        listcollection : new BetaJS.Collections.Collection({objects: [
            {value: "Item 1"},
            {
                listitem : 'clickitem',
                value: "Item 2"
            },
            {value: "Item 3"},
            {value: "Item 4"},
            {value: "Item 5"}
        ]})
    }

}).register();
