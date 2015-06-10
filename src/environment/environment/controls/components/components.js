
BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Components", {

    templateUrl: "environment/controls/%/%.html",


    initial: {

        attrs : {
            components : components
        },

        create : function () {
            console.log('Controls Loaded');

            this.set('current_component', appstate.get("component_type") ? componentsByName(appstate.get("component_type")) : this.get('components')[0]);
            appstate.on("change:component_type", function (component_type) {
                this.set('current_component', componentsByName(component_type));
            }, this);

        }

    }

}).register();
