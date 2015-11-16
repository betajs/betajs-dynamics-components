
BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Titledlist", {

    template: BetaJS.Dynamics.Dynamic.Components.Templates.titledlist,

    attrs: {
        collapsed : false,
        collapsible : true,
        title : 'Titledlist - Title',
        listitem : 'selectableitem',
        titleitem : 'title'
    },

    collections : {
        listcollection : [
            {title: "Titledlist - Item 1"},
            {title: "Titledlist - Item 2"},
            {title: "Titledlist - Item 3"}
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

}).register();
