
Scoped.define("module:Clickinput", [
    "dynamics:Dynamic"
], function (Dynamic, scoped) {
    return Dynamic.extend({scoped: scoped}, {

        template: "<%= template(filepathnoext + '.html') %>",

        attrs: {
            model : {
                value : "Test"
            },
            view : {
                placeholder : "",
                edit : false,
                autofocus : true
            }
        },

        extendables : ['view'],

        functions : {
            edititem : function () {

                this.setProp('view.edit', true);

                var SearchInput = this.activeElement().querySelector("input");
                var strLength = this.getProp('model.value').length;
                SearchInput.focus();
                SearchInput.setSelectionRange(strLength, strLength);

            }
        }

    }).register();

});