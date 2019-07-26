Scoped.define("module:Textinput", [
    "dynamics:Dynamic",
    'base:Strings'
], [
    "dynamics:Partials.OnPartial"
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

        extendables: ['view'],

        computed: {
            "preheighttext:value": function() {
                var s = this.get('value');
                return s + (Strings.ends_with(s || '', "\n") ? " " : "");
            }
        },

        windowevents: {
            "touchstart": function(event) {
                if (document.activeElement.nodeName == 'TEXTAREA' && event.target.nodeName == 'TEXTAREA' || event.target.nodeName == 'INPUT') return;
                else this.execute('blur');
            }
        },

        functions: {
            focus_textarea: function() {
                if (document.activeElement.nodeName == 'TEXTAREA') return;
                else this.element()[1].select();
            },
            blur: function() {
                this.trigger('blur');
                this.element()[1].blur();
            },
            onfocus: function() {
                this.trigger('onfocus');
            }
        }

    }).registerFunctions({
        /*<%= template_function_cache(filepathnoext + '.html') %>*/
    }).register();

});