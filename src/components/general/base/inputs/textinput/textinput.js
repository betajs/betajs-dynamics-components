Scoped.define("module:Textinput", [
    "dynamics:Dynamic",
    'base:Strings'
], function(Dynamic, Strings, scoped) {
    return Dynamic.extend({
        scoped: scoped
    }, {

        template: "<%= template(filepathnoext + '.html') %>",

        attrs: {
            value: null,
            height: 0,
            view: {
                placeholder: '',
                placeholder_visible: true,
                autofocus: true
            }
        },

        computed: {
            "preheighttext:value": function() {
                var s = this.get('value');
                return s + (Strings.ends_with(s || '', "\n") ? " " : "");
            }
        },

        functions: {
            blur: function() {
                console.log('Textinput: Blur not working every time on ios');
                this.trigger('blur');
            },
            onfocus: function() {
                this.trigger('onfocus');
            }
        }

    }).registerFunctions({ /*<%= template_function_cache(filepathnoext + '.html') %>*/ }).register();

});