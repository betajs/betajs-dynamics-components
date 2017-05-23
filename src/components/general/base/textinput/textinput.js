Scoped.define("module:Textinput", [
    "dynamics:Dynamic",
    'base:Strings'
], function(Dynamic, Strings, scoped) {
    return Dynamic.extend({
        scoped: scoped
    }, {

        template: "<%= template(filepathnoext + '.html') %>",

        attrs: {
            value: 'Test',
            height: 0,
            view: {
                placeholder: "",
                autofocus: true
            }

        },

        computed: {
            "preheighttext:value": function() {
                var s = this.get('value');
                return s + (Strings.ends_with(s, "\n") ? " " : "");
            }
        },

        functions: {
            blur: function() {
                this.trigger('blur');
            },
            focus: function() {
                this.activeElement().getElementsByTagName("textarea")[0].focus();
            }
        }

    }).register();

});