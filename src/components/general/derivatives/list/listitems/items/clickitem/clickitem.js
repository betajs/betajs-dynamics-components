
BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Clickitem", {

    template: BetaJS.Dynamics.Dynamic.Components.Templates.clickitem,

    initial: {

        attrs: {
            model: {
                title : 'Clickitem - Title'
            }
        },

        functions : {
            click : function () {
                var itemtitle = this.get('model').data() ? this.get('model').data().title : this.get('model').title;
                console.log("You Clicked item : " + itemtitle);
            }
        }

    }

}).register();
