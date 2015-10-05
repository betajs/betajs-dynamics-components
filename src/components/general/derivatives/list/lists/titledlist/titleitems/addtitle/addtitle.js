
BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Addtitle", {

    template: BetaJS.Dynamics.Dynamic.Components.Templates.addtitle,

    initial: {

        attrs: {
            title : 'Title',
            titlefunc : false,
            addfunc : false
        },

        create : function () {

            window.iterateModel(this);

        },

        functions : {

            clicktitle : function (params) {
                if (this.get('titlefunc')) {
                    this.parent().call(this.get('titlefunc'), params);
                } else
                    console.log("You clicked the Title, no titlefunc given");
            },
            addbutton : function (params) {
                if (this.get('addfunc')) {
                    this.parent().call(this.get('addfunc'), params);
                } else
                    console.log("You clicked the addbuton, no addfunc given");
            }
        }

    }

}).register();
