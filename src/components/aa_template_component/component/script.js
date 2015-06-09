
BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Template", {

    templateUrl: "component/%.html",

 //   template: BetaJS.Dynamics.Components.Templates["Template"]


    initial: {

        attrs: {
            placeholder: 'This is a demo template'
        },

        create : function () {
            console.log('Dynamic Loaded');
        }

    }

}).register();
