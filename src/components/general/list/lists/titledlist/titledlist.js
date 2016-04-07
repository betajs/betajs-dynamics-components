
Scoped.define("module:Titledlist", [
    "dynamics:Dynamic",
    "module:Templates"
], [
  "module:List"
], function (Dynamic, Templates, scoped) {
    Dynamic.extend({scoped: scoped}, {

        template: Templates.titledlist,

        attrs: {
            model: {
                title_model: {
                    value: 'Titledlist - Title'
                }
            },
            collapsed: false,
            collapsible: true,
            listitem: 'selectableitem',
            titleitem: 'title'
        },

        collections: {
            listcollection: [
                {value: "Titledlist - Item 1"},
                {value: "Titledlist - Item 2"},
                {value: "Titledlist - Item 3"}
            ]
        },

        functions: {

            togglelist: function () {

                if (this.get('collapsible'))
                    this.set('collapsed', !this.get('collapsed'));

            },

            additem: function (item) {

                item = item ? item : {value: "Titledlist - New Item"};
                var index = this.get('listcollection').add(item);

                return this.get('listcollection').getByIndex(index).cid();

            },

            click_title: function () {
                console.log('You clicked the title');
                this.call('togglelist');
            }

        }

    }).register();

});