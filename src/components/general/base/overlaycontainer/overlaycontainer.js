Scoped.define("module:Overlaycontainer", [
    "dynamics:Dynamic",
    "base:Objs"
], [
    "dynamics:Partials.TapPartial"
], function(Dynamic, Objs, scoped) {

    return Dynamic.extend({
        scoped: scoped
    }, {

        template: "<%= template(filepathnoext + '.html') %>",

        attrs: function() {
            return {
                // overlaysplit: true,

                view: {
                    insertsubview: false,
                    overlay: "",
                    fullpage: false,
                    overlaysplit: false
                },
                model: {
                    message: "This is a message"
                },
                value: null,
                showoverlay: true
            };
        },

        events: {
            "hide-overlay": function() {
                this.execute('hide_overlay');
            }
        },

        extendables: ['view'],

        create: function() {
            this.set("view", Objs.tree_extend(this.attrs().view, this.get("view")));
        },

        functions: {
            hide_overlay: function() {
                this.set('showoverlay', false);
                this.trigger('hide_overlay');
            }
        }

    }).registerFunctions({
        /*<%= template_function_cache(filepathnoext + '.html') %>*/
    }).register();

});