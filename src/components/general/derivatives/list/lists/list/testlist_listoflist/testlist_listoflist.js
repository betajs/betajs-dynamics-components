
BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Testlist_listoflist", {

    template: BetaJS.Dynamics.Dynamic.Components.Templates.testlist_listoflist,

    initial: {


        collections : {
            listcollection : [
        //        {title: "List of lists Item 1"},
        //        {title: "Item 2"},
        //        {title: "Item 3"},
        //        {title: "Item 4"},
        //        {title: "Item 5"}
                {model : {title: "Test - list of list - Item 1"}},
                {model : {title: "Test - list of list - Item 2"}}
                //{model : {title: "Item 3"}},
        //        //{model : {title: "Item 4"}},
        //        //{model : {title: "Item 5"}}
            ]
        },

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
