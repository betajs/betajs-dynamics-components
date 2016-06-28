
Scoped.define("module:Test_scrollpicker", [
    "dynamics:Dynamic",
    "module:Templates"
], [
   'module:Scrollpicker'
], function (Dynamic, Templates, scoped) {

    return Dynamic.extend({scoped: scoped}, {

        template: Templates.test_scrollpicker,

        attrs : {
        },

        create : function () {


        }

    }).register();

});