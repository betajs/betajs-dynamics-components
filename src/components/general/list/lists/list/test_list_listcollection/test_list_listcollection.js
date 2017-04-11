
Scoped.define("tests:Test_list_listcollection", [
    "dynamics:Dynamic"
], [
    "module:List"
], function (Dynamic, scoped) {

    return Dynamic.extend({scoped : scoped}, {

        template: "<%= template(filepathnoext + '.html') %>",

        collections : {
            listcollection : [
                {value: "Test - List - listollection - Item 1"},
                {value: "Test - List - listollection - Item 2"},
                {value: "Test - List - listollection - Item 3"},
                {value: "Test - List - listollection - Item 4"}
            ]
        }

    }).register();

});