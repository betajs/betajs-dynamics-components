
BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Test_titledlist_pushintochild", {

    template: BetaJS.Dynamics.Dynamic.Components.Templates.test_titledlist_pushintochild,

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
            listitem : 'clickitem',
            listcollection : new BetaJS.Collections.Collection({objects: [
                {title: "Pushintochild - Item 1"},
                {title: "Pushintochild - Item 2"},
                {title: "Pushintochild - Item 3"},
                {title: "Pushintochild - Item 4"}
            ]})
        }
    }

}).register();
