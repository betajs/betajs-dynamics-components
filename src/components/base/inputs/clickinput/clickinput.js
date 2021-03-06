Scoped.define("module:Clickinput", [
    "dynamics:Dynamic"
], function(Dynamic, scoped) {
    return Dynamic.extend({
        scoped: scoped
    }, {

        template: "<%= template(filepathnoext + '.html') %>",

        attrs: function() {
            return {
                model: {
                    value: "Test"
                },
                view: {
                    placeholder: "",
                    edit: false,
                    autofocus: true,
                    externaledit: false
                }
            };
        },

        extendables: ['view'],

        functions: {
            edititem: function() {

                this.trigger('edititem');

                if (this.getProp('view.externaledit')) {

                    this.setProp('view.edit', true);

                    var SearchInput = this.activeElement().querySelector("input");
                    var strLength = this.getProp('model.value').length;
                    SearchInput.focus();
                    SearchInput.setSelectionRange(strLength, strLength);

                }
            }
        }

    }).registerFunctions({
        /*<%= template_function_cache(filepathnoext + '.html') %>*/
    }).register();

});