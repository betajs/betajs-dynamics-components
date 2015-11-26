
BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Toggle_menu", {

    template: BetaJS.Dynamics.Dynamic.Components.Templates.toggle_menu,

    functions : {
        toggle_menu : function () {
            this.scope("<+[tagname='ba-layout_web']").call('toggle_menu');
        }
    }

}).register();
