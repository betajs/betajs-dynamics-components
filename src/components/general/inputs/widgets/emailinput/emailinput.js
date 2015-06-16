
BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Dynamic.Components.Emailinput", {

    template: BetaJS.Dynamics.Dynamic.Components.Templates.emailinput,

    initial : {

        attrs : {
            selected_recipient : null,
            showcontacts : false
        },

        collections : {
            recipients : [
                {name: "Oliver Friedmann", email: "Oliver.Friedmann@gmail.com"},
                {name: "Victor Lingenthal", email: "Victor.Lingenthal@gmail.com"}
            ]
        },

        create : function () {
            this.get("recipients").add_secondary_index("email");

        },

        functions : {
            select: function () {},
            add_recipient : function (email) {
                if (email != undefined && BetaJS.Strings.is_email_address(email)) {
                    this.get("recipients").add({name: null, email: email});
                    this.set('value','');
                } else
                    App.Dynamics.notifications.call('error', {message: 'This is not a valid Email'});
            },
            keydown : function (event) {
                var key = event[0].keyCode;
                if (key == 32 || key == 13) {
                    this.call('add_recipient',this.get('value'));
                } else if (key != 8) {
                    this.set('selected_recipient', null);
                } else if (this.get('selected_recipient') && (key == 8 || key == 68)) {
                    this.get("recipients").remove(this.get('selected_recipient'));
                    this.set('selected_recipient', null);
                    $("#recipient_input").focus();
                } else if (key == 8 && !this.get('value') && $("#recipient_input").is(":focus")) {
                    var r = this.get('recipients');
                    var last_recipient = r.getByIndex(r.count() - 1);
                    this.set('selected_recipient', last_recipient);
                }
            }
        }

    }

}).register();