
BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.List", {

    template: BetaJS.Dynamics.Dynamic.Components.Templates.list,

    attrs: {
        listitem : "clickitem",
        model : false
    },

    collections : {
        listcollection : [
            {value: "List - Item 1"},
            {value: "List - Item 2"},
            {value: "List - Item 3"}
        ]
    },

    create : function () {
        console.log('Some List');
        console.log(this.get('model'));
    }

}).register();
