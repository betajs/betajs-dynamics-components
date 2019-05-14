Scoped.define("module:Clickitem", [
    "dynamics:Dynamic"
], function(Dynamic, scoped) {

    return Dynamic.extend({
        scoped: scoped
    }, {

        template: "<%= template(filepathnoext + '.html') %>",

        attrs: {
            model: {
                icon: '',
                value: 'Clickitem - Value',
                eventid: 'noid'
            }
        },

        functions: {
            click: function() {

                this.trigger('click', this.get('model'));
                this.trigger('event', this.cid());
            }
        }

    }).registerFunctions({
        /*<%= template_function_cache(filepathnoext + '.html') %>*/
    }).register();

});