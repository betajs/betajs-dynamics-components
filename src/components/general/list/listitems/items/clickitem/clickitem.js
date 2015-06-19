
BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Clickitem", {

    template: BetaJS.Dynamics.Dynamic.Components.Templates.clickitem,

    initial: {

        attrs: {
            model: {
                title :'Title'
            }
        },

        create : function () {

        },

        functions : {
            click : function () {
                console.log("Route to ...")
            }
        }

    }

}).register();
