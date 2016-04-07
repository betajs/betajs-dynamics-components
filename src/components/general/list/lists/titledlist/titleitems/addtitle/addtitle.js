
Scoped.define("module:Addtitle", [
    "dynamics:Dynamic",
    "module:Templates"
], function (Dynamic, Templates, scoped) {

    return Dynamic.extend({scoped : scoped}, {

        template:Templates.addtitle,

        attrs: {
            model : {value: 'Title'}
        },

        functions : {

            clicktitle : function () {

                console.log("You clicked the Title, no clicktitle() given, toggle");
                this.scope('<').call('togglelist');

            },
            addbutton : function () {

                console.log("You clicked the addbuton, no addbutton() function given");

            }

        }

    }).register();

});