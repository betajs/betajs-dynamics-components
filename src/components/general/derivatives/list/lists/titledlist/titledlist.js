
BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Titledlist", {

    template: BetaJS.Dynamics.Dynamic.Components.Templates.titledlist,

    initial: {

        attrs: {
            collapsed : false,
            collapsible : true,
            title : 'Title',

            model : {
                functions : {
                    placeholder_func : function () {
                        console.log('The placeholder function was called')
                    }
                },
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

                item = item ? item : {title : "New Item"};
                var index = this.get('listcollection').add(item);

                this.get('functions').placeholder_func.call(this,null);

                return this.get('listcollection').getByIndex(index).cid();

            }

        }

    }

}).register();
