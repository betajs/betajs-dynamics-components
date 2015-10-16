
BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Test_titledlist", {

    template : BetaJS.Dynamics.Dynamic.Components.Templates.test_titledlist,

    initial : {

        attrs : {
            model : {
                title : "Testtitle",
                titleitem : 'addtitle',
                titleitem_model : {
                    title : 'Titledlist - Testtitle',
                    titlefunc : 'togglelist',
                    addfunc : 'additem',
                    addbuttonscope :'<<'
                },
                functions : {
                    placeholder_func : function () {
                        console.log('This is a testfunction from the test_titledlist');
                    }
                },
                type : 'clickitem',
                listcollection : new BetaJS.Collections.Collection({objects: [
                    {title: "Testtitledlist Item 1"},
                    {title: "Testtitledlist Item 2"},
                    {title: "Testtitledlist Item 3"}
                ]})
            }
        },

        functions : {

            additem : function () {

                console.log('This comes from the Test Titledlist : ');
                console.log(this.scope('>').call('additem', {title  : "title"}));

                this.get('test_function').call(this, null);

            }

        }

    }

}).register();
