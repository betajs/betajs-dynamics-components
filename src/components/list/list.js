
BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.List", {

    templateUrl: "../components/%/%.html",

    initial: {

        attrs : {
            title: null
        },

        collections : {
            listcollection : [
                {
                    name:'Item 1'
                },{
                    name:'Item 2'
                }
            ]
        },

        create : function () {

            console.log( this.get('title') + ' List Loaded');

            if (!this.get("currentitem"))
                this.set('currentitem', this.get('listcollection').getByIndex(0));

            this.on("change:listcollection", function () {
                this.set('currentitem', this.get('listcollection').getByIndex(0));
            }, this);
        },

        functions : {
            select_item : function (system) {
                if (system != this.get('currentitem'))
                    this.set('currentitem',system);
            }
        }

    }

}).register();
