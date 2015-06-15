
BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Testcomponent", {

    templateUrl: "../components/unsorted/%/%.html",


    initial: {

        attrs: {
            placeholder: 'This is the Testcomponent template'
        },

        create : function () {
            console.log('Testcomponent Loaded');
        }

    }

}).register();
