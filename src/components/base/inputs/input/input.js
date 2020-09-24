Scoped.define("module:Input", [
    "dynamics:Dynamic"
], [
    "dynamics:Partials.OnPartial"
], function(Dynamic, scoped) {
    return Dynamic.extend({
        scoped: scoped
    }, {

        template: "<%= template(filepathnoext + '.html') %>",

        attrs: {
            value: "",
            view: {
                placeholder: "",
                autofocus: true
            }

        },

        functions: {
            blur: function() {
                this.trigger('blur');
                this.element()[0].blur();
            },
            keydown: function(event) {
                if (event.code === "Enter" && !event.shiftKey) {
                    this.execute("blur");
                    event.preventDefault();
                }
            }

        }

    }).registerFunctions({
        /*<%= template_function_cache(filepathnoext + '.html') %>*/
    }).register();

});