
BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Clickitem", {

    template: BetaJS.Dynamics.Dynamic.Components.Templates.clickitem,

    attrs: {
        model : {
            value : 'Clickitem - Title'
        }
    },

    functions : {
        click : function () {
            //console.log("You Clicked item : " + this.properties().getProp('model.value'));
            console.log("You Clicked item : " + this.get('model'));
            console.log("You Clicked item : " + this.get('model').value);
        }
    }

}).register();
