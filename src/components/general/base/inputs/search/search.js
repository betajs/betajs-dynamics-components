Scoped.define("module:Search", [
    "dynamics:Dynamic"
], [
    "module:Loading",
    "module:Dropdown"
], function(Dynamic, scoped) {
    return Dynamic.extend({
        scoped: scoped
    }, {

        template: "<%= template(filepathnoext + '.html') %>",

        attrs: {
            value: "",
            loading: false,
            view: {
                placeholder: "Placeholder",
                autofocus: true,
                filter_visible: false
            }
        },

        extendables: ['view'],

        events: {
            'change:value': function(value) {
                this.set('loading', !!value);
            }
        }

    }).registerFunctions({ /*<%= template_function_cache(filepathnoext + '.html') %>*/ }).register();

});