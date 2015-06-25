
BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Dynamic.Components.Emailitem", {

    template : BetaJS.Dynamics.Dynamic.Components.Templates.emailitem,

    initial : {
        attrs : {
            sender_display : "Sender",
            recipient_display : "Recipient",
            subject : "Subject",
            preview : "First Line...",
            time : (BetaJS.Time.now()-100000000),
            displayed_time :  "18:00"
        },

        create : function () {

            if (this.get("model")) {
                BetaJS.Objs.iter(this.get("model").data(), function (modelValue, attrKey) {
                    var attrValue = this.isArgumentAttr(attrKey) ? this.get(attrKey) : modelValue;
                    this.set(attrKey, attrValue);
                    this.get("model").set(attrKey, attrValue);
                    this.properties().bind(attrKey, this.get("model"));
                }, this);
            }

            this.call('set_display_time');

        },

        functions : {
            set_display_time : function() {
                var now = BetaJS.Time.now();
                var decodedTime = BetaJS.Time.decodeTime(this.get('time'),true);
                var currentTime = BetaJS.Time.decodeTime(now,true);

                var r = function (n) {return ("0" + n).slice(-2);}

                if (decodedTime.day == currentTime.day && (now - this.get('time')) < 25 * 60 * 60 * 1000)
                    this.set('displayed_time',
                        decodedTime.hour + ':' +
                        decodedTime.minute
                    );
                else
                    this.set('displayed_time',
                        decodedTime.day + '/' +
                        r(decodedTime.month)
                    );
            }
        }

    }

}).register();
