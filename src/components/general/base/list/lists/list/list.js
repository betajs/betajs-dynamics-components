
BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.List", {

    template: BetaJS.Dynamics.Dynamic.Components.Templates.list,

    initial: {

        attrs: {
            listitem : "selectableitem"
        },

        collections : {
            listcollection : [
                {name: "Item 1"},
                {name: "Item 2"},
                {name: "Item 3"}
            ]
        },

        create : function () {

        }

    }

}).register();
