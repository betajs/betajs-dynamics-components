
BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Timepicker", {

    templateUrl: "../components/%/%.html",

    initial : {

        attrs: {
            valueMinute : 10,
            valueHour : 3
        },

        create : function () {

            console.log(this.get('valueMinute'));
            console.log(this.get('valueHour'));

            this.on("change:valueMinute",function () {
                console.log('Minute was changed!!');
            });

            //this.set('valueMinute',20);

        }
    },

    _afterActivate : function () {

        console.log(this.get('valueMinute'));
        console.log(this.get('valueHour'));

    }

}).register();

