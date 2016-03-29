
BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Test_list_loadmore", {

    template: BetaJS.Dynamics.Components.Templates.test_list_loadmore,

    attrs : {
      view : {
          listend : 'loading'
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
        var collection = new BetaJS.Collections.Collection({
            objects: [
                {value: "Test - List - Loadmore - Item 0"},
            ]
        });
        for (var i = 1; i < 25; i++) {
            collection.add(
                {value: "Test - List - Loadmore - Item " + i}
            );
        }
        this.set('listcollection',collection);
    }

}).register();
