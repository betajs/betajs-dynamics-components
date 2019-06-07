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
            };
        },

        create: function() {
            console.log('Overlaycontainer created?');
            console.log(this);
            console.log(this.get('showoverlay'));

        }

    }).registerFunctions({
        /*<%= template_function_cache(filepathnoext + '.html') %>*/
    }).register();

});