Scoped.define("module:Toggle_menu", [
    "dynamics:Dynamic"
], function(Dynamic, scoped) {

    return Dynamic.extend({
        scoped: scoped
    }, {

        template: "<%= template(filepathnoext + '.html') %>",

        attrs: {
            toggle_icon: 'icon-reorder'
        },

        functions: {
            toggle_menu: function() {
                this.channel('global').trigger('toggle_menu');
            }
        }

    }).registerFunctions({ /*<%= template_function_cache(filepathnoext + '.html') %>*/ }).register();

});