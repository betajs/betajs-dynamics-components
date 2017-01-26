
Scoped.define("module:Clickinput", [
    "dynamics:Dynamic",
    "module:Templates"
], function (Dynamic, Templates, scoped) {
    return Dynamic.extend({scoped: scoped}, {

        template: Templates.clickinput,

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