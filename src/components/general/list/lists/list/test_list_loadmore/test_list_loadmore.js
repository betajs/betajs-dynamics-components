
Scoped.define("tests:Test_list_loadmore", [
    "dynamics:Dynamic",
    "module:Templates",
    "base:Collections.Collection"
],[
    "module:List",
    "module:Loading"
], function (Dynamic, Templates, Collection, scoped) {

    return Dynamic.extend({scoped : scoped}, {

        template: Templates.test_list_loadmore,

        attrs : {
          view : {
              //listend : 'loading'
              listend : 'loadmore'
          }
        },

        collections : {
            listcollection : [
                {value: "Test - List - Loadmore - Item 1"},
                {value: "Test - List - Loadmore - Item 2"},
                {value: "Test - List - Loadmore - Item 3"},
                {value: "Test - List - Loadmore - Item 4"}
            ]
        },

        create : function () {
            var collection = new Collection({
                objects: [
                    {value: "Test - List - Loadmore - Item 0"}
                ]
            });
            for (var i = 1; i < 15; i++) {
                collection.add(
                    {value: "Test - List - Loadmore - Item " + i}
                );
            }
            this.set('listcollection',collection);
        }

    }).register();

});