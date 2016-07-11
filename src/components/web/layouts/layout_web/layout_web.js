
Scoped.define("module:Layout_web", [
    "dynamics:Dynamic",
    "module:Templates"
],function (Dynamic, Templates, scoped) {

    return Dynamic.extend({scoped: scoped}, {

        template: Templates.layout_web,

        attrs : {
            view : {
                header : "header",
                //header : null,
                menu : "menu_web",
                //menu : null,
                content : null,
                display_menu : true
            },
            model : {

            }
        },

        functions : {
            toggle_menu : function () {
                this.setProp('view.display_menu', !this.getProp('view.display_menu'));
            }
        }

    }).register();

});


