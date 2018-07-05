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
            test: true,
            view: {
                placeholder: '',
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
                console.log('Textinput blur');
                this.trigger('blur');
            },
            focus: function() {
                console.log('Textinput focus');
                if (this.get('test')) {
                    // document.myForm.myTextarea.setAttribute('style', 'background:blue');
                    this.activeElement().getElementsByTagName("textarea")[0].setAttribute('style', 'background:blue');
                    this.set('test', false);
                } else {
                    this.activeElement().getElementsByTagName("textarea")[0].setAttribute('style', 'background:red');
                    this.set('test', true);
                }
                // document.myForm.myTextarea.focus();
                this.activeElement().getElementsByTagName("textarea")[0].focus();
            }
        }

    }).registerFunctions({ /*<%= template_function_cache(filepathnoext + '.html') %>*/ }).register();

});