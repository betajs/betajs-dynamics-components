
Scoped.define("module:Toggle_menu", [
    "dynamics:Dynamic",
    "module:Templates"
],function (Dynamic, Templates, scoped) {

    return Dynamic.extend({scoped: scoped}, {

        template: Templates.toggle_menu,

        functions : {
            toggle_menu : function () {
                this.scope("<+[tagname='ba-layout_web']").call('toggle_menu');
            }
        }

    }).register();

});

