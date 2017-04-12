
Scoped.define("tests:Testoverlaycontainer", [
    "dynamics:Dynamic"
],[
    "module:Overlaycontainer"
],function (Dynamic, scoped) {

    return Dynamic.extend({scoped: scoped}, {

        template: "<%= template(filepathnoext + '.html') %>",

        attrs : {
            showoverlay : false,
            overlay : "timepicker"
        }

    }).register();

});
