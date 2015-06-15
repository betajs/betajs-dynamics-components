
BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Generalsetting", {

    template: BetaJS.Dynamics.Dynamic.Components.Templates.generalsetting,

    initial : {

        attrs : {
            key_value : "Duration",
            type_icon : "icon-time",
            value_value : "Value",
            showwidget : false,
            widget : "emailinput"
        },

        create : function () {

        },

        functions : {
            on_click : function () {
                console.log('You clicked the ' + this.get('key_value') + ' Settings');
            }
        }
    }

}).register();
