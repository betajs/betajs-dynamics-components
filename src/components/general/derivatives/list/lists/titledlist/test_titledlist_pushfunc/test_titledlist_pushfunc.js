
BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Test_titledlist_pushfunc", {

    template: BetaJS.Dynamics.Dynamic.Components.Templates.test_titledlist_pushfunc,

    initial: {

        attrs: {
            model : {
                titleitem : 'addtitle',
                titleitem_model : {
                    title : 'Today',
                    titlefunc : 'togglelist',
                    addfunc : 'title_click',
                    addbuttonscope : '<'
                },
                callbacks : {

                    title_click : function (item) {

                        console.log('This is a callback function');

                        item = item ? item : {title : "New Item"};
                        var index = this.get('listcollection').add(item);

                        var item_cid = this.get('listcollection').getByIndex(index).cid();

                        console.log(item_cid);
                        $('#' + item_cid).find('clickitem').css('background', 'red');

                        return item_cid;

                    }

                },
                listcollection : new BetaJS.Collections.Collection({objects: [
                    {title: "Item 1"},
                    {title: "Item 2"},
                    {title: "Item 3"},
                    {title: "Item 4"},
                    {title: "Item 5"}
                ]})
            }
        },

        functions : {

            title_click : function () {
                console.log('haha');
            }

        },

        create : function () {
            window.iterateModel(this);
            console.log('test_titled_list_pushfunc - callback : ');
            console.log(console.log(this.get('callbacks')));
            if (this.get('callbacks') && this.get('callbacks').title_click) {
                console.log(console.log(this.get('callbacks').title_click.toString()));

            }
        }

    }

}).register();
