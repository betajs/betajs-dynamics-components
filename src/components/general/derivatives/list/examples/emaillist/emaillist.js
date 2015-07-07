
BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Emaillist", {

    template: BetaJS.Dynamics.Dynamic.Components.Templates.emaillist,

    initial: {

        collections : {
            emailcollection : [
                {
                    type : "emailitem",
                    sender_display : "Sender",
                    recipient_display : "Recipient",
                    subject : "Subject",
                    preview : "First Line...",
                    time : BetaJS.Time.now()
                },
                {
                    type : "emailitem",
                    sender_display : "V@g.com",
                    recipient_display : "O@g.com",
                    subject : "Email Subject",
                    preview : "Hello O,",
                    time : BetaJS.Time.now()
                }
            ]
        },

        create : function () {
            //var outer_n = 10;
            //var inner_n = 10;
            //var outer_collection = new BetaJS.Collections.Collection();
            //for (var outer_index = 0; outer_index < outer_n; ++outer_index) {
            //    var outer_properties = new BetaJS.Properties.Properties();
            //    outer_collection.add(outer_properties);
            //    outer_properties.set("title", "Group " + outer_index);
            //    var inner_collection = new BetaJS.Collections.Collection();
            //    outer_properties.set("listcollection", inner_collection);
            //    for (var inner_index = 0; inner_index < inner_n; ++inner_index) {
            //        var inner_properties = new BetaJS.Properties.Properties();
            //        inner_collection.add(inner_properties);
            //        inner_properties.set("title", "Item " + outer_index + ", " + inner_index);
            //    }
            //}
            //this.set("outer_collection", outer_collection);
        }

    }

}).register();
