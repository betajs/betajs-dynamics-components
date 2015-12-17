
Scoped.define("module:Input", [
    "dynamics:Dynamic",
    "module:Templates"
], function (Dynamic, Templates, scoped) {
    return Dynamic.extend({scoped: scoped}, {

        template: Templates.input,

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