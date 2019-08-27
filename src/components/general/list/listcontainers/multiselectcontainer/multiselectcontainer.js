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
                console.log('Multiselectcontainer');
                this.flipProp('selected');
                this.trigger('clickcontainerclick', this.get('model'));
            }
        }

    }).register();

});