
BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Simulator", {

    templateUrl: "environment/%/%.html",

    initial: {

        bind : {
            current_component: "<>+[tagname='ba-controls']:current_component",
            current_system: "<>+[tagname='ba-layout']:current_system",
            current_device: "<>+[tagname='ba-layout']:current_device"
        },

        attrs: {
            component: 'testcomponent'
        },

        create : function () {
            console.log('Simulator Loaded');
        }

    }

}).register();