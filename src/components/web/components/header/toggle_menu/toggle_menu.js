Scoped.define("module:Toggle_menu", [
    "dynamics:Dynamic"
], function(Dynamic, scoped) {

    return Dynamic.extend({
        scoped: scoped
    }, {

        template: "<%= template(filepathnoext + '.html') %>",

        functions: {
            toggle_menu: function() {
                this.scope("<+[tagname='ba-layout_web']").call('toggle_menu');
            }
        }

    }).register();

});