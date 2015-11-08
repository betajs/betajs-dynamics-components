
BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Clickitem", {

    template: BetaJS.Dynamics.Dynamic.Components.Templates.clickitem,

    attrs: {
        title : 'Clickitem - Title'
    },

    functions : {
        click : function () {
            console.log("You Clicked item : " + this.get('title'));
        }
    }

}).register();
