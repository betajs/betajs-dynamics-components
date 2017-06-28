Scoped.define("module:Searchbox", [
    "dynamics:Dynamic"
], function(Dynamic, scoped) {
    return Dynamic.extend({
        scoped: scoped
    }, {

        template: "<%= template(filepathnoext + '.html') %>",

        attrs: {
            value: "",
            view: {
                placeholder: "Placeholder",
                autofocus: true
            }
        }

    }).register();

});