
BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Timepicker", {

    templateUrl: "../components/unsorted/%/%.html?" + BetaJS.Time.now(),

    initial : {

        attrs: {
            valueHour : BetaJS.Time.decodeTime(BetaJS.Time.now(),true).hour,
            valueMinute : BetaJS.Time.decodeTime(BetaJS.Time.now(),true).minute
        },

        create : function () {

            this.on("change:valueMinute",function () {
                console.log('Minute was changed to : ' + this.get('valueMinute'));
            });

        }
    }

}).register();

