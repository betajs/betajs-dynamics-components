Scoped.define("tests:Test_clickitem", [
    "dynamics:Dynamic"
],[
    "module:Clickitem"
], function(Dynamic, scoped) {

    return Dynamic.extend({
        scoped: scoped
    }, {

        templateUrl: "tests/test_clickitem/test_clickitem.html",

        attrs: {

        }

    }).register();

});