
BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Titledlist_new", {

    template: BetaJS.Dynamics.Dynamic.Components.Templates.titledlist_new,

    initial: {

        attrs: {
            collapsed : false,
            collapsible : true,
            title : 'Titledlist - Title',

            model : {
                listitem : 'selectableitem_new',
                titleitem : 'title'
            }

        },

        collections : {
            listcollection : [
                {title: "Titledlist Item 1"},
                {title: "Titledlist Item 2"},
                {title: "Titledlist Item 3"}
            ]
        },

        functions : {

            togglelist : function () {

                this.set('collapsed', !this.get('collapsed'));

            },

            additem : function (item) {

                item = item ? item : {title : "New Item"};
                var index = this.get('listcollection').add(item);

                return this.get('listcollection').getByIndex(index).cid();

            },

            title_click : function () {
                console.log('You clicked the title');
                this.call('togglelist');
            }

        }

    }

}).register();
