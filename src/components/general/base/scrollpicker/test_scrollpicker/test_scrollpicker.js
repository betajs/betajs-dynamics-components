
Scoped.define("module:Test_scrollpicker", [
    "dynamics:Dynamic"
], [
   'module:Scrollpicker'
], function (Dynamic, scoped) {

    return Dynamic.extend({scoped: scoped}, {

        template: "<%= template(filepathnoext + '.html') %>",

        attrs : {
        },

        create : function () {


        }

    }).register();

});