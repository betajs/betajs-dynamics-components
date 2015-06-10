
BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Aa_template", {

    templateUrl: "../components/aa_template/template.html",

    initial: {

        attrs: {
            placeholder: 'This is a demo template'
        },

        create : function () {
            console.log('Dynamic Loaded');
        }

    }

}).register();
