
BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Test_list_pushfunc", {

    template: BetaJS.Dynamics.Components.Templates.test_list_pushfunc,

    attrs: {
        testmodel : {
            model : {
                listitem : 'clickitem'
            },
            functions : {
                testfunc : function (argument) {
                    console.log('This is a testfunction');
                    console.log('This is the argument : ' + argument);
                    console.log(this.get('listcollection'));
                    this.get('listcollection').add(
                        {value : argument}
                    );
                }
            },
            listcollection : new BetaJS.Collections.Collection({objects: [
                {value: "Item 1"},
                {value: "Item 2"},
                {value: "Item 3"},
                {value: "Item 4"},
                {value: "Item 5"}
            ]})
        }
    },

    functions : {
        test : function (argument) {
            argument = argument ? argument : "no arg given";
            this.scope('>').get('model').functions.testfunc.call(this.scope('>'), argument);
        }
    }

}).register();
