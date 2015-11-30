
BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Addtitle", {

    template: BetaJS.Dynamics.Components.Templates.addtitle,

    attrs: {
        model : {value: 'Title'}
    },

    functions : {

        clicktitle : function () {

            console.log("You clicked the Title, no clicktitle() given");

        },
        addbutton : function () {

            console.log("You clicked the addbuton, no addbutton() function given");

        }

    }

}).register();
