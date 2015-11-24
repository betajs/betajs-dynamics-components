
BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Header", {

    template: BetaJS.Dynamics.Dynamic.Components.Templates.header,

    attrs : {
        model : {
            title :'Pushfunc'
        }
    },

    collections : {
        left_collection : [
            {value : 'Header 1'},
            {value : 'Header 2'}
        ]
    },

    functions : {
        log : function () {

        }
    }

}).register();
