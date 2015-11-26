
BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Test_titledlist_childlist", {

    template: BetaJS.Dynamics.Components.Templates.test_titledlist_childlist,

    attrs : {
        callbacks: {
            additem: function () {
                console.log('This is a function pushed into the titledlist from the tasklist : Add Task from here ? ');
            }
        }
    },

    collections : {

        outer_collection : [
            {
                titleitem : 'addtitle',
                titleitem_model : {
                    title : 'Today',
                    titlefunc : 'togglelist',
                    addfunc : 'additem',
                    addbuttonscope : '<'
                },
                listitem : "swipecontainer",
                type : 'clickitem',
                listcollection : new BetaJS.Collections.Collection({objects: [
                    {title : "Titledlist - Childlist - Task 1"},
                    {title : "Titledlist - Childlist - Task 2"}
                ]})
            }, {
                titleitem : 'addtitle',
                titleitem_model : {
                    title : 'Today',
                    titlefunc : 'togglelist',
                    addfunc : 'additem',
                    addbuttonscope : '<'
                },
                listitem : "swipecontainer",
                type : 'selectableitem',
                listcollection : new BetaJS.Collections.Collection({objects: [
                    {title : "Titledlist - Childlist - Task 3"},
                    {title : "Titledlist - Childlist - Task 4"}
                ]})
            }
        ]
    }

}).register();
