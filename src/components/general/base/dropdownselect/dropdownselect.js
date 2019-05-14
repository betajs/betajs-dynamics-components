Scoped.define("module:Dropdownselect", [
    "dynamics:Dynamic",
    "base:Properties.Properties"
], [
    "dynamics:Partials.EventForwardPartial",
    "dynamics:Partials.EventPartial",
    "dynamics:Partials.TapPartial",
    "module:List",
    "module:Clickitem"
], function(Dynamic, Properties, scoped) {

    return Dynamic.extend({
        scoped: scoped
    }, {

        template: "<%= template(filepathnoext + '.html') %>",

        attrs: function() {
            return {
                view: {
                    description: null,
                    dropdown: 'list',
                    icon: 'icon-more_vert',
                    color: null,
                    background: null,
                    useremove: true
                },
                model: new Properties({
                    icon: 'icon-more_vert',
                    color: null,
                    background: null
                }),
                removemodel: new Properties({
                    icon: 'icon-remove',
                    background: 'white',
                    value: 'None'
                }),
                dropdownmodel: {},
                value: null,
                showdropdown: false
            };
        },

        create: function() {
            if (!this.get('model')) this.set('model', this.get('view'));
        },

        extendables: ['view'],

        functions: {
            click: function() {
                if (this.get('showdropdown') === false) {
                    this.set('showdropdown', true);
                    this.element()[0].focus();
                } else
                    this.set('showdropdown', false);
            },
            blur: function() {
                if (window.getComputedStyle(this.element()[0]).getPropertyValue("opacity") == 1) {
                    this.execute('hide_dropdown');
                }
            },
            hide_dropdown: function() {
                this.set('showdropdown', false);
            },
            remove_selected: function() {
                this.set('model', this.get('view'));
                this.execute('hide_dropdown');
            }
        }

    }).registerFunctions({
        /*<%= template_function_cache(filepathnoext + '.html') %>*/
    }).register();

});