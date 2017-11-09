Scoped.define("module:Clickcontainer", [
    "dynamics:Dynamic",
    "base:Loggers.Logger"
], function(Dynamic, Logger, scoped) {

    var logger = Logger.global().tag("dynamic", "list");

    return Dynamic.extend({
        scoped: scoped
    }, {

        template: "<%= template(filepathnoext + '.html') %>",

        attrs: {
            view: {
                inner: 'eventitem'
            }
        },

        functions: {
            click: function() {
                this.trigger('clickcontainerclick', this.get('model'));
            }
        }

    }).register();

});