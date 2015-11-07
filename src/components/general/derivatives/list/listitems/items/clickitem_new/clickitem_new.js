
BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Clickitem_new", {

    template: BetaJS.Dynamics.Dynamic.Components.Templates.clickitem_new,

    initial: {

        attrs: {
            title :'Title'
        },

        functions : {
            click : function () {
                console.log("You Clicked item : " + this.get('title'));
            }
        }

    }

}).register();
