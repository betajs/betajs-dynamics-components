
Scoped.define("module:Layout_web", [
    "dynamics:Dynamic",
    "module:Templates"
],function (Dynamic, Templates, scoped) {

    return Dynamic.extend({scoped: scoped}, {

        template: Templates.layout_web,

        attrs : {
            components : {
                header : "header",
                //header : null,
                menu : "menu",
                //menu : null,
                main : null
            },
            model : {
                header : 'Header',
                menu : 'Menu',
                main : 'Main',
                display_menu : true
            }
        },

        functions : {
            toggle_menu : function () {
                this.setProp('model.display_menu', !this.getProp('model.display_menu'));
            }
        }

    }).register();

});


