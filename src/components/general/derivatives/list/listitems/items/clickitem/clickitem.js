
BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Clickitem", {

    template: BetaJS.Dynamics.Dynamic.Components.Templates.clickitem,

    initial: {

        attrs: {
            model: {
                title :'Title'
            }
        },

        create : function () {

            //if (this.get("model")) {
            //
            //    BetaJS.Objs.iter(this.get("model"), function (modelValue, attrKey) {
            //        var attrValue = this.isArgumentAttr(attrKey) ? this.get(attrKey) : modelValue;
            //        console.log(attrKey);
            //        this.set(attrKey, attrValue);
            //        //this.get("model").set(attrKey, attrValue);
            //        //this.properties().bind(attrKey, this.get("model"));
            //    }, this);
            //
            //}

        },

        functions : {
            click : function () {
                console.log("You Clicked item : " + this.get('model.title'))
            }
        }

    }

}).register();
