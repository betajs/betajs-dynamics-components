
BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Test_pushinto_child", {

    template: BetaJS.Dynamics.Dynamic.Components.Templates.test_pushinto_child,

    initial: {

        attrs: {
            callbacks : {

                title_click : function (item) {

                    console.log('This is another callback function');

                    item = item ? item : {title : "New Item"};
                    var index = this.get('listcollection').add(item);

                    var item_cid = this.get('listcollection').getByIndex(index).cid();

                    console.log(item_cid);
                    $('#' + item_cid).find('clickitem').css('background', 'red');

                    return item_cid;

                }

            },
            model : {
                titleitem : 'addtitle',
                titleitem_model : {
                    title : 'Today',
                    titlefunc : 'togglelist',
                    addfunc : 'title_click',
                    addbuttonscope : '<'
                },
                listcollection : new BetaJS.Collections.Collection({objects: [
                    {title: "Item 1"},
                    {title: "Item 2"},
                    {title: "Item 3"},
                    {title: "Item 4"},
                    {title: "Item 5"}
                ]})
            }
        }

    }

}).register();
