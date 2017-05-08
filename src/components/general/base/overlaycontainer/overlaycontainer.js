Scoped.define("module:Overlaycontainer", [
    "dynamics:Dynamic"
], [
    "dynamics:Partials.TapPartial"
], function(Dynamic, scoped) {

    return Dynamic.extend({
        scoped: scoped
    }, {

        template: "<%= template(filepathnoext + '.html') %>",

        attrs: function() {
            return {
                view: {
                    overlay: ""
                },
                model: {
                    message: "This is a message"
                },
                value: null,
                showoverlay: true
            }
        }

    }).register();

});