
BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Testaddtitle", {

    template : BetaJS.Dynamics.Dynamic.Components.Templates.testaddtitle,

    initial : {

        attrs : {
            testmodel : {
                title : 'Testaddtitle',
                titlefunc : 'showlist',
                addfunc : 'additem'
            }
        },

        functions : {
            additem : function () {
                console.log("Add Item to List");
            },
            showlist : function () {
                console.log("You clicked the title");
            }
        }

    }

}).register();
