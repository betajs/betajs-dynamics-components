Scoped.define("module:Removableclickcontainer", [
    "dynamics:Dynamic"
], function(Dynamic, scoped) {

    return Dynamic.extend({
        scoped: scoped
    }, {

        template: "<%= template(filepathnoext + '.html') %>",

        attrs: {
            view: {
                inner: 'eventitem',
                removeicon: 'icon-remove'
            }
        },

        extendables: ['view'],

        functions: {
            click: function() {
                this.trigger('click', this.get('model'));
            },
            remove: function() {
                this.trigger('remove', this.get('model'));
            }
        }

    }).register();

});