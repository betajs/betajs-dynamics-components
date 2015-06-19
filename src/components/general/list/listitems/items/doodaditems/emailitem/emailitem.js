
BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Dynamic.Components.Emailitem", {

    template : BetaJS.Dynamics.Dynamic.Components.Templates.emailitem,

    initial : {
        attrs : {
            sender_salutatory_display : "Sender",
            recipient_salutatory_display : "Recipient",
            subject : "Subject",
            preview : "First Line...",
            time : "18:30"
        }
    }

}).register();
