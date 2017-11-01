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
                logger.log('Click');

                this.trigger('click', this.getProp('model.eventid'));
                //logger.log("You Clicked item : " + this.properties().getProp('model.value'));
                //logger.log(this.cid());
                this.trigger('event', this.cid());
            }
        }

    }).register();

});