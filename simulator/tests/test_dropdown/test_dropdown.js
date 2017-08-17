Scoped.define("module:Test_dropdown", [
    "dynamics:Dynamic",
    "base:Collections.Collection"
],[
    "module:Dropdown",
    "dynamics:Partials.EventPartial"
], function(Dynamic, Collection, scoped) {

    Dynamic.extend({
        scoped: scoped
    }, {

        templateUrl: "tests/test_dropdown/test_dropdown.html",

        attrs: {
            dropdownmodel: {
                listcollection: new Collection({
                    objects: [
                        {
                            value: "Test - Dropdown - Item 1",
                            eventid: 'Dropdown, click 1'
                            // callbacks : {
                            //     click : function () {
                            //         console.log('Clickitemtest1');
                            //         this.trigger("event1");
                            //
                            //     }
                            // }
                        },
                        {
                            value: "Test - Dropdown - Item 2",
                            eventid: 'Dropdown, click 2',
                            callbacks : {
                                click : function () {
                                    console.log('Clickitemtest2');
                                    this.trigger("event2");

                                }
                            }
                        }
                    ]
                })
            }
        },

        functions : {
          drop_a_log : function () {
              console.log('Angekommen!');
          }
        },

        create: function() {}

    }).register();
});