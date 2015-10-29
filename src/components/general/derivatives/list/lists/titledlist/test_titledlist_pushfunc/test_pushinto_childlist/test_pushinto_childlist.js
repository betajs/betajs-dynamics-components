
BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Test_pushinto_childlist", {

    template: BetaJS.Dynamics.Dynamic.Components.Templates.test_pushinto_childlist,

    initial: {

        attrs : {
            //model: {
            callbacks: {
                additem: function () {
                    console.log('This is a function pushed into the titledlist from the tasklist : Add Task from here ? ');
                }
            }
            //}
        },

        collections : {

            outer_collection : [
                {
                    listitem : "swipecontainer",
                    titleitem : 'addtitle',
                    titleitem_model : {
                        title : 'Today',
                        titlefunc : 'togglelist',
                        addfunc : 'additem',
                        addbuttonscope : '<'
                    },
                    type : 'clickitem',
                    listcollection : new BetaJS.Collections.Collection({objects: [
                        {title : "Task 1"},
                        {title : "Task 2"}
                    ]})
                }, {
                    listitem : "swipecontainer",
                    titleitem : 'addtitle',
                    titleitem_model : {
                        title : 'Today',
                        titlefunc : 'togglelist',
                        addfunc : 'additem',
                        addbuttonscope : '<'
                    },
                    type : 'clickitem',
                    listcollection : new BetaJS.Collections.Collection({objects: [
                        {title : "Task 1"},
                        {title : "Task 2"}
                    ]})
                }
            ]
        }

    }

}).register();
