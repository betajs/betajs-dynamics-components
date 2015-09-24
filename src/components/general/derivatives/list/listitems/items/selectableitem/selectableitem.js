
BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Selectableitem", {

    template: BetaJS.Dynamics.Dynamic.Components.Templates.selectableitem,

    initial: {

        bind : {
            selected : "<:selected_item",
            parentlistcollection : "<:listcollection"
        },

        attrs : {
            model : {
                title :'Data Placeholder',
                selected : false
            }
        },

        scopes : {
            parent_list: "<+[tagname='ba-list']"
        },

        create : function () {

            if (this.get("model")) {

                BetaJS.Objs.iter(this.get("model"), function (modelValue, attrKey) {
                    var attrValue = this.isArgumentAttr(attrKey) ? this.get(attrKey) : modelValue;
                    this.set(attrKey, attrValue);
                }, this);

            }

            var parentlist = this.scopes.parent_list;
            if (!parentlist)
                console.log('There is no parent list the selector can attach to, this currently only works  with ba-list');

            if (parentlist.get('listcollection')) {
                var index = parentlist.get('listcollection').getIndex(this.get('model'));
                if (index == 0 && !parentlist.get('selected_item')) {
                    parentlist.set('selected_item', this.get('model'));
                }
            }
        },

        functions : {
            select : function () {
                this.scopes.parent_list.set('selected_item',this.get('model'));
            }
        }

    }

}).register();
