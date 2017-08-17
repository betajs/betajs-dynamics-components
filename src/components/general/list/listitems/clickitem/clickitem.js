Scoped.define("module:Clickitem", [
    "dynamics:Dynamic",
    "base:Loggers.Logger"
], function(Dynamic, Logger, scoped) {

    var logger = Logger.global().tag("dynamic", "list");

    return Dynamic.extend({
        scoped: scoped
    }, {

        template: "<%= template(filepathnoext + '.html') %>",

        attrs: {
            model: {
                value: 'Clickitem - Value',
                eventid: 'noid'
            }
        },

        functions: {
            click: function() {
                logger.log('Click');

                this.trigger('click', this.getProp('model.eventid'));
                //logger.log("You Clicked item : " + this.properties().getProp('model.value'));
                //logger.log(this.cid());
                //this.trigger('event', this.cid());
            }
        },

        create: function() {
            this.on("event", function(cid) {
                logger.log('event from item: ' + cid);
            }, this);
        }

    }).register();

});