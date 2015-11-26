
BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Clickitem", {

    template: BetaJS.Dynamics.Components.Templates.clickitem,

    attrs: {
        model : {
            value : 'Clickitem - Value'
        }
    },

    functions : {
        click : function () {
            console.log("You Clicked item : " + this.properties().getProp('model.value'));
            console.log(this.cid());
            this.trigger('event', this.cid());
        }
    },

    create : function () {
        this.on("event", function (cid) {
            console.log('event from item: ' + cid);
        }, this);
    }

}).register();
