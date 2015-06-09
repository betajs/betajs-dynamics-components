
BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Controls", {

    templateUrl: "environment/%/%.html",


    initial: {

        collections : {
            components : [
                {name:'testcomponent'},
                {name:'emailinput'},
                {name:'list'}
            ]
        },

        create : function () {
            console.log('Controls Loaded');

            this.set('current_component', this.get('components').getByIndex(0));

        }

    }

}).register();
