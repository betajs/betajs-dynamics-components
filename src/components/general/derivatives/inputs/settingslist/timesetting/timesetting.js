
BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Timesetting", {

    template : BetaJS.Dynamics.Dynamic.Components.Templates.timesetting,

    initial : {

        attrs : {
            value : 1434418496419,
            displayed_value : null,
            key_value: 'Time'
        },

        create : function () {

            this.compute('displayed_value', function() {

                var time = BetaJS.Time.decodeTime(this.get('value'));

                var r = function (n) {return ("0" + n).slice(-2);}

                return r(time.hour) + ":" + r(time.minute);

            }, ['value']);

        }

    }

}).register();
