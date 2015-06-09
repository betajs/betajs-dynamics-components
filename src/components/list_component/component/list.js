
BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.List2", {

    templateUrl: "component/%.html",

    initial: {

        attrs: {
            itemtype : "basicitem"
        },

        collections : {
            listcollection : [
                {title: "Item 1"}, {title: "Item 2"},{title:  "Item 3"}]
        },

        create : function () {


        }

    }

}).register();
