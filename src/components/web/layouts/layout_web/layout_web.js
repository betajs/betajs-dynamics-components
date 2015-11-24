
BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Layout_web", {

    template: BetaJS.Dynamics.Dynamic.Components.Templates.layout_web,

    attrs : {
        components : {
            header : "header",
            menu : "menu",
            //header : null,
            //menu : null,
            main : null
        },
        model : {
            header : 'Header',
            menu : 'Menu',
            main : 'Main'
        }
    }

}).register();
