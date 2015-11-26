
BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.List", {

    template: BetaJS.Dynamics.Components.Templates.list,

    attrs: {
        listitem : "clickitem"
    },

    collections : {
        listcollection : [
            {value: "List - Item 1"},
            {value: "List - Item 2"},
            {value: "List - Item 3"}
        ]
    }

}).register();
