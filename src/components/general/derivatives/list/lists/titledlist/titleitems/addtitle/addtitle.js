
BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Addtitle", {

    template: BetaJS.Dynamics.Dynamic.Components.Templates.addtitle,

    initial: {

        attrs: {
            title : 'Title',
            titlefunc : false,
            addfunc : false,
            titlescope : '<',
            addbuttonscope : '<',
            add_func : function () {

                var params = this.get('addbuttonparams') ? this.get('addbuttonparams') : null;

                if (this.get('addfunc')) {
                    this.scope(this.get('addbuttonscope')).call(this.get('addfunc'), params);
                } else
                    console.log("You clicked the addbuton, no addfunc given");

            }
        },

        functions : {

            clicktitle : function () {

                var params = this.get('titleparams') ? this.get('titleparams') : null;

                if (this.get('titlefunc')) {
                    this.scope(this.get('titlescope')).call(this.get('titlefunc'),params);
                } else
                    console.log("You clicked the Title, no titlefunc given");

            },
            addbutton : function () {

                this.get('add_func').call(this,null);

            }

        }

    }

}).register();
