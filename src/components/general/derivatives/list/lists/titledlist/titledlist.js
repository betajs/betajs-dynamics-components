
BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Titledlist", {

    template: BetaJS.Dynamics.Components.Templates.titledlist,

    attrs: {
        model : {
            title_model : {
                value : 'Titledlist - Title'
            },
            listcollection : new BetaJS.Collections.Collection([
                {value: "Titledlist - Item 1"},
                {value: "Titledlist - Item 2"},
                {value: "Titledlist - Item 3"}
            ])
        },
        collapsed : false,
        collapsible : true,
        listitem : 'selectableitem',
        titleitem : 'title'
    },

    //collections : {
    //    listcollection : [
    //        {value: "Titledlist - Item 1"},
    //        {value: "Titledlist - Item 2"},
    //        {value: "Titledlist - Item 3"}
    //    ]
    //},

    functions : {

        togglelist : function () {

            if (this.get('collapsible'))
                this.set('collapsed', !this.get('collapsed'));

        },

        additem : function (item) {

            item = item ? item : {title : "New Item"};
            var index = this.get('listcollection').add(item);

            return this.get('listcollection').getByIndex(index).cid();

        },

        click_title : function () {
            console.log('You clicked the title');
            this.call('togglelist');
        }

    }

}).register();
