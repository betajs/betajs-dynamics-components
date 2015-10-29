
BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Testlist_pushfunc", {

    template: BetaJS.Dynamics.Dynamic.Components.Templates.testlist_pushfunc,

    initial: {

        attrs: {
            testmodel : {
                listitem : 'clickitem',
                functions : {
                    testfunc : function (argument) {
                        console.log('This is a testfunction');
                        console.log('This is the argument : ' + argument);
                        console.log(this.get('listcollection'));
                        this.get('listcollection').add(
                            {title : argument}
                        );
                    }
                },
                listcollection : new BetaJS.Collections.Collection({objects: [
                    {title: "Item 1"},
                    {title: "Item 2"},
                    {title: "Item 3"},
                    {title: "Item 4"},
                    {title: "Item 5"}
                ]})
            }
        },

        functions : {
            test : function (argument) {
                argument = argument ? argument : "no arg given";
                this.scope('>').get('model').functions.testfunc.call(this.scope('>'), argument);
            }
        }

    }

}).register();
