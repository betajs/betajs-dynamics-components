
Scoped.define("module:Textinput", [
    "dynamics:Dynamic",
    "module:Templates",
    'base:Strings'
], function (Dynamic, Templates, Strings, scoped) {
    return Dynamic.extend({scoped: scoped}, {

        template: Templates.textinput,

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
        }

    }).register();

});