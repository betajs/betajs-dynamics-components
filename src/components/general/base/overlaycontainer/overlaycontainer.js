Scoped.define("module:Overlaycontainer", [
    "dynamics:Dynamic"
], [
    "dynamics:Partials.TapPartial"
], function(Dynamic, scoped) {

    return Dynamic.extend({
        scoped: scoped
    }, {

        template: "<%= template(filepathnoext + '.html') %>",

        attrs: {
            overlaysplit: true,

            view: {
                insertsubview: false,
                overlay: "",
                fullpage: false,
                overlaysplit: true
            },
            model: {
                message: "This is a message"
            },
            value: null,
            showoverlay: true
        }

    }).registerFunctions({
        /*<%= template_function_cache(filepathnoext + '.html') %>*/
    }).register();

});