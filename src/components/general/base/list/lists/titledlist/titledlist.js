
BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Titledlist", {

    template: BetaJS.Dynamics.Dynamic.Components.Templates.titledlist,

    initial: {

        attrs: {
            showlist : true,
            title : "Title",
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
            console.log("List : !!! : ");
            console.log(this.get('selected_item'));

        }

    }

}).register();
