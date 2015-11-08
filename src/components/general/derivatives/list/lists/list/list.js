
BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.List", {

    template: BetaJS.Dynamics.Dynamic.Components.Templates.list,

    attrs: {
        listitem : "clickitem"
    },

    collections : {
        listcollection : [
            {title: "List - Item 1"},
            {title: "List - Item 2"},
            {title: "List - Item 3"}
        ]
    }

}).register();
