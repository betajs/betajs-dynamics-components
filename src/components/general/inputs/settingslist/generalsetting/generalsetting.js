
BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Generalsetting", {

    template: BetaJS.Dynamics.Dynamic.Components.Templates.generalsetting,

    initial : {

        attrs : {
            value : null,
            key_value : "Duration",
            type_icon : "icon-time",
            displayed_value : "Value",

            showwidget : false,
            widget : "emailinput",
            overlay : null
        },

        create : function () {


            this.set('')

        },

        functions : {

        }

    }

}).register();
