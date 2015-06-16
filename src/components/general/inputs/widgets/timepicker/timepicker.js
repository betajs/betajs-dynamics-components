
BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Timepicker", {

    template: BetaJS.Dynamics.Dynamic.Components.Templates.timepicker,

    initial : {

        attrs: {
            value : 0,
            timevalue : {
                hour : 0,
                minute : 0
            }
        },

        create : function () {

            if (!this.get('value'))
                this.set('timevalue',{
                    hour : BetaJS.Time.decodeTime(BetaJS.Time.now(),true).hour,
                    minute : BetaJS.Time.decodeTime(BetaJS.Time.now(),true).minute
                });

            this.on("change:timevalue.minute",function () {
                var newvalue = BetaJS.Time.updateTime(this.get('value'),{
                    minute : this.get('timevalue.minute')
                });
                this.set('value',newvalue);
            });

            this.on("change:timevalue.hour",function () {
                var newvalue = BetaJS.Time.updateTime(this.get('value'),{
                    hour : this.get('timevalue.hour')
                });
                this.set('value',newvalue);
            });
        }
    }

}).register();

