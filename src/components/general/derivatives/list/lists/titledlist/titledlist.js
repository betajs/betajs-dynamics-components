
BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Titledlist", {

    template: BetaJS.Dynamics.Dynamic.Components.Templates.titledlist,

    initial: {

        attrs: {
            collapsed : false,
            collapsible : true,
            title : 'Title',

            model : {
                listitem : 'selectableitem',
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

        create : function () {
            window.iterateModel(this);
        },

        functions : {

            togglelist : function () {
                this.set('collapsed', !this.get('collapsed'));
            },

            additem : function (item) {
                console.log('You called Additem');
                console.log(item);
                item = item ? item : {title : "New Item"};
                console.log(item);
                window.test = this;
                console.log(this.get('listcollection'));
                this.get('listcollection').add(item);
            }

        }

    }

}).register();
