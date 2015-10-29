
BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.List", {

    template: BetaJS.Dynamics.Dynamic.Components.Templates.list,

    initial: {

        attrs: {
            listitem : "clickitem"
        },

        collections : {
            listcollection : [
                {title: "Item 1"},
                {title: "Item 2"},
                {title: "Item 3"},
                {title: "Item 4"}
            ]
        },

        create : function () {
            window.iterateModel(this);
            console.log('List - Callbacks');
            console.log(this.get('callbacks'));
            if (this.get('callbacks') && this.get('callbacks').additem)
                console.log(this.get('callbacks').additem.toString());
        }

    }

}).register();
