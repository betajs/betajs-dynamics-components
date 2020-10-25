Scoped.define("module:Positioncontainer", [
    "dynamics:Dynamic",
    "base:Time"
], function(Dynamic, Time, scoped) {

    return Dynamic.extend({
        scoped: scoped
    }, {

        template: "<%= template(filepathnoext + '.html') %>",

        attrs: {
            view: {
                inner: 'eventitem'
            },
            top: 20
        },

        create: function() {
            console.log('Positioncontainer');
            var hour = Time.decodeTime(this.getProp('model.start_date_utc')).hour;
            var percentage = (hour - 5) / 19 * 100;
            this.set('top', percentage);
        }

    }).register();

});