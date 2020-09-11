Scoped.define("module:Titledlist", [
    "dynamics:Dynamic"
], [
    "dynamics:Partials.EventForwardPartial",
    "module:List",
    "dynamics:Partials.NoScopePartial",
    "dynamics:Partials.ClickPartial"
], function(Dynamic, scoped) {

    return Dynamic.extend({
        scoped: scoped
    }, {

        template: "<%= template(filepathnoext + '.html') %>",

        attrs: {
            model: {
                title_model: {
                    value: 'Titledlist - Title'
                }
            },
            selectable: true,
            collapsed: false,
            collapsible: true,
            listitem: 'selectableitem',
            titleitem: 'title',
            listcount: null
        },

        create: function() {
            this.listenOn(this.get('model').listcollection, "add", function() {
                this._set_count();
            });
            this.listenOn(this.get('model').listcollection, "remove", function() {
                this._set_count();
            });
        },

        functions: {

            togglelist: function() {

                if (this.get('collapsible'))
                    this.set('collapsed', !this.get('collapsed'));

            },

            additem: function(item) {

                item = item ? item : {
                    value: "Titledlist - New Item"
                };
                var index = this.get('listcollection').add(item);

                return this.get('listcollection').getByIndex(index).cid();

            },

            click_title: function() {
                this.call('togglelist');
            }

        },

        _set_count: function() {
            var count = this.get('model').listcollection.count();
            this.set('listcount', count);
        }

    }).registerFunctions({
        /*<%= template_function_cache(filepathnoext + '.html') %>*/
    }).register();

});