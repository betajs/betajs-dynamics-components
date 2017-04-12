
Scoped.define("module:Input", [
    "dynamics:Dynamic"
], function (Dynamic, scoped) {
    return Dynamic.extend({scoped: scoped}, {

        template: "<%= template(filepathnoext + '.html') %>",

        attrs: {
            model : {
                value : ""
            },
            view : {
                placeholder : "",
                autofocus : true
            }

        }

    }).register();

});