Scoped.define("module:Layout_web", [
    "dynamics:Dynamic"
], [
    "dynamics:Partials.AttrsPartial"
], function(Dynamic, scoped) {

    return Dynamic.extend({
        scoped: scoped
    }, {

        template: "<%= template(filepathnoext + '.html') %>",

        attrs: {
            view: {
                header: "header",
                //header : null,
                menu: "menu_web",
                //menu : null,
                content: null,
                display_menu: true
            },
            model: {

            }
        },

        extendables: ['view'],

        functions: {
            toggle_menu: function() {
                this.setProp('view.display_menu', !this.getProp('view.display_menu'));
            }
        }

    }).register();

});