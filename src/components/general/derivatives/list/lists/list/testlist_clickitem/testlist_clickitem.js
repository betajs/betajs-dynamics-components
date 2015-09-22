
BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Testlist_clickitem", {

    template: BetaJS.Dynamics.Dynamic.Components.Templates.testlist_clickitem,

    initial: {

        attrs: {
            testmodel : {
                listitem : 'clickitem',
                listcollection : new BetaJS.Collections.Collection({objects: [
                    {title: "Item 1"},
                    {title: "Item 2"},
                    {title: "Item 3"},
                    {title: "Item 4"},
                    {title: "Item 5"}
                ]})
            }
        },

        //collections : {
        //    listcollection : [
        //        {title: "Item 1"},
        //        {title: "Item 2"},
        //        {title: "Item 3"},
        //        {title: "Item 4"},
        //        {title: "Item 5"}
        //        //{model : {title: "Item 1"}},
        //        //{model : {title: "Item 2"}},
        //        //{model : {title: "Item 3"}},
        //        //{model : {title: "Item 4"}},
        //        //{model : {title: "Item 5"}}
        //    ]
        //},

        create : function () {
            if (this.get("model")) {
                window.list = this.get('model');
                BetaJS.Objs.iter(this.get("model"), function (modelValue, attrKey) {
                    var attrValue = this.isArgumentAttr(attrKey) ? this.get(attrKey) : modelValue;
                    this.set(attrKey, attrValue);
                    //this.get("model").set(attrKey, attrValue);
                    //this.properties().bind(attrKey, this.get("model"));
                }, this);
            }
        }

    }

}).register();
