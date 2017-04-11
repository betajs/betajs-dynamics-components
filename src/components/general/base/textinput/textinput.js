
Scoped.define("module:Textinput", [
    "dynamics:Dynamic",
    'base:Strings'
], function (Dynamic, Strings, scoped) {
    return Dynamic.extend({scoped: scoped}, {

        template: "<%= template(filepathnoext + '.html') %>",

        attrs: {
            value : 'Test',
            view : {
                placeholder : "",
                autofocus : true
            }

        },

        computed : {
            "preheighttext:value" : function () {
                var s = this.get('value');
                return s + (Strings.ends_with(s, "\n") ? " " : "");
            }
        },

        functions : {
            blur : function () {
                console.log('Textinput');
                this.trigger('blur')}
        }

    }).register();

});