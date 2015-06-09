
BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Selectable", {

    templateUrl: "component/subcomponents/%/%.html",

    initial: {

        attrs: {
            data: {
                title :'Data Placeholder',
                highlight_element : false
            }
        },

        create : function () {


        },

        functions : {
            select : function (data) {
                this.set('highlight_element',!this.get('highlight_element'));
            }
        }

    }

}).register();
