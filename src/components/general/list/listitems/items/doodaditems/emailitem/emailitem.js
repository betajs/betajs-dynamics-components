
BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Dynamic.Components.Emailitem", {

    template : BetaJS.Dynamics.Dynamic.Components.Templates.emailitem,

    initial : {
        attrs : {
            sender_display : "Sender",
            recipient_display : "Recipient",
            subject : "Subject",
            preview : "First Line...",
            time : "18:30"
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
        }
    }

}).register();
