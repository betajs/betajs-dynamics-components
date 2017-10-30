Scoped.define("module:Eventitem", [
    "dynamics:Dynamic",
    "base:Loggers.Logger"
], function(Dynamic, Logger, scoped) {

    var logger = Logger.global().tag("dynamic", "calendar");

    return Dynamic.extend({
        scoped: scoped
    }, {

        template: "<%= template(filepathnoext + '.html') %>",

        attrs: {
            counter: 0,
            model: {
                value: 'Eventitem - Clicked '
            }
        },

        functions: {
            click: function() {
                this.trigger('event', this.cid());
            }
        },

        create: function() {

            this.on("event", function(cid) {
                this.set('counter', this.get('counter') + 1);
            }, this);

            this.parent().on('archive', function() {
                logger.log('archived');
            }, this);

        }

    }).registerFunctions({ /*<%= template_function_cache(filepathnoext + '.html') %>*/ }).register();

});