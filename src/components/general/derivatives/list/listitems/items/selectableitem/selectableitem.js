
BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Selectableitem", {

    template: BetaJS.Dynamics.Components.Templates.selectableitem,

    initial: {

        bind: {
            selected: "<+[tagname='ba-list']:selected_item"
        },

        scopes: {
            parent_list: "<+[tagname='ba-list']"
        }

    },

    attrs : {
        model : {
            value :'Selectableitem - Value'
        }
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
                value : this.properties().getProp('model.value')
            });
        }

    }

}).register();
