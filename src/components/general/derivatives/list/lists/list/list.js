
BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.List", {

    template: BetaJS.Dynamics.Dynamic.Components.Templates.list,

    initial: {

        attrs: {
            listitem : "clickitem"
        },

        collections : {
            listcollection : [
                {title: "Item 1"},
                {title: "Item 2"},
                {title: "Item 3"}
            ]
        },

        create : function () {
            if (this.get("model")) {
                window.list = this.get('model');
                window.listcollection = this.get('listcollection');
                BetaJS.Objs.iter(this.get("model"), function (modelValue, attrKey) {
                    var attrValue = this.isArgumentAttr(attrKey) ? this.get(attrKey) : modelValue;
                    this.set(attrKey, attrValue);
                    //this.get("model").set(attrKey, attrValue);
                    //this.properties().bind(attrKey, this.get("model"));
                }, this);
                window.newlistcollection = this.get('listcollection');
            }
        }

    }

}).register();
