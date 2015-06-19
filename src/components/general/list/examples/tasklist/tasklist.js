
BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Tasklist", {

    template: BetaJS.Dynamics.Dynamic.Components.Templates.tasklist,

    initial: {

        attrs: {
            listitem : "swipeitem"
        },

        collections : {
            outer_collection : [
                {
                    title : "Group - 1",
                    collapsed : false,
                    type : "swipeitem",
                    listcollection : new BetaJS.Collections.Collection({objects: [
                        {
                            type : "clickitem",
                            title : "Name 1"
                        },
                        {
                            type : "clickitem",
                            title : "Name 2"
                        }
                    ]})
                },
                {
                    title: "Group - 2",
                    collapsed : true,
                    type : "swipeitem",
                    listcollection : new BetaJS.Collections.Collection({objects: [
                        {
                            type : "clickitem",
                            title : "Name 1"
                        },
                        {
                            type : "clickitem",
                            title : "Name 2"
                        }
                    ]})
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
