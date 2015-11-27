
BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Test_titledlist", {

    template : BetaJS.Dynamics.Components.Templates.test_titledlist,

    attrs : {
        view : {
            title : "Testtitle",
            titleitem : 'addtitle',
            type : 'clickitem'
        },
        titleitem_model : {
            title : 'Titledlist - Testtitle',
            titlefunc : 'togglelist',
            addfunc : 'additem',
            addbuttonscope :'<<'
        }
    },

    collections : {
        listcollection : [
            {value: "Testtitledlist Item 1"},
            {value: "Testtitledlist Item 2"},
            {value: "Testtitledlist Item 3"}
        ]
    },

    functions : {

        additem : function () {

            console.log('This comes from the Test Titledlist : ');
            console.log(this.scope('>').call('additem', {value  : "new Value"}));

            this.get('test_function').call(this, null);

        }

    }

}).register();
