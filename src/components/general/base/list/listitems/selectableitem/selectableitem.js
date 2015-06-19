
BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Selectableitem", {

    template: BetaJS.Dynamics.Dynamic.Components.Templates.selectableitem,

    initial: {

        bind : {
            selected : "<:selected_item",
            parentlistcollection : "<:listcollection"
        },

        attrs: {
            //selected: false,
            value: {
                name :'Data Placeholder',
                selected : false
            }
        },

        create : function () {

            console.log("Selected Item : !!! :");
            console.log(this.parent());
            console.log(this.parent().get('selected_item'));
            console.log(this.get('selected'));

            var index = this.get('parentlistcollection').getIndex(this.get('value'));
            if (index == 0 && !this.parent().get('selected_item'))
                this.parent().set('selected_item',this.get('value'));

            console.log("Index : " + index);
            console.log(this.get('value'));

        },

        functions : {
            select : function (data) {
                this.parent().set('selected_item',this.get('value'));
                console.log('Set new');
                console.log(this.get('value'));
                console.log(this.parent().get('selected_item'));
                console.log(this.get('selected'));
                //this.set('selected',!this.get('selected'));
            }
        }

    }

}).register();
