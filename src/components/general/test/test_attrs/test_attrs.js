
// Expected behavior:
// The Listitems should be of type 'clickitem' (<clickitem>) as specified in the model below'
// Actual behavior:
// The Listitems are of type 'selectableitem' which is the default behaviour of the titledlist
// Note:
// This only happens when using ba-attrs and not when using ba-model in the template of this dynamic

BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Test_attrs", {

    template : BetaJS.Dynamics.Dynamic.Components.Templates.test_attrs,

    initial : {

        attrs : {
            model : {
                title : "TestAttrs",
                titleitem : 'addtitle',
                titleitem_model : {
                    title : 'Titledlist - TestAttrs',
                    titlefunc : 'togglelist',
                    addfunc : 'additem',
                    addbuttonscope :'<<'
                },
                functions : {
                    placeholder_func : function () {
                        console.log('This is a testfunction from the test_titledlist');
                    }
                },
                listitem : 'clickitem',
                //listitem : 'swipecontainer',
                //type : 'clickitem',
                listcollection : new BetaJS.Collections.Collection({objects: [
                    {title: "Test - Attrs Item 1"},
                    {title: "Test - Attrs Item 2"},
                    {title: "Test - Attrs Item 3"}
                ]})
            }
        },

        functions : {

            additem : function () {

                console.log('This comes from the Test Titledlist : ');
                console.log(this.scope('>').call('additem', {title  : "title"}));

            }

        }

    }

}).register();
