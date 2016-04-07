
Scoped.define("tests:Test_addtitle", [
    "dynamics:Dynamic",
    "module:Templates"
], [
    "module:Addtitle"
], function (Dynamic, Templates, scoped) {

    return Dynamic.extend({scoped : scoped}, {

        template : Templates.test_addtitle,

        initial : {

            attrs : {
                testmodel : {
                    title : 'Test - Addtitle',
                    titlefunc : 'showlist',
                    addfunc : 'additem',
                    add_func : function () {
                        console.log('This is the add_func');
                    }
                }
            },

            functions : {
                additem : function () {
                    this.get('testmodel').add_func.call(this, null);
                    console.log("Add Item to List");
                },
                showlist : function () {
                    console.log("You clicked the title");
                }
            }

        }

    }).register();

});