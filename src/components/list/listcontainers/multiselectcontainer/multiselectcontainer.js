Scoped.define("module:Multiselectcontainer", [
    "dynamics:Dynamic"
], function(Dynamic, scoped) {

    return Dynamic.extend({
        scoped: scoped
    }, {

        template: "<%= template(filepathnoext + '.html') %>",

        attrs: {
            selected: false,
            view: {
                inner: 'eventitem'
            }
        },

        functions: {
            click: function() {
                this.flipProp('selected');
                this.trigger('multiselect');
            }
        }

    }).register();

});