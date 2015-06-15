
BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Timepicker", {

    template: BetaJS.Dynamics.Dynamic.Components.Templates.timepicker,

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

