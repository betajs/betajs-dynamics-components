
BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Selectableitem", {

    template: BetaJS.Dynamics.Dynamic.Components.Templates.selectableitem,

    initial: {

        bind : {
            selected : "<:selected_item",
            parentlistcollection : "<:listcollection"
        },

        attrs: {
            model: {
                title :'Data Placeholder',
                selected : false
            }
        },

        create : function () {

            var index = this.get('parentlistcollection').getIndex(this.get('model'));
            if (index == 0 && !this.parent().get('selected_item'))
                this.parent().set('selected_item',this.get('model'));

        },

        functions : {
            select : function () {
                this.parent().set('selected_item',this.get('model'));
            }
        }

    }

}).register();
