
BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Selectableitem_new", {

    template: BetaJS.Dynamics.Dynamic.Components.Templates.selectableitem_new,

    initial: {

        bind : {
            selected : "<+[tagname='ba-list_new']:selected_item"
        },

        attrs : {
            title :'Selectableitem_new - Title'
        },

        scopes : {
            parent_list: "<+[tagname='ba-list_new']"
        },

        create : function () {

            var parentlist = this.scopes.parent_list;

            if (!parentlist)
                console.log('There is no parent list the selector can attach to, this currently only works  with ba-list');
            else if (parentlist.get('listcollection'))
                if (!this.scopes.parent_list.get('selected_item'))
                    this.call('select')

        },

        functions : {

            select : function () {
                this.scopes.parent_list.set('selected_item',{
                    cid : this.cid(),
                    title : this.get('title')
                });
            }

        }

    }

}).register();
