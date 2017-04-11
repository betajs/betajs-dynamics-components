
Scoped.define("module:Test_selectableitem", [
    "dynamics:Dynamic"
], [
    "module:List"
], function (Dynamic, scoped) {

    Dynamic.extend({scoped: scoped}, {

        template: "<%= template(filepathnoext + '.html') %>",

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
