
Scoped.define("module:Test_selectableitem", [
    "dynamics:Dynamic",
    "module:Templates"
], [
    "module:List"
], function (Dynamic, Templates, scoped) {

    Dynamic.extend({scoped: scoped}, {

        template: Templates.test_selectableitem,

        attrs : {
            model : {
                value :'Selectableitem - Value'
            }
        },

        collections : {
            listcollection : [
                {value: 'Item 1'},
                {value: 'Item 2'},
                {value: 'Item 3'}
            ]
        },

        create : function () {
        }

    }).register();
});
