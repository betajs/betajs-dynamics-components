
BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Titlesetting", {

    templateUrl: "../components/general/inputs/settingslist/%/%.html?" + BetaJS.Time.now(),

    initial : {

        attrs : {
            value_title : "",
            type_icon : "icon-ok-circle",
            placeholder: "New Title",
            dictation: true
        },

        create : function () {

        },

        functions : {

        }
    }

}).register();
