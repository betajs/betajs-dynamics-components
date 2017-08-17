Scoped.define("module:Dropdown", [
    "dynamics:Dynamic"
], [
    "dynamics:Partials.EventForwardPartial",
    "dynamics:Partials.EventPartial",
    "dynamics:Partials.TapPartial",
    "module:List"
], function(Dynamic, scoped) {

    return Dynamic.extend({
        scoped: scoped
    }, {

        template: "<%= template(filepathnoext + '.html') %>",

        attrs: function() {
            return {
                view: {
                    dropdown: 'list'
                },
                dropdownmodel: {},
                value: null,
                showdropdown: true
            };
        },

        extendables: ['view'],

        functions: {
            hide_dropdown: function() {
                this.set('showdropdown', false);
            }
        }

    }).register();

});