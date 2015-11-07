
BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.List_new", {

    template: BetaJS.Dynamics.Dynamic.Components.Templates.list_new,

    initial: {

        attrs: {
            listitem : "clickitem_new"
        },

        collections : {
            listcollection : [
                {title: "List_new - Item 1"},
                {title: "List_new - Item 2"},
                {title: "List_new - Item 3"}
            ]
        }

    }

}).register();
