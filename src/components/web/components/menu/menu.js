
BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Menu", {

    template: BetaJS.Dynamics.Components.Templates.menu,

    attrs : {
        view : {
            title : "Menu"
        }
    },

    collections : {
        menu_collection : [
            {value : 'Menu 1'},
            {value : 'Menu 2'}
        ]
    }

}).register();
