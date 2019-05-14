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
            nosearch: true,
            view: {
                placeholder: "Placeholder",
                autofocus: true,
                filter_visible: false,
                searchbuttons: null
            }
        },

        extendables: ['view'],

        events: {
            'change:value': function(value) {
                this.set('loading', !!value);
            }
        },

        functions: {
            onfocus: function() {
                this.set('nosearch', false);
            },
            onblur: function() {
                this.set('nosearch', true);
            }
        }

    }).registerFunctions({
        /*<%= template_function_cache(filepathnoext + '.html') %>*/
    }).register();

});