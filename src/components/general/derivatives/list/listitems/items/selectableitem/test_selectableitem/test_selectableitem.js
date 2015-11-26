
BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Test_selectableitem", {

    template: BetaJS.Dynamics.Components.Templates.test_selectableitem,

    attrs: {
        view : {
            listitem: 'swipecontainer',
            type: 'selectableitem'
        }
    },

    collections : {
        listcollection : [
            {value: "Test - Selectableitem 1"},
            {value: "Test - Selectableitem 2"},
            {value: "Test - Selectableitem 3"}
        ]
    }

}).register();
